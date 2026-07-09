import asyncio
import logging
import os

import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
django.setup()

from aiogram import Bot, Dispatcher  # noqa: E402
from aiogram.filters import Command, CommandStart  # noqa: E402
from aiogram.types import Message  # noqa: E402

from telegram_bot.admin_store import (  # noqa: E402
    count_admins,
    is_admin,
    subscribe_admin,
    unsubscribe_admin,
    verify_secret,
)
from telegram_bot.config import get_bot_token  # noqa: E402

logger = logging.getLogger(__name__)

DENIED_TEXT = (
    "Этот бот предназначен только для администраторов сайта.\n\n"
    "Для подписки на уведомления о заявках отправьте:\n"
    "<code>/start &lt;секретный_ключ&gt;</code>"
)


def create_dispatcher() -> Dispatcher:
    dp = Dispatcher()

    @dp.message(CommandStart())
    async def cmd_start(message: Message) -> None:
        if not message.from_user:
            return

        args = message.text.split(maxsplit=1) if message.text else []
        secret = args[1].strip() if len(args) > 1 else ""

        if not secret:
            if await is_admin(message.chat.id):
                total = await count_admins()
                await message.answer(
                    "Вы подписаны на уведомления о заявках.\n\n"
                    f"Активных админов: {total}\n"
                    "Команды:\n"
                    "/status — статус подписки\n"
                    "/stop — отписаться",
                    parse_mode="HTML",
                )
            else:
                await message.answer(DENIED_TEXT, parse_mode="HTML")
            return

        if not verify_secret(secret):
            await message.answer("Неверный секретный ключ.", parse_mode="HTML")
            return

        created = await subscribe_admin(
            chat_id=message.chat.id,
            username=message.from_user.username or "",
            first_name=message.from_user.first_name or "",
        )

        if created:
            await message.answer(
                "Вы подписаны на уведомления о новых заявках с сайта.",
                parse_mode="HTML",
            )
        else:
            await message.answer(
                "Подписка обновлена. Вы снова будете получать уведомления.",
                parse_mode="HTML",
            )

    @dp.message(Command("stop"))
    async def cmd_stop(message: Message) -> None:
        if not await is_admin(message.chat.id):
            await message.answer(DENIED_TEXT, parse_mode="HTML")
            return

        if await unsubscribe_admin(message.chat.id):
            await message.answer("Вы отписаны от уведомлений. /start <ключ> — подписаться снова.")
        else:
            await message.answer("Вы не были подписаны.")

    @dp.message(Command("status"))
    async def cmd_status(message: Message) -> None:
        if not await is_admin(message.chat.id):
            await message.answer(DENIED_TEXT, parse_mode="HTML")
            return

        total = await count_admins()
        await message.answer(
            f"Статус: подписка активна\nАктивных админов: {total}",
            parse_mode="HTML",
        )

    @dp.message()
    async def unknown(message: Message) -> None:
        if await is_admin(message.chat.id):
            await message.answer("Используйте /status или /stop.")
        else:
            await message.answer(DENIED_TEXT, parse_mode="HTML")

    return dp


async def run_polling() -> None:
    token = get_bot_token()
    if not token:
        raise RuntimeError(
            "TELEGRAM_BOT_TOKEN не задан. Создайте бота через @BotFather "
            "и добавьте токен в backend/.env"
        )

    bot = Bot(token=token)
    dp = create_dispatcher()

    logger.info("Admin Telegram-бот запущен (polling)")
    try:
        await dp.start_polling(bot)
    finally:
        await bot.session.close()


def main() -> None:
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
    )
    asyncio.run(run_polling())


if __name__ == "__main__":
    main()
