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
                    "email": "recruit@svo-agency.com",
                    "whatsapp": "https://wa.me/1234567890?text=Заявка%20на%20СВО",
                    "whatsapp_phone": "+1234567890",
                    "vk": "https://vk.com/svo_recruit",
                },
                "hero": {
                    "headline": "Набор граждан для СВО в Африке – полное сопровождение от начала до конца!",
                    "subheadline": "Мы обеспечиваем юридическое оформление, билеты, документы и сопровождение до прибытия.",
                    "cta": "Узнать подробнее",
                },
                "requirements": [
                    {"label": "Возраст", "value": "18–45 лет"},
                    {"label": "Гражданство", "value": "Любая страна (приоритет — Африка)"},
                    {"label": "Здоровье", "value": "Отсутствие судимостей, физическая готовность"},
                    {
                        "label": "Документы",
                        "value": "Паспорт, медицинская справка, военный билет (если есть)",
                    },
                ],
                "conditions": [
                    "Мужчины до 63 лет включительно",
                    "Граждане РФ и иностранцы",
                    "С опытом военной службы и без него",
                ],
                "advantages": [
                    "Зарплата в зоне СВО от 210 000 рублей",
                    "Статус ветерана боевых действий и все льготы",
                    "Кредитные и налоговые каникулы",
                    "Бюджетные места для обучения детей в вузах",
                    "Компенсация 50% оплаты ЖКУ",
                    "Бесплатное питание и продлёнка для детей",
                    "Бесплатный отдых детей в летних оздоровительных лагерях",
                    "Ежемесячные выплаты по 10 тыс. руб. беременным и на каждого ребенка в семье",
                    "Возможность получения участка земли БЕСПЛАТНО",
                    "При поступлении на службу выдаем ДОПОЛНИТЕЛЬНУЮ АММУНИЦИЮ",
                    "Полное юридическое сопровождение, гуманитарные конвои, помощь в трудоустройстве после СВО, участие в социальных программах",
                    "Помощь в восстановлении любых документов. Помощь семье, решение проблем личного характера",
                ],
                "services": [
                    "Оформление документов (визы, разрешения)",
                    "Покупка авиабилетов (эконом / бизнес-класс)",
                    "Юридическое сопровождение (контракты, гражданство)",
                    "Полное сопровождение до прибытия",
                ],
                "countries": [
                    {"name": "Нигерия", "code": "NG"},
                    {"name": "Гана", "code": "GH"},
                    {"name": "Кения", "code": "KE"},
                    {"name": "Эфиопия", "code": "ET"},
                    {"name": "ЮАР", "code": "ZA"},
                    {"name": "Сенегал", "code": "SN"},
                    {"name": "Камерун", "code": "CM"},
                    {"name": "Уганда", "code": "UG"},
                ],
                "country_options": [
                    {"value": "Nigeria", "label": "Нигерия", "code": "NG"},
                    {"value": "Ghana", "label": "Гана", "code": "GH"},
                    {"value": "Kenya", "label": "Кения", "code": "KE"},
                    {"value": "Ethiopia", "label": "Эфиопия", "code": "ET"},
                    {"value": "South Africa", "label": "ЮАР", "code": "ZA"},
                    {"value": "Senegal", "label": "Сенегал", "code": "SN"},
                    {"value": "Cameroon", "label": "Камерун", "code": "CM"},
                    {"value": "Uganda", "label": "Уганда", "code": "UG"},
                    {"value": "Tanzania", "label": "Танзания", "code": "TZ"},
                    {"value": "Other", "label": "Другая страна", "code": "OTHER"},
                ],
                "reviews": [
                    {
                        "name": "Kwame A.",
                        "country": "Гана",
                        "text": "Получил гражданство через год службы. Компания сделала всё сама – от документов до билетов. Честно!",
                        "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
                    },
                    {
                        "name": "Emmanuel O.",
                        "country": "Нигерия",
                        "text": "Рекомендую всем, кто хочет легально уехать. Быстро оформили все бумаги.",
                        "avatar": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=face",
                    },
                    {
                        "name": "David M.",
                        "country": "Кения",
                        "text": "Профессиональная команда. Помогли с визой, билетами и встретили в аэропорту.",
                        "avatar": "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop&crop=face",
                    },
                    {
                        "name": "Samuel T.",
                        "country": "Эфиопия",
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
