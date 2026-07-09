import os
from pathlib import Path

from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve().parent.parent
load_dotenv(BASE_DIR / ".env")


def get_bot_token() -> str:
    return os.getenv("TELEGRAM_BOT_TOKEN", "")


def get_admin_secret() -> str:
    return os.getenv("TELEGRAM_ADMIN_SECRET", "")
