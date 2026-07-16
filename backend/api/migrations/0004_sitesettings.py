from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("api", "0003_telegramadmin"),
    ]

    operations = [
        migrations.CreateModel(
            name="SiteSettings",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("whatsapp_phone", models.CharField(default="79154083855", max_length=20, verbose_name="WhatsApp номер")),
                ("updated_at", models.DateTimeField(auto_now=True, verbose_name="Обновлено")),
            ],
            options={
                "verbose_name": "Настройки сайта",
                "verbose_name_plural": "Настройки сайта",
            },
        ),
    ]
