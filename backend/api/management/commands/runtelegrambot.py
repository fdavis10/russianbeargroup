from django.core.management.base import BaseCommand

from telegram_bot.bot import main


class Command(BaseCommand):
    help = "Запустить Telegram-бота (aiogram, long polling)"

    def handle(self, *args, **options):
        self.stdout.write(self.style.SUCCESS("Запуск Telegram-бота..."))
        main()
