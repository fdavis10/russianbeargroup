import os
from pathlib import Path

from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve().parent.parent
load_dotenv(BASE_DIR / ".env")

BOT_CHANNELS = ("main", "ar")


def get_bot_channel() -> str:
    channel = os.getenv("TELEGRAM_BOT_CHANNEL", "main").strip().lower()
    return channel if channel in BOT_CHANNELS else "main"


def get_bot_token(channel: str | None = None) -> str:
    resolved = channel or get_bot_channel()
    if resolved == "ar":
        return os.getenv("TELEGRAM_AR_BOT_TOKEN", "")
    return os.getenv("TELEGRAM_BOT_TOKEN", "")


def get_admin_secret(channel: str | None = None) -> str:
    resolved = channel or get_bot_channel()
    if resolved == "ar":
        return os.getenv("TELEGRAM_AR_ADMIN_SECRET", os.getenv("TELEGRAM_ADMIN_SECRET", ""))
    return os.getenv("TELEGRAM_ADMIN_SECRET", "")
