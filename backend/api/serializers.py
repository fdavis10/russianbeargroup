import re

from rest_framework import serializers

from .models import Contact

PHONE_PATTERN = re.compile(r"^\+?[\d\s\-()]{10,20}$")


class ContactSerializer(serializers.ModelSerializer):
    website = serializers.CharField(required=False, allow_blank=True, write_only=True)

    class Meta:
        model = Contact
        fields = ["name", "phone", "country", "message", "website"]

    def validate_name(self, value):
        if len(value.strip()) < 2:
            raise serializers.ValidationError("Укажите корректное имя.")
        return value.strip()

    def validate_phone(self, value):
        cleaned = value.strip()
        if not PHONE_PATTERN.match(cleaned):
            raise serializers.ValidationError("Укажите корректный номер телефона.")
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
    website = serializers.CharField(required=False, allow_blank=True, write_only=True)

    def validate_name(self, value):
        if len(value.strip()) < 2:
            raise serializers.ValidationError("Укажите корректное имя.")
        return value.strip()

    def validate_phone(self, value):
        cleaned = value.strip()
        if not PHONE_PATTERN.match(cleaned):
            raise serializers.ValidationError("Укажите корректный номер телефона.")
        return cleaned

    def validate_question(self, value):
        if len(value.strip()) < 10:
            raise serializers.ValidationError("Опишите ваш вопрос подробнее.")
        return value.strip()

    def validate_website(self, value):
        if value:
            raise serializers.ValidationError("Spam detected.")
        return value
