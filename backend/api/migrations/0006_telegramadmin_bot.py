from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0005_dashboarduser_analyticsevent"),
    ]

    operations = [
        migrations.AddField(
            model_name="telegramadmin",
            name="bot",
            field=models.CharField(
                choices=[("main", "Основной"), ("ar", "Арабский")],
                default="main",
                max_length=16,
                verbose_name="Бот",
            ),
        ),
        migrations.AlterField(
            model_name="telegramadmin",
            name="chat_id",
            field=models.BigIntegerField(verbose_name="Chat ID"),
        ),
        migrations.AddConstraint(
            model_name="telegramadmin",
            constraint=models.UniqueConstraint(
                fields=("chat_id", "bot"),
                name="unique_telegram_admin_per_bot",
            ),
        ),
    ]
