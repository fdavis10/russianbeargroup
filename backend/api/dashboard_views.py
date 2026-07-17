from django.http import HttpResponse
from rest_framework import status
from rest_framework.response import Response
from rest_framework.throttling import AnonRateThrottle
from rest_framework.views import APIView

from .dashboard_analytics import (
    VALID_PERIODS,
    build_report_html,
    format_range_label,
    get_clicks_timeseries,
    get_kpi_stats,
    get_submissions_by_time_of_day,
    get_submissions_timeseries,
    get_visitors_timeseries,
    parse_iso_datetime,
    resolve_range,
)
from .dashboard_auth import DashboardJWTAuthentication, create_access_token
from .dashboard_permissions import CanViewAnalytics, IsDashboardUser
from .dashboard_serializers import (
    AnalyticsTrackSerializer,
    DashboardLoginSerializer,
    DashboardUserSerializer,
)
from .models import AnalyticsEvent, DashboardUser


class AnalyticsTrackThrottle(AnonRateThrottle):
    scope = "analytics"


def _parse_period(request) -> str:
    period = request.query_params.get("period", "day")
    return period if period in VALID_PERIODS else "day"


def _parse_range(request):
    date_from = parse_iso_datetime(request.query_params.get("from"))
    date_to = parse_iso_datetime(request.query_params.get("to"))
    period = _parse_period(request)

    raw_from = request.query_params.get("from")
    raw_to = request.query_params.get("to")
    if raw_from and date_from is None:
        return None, None, period, "Некорректная дата начала (from)."
    if raw_to and date_to is None:
        return None, None, period, "Некорректная дата окончания (to)."
    if date_from and date_to and date_from > date_to:
        return None, None, period, "Дата начала не может быть позже даты окончания."

    start, end, granularity = resolve_range(period, date_from, date_to)
    return start, end, granularity, None


class DashboardLoginView(APIView):
    authentication_classes = []
    permission_classes = []

    def post(self, request):
        serializer = DashboardLoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        username = serializer.validated_data["username"]
        password = serializer.validated_data["password"]

        try:
            user = DashboardUser.objects.get(username=username, is_active=True)
        except DashboardUser.DoesNotExist:
            return Response(
                {"detail": "Неверный логин или пароль."},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        if not user.check_password(password):
            return Response(
                {"detail": "Неверный логин или пароль."},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        token = create_access_token(user)
        return Response(
            {
                "token": token,
                "user": DashboardUserSerializer(user).data,
            }
        )


class DashboardMeView(APIView):
    authentication_classes = [DashboardJWTAuthentication]
    permission_classes = [IsDashboardUser]

    def get(self, request):
        return Response(DashboardUserSerializer(request.user).data)


class AnalyticsTrackView(APIView):
    authentication_classes = []
    permission_classes = []
    throttle_classes = [AnalyticsTrackThrottle]

    def post(self, request):
        serializer = AnalyticsTrackSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data

        AnalyticsEvent.objects.create(
            event_type=data["event_type"],
            session_id=data.get("session_id", ""),
            metadata=data.get("metadata", {}),
        )
        return Response({"status": "ok"}, status=status.HTTP_201_CREATED)


class DashboardKpiView(APIView):
    authentication_classes = [DashboardJWTAuthentication]
    permission_classes = [IsDashboardUser, CanViewAnalytics]

    def get(self, request):
        start, end, _granularity, error = _parse_range(request)
        if error:
            return Response({"detail": error}, status=status.HTTP_400_BAD_REQUEST)
        return Response(get_kpi_stats(start, end))


class DashboardClicksView(APIView):
    authentication_classes = [DashboardJWTAuthentication]
    permission_classes = [IsDashboardUser, CanViewAnalytics]

    def get(self, request):
        start, end, granularity, error = _parse_range(request)
        if error:
            return Response({"detail": error}, status=status.HTTP_400_BAD_REQUEST)
        used, data = get_clicks_timeseries(granularity, start, end)
        return Response(
            {
                "period": used,
                "from": start.isoformat(),
                "to": end.isoformat(),
                "data": data,
            }
        )


class DashboardVisitorsView(APIView):
    authentication_classes = [DashboardJWTAuthentication]
    permission_classes = [IsDashboardUser, CanViewAnalytics]

    def get(self, request):
        start, end, granularity, error = _parse_range(request)
        if error:
            return Response({"detail": error}, status=status.HTTP_400_BAD_REQUEST)
        used, data = get_visitors_timeseries(granularity, start, end)
        return Response(
            {
                "period": used,
                "from": start.isoformat(),
                "to": end.isoformat(),
                "data": data,
            }
        )


class DashboardSubmissionsView(APIView):
    authentication_classes = [DashboardJWTAuthentication]
    permission_classes = [IsDashboardUser, CanViewAnalytics]

    def get(self, request):
        start, end, granularity, error = _parse_range(request)
        if error:
            return Response({"detail": error}, status=status.HTTP_400_BAD_REQUEST)
        used, data = get_submissions_timeseries(granularity, start, end)
        return Response(
            {
                "period": used,
                "from": start.isoformat(),
                "to": end.isoformat(),
                "data": data,
            }
        )


class DashboardSubmissionsHeatmapView(APIView):
    authentication_classes = [DashboardJWTAuthentication]
    permission_classes = [IsDashboardUser, CanViewAnalytics]

    def get(self, request):
        start, end, _granularity, error = _parse_range(request)
        if error:
            return Response({"detail": error}, status=status.HTTP_400_BAD_REQUEST)
        return Response(
            {
                "from": start.isoformat(),
                "to": end.isoformat(),
                "data": get_submissions_by_time_of_day(start, end),
            }
        )


class DashboardReportView(APIView):
    authentication_classes = [DashboardJWTAuthentication]
    permission_classes = [IsDashboardUser, CanViewAnalytics]

    def get(self, request):
        start, end, granularity, error = _parse_range(request)
        if error:
            return Response({"detail": error}, status=status.HTTP_400_BAD_REQUEST)

        html = build_report_html(granularity, start, end)
        filename = f"analytics-report-{start.strftime('%Y%m%d-%H%M')}-{end.strftime('%Y%m%d-%H%M')}.html"
        response = HttpResponse(html, content_type="text/html; charset=utf-8")
        response["Content-Disposition"] = f'attachment; filename="{filename}"'
        response["X-Report-Range"] = format_range_label(start, end)
        return response
