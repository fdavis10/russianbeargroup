from rest_framework import serializers

from .models import AnalyticsEventType, DashboardRole, DashboardUser


class DashboardLoginSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=150)
    password = serializers.CharField(max_length=128, write_only=True)


class DashboardUserSerializer(serializers.ModelSerializer):
    role_label = serializers.CharField(source="get_role_display", read_only=True)

    class Meta:
        model = DashboardUser
        fields = ("id", "username", "name", "role", "role_label", "created_at")


class AnalyticsTrackSerializer(serializers.Serializer):
    event_type = serializers.ChoiceField(choices=AnalyticsEventType.choices)
    session_id = serializers.CharField(max_length=64, required=False, allow_blank=True, default="")
    metadata = serializers.JSONField(required=False, default=dict)
