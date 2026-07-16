from asgiref.sync import sync_to_async

from api.services import (
    format_ru_phone,
    get_site_whatsapp_phone_digits,
    set_site_whatsapp_phone,
)


@sync_to_async
def get_whatsapp_phone() -> tuple[str, str]:
    digits = get_site_whatsapp_phone_digits()
    return digits, format_ru_phone(digits)


@sync_to_async
def update_whatsapp_phone(raw_phone: str) -> tuple[str, str]:
    digits = set_site_whatsapp_phone(raw_phone)
    return digits, format_ru_phone(digits)
