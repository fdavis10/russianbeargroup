import logging

from asgiref.sync import sync_to_async

from api.models import TelegramAdmin
from telegram_bot.config import get_admin_secret, get_bot_channel

logger = logging.getLogger(__name__)


def _channel(bot: str | None = None) -> str:
    return bot or get_bot_channel()


@sync_to_async
def is_admin(chat_id: int, bot: str | None = None) -> bool:
    channel = _channel(bot)
    return TelegramAdmin.objects.filter(chat_id=chat_id, bot=channel, is_active=True).exists()


@sync_to_async
def subscribe_admin(chat_id: int, username: str, first_name: str, bot: str | None = None) -> bool:
    channel = _channel(bot)
    _, created = TelegramAdmin.objects.update_or_create(
        chat_id=chat_id,
        bot=channel,
        defaults={
            "username": username or "",
            "first_name": first_name or "",
            "is_active": True,
        },
    )
    return created


@sync_to_async
def unsubscribe_admin(chat_id: int, bot: str | None = None) -> bool:
    channel = _channel(bot)
    updated = TelegramAdmin.objects.filter(
        chat_id=chat_id,
        bot=channel,
        is_active=True,
    ).update(is_active=False)
    return updated > 0


@sync_to_async
def count_admins(bot: str | None = None) -> int:
    channel = _channel(bot)
    return TelegramAdmin.objects.filter(bot=channel, is_active=True).count()


def verify_secret(secret: str, bot: str | None = None) -> bool:
    expected = get_admin_secret(bot)
    if not expected:
        logger.error("TELEGRAM_ADMIN_SECRET не задан в .env")
        return False
    return secret == expected
