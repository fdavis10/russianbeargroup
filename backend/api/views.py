from pathlib import Path

from django.conf import settings
from django.http import FileResponse
from rest_framework import status
from rest_framework.response import Response
from rest_framework.throttling import AnonRateThrottle
from rest_framework.views import APIView

from .models import Contact
from .serializers import ConsultationSerializer, ContactSerializer
from .services import build_whatsapp_url, notify_new_consultation, notify_new_contact, send_whatsapp_via_twilio

DOCUMENTS_DIR = Path(settings.BASE_DIR) / "static" / "documents"


class ContactRateThrottle(AnonRateThrottle):
    scope = "contact"


class LandingContentView(APIView):
    def get(self, request):
        return Response(
            {
                "site": {
                    "title": 'IRC "RUSSIAN BEAR"',
                    "email": "support@irc-russianbear.army",
                    "whatsapp": "https://wa.me/79882672632?text=Заявка%20на%20СВО",
                    "whatsapp_phone": "+7 988 267-26-32",
                    "vk": "https://vk.com/svo_recruit",
                },
                "hero": {
                    "headline": "Набор граждан Африки, Востока, Азии, Латинской Америки на военную службу по контракту — полное сопровождение от заявки до прибытия.",
                    "subheadline": "Помощь в оформлении документов, визовое сопровождение, размещение, питание, трансфер — оказываем полную поддержку на территории России. Срок от начала оформления документов до прибытия в РФ занимает около 7 дней.",
                    "cta": "Узнать подробнее",
                },
                "requirements": [
                    {"label": "Возраст", "value": "21–45 лет"},
                    {
                        "label": "Здоровье",
                        "value": "отсутствие тяжёлых заболеваний (ВИЧ, гепатиты В/С), отсутствие тяжёлых психических заболеваний, стрессоустойчивость",
                    },
                    {
                        "label": "Физическая подготовка",
                        "value": "возможность отжаться 10 раз, присесть 20 раз",
                    },
                ],
                "conditions": [
                    "Мужчины до 63 лет включительно",
                    "Граждане РФ и иностранцы",
                    "С опытом военной службы и без него",
                ],
                "advantages": [
                    "Зарплата от 210 000 рублей",
                    "Полное обеспечение современным тактическим снаряжением",
                    "Бонус при подписании 1 050 000 рублей",
                    "Получение гражданства РФ (при желании)",
                    "Помощь в трансграничных денежных переводах (перевод денежных средств семье)",
                    "Помощь в трудоустройстве после завершения контракта (при желании)",
                    "Полное юридическое сопровождение на всех этапах",
                    "Участие в государственных социальных программах для ветеранов",
                    "Помощь в получении бесплатного медицинского лечения и страховых выплат в случае ранения ($10 000)",
                    "Помощь в получении страховых выплат в случае гибели ($60 000 — родственникам через посольство РФ)",
                    "Прохождение специализированного курса боевой подготовки (14–60 дней), в зависимости от назначения в ВЧ",
                ],
                "services": [
                    "Оформление документов под ключ (визы, миграционные карты, страховки, приглашения)",
                    "Покупка билетов (авиа, ЖД, морской)",
                    "Полное юридическое и социальное сопровождение на весь срок прохождения службы в РФ",
                ],
                "countries": [
                    {"name": "Россия", "code": "RU"},
                    {"name": "Беларусь", "code": "BY"},
                    {"name": "Казахстан", "code": "KZ"},
                    {"name": "Узбекистан", "code": "UZ"},
                    {"name": "Индия", "code": "IN"},
                    {"name": "Сербия", "code": "RS"},
                    {"name": "Куба", "code": "CU"},
                    {"name": "Армения", "code": "AM"},
                ],
                "country_options": [
                    {"value": "Russia", "label": "Россия", "code": "RU"},
                    {"value": "Belarus", "label": "Беларусь", "code": "BY"},
                    {"value": "Kazakhstan", "label": "Казахстан", "code": "KZ"},
                    {"value": "Uzbekistan", "label": "Узбекистан", "code": "UZ"},
                    {"value": "India", "label": "Индия", "code": "IN"},
                    {"value": "Serbia", "label": "Сербия", "code": "RS"},
                    {"value": "Cuba", "label": "Куба", "code": "CU"},
                    {"value": "Armenia", "label": "Армения", "code": "AM"},
                    {"value": "Vietnam", "label": "Вьетнам", "code": "VN"},
                    {"value": "Kyrgyzstan", "label": "Киргизия", "code": "KG"},
                    {"value": "Other", "label": "Другая страна", "code": "OTHER"},
                ],
                "reviews": [
                    {
                        "name": "Rajesh K.",
                        "country": "Индия",
                        "text": "Получил гражданство через год службы. Компания сделала всё сама – от документов до билетов. Честно!",
                        "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
                    },
                    {
                        "name": "Marko P.",
                        "country": "Сербия",
                        "text": "Рекомендую всем, кто хочет легально оформиться. Быстро подготовили все бумаги.",
                        "avatar": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=face",
                    },
                    {
                        "name": "Andrei V.",
                        "country": "Беларусь",
                        "text": "Профессиональная команда. Помогли с визой, билетами и встретили в аэропорту.",
                        "avatar": "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop&crop=face",
                    },
                    {
                        "name": "Carlos M.",
                        "country": "Куба",
                        "text": "Всё прозрачно и по договору. Юристы объяснили каждый шаг. Спасибо за поддержку!",
                        "avatar": "https://images.unsplash.com/photo-1531384441138-2736e62e0919?w=200&h=200&fit=crop&crop=face",
                    },
                ],
            }
        )


