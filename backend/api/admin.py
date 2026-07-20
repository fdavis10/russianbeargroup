from django.contrib import admin

from .models import AnalyticsEvent, Contact, DashboardUser, SiteSettings, TelegramAdmin


@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    list_display = ("name", "phone", "country", "telegram_sent", "created_at")
    list_filter = ("country", "telegram_sent", "created_at")
    search_fields = ("name", "phone", "country")
    readonly_fields = ("created_at",)


@admin.register(TelegramAdmin)
class TelegramAdminAdmin(admin.ModelAdmin):
    list_display = ("chat_id", "bot", "username", "first_name", "is_active", "subscribed_at")
    list_filter = ("bot", "is_active", "subscribed_at")
    search_fields = ("chat_id", "username", "first_name")
    readonly_fields = ("subscribed_at",)


@admin.register(SiteSettings)
class SiteSettingsAdmin(admin.ModelAdmin):
    list_display = ("id", "whatsapp_phone", "updated_at")
    readonly_fields = ("updated_at",)


@admin.register(DashboardUser)
class DashboardUserAdmin(admin.ModelAdmin):
    list_display = ("username", "name", "role", "is_active", "created_at")
    list_filter = ("role", "is_active")
    search_fields = ("username", "name")
    readonly_fields = ("created_at",)


@admin.register(AnalyticsEvent)
class AnalyticsEventAdmin(admin.ModelAdmin):
    list_display = ("event_type", "session_id", "created_at")
    list_filter = ("event_type", "created_at")
    search_fields = ("session_id",)
    readonly_fields = ("created_at",)
