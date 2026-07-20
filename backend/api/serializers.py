import re

from rest_framework import serializers

from .models import Contact

PHONE_PATTERN = re.compile(r"^\+[1-9]\d{7,14}$")


class ContactSerializer(serializers.ModelSerializer):
    website = serializers.CharField(required=False, allow_blank=True, write_only=True)
    locale = serializers.CharField(required=False, allow_blank=True, write_only=True, max_length=8)

    class Meta:
        model = Contact
        fields = ["name", "phone", "country", "message", "website", "locale"]

    def validate_name(self, value):
        if len(value.strip()) < 2:
            raise serializers.ValidationError("Укажите корректное имя.")
        return value.strip()

    def validate_phone(self, value):
        cleaned = value.strip().replace(" ", "")
        if not PHONE_PATTERN.match(cleaned):
            raise serializers.ValidationError(
                "Укажите номер в международном формате, например +919876543210."
            )
        return cleaned

    def validate_country(self, value):
        if len(value.strip()) < 2:
            raise serializers.ValidationError("Выберите страну.")
        return value.strip()

    def validate_website(self, value):
        if value:
            raise serializers.ValidationError("Spam detected.")
        return value


class ConsultationSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=120)
    phone = serializers.CharField(max_length=20)
    question = serializers.CharField(max_length=2000)
    country = serializers.CharField(max_length=100, required=False, allow_blank=True)
    website = serializers.CharField(required=False, allow_blank=True, write_only=True)
    locale = serializers.CharField(required=False, allow_blank=True, write_only=True, max_length=8)

    def validate_name(self, value):
        if len(value.strip()) < 2:
            raise serializers.ValidationError("Укажите корректное имя.")
        return value.strip()

    def validate_phone(self, value):
        cleaned = value.strip().replace(" ", "")
        if not PHONE_PATTERN.match(cleaned):
            raise serializers.ValidationError(
                "Укажите номер в международном формате, например +919876543210."
            )
        return cleaned

    def validate_country(self, value):
        cleaned = (value or "").strip()
        return cleaned or "Консультация"

    def validate_question(self, value):
        if len(value.strip()) < 10:
            raise serializers.ValidationError("Опишите ваш вопрос подробнее.")
        return value.strip()

    def validate_website(self, value):
        if value:
            raise serializers.ValidationError("Spam detected.")
        return value
