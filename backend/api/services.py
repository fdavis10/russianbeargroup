import logging
import os
from urllib.parse import quote

import requests

from .models import SiteSettings
from telegram_bot.notifier import send_application_notification, send_consultation_notification

logger = logging.getLogger(__name__)
DEFAULT_WHATSAPP_PHONE = "79154083855"


def notify_new_contact(
    name: str,
    phone: str,
    country: str,
    message: str = "",
    contact_id: int | None = None,
) -> bool:
    return send_application_notification(
        name=name,
        phone=phone,
        country=country,
        message=message,
        contact_id=contact_id,
    )


def notify_new_consultation(
    name: str,
    phone: str,
    question: str,
    country: str = "",
    contact_id: int | None = None,
) -> bool:
    return send_consultation_notification(
        name=name,
        phone=phone,
        question=question,
        country=country,
        contact_id=contact_id,
    )


def normalize_phone_digits(phone: str) -> str:
    return "".join(c for c in phone if c.isdigit())


def format_ru_phone(phone: str) -> str:
    digits = normalize_phone_digits(phone)
    if len(digits) == 11 and digits.startswith("7"):
        return f"+7 {digits[1:4]} {digits[4:7]}-{digits[7:9]}-{digits[9:11]}"
    return f"+{digits}" if digits else ""


def get_site_whatsapp_phone_digits() -> str:
    settings_obj = SiteSettings.objects.order_by("-id").first()
    if settings_obj and normalize_phone_digits(settings_obj.whatsapp_phone):
        return normalize_phone_digits(settings_obj.whatsapp_phone)
    return normalize_phone_digits(os.getenv("WHATSAPP_PHONE", DEFAULT_WHATSAPP_PHONE))


def set_site_whatsapp_phone(phone: str) -> str:
    digits = normalize_phone_digits(phone)
    if len(digits) < 10:
        raise ValueError("Номер должен содержать минимум 10 цифр.")
    settings_obj, _ = SiteSettings.objects.get_or_create(id=1)
    settings_obj.whatsapp_phone = digits
    settings_obj.save(update_fields=["whatsapp_phone", "updated_at"])
    return digits


def build_whatsapp_url(phone: str, text: str) -> str:
    clean_phone = normalize_phone_digits(phone)
    target = clean_phone if len(clean_phone) >= 10 else get_site_whatsapp_phone_digits()
    return f"https://wa.me/{target}?text={quote(text)}"


def send_whatsapp_via_twilio(phone: str, text: str) -> bool:
    account_sid = os.getenv("TWILIO_ACCOUNT_SID", "")
    auth_token = os.getenv("TWILIO_AUTH_TOKEN", "")
    from_number = os.getenv("TWILIO_WHATSAPP_FROM", "")
    if not all([account_sid, auth_token, from_number]):
        return False

    try:
        response = requests.post(
            f"https://api.twilio.com/2010-04-01/Accounts/{account_sid}/Messages.json",
            auth=(account_sid, auth_token),
            data={
                "From": f"whatsapp:{from_number}",
                "To": f"whatsapp:{phone}",
                "Body": text,
            },
            timeout=10,
        )
        response.raise_for_status()
        return True
    except requests.RequestException as exc:
        logger.error("WhatsApp/Twilio send failed: %s", exc)
        return False
