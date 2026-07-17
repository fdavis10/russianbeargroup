from datetime import datetime, timedelta
from html import escape
from json import dumps

from django.db.models import Count, Q
from django.db.models.functions import ExtractHour, ExtractWeekDay, TruncDay, TruncHour, TruncMonth, TruncWeek
from django.utils import timezone
from django.utils.dateparse import parse_datetime

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
VALID_PERIODS = {"hour", "day", "week", "month"}


def parse_iso_datetime(value: str | None):
    if not value:
        return None
    cleaned = value.strip().replace(" ", "T")
    dt = parse_datetime(cleaned)
    if dt is None:
        try:
            dt = datetime.fromisoformat(cleaned)
        except ValueError:
            return None
    if timezone.is_naive(dt):
        dt = timezone.make_aware(dt, timezone.get_current_timezone())
    return dt


def resolve_range(
    period: str = "day",
    date_from: datetime | None = None,
    date_to: datetime | None = None,
) -> tuple[datetime, datetime, str]:
    now = timezone.now()
    end = date_to or now
    start = date_from or (end - PERIOD_DELTA.get(period, PERIOD_DELTA["day"]))
    if start > end:
        start, end = end, start

    granularity = period if period in VALID_PERIODS else "day"
    if date_from or date_to:
        span = end - start
        if span <= timedelta(hours=48):
            granularity = "hour"
        elif span <= timedelta(days=90):
            granularity = "day"
        elif span <= timedelta(days=365):
            granularity = "week"
        else:
            granularity = "month"
        if period in VALID_PERIODS:
            granularity = period

    return start, end, granularity


def _format_bucket(dt, period: str) -> str:
    if period == "hour":
        return dt.strftime("%d.%m %H:00")
    if period == "day":
        return (
            dt.strftime("%d %b")
            .replace("Jan", "янв")
            .replace("Feb", "фев")
            .replace("Mar", "мар")
            .replace("Apr", "апр")
            .replace("May", "май")
            .replace("Jun", "июн")
            .replace("Jul", "июл")
            .replace("Aug", "авг")
            .replace("Sep", "сен")
            .replace("Oct", "окт")
            .replace("Nov", "ноя")
            .replace("Dec", "дек")
        )
    if period == "week":
        return dt.strftime("%d.%m")
    return (
        dt.strftime("%b %Y")
        .replace("Jan", "Январь")
        .replace("Feb", "Февраль")
        .replace("Mar", "Март")
        .replace("Apr", "Апрель")
        .replace("May", "Май")
        .replace("Jun", "Июнь")
        .replace("Jul", "Июль")
        .replace("Aug", "Август")
        .replace("Sep", "Сентябрь")
        .replace("Oct", "Октябрь")
        .replace("Nov", "Ноябрь")
        .replace("Dec", "Декабрь")
    )


def _range_filter(date_field: str, start: datetime, end: datetime) -> Q:
    return Q(**{f"{date_field}__gte": start, f"{date_field}__lte": end})


def _timeseries(qs, period: str, start: datetime, end: datetime, date_field: str = "created_at"):
    trunc = PERIOD_TRUNC.get(period, TruncDay)
    rows = (
        qs.filter(_range_filter(date_field, start, end))
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


def get_kpi_stats(start: datetime | None = None, end: datetime | None = None):
    now = timezone.now()
    end = end or now
    start = start or (end - PERIOD_DELTA["day"])
    today_start = now.replace(hour=0, minute=0, second=0, microsecond=0)

    clicks_qs = AnalyticsEvent.objects.filter(
        event_type=AnalyticsEventType.FORM_CLICK,
        created_at__gte=start,
        created_at__lte=end,
    )
    pageviews_qs = AnalyticsEvent.objects.filter(
        event_type=AnalyticsEventType.PAGE_VIEW,
        created_at__gte=start,
        created_at__lte=end,
    ).exclude(session_id="")
    submissions_qs = Contact.objects.filter(created_at__gte=start, created_at__lte=end)

    total_clicks = clicks_qs.count()
    total_visitors = pageviews_qs.values("session_id").distinct().count()
    total_submissions = submissions_qs.count()
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
        "range_from": start.isoformat(),
        "range_to": end.isoformat(),
    }


