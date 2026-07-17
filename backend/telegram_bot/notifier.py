import asyncio
import logging
from html import escape

from aiogram import Bot
from aiogram.enums import ParseMode
from aiogram.types import InlineKeyboardButton, InlineKeyboardMarkup

from api.models import TelegramAdmin
from telegram_bot.config import get_bot_token

logger = logging.getLogger(__name__)


def normalize_phone_digits(phone: str) -> str:
    return "".join(c for c in phone if c.isdigit())


def build_contact_links_keyboard(phone: str, name: str = "") -> InlineKeyboardMarkup | None:
    digits = normalize_phone_digits(phone)
    if len(digits) < 7:
        return None

    whatsapp_url = f"https://wa.me/{digits}"
    telegram_url = f"https://t.me/+{digits}"

    return InlineKeyboardMarkup(
        inline_keyboard=[
            [
                InlineKeyboardButton(text="Telegram", url=telegram_url),
                InlineKeyboardButton(text="WhatsApp", url=whatsapp_url),
            ]
        ]
    )


def format_application_message(
    name: str,
    phone: str,
    country: str,
    message: str = "",
    contact_id: int | None = None,
) -> str:
    lines = [
        "<b>Новая заявка с сайта</b>",
        "",
        f"<b>Имя:</b> {escape(name)}",
        f"<b>Телефон:</b> {escape(phone)}",
        f"<b>Страна:</b> {escape(country)}",
    ]
    if message:
        lines.append(f"<b>Сообщение:</b> {escape(message)}")
    if contact_id is not None:
        lines.append(f"\n<i>ID заявки в БД: #{contact_id}</i>")
    return "\n".join(lines)


def format_consultation_message(
    name: str,
    phone: str,
    question: str,
    country: str = "",
    contact_id: int | None = None,
) -> str:
    lines = [
        "<b>Запрос на консультацию с сайта</b>",
        "",
        f"<b>Имя:</b> {escape(name)}",
        f"<b>Телефон:</b> {escape(phone)}",
    ]
    if country:
        lines.append(f"<b>Страна:</b> {escape(country)}")
    lines.append(f"<b>Вопрос:</b> {escape(question)}")
    if contact_id is not None:
        lines.append(f"\n<i>ID заявки в БД: #{contact_id}</i>")
    return "\n".join(lines)


def get_active_admin_chat_ids() -> list[int]:
    return list(TelegramAdmin.objects.filter(is_active=True).values_list("chat_id", flat=True))


async def _broadcast(
    text: str,
    chat_ids: list[int],
    reply_markup: InlineKeyboardMarkup | None = None,
) -> int:
    token = get_bot_token()
    if not token:
        logger.warning("TELEGRAM_BOT_TOKEN не задан")
        return 0

    if not chat_ids:
        logger.warning(
            "Нет подписанных админов. Отправьте боту /start <секрет> для подписки на уведомления."
        )
        return 0

    bot = Bot(token=token)
    sent = 0
    try:
        for chat_id in chat_ids:
            try:
                await bot.send_message(
                    chat_id=chat_id,
                    text=text,
                    parse_mode=ParseMode.HTML,
                    reply_markup=reply_markup,
                )
                sent += 1
            except Exception as exc:
                logger.error("Не удалось отправить админу %s: %s", chat_id, exc)
    finally:
        await bot.session.close()

    return sent


def send_application_notification(
    name: str,
    phone: str,
    country: str,
    message: str = "",
    contact_id: int | None = None,
) -> bool:
    text = format_application_message(name, phone, country, message, contact_id)
    reply_markup = build_contact_links_keyboard(phone, name)
    chat_ids = get_active_admin_chat_ids()
    sent = asyncio.run(_broadcast(text, chat_ids, reply_markup))
    return sent > 0


def send_consultation_notification(
    name: str,
    phone: str,
    question: str,
    country: str = "",
    contact_id: int | None = None,
) -> bool:
    text = format_consultation_message(name, phone, question, country, contact_id)
    reply_markup = build_contact_links_keyboard(phone, name)
    chat_ids = get_active_admin_chat_ids()
    sent = asyncio.run(_broadcast(text, chat_ids, reply_markup))
    return sent > 0
