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


class SiteSettings(models.Model):
    whatsapp_phone = models.CharField("WhatsApp номер", max_length=20, default="79154083855")
    updated_at = models.DateTimeField("Обновлено", auto_now=True)

    class Meta:
        verbose_name = "Настройки сайта"
        verbose_name_plural = "Настройки сайта"

    def __str__(self):
        return f"SiteSettings #{self.pk}"


class DashboardRole(models.TextChoices):
    ADMIN = "admin", "Администратор"
    MANAGER = "manager", "Менеджер"
    VIEWER = "viewer", "Наблюдатель"


class DashboardUser(models.Model):
    username = models.CharField("Логин", max_length=150, unique=True)
    password = models.CharField("Пароль (хэш)", max_length=128)
    name = models.CharField("Имя", max_length=150)
    role = models.CharField(
        "Роль",
        max_length=20,
        choices=DashboardRole.choices,
        default=DashboardRole.VIEWER,
    )
    is_active = models.BooleanField("Активен", default=True)
    created_at = models.DateTimeField("Создан", auto_now_add=True)

    class Meta:
        verbose_name = "Пользователь дашборда"
        verbose_name_plural = "Пользователи дашборда"

    def __str__(self):
        return f"{self.username} ({self.get_role_display()})"

    def set_password(self, raw_password: str) -> None:
        from django.contrib.auth.hashers import make_password

        self.password = make_password(raw_password)

    def check_password(self, raw_password: str) -> bool:
        from django.contrib.auth.hashers import check_password

        return check_password(raw_password, self.password)

    @property
    def is_authenticated(self) -> bool:
        return True


class AnalyticsEventType(models.TextChoices):
    PAGE_VIEW = "page_view", "Просмотр страницы"
    FORM_CLICK = "form_click", "Клик по форме"
    FORM_SUBMIT = "form_submit", "Отправка формы"


class AnalyticsEvent(models.Model):
    event_type = models.CharField("Тип", max_length=32, choices=AnalyticsEventType.choices)
    session_id = models.CharField("Сессия", max_length=64, blank=True, db_index=True)
    metadata = models.JSONField("Метаданные", default=dict, blank=True)
    created_at = models.DateTimeField("Дата", auto_now_add=True, db_index=True)

    class Meta:
        verbose_name = "Событие аналитики"
        verbose_name_plural = "События аналитики"
        indexes = [
            models.Index(fields=["event_type", "created_at"]),
        ]

    def __str__(self):
        return f"{self.event_type} @ {self.created_at:%Y-%m-%d %H:%M}"