def get_clicks_timeseries(period: str, start: datetime | None = None, end: datetime | None = None):
    start, end, granularity = resolve_range(period, start, end)
    qs = AnalyticsEvent.objects.filter(event_type=AnalyticsEventType.FORM_CLICK)
    return granularity, _timeseries(qs, granularity, start, end)


def get_visitors_timeseries(period: str, start: datetime | None = None, end: datetime | None = None):
    start, end, granularity = resolve_range(period, start, end)
    trunc = PERIOD_TRUNC.get(granularity, TruncDay)
    rows = (
        AnalyticsEvent.objects.filter(
            event_type=AnalyticsEventType.PAGE_VIEW,
            created_at__gte=start,
            created_at__lte=end,
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

    data = [
        {"label": _format_bucket(bucket, granularity), "value": count}
        for bucket, count in sorted(bucket_counts.items())
    ]
    return granularity, data


def get_submissions_timeseries(period: str, start: datetime | None = None, end: datetime | None = None):
    start, end, granularity = resolve_range(period, start, end)
    return granularity, _timeseries(Contact.objects.all(), granularity, start, end)


def get_submissions_by_time_of_day(start: datetime | None = None, end: datetime | None = None):
    qs = Contact.objects.all()
    if start and end:
        qs = qs.filter(created_at__gte=start, created_at__lte=end)
    rows = (
        qs.annotate(
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


def format_range_label(start: datetime, end: datetime) -> str:
    tz = timezone.get_current_timezone()
    local_start = timezone.localtime(start, tz)
    local_end = timezone.localtime(end, tz)
    return f"{local_start.strftime('%d.%m.%Y %H:%M')} — {local_end.strftime('%d.%m.%Y %H:%M')}"


def build_report_html(
    period: str = "day",
    date_from: datetime | None = None,
    date_to: datetime | None = None,
) -> str:
    start, end, granularity = resolve_range(period, date_from, date_to)
    kpi = get_kpi_stats(start, end)
    _, clicks = get_clicks_timeseries(granularity, start, end)
    _, visitors = get_visitors_timeseries(granularity, start, end)
    _, submissions = get_submissions_timeseries(granularity, start, end)
    heatmap = get_submissions_by_time_of_day(start, end)

    by_hour = []
    for hour in range(24):
        total = sum(item["count"] for item in heatmap if item["hour"] == hour)
        by_hour.append({"label": f"{hour:02d}:00", "value": total})

    range_label = format_range_label(start, end)
    generated_at = timezone.localtime().strftime("%d.%m.%Y %H:%M")

    def chart_payload(points):
        return {
            "labels": [p["label"] for p in points],
            "values": [p["value"] for p in points],
        }

    payload = {
        "clicks": chart_payload(clicks),
        "visitors": chart_payload(visitors),
        "submissions": chart_payload(submissions),
        "hours": chart_payload(by_hour),
    }

    return f"""<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Отчёт аналитики — IRC Russian Bear</title>
  <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js"></script>
  <style>
    :root {{
      --bg: #0a0a0a;
      --card: #141414;
      --border: rgba(255,255,255,0.1);
      --sand: #c4a35a;
      --cream: #f0ece4;
      --muted: #9a9a9a;
    }}
    * {{ box-sizing: border-box; }}
    body {{
      margin: 0;
      font-family: Montserrat, Segoe UI, system-ui, sans-serif;
      background: linear-gradient(160deg, #161616 0%, #0a0a0a 45%, #050505 100%);
      color: var(--cream);
      min-height: 100vh;
      padding: 32px 20px 48px;
    }}
    .wrap {{ max-width: 1100px; margin: 0 auto; }}
    header {{
      border: 1px solid var(--border);
      background: rgba(20,20,20,0.9);
      border-radius: 20px;
      padding: 28px;
      margin-bottom: 24px;
    }}
    h1 {{ margin: 0 0 8px; color: var(--sand); font-size: 28px; }}
    .meta {{ color: var(--muted); font-size: 14px; line-height: 1.6; }}
    .kpi {{
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 14px;
      margin-bottom: 24px;
    }}
    .card {{
      border: 1px solid var(--border);
      background: var(--card);
      border-radius: 18px;
      padding: 18px;
    }}
    .card h3 {{ margin: 0 0 8px; font-size: 13px; color: var(--muted); font-weight: 600; }}
    .card .value {{ font-size: 30px; font-weight: 800; color: var(--cream); }}
    .grid {{
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 16px;
    }}
    .chart-card h3 {{
      margin: 0 0 16px;
      font-size: 16px;
      color: var(--cream);
    }}
    canvas {{ width: 100% !important; max-height: 280px; }}
    footer {{
      margin-top: 28px;
      text-align: center;
      color: var(--muted);
      font-size: 12px;
    }}
    @media print {{
      body {{ background: #fff; color: #111; padding: 12px; }}
      header, .card {{ border-color: #ddd; background: #fff; }}
      h1, .card .value {{ color: #111; }}
      .meta, .card h3, footer {{ color: #666; }}
    }}
  </style>
</head>
<body>
  <div class="wrap">
    <header>
      <h1>Отчёт аналитики IRC «Russian Bear»</h1>
      <div class="meta">
        Период: <strong>{escape(range_label)}</strong><br />
        Детализация: <strong>{escape(granularity)}</strong><br />
        Сформирован: {escape(generated_at)}
      </div>
    </header>

    <section class="kpi">
      <div class="card"><h3>Заявки</h3><div class="value">{kpi["total_submissions"]}</div></div>
      <div class="card"><h3>Посетители</h3><div class="value">{kpi["total_visitors"]}</div></div>
      <div class="card"><h3>Клики по форме</h3><div class="value">{kpi["total_clicks"]}</div></div>
      <div class="card"><h3>Конверсия</h3><div class="value">{kpi["conversion_percent"]}%</div></div>
    </section>

    <section class="grid">
      <div class="card chart-card"><h3>Клики по форме</h3><canvas id="clicksChart"></canvas></div>
      <div class="card chart-card"><h3>Посетители</h3><canvas id="visitorsChart"></canvas></div>
      <div class="card chart-card"><h3>Заявки</h3><canvas id="submissionsChart"></canvas></div>
      <div class="card chart-card"><h3>Заявки по времени суток</h3><canvas id="hoursChart"></canvas></div>
    </section>

    <footer>IRC «Russian Bear» · внутренний отчёт аналитики</footer>
  </div>

  <script>
    const DATA = {dumps(payload, ensure_ascii=False)};
    const sand = "#c4a35a";
    const blue = "#7eb8da";
    const green = "#8bc48a";
    const muted = "#9a9a9a";

    function makeBar(id, labels, values, color) {{
      const ctx = document.getElementById(id);
      if (!ctx) return;
      new Chart(ctx, {{
        type: "bar",
        data: {{
          labels,
          datasets: [{{
            data: values,
            backgroundColor: color + "d9",
            borderRadius: 6,
            maxBarThickness: 42,
          }}],
        }},
        options: {{
          responsive: true,
          plugins: {{ legend: {{ display: false }} }},
          scales: {{
            x: {{ ticks: {{ color: muted, maxRotation: 45, minRotation: 0 }}, grid: {{ color: "rgba(255,255,255,0.06)" }} }},
            y: {{ beginAtZero: true, ticks: {{ color: muted, precision: 0 }}, grid: {{ color: "rgba(255,255,255,0.06)" }} }},
          }},
        }},
      }});
    }}

    makeBar("clicksChart", DATA.clicks.labels, DATA.clicks.values, sand);
    makeBar("visitorsChart", DATA.visitors.labels, DATA.visitors.values, blue);
    makeBar("submissionsChart", DATA.submissions.labels, DATA.submissions.values, green);
    makeBar("hoursChart", DATA.hours.labels, DATA.hours.values, sand);
  </script>
</body>
</html>
"""
