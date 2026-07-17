from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("api", "0004_sitesettings"),
    ]

    operations = [
        migrations.CreateModel(
            name="DashboardUser",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("username", models.CharField(max_length=150, unique=True, verbose_name="Логин")),
                ("password", models.CharField(max_length=128, verbose_name="Пароль (хэш)")),
                ("name", models.CharField(max_length=150, verbose_name="Имя")),
                (
                    "role",
                    models.CharField(
                        choices=[("admin", "Администратор"), ("manager", "Менеджер"), ("viewer", "Наблюдатель")],
                        default="viewer",
                        max_length=20,
                        verbose_name="Роль",
                    ),
                ),
                ("is_active", models.BooleanField(default=True, verbose_name="Активен")),
                ("created_at", models.DateTimeField(auto_now_add=True, verbose_name="Создан")),
            ],
            options={
                "verbose_name": "Пользователь дашборда",
                "verbose_name_plural": "Пользователи дашборда",
            },
        ),
        migrations.CreateModel(
            name="AnalyticsEvent",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                (
                    "event_type",
                    models.CharField(
                        choices=[
                            ("page_view", "Просмотр страницы"),
                            ("form_click", "Клик по форме"),
                            ("form_submit", "Отправка формы"),
                        ],
                        max_length=32,
                        verbose_name="Тип",
                    ),
                ),
                ("session_id", models.CharField(blank=True, db_index=True, max_length=64, verbose_name="Сессия")),
                ("metadata", models.JSONField(blank=True, default=dict, verbose_name="Метаданные")),
                ("created_at", models.DateTimeField(auto_now_add=True, db_index=True, verbose_name="Дата")),
            ],
            options={
                "verbose_name": "Событие аналитики",
                "verbose_name_plural": "События аналитики",
                "indexes": [
                    models.Index(fields=["event_type", "created_at"], name="api_analyti_event_t_8f3b2a_idx"),
                ],
            },
        ),
    ]
