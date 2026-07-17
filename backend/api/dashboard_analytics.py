from datetime import timedelta

from django.db.models import Count
from django.db.models.functions import ExtractHour, ExtractWeekDay, TruncDay, TruncHour, TruncMonth, TruncWeek
from django.utils import timezone

from .models import AnalyticsEvent, AnalyticsEventType, Contact

PERIOD_TRUNC = {
    "hour": TruncHour,
    "day": TruncDay,
    "week": TruncWeek,
    "month": TruncMonth,
}

PERIOD_DELTA = {
    "hour": timedelta(hours=24),
    "day": timedelta(days=30),
    "week": timedelta(weeks=12),
    "month": timedelta(days=365),
}

WEEKDAY_LABELS = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"]


def _period_start(period: str):
    return timezone.now() - PERIOD_DELTA.get(period, PERIOD_DELTA["day"])


def _format_bucket(dt, period: str) -> str:
    if period == "hour":
        return dt.strftime("%d.%m %H:00")
    if period == "day":
        return dt.strftime("%d %b").replace(
            "Jan", "янв"
        ).replace("Feb", "фев").replace("Mar", "мар").replace(
            "Apr", "апр"
        ).replace("May", "май").replace("Jun", "июн").replace(
            "Jul", "июл"
        ).replace("Aug", "авг").replace("Sep", "сен").replace(
            "Oct", "окт"
        ).replace("Nov", "ноя").replace("Dec", "дек")
    if period == "week":
        return dt.strftime("%d.%m")
    return dt.strftime("%b %Y").replace(
        "Jan", "Январь"
    ).replace("Feb", "Февраль").replace("Mar", "Март").replace(
        "Apr", "Апрель"
    ).replace("May", "Май").replace("Jun", "Июнь").replace(
        "Jul", "Июль").replace("Aug", "Август").replace("Sep", "Сентябрь").replace(
        "Oct", "Октябрь").replace("Nov", "Ноябрь").replace("Dec", "Декабрь")


def _timeseries(qs, period: str, date_field: str = "created_at"):
    trunc = PERIOD_TRUNC.get(period, TruncDay)
    start = _period_start(period)
    rows = (
        qs.filter(**{f"{date_field}__gte": start})
        .annotate(bucket=trunc(date_field))
        .values("bucket")
        .annotate(count=Count("id"))
        .order_by("bucket")
    )
    return [
        {"label": _format_bucket(row["bucket"], period), "value": row["count"]}
        for row in rows
        if row["bucket"]
    ]


def get_kpi_stats():
    now = timezone.now()
    today_start = now.replace(hour=0, minute=0, second=0, microsecond=0)

    total_clicks = AnalyticsEvent.objects.filter(event_type=AnalyticsEventType.FORM_CLICK).count()
    total_visitors = (
        AnalyticsEvent.objects.filter(event_type=AnalyticsEventType.PAGE_VIEW)
        .exclude(session_id="")
        .values("session_id")
        .distinct()
        .count()
    )
    total_submissions = Contact.objects.count()
    submissions_today = Contact.objects.filter(created_at__gte=today_start).count()
    clicks_today = AnalyticsEvent.objects.filter(
        event_type=AnalyticsEventType.FORM_CLICK,
        created_at__gte=today_start,
    ).count()
    visitors_today = (
        AnalyticsEvent.objects.filter(
            event_type=AnalyticsEventType.PAGE_VIEW,
            created_at__gte=today_start,
        )
        .exclude(session_id="")
        .values("session_id")
        .distinct()
        .count()
    )
    conversion = round((total_submissions / total_clicks * 100), 1) if total_clicks else 0.0

    return {
        "total_clicks": total_clicks,
        "total_visitors": total_visitors,
        "total_submissions": total_submissions,
        "submissions_today": submissions_today,
        "clicks_today": clicks_today,
        "visitors_today": visitors_today,
        "conversion_percent": conversion,
    }


def get_clicks_timeseries(period: str):
    qs = AnalyticsEvent.objects.filter(event_type=AnalyticsEventType.FORM_CLICK)
    return _timeseries(qs, period)


def get_visitors_timeseries(period: str):
    trunc = PERIOD_TRUNC.get(period, TruncDay)
    start = _period_start(period)
    rows = (
        AnalyticsEvent.objects.filter(
            event_type=AnalyticsEventType.PAGE_VIEW,
            created_at__gte=start,
        )
        .exclude(session_id="")
        .annotate(bucket=trunc("created_at"))
        .values("bucket", "session_id")
        .distinct()
    )
    bucket_counts: dict = {}
    for row in rows:
        bucket = row["bucket"]
        if not bucket:
            continue
        bucket_counts[bucket] = bucket_counts.get(bucket, 0) + 1

    return [
        {"label": _format_bucket(bucket, period), "value": count}
        for bucket, count in sorted(bucket_counts.items())
    ]


def get_submissions_timeseries(period: str):
    return _timeseries(Contact.objects.all(), period)


def get_submissions_by_time_of_day():
    rows = (
        Contact.objects.annotate(
            hour=ExtractHour("created_at"),
            weekday=ExtractWeekDay("created_at"),
        )
        .values("hour", "weekday")
        .annotate(count=Count("id"))
        .order_by("weekday", "hour")
    )
    return [
        {
            "hour": row["hour"],
            "weekday": row["weekday"],
            "weekday_label": WEEKDAY_LABELS[row["weekday"] % 7],
            "hour_label": f"{row['hour']:02d}:00",
            "count": row["count"],
        }
        for row in rows
    ]
