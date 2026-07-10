import logging

from aiogram import F, Router
from aiogram.filters import Command
from aiogram.fsm.context import FSMContext
from aiogram.fsm.state import State, StatesGroup
from aiogram.types import CallbackQuery, InlineKeyboardButton, InlineKeyboardMarkup, Message

from telegram_bot.admin_store import is_admin
from telegram_bot.contact_store import (
    SEARCH_RESULT_LIMIT,
    count_by_country,
    count_contacts,
    get_country_stats,
    get_distinct_countries,
    search_contacts,
)
from telegram_bot.messages import guest_welcome
from telegram_bot.notifier import build_contact_links_keyboard, format_application_message

logger = logging.getLogger(__name__)

router = Router()


class ListStates(StatesGroup):
    waiting_search = State()


def list_menu_keyboard() -> InlineKeyboardMarkup:
    return InlineKeyboardMarkup(
        inline_keyboard=[
            [
                InlineKeyboardButton(text="Поиск", callback_data="list:search"),
                InlineKeyboardButton(text="Фильтр", callback_data="list:filter"),
            ]
        ]
    )


def back_to_menu_keyboard() -> InlineKeyboardMarkup:
    return InlineKeyboardMarkup(
        inline_keyboard=[[InlineKeyboardButton(text="« Назад", callback_data="list:menu")]]
    )


async def _require_admin(message: Message) -> bool:
    if not message.from_user or not await is_admin(message.chat.id):
        first_name = message.from_user.first_name if message.from_user else ""
        await message.answer(guest_welcome(first_name), parse_mode="HTML")
        return False
    return True


async def _require_admin_callback(callback: CallbackQuery) -> bool:
    if not callback.message or not callback.from_user:
        return False
    if not await is_admin(callback.message.chat.id):
        await callback.answer("Доступ запрещён", show_alert=True)
        return False
    return True


@router.message(Command("list"))
async def cmd_list(message: Message, state: FSMContext) -> None:
    if not await _require_admin(message):
        return

    await state.clear()
    total = await count_contacts()
    await message.answer(
        f"<b>Заявки</b> — всего: {total}\n\nВыберите действие:",
        parse_mode="HTML",
        reply_markup=list_menu_keyboard(),
    )


@router.callback_query(F.data == "list:menu")
async def cb_list_menu(callback: CallbackQuery, state: FSMContext) -> None:
    if not await _require_admin_callback(callback):
        return

    await state.clear()
    total = await count_contacts()
    await callback.message.edit_text(
        f"<b>Заявки</b> — всего: {total}\n\nВыберите действие:",
        parse_mode="HTML",
        reply_markup=list_menu_keyboard(),
    )
    await callback.answer()


@router.callback_query(F.data == "list:cancel")
async def cb_list_cancel(callback: CallbackQuery, state: FSMContext) -> None:
    if not await _require_admin_callback(callback):
        return

    await state.clear()
    await callback.message.edit_text("Действие отменено.", reply_markup=back_to_menu_keyboard())
    await callback.answer()


@router.callback_query(F.data == "list:search")
async def cb_list_search(callback: CallbackQuery, state: FSMContext) -> None:
    if not await _require_admin_callback(callback):
        return

    await state.set_state(ListStates.waiting_search)
    cancel_kb = InlineKeyboardMarkup(
        inline_keyboard=[[InlineKeyboardButton(text="Отмена", callback_data="list:cancel")]]
    )
    await callback.message.edit_text(
        "Введите данные для поиска:\n"
        "имя, телефон, страну или фрагмент сообщения.",
        reply_markup=cancel_kb,
    )
    await callback.answer()