class ContactView(APIView):
    throttle_classes = [ContactRateThrottle]

    def post(self, request):
        serializer = ContactSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        contact = Contact.objects.create(
            name=serializer.validated_data["name"],
            phone=serializer.validated_data["phone"],
            country=serializer.validated_data["country"],
            message=serializer.validated_data.get("message", ""),
        )

        contact.telegram_sent = notify_new_contact(
            name=contact.name,
            phone=contact.phone,
            country=contact.country,
            message=contact.message,
            contact_id=contact.pk,
        )

        wa_text = (
            f"Заявка на СВО\nИмя: {contact.name}\n"
            f"Телефон: {contact.phone}\nСтрана: {contact.country}"
        )
        if contact.message:
            wa_text += f"\nСообщение: {contact.message}"

        contact.whatsapp_notified = send_whatsapp_via_twilio(contact.phone, wa_text)
        contact.save()

        whatsapp_url = build_whatsapp_url(contact.phone, wa_text)

        return Response(
            {
                "status": "success",
                "message": "Заявка успешно отправлена. Мы свяжемся с вами в ближайшее время.",
                "links": {
                    "whatsapp": whatsapp_url,
                },
            },
            status=status.HTTP_201_CREATED,
        )


class ConsultationView(APIView):
    throttle_classes = [ContactRateThrottle]

    def post(self, request):
        serializer = ConsultationSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        contact = Contact.objects.create(
            name=serializer.validated_data["name"],
            phone=serializer.validated_data["phone"],
            country="Консультация",
            message=serializer.validated_data["question"],
        )

        contact.telegram_sent = notify_new_consultation(
            name=contact.name,
            phone=contact.phone,
            question=contact.message,
            contact_id=contact.pk,
        )
        contact.save()

        return Response(
            {
                "status": "success",
                "message": "Спасибо! Мы с вами свяжемся!",
            },
            status=status.HTTP_201_CREATED,
        )


class DocumentsListView(APIView):
    def get(self, request):
        return Response(
            [
                {
                    "id": "contract",
                    "title": "Образец контракта",
                    "description": "Типовой договор о прохождении службы",
                    "url": "/api/documents/contract/",
                    "preview_color": "#1a3d2a",
                },
                {
                    "id": "acceptance",
                    "title": "Справка о приёме",
                    "description": "Документ о зачислении в подразделение",
                    "url": "/api/documents/acceptance/",
                    "preview_color": "#2d4a3e",
                },
            ]
        )


class DocumentDetailView(APIView):
    FILES = {
        "contract": "contract_sample.pdf",
        "acceptance": "acceptance_sample.pdf",
    }

    def get(self, request, doc_id):
        filename = self.FILES.get(doc_id)
        if not filename:
            return Response({"detail": "Not found"}, status=status.HTTP_404_NOT_FOUND)

        filepath = DOCUMENTS_DIR / filename
        if not filepath.exists():
            return Response({"detail": "File not found"}, status=status.HTTP_404_NOT_FOUND)

        return FileResponse(filepath.open("rb"), content_type="application/pdf", filename=filename)
