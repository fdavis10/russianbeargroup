from asgiref.sync import sync_to_async
from django.db.models import Count, Q

from api.models import Contact

SEARCH_RESULT_LIMIT = 20


@sync_to_async
def count_contacts() -> int:
    return Contact.objects.count()


@sync_to_async
def search_contacts(query: str, limit: int = SEARCH_RESULT_LIMIT) -> list[Contact]:
    term = query.strip()
    if not term:
        return []

    return list(
        Contact.objects.filter(
            Q(name__icontains=term)
            | Q(phone__icontains=term)
            | Q(country__icontains=term)
            | Q(message__icontains=term)
        ).order_by("-created_at")[:limit]
    )


@sync_to_async
def get_distinct_countries() -> list[str]:
    return list(
        Contact.objects.order_by("country")
        .values_list("country", flat=True)
        .distinct()
    )


@sync_to_async
def get_country_stats() -> list[dict[str, int | str]]:
    return list(
        Contact.objects.values("country")
        .annotate(count=Count("id"))
        .order_by("-count", "country")
    )


@sync_to_async
def count_by_country(country: str) -> int:
    return Contact.objects.filter(country__iexact=country).count()