@router.message(ListStates.waiting_search)
async def process_search_query(message: Message, state: FSMContext) -> None:
    if not await _require_admin(message):
        await state.clear()
        return

    query = (message.text or "").strip()
    if not query:
        await message.answer("Введите непустой запрос или нажмите «Отмена».")
        return

    await state.clear()
    contacts = await search_contacts(query)

    if not contacts:
        await message.answer(
            f"По запросу «{query}» заявок не найдено.",
            reply_markup=back_to_menu_keyboard(),
        )
        return

    await message.answer(
        f"Найдено заявок: {len(contacts)}"
        + (f" (показаны первые {SEARCH_RESULT_LIMIT})" if len(contacts) >= SEARCH_RESULT_LIMIT else ""),
        reply_markup=back_to_menu_keyboard(),
    )

    for contact in contacts:
        text = format_application_message(
            name=contact.name,
            phone=contact.phone,
            country=contact.country,
            message=contact.message,
            contact_id=contact.pk,
        )
        created = contact.created_at.strftime("%d.%m.%Y %H:%M")
        text += f"\n<i>Дата: {created}</i>"

        keyboard = build_contact_links_keyboard(contact.phone, contact.name)
        try:
            await message.answer(text, parse_mode="HTML", reply_markup=keyboard)
        except Exception as exc:
            logger.error("Не удалось отправить заявку #%s: %s", contact.pk, exc)


@router.callback_query(F.data == "list:filter")
async def cb_list_filter(callback: CallbackQuery, state: FSMContext) -> None:
    if not await _require_admin_callback(callback):
        return

    await state.clear()
    countries = await get_distinct_countries()

    if not countries:
        await callback.message.edit_text(
            "Заявок пока нет.",
            reply_markup=back_to_menu_keyboard(),
        )
        await callback.answer()
        return

    rows: list[list[InlineKeyboardButton]] = []
    for index, country in enumerate(countries):
        rows.append(
            [InlineKeyboardButton(text=country, callback_data=f"list:fc:{index}")]
        )

    rows.append(
        [InlineKeyboardButton(text="Сводка по всем странам", callback_data="list:filter_all")]
    )
    rows.append([InlineKeyboardButton(text="« Назад", callback_data="list:menu")])

    await callback.message.edit_text(
        "Выберите страну для фильтрации:",
        reply_markup=InlineKeyboardMarkup(inline_keyboard=rows),
    )
    await callback.answer()


@router.callback_query(F.data == "list:filter_all")
async def cb_filter_all(callback: CallbackQuery) -> None:
    if not await _require_admin_callback(callback):
        return

    stats = await get_country_stats()
    if not stats:
        await callback.answer("Заявок нет", show_alert=True)
        return

    lines = ["<b>Заявки по странам:</b>", ""]
    total = 0
    for row in stats:
        count = row["count"]
        total += count
        lines.append(f"• {row['country']}: <b>{count}</b>")

    lines.append("")
    lines.append(f"<b>Всего: {total}</b>")

    await callback.message.answer("\n".join(lines), parse_mode="HTML")
    await callback.answer()


@router.callback_query(F.data.startswith("list:fc:"))
async def cb_filter_country(callback: CallbackQuery) -> None:
    if not await _require_admin_callback(callback):
        return

    try:
        index = int(callback.data.split(":")[-1])
    except (ValueError, IndexError):
        await callback.answer("Некорректный выбор", show_alert=True)
        return

    countries = await get_distinct_countries()
    if index < 0 or index >= len(countries):
        await callback.answer("Страна не найдена", show_alert=True)
        return

    country = countries[index]
    count = await count_by_country(country)

    await callback.message.answer(
        f"Страна: <b>{country}</b>\nЗаявок: <b>{count}</b>",
        parse_mode="HTML",
    )
    await callback.answer()


ADMIN_COMMANDS = (
    "Команды:\n"
    "/list — поиск и фильтр заявок\n"
    "/status — статус подписки\n"
    "/stop — отписаться"
)


@router.message()
async def unknown_message(message: Message) -> None:
    if await is_admin(message.chat.id):
        await message.answer(f"Неизвестная команда.\n\n{ADMIN_COMMANDS}", parse_mode="HTML")
    else:
        first_name = message.from_user.first_name if message.from_user else ""
        await message.answer(guest_welcome(first_name), parse_mode="HTML")
