from django.contrib import admin

from .models import Contact, TelegramAdmin


@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    list_display = ("name", "phone", "country", "telegram_sent", "created_at")
    list_filter = ("country", "telegram_sent", "created_at")
    search_fields = ("name", "phone", "country")
    readonly_fields = ("created_at",)


@admin.register(TelegramAdmin)
class TelegramAdminAdmin(admin.ModelAdmin):
    list_display = ("chat_id", "username", "first_name", "is_active", "subscribed_at")
    list_filter = ("is_active", "subscribed_at")
    search_fields = ("chat_id", "username", "first_name")
    readonly_fields = ("subscribed_at",)
