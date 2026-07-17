from django.core.management.base import BaseCommand, CommandError

from api.models import DashboardRole, DashboardUser


class Command(BaseCommand):
    help = "Создать пользователя дашборда (без публичной регистрации)"

    def add_arguments(self, parser):
        parser.add_argument("--username", required=True, help="Логин")
        parser.add_argument("--password", required=True, help="Пароль")
        parser.add_argument("--name", required=True, help="Отображаемое имя")
        parser.add_argument(
            "--role",
            default=DashboardRole.VIEWER,
            choices=[role.value for role in DashboardRole],
            help="Роль: admin, manager, viewer",
        )

    def handle(self, *args, **options):
        username = options["username"].strip()
        password = options["password"]
        name = options["name"].strip()
        role = options["role"]

        if DashboardUser.objects.filter(username=username).exists():
            raise CommandError(f"Пользователь «{username}» уже существует.")

        user = DashboardUser(username=username, name=name, role=role)
        user.set_password(password)
        user.save()

        self.stdout.write(
            self.style.SUCCESS(
                f"Пользователь создан: {user.username} ({user.get_role_display()})"
            )
        )
