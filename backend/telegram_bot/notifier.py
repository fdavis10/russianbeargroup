import asyncio
import logging
from html import escape

from aiogram import Bot
from aiogram.enums import ParseMode

from api.models import TelegramAdmin
from telegram_bot.config import get_bot_token

logger = logging.getLogger(__name__)


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


def get_active_admin_chat_ids() -> list[int]:
    return list(TelegramAdmin.objects.filter(is_active=True).values_list("chat_id", flat=True))


async def _broadcast(text: str, chat_ids: list[int]) -> int:
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
    chat_ids = get_active_admin_chat_ids()
    sent = asyncio.run(_broadcast(text, chat_ids))
    return sent > 0
