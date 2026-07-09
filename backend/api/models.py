from django.db import models


class Contact(models.Model):
    name = models.CharField("Имя", max_length=120)
    phone = models.CharField("Телефон", max_length=20)
    country = models.CharField("Страна", max_length=100)
    message = models.TextField("Сообщение", blank=True)
    telegram_sent = models.BooleanField("Отправлено в Telegram", default=False)
    whatsapp_notified = models.BooleanField("Уведомление WhatsApp", default=False)
    created_at = models.DateTimeField("Дата создания", auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "Заявка"
        verbose_name_plural = "Заявки"

    def __str__(self):
        return f"{self.name} — {self.country}"


class TelegramAdmin(models.Model):
    chat_id = models.BigIntegerField("Chat ID", unique=True)
    username = models.CharField("Username", max_length=100, blank=True)
    first_name = models.CharField("Имя", max_length=100, blank=True)
    is_active = models.BooleanField("Активен", default=True)
    subscribed_at = models.DateTimeField("Подписан", auto_now_add=True)

    class Meta:
        verbose_name = "Telegram-админ"
        verbose_name_plural = "Telegram-админы"

    def __str__(self):
        label = self.username or self.first_name or str(self.chat_id)
        return f"@{label}" if self.username else label
