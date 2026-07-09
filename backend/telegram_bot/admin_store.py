import logging

from asgiref.sync import sync_to_async

from api.models import TelegramAdmin
from telegram_bot.config import get_admin_secret

logger = logging.getLogger(__name__)


@sync_to_async
def is_admin(chat_id: int) -> bool:
    return TelegramAdmin.objects.filter(chat_id=chat_id, is_active=True).exists()


@sync_to_async
def subscribe_admin(chat_id: int, username: str, first_name: str) -> bool:
    _, created = TelegramAdmin.objects.update_or_create(
        chat_id=chat_id,
        defaults={
            "username": username or "",
            "first_name": first_name or "",
            "is_active": True,
        },
    )
    return created


@sync_to_async
def unsubscribe_admin(chat_id: int) -> bool:
    updated = TelegramAdmin.objects.filter(chat_id=chat_id, is_active=True).update(is_active=False)
    return updated > 0


@sync_to_async
def count_admins() -> int:
    return TelegramAdmin.objects.filter(is_active=True).count()


def verify_secret(secret: str) -> bool:
    expected = get_admin_secret()
    if not expected:
        logger.error("TELEGRAM_ADMIN_SECRET не задан в .env")
        return False
    return secret == expected
