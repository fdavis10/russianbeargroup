from datetime import timedelta

from django.core import signing
from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed

from .models import DashboardUser

TOKEN_MAX_AGE = timedelta(days=7)
TOKEN_SALT = "dashboard-auth-token"


def create_access_token(user: DashboardUser) -> str:
    return signing.dumps({"user_id": user.id, "role": user.role}, salt=TOKEN_SALT)


def decode_access_token(token: str) -> dict:
    try:
        return signing.loads(token, salt=TOKEN_SALT, max_age=TOKEN_MAX_AGE)
    except signing.SignatureExpired as exc:
        raise AuthenticationFailed("Сессия истекла. Войдите снова.") from exc
    except signing.BadSignature as exc:
        raise AuthenticationFailed("Недействительный токен.") from exc


class DashboardJWTAuthentication(BaseAuthentication):
    keyword = "Bearer"

    def authenticate(self, request):
        auth_header = request.META.get("HTTP_AUTHORIZATION", "")
        if not auth_header.startswith(f"{self.keyword} "):
            return None

        token = auth_header[len(self.keyword) + 1 :].strip()
        if not token:
            return None

        payload = decode_access_token(token)
        try:
            user = DashboardUser.objects.get(pk=payload["user_id"], is_active=True)
        except DashboardUser.DoesNotExist as exc:
            raise AuthenticationFailed("Пользователь не найден.") from exc

        return (user, token)
