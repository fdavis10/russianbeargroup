from django.core.management.base import BaseCommand

from telegram_bot.bot import main


class Command(BaseCommand):
    help = "Запустить Telegram-бота (aiogram, long polling)"

    def add_arguments(self, parser):
        parser.add_argument(
            "--bot",
            choices=["main", "ar"],
            default=None,
            help="Канал бота: main (основной сайт) или ar (арабский сайт). "
            "По умолчанию — TELEGRAM_BOT_CHANNEL из окружения или main.",
        )

    def handle(self, *args, **options):
        bot_channel = options["bot"]
        label = bot_channel or "auto"
        self.stdout.write(self.style.SUCCESS(f"Запуск Telegram-бота ({label})..."))
        main(bot_channel)
