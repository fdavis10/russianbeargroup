import logging
import os
from urllib.parse import quote

import requests

from telegram_bot.notifier import send_application_notification, send_consultation_notification

logger = logging.getLogger(__name__)


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


def build_whatsapp_url(phone: str, text: str) -> str:
    clean_phone = "".join(c for c in phone if c.isdigit())
    default_phone = os.getenv("WHATSAPP_PHONE", "1234567890")
    target = clean_phone if len(clean_phone) >= 10 else default_phone
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
