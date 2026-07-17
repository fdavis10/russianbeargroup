from datetime import datetime, timedelta, timezone

import jwt
from django.conf import settings
from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed

from .models import DashboardUser

JWT_ALGORITHM = "HS256"
JWT_EXPIRY_DAYS = 7


def create_access_token(user: DashboardUser) -> str:
    payload = {
        "user_id": user.id,
        "role": user.role,
        "exp": datetime.now(timezone.utc) + timedelta(days=JWT_EXPIRY_DAYS),
        "iat": datetime.now(timezone.utc),
    }
    return jwt.encode(payload, settings.SECRET_KEY, algorithm=JWT_ALGORITHM)


def decode_access_token(token: str) -> dict:
    try:
        return jwt.decode(token, settings.SECRET_KEY, algorithms=[JWT_ALGORITHM])
    except jwt.ExpiredSignatureError as exc:
        raise AuthenticationFailed("Сессия истекла. Войдите снова.") from exc
    except jwt.InvalidTokenError as exc:
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
