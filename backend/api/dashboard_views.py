from rest_framework import status
from rest_framework.response import Response
from rest_framework.throttling import AnonRateThrottle
from rest_framework.views import APIView

from .dashboard_analytics import (
    get_clicks_timeseries,
    get_kpi_stats,
    get_submissions_by_time_of_day,
    get_submissions_timeseries,
    get_visitors_timeseries,
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
        return Response(get_kpi_stats())


class DashboardClicksView(APIView):
    authentication_classes = [DashboardJWTAuthentication]
    permission_classes = [IsDashboardUser, CanViewAnalytics]

    def get(self, request):
        period = request.query_params.get("period", "day")
        if period not in {"hour", "day", "week", "month"}:
            period = "day"
        return Response({"period": period, "data": get_clicks_timeseries(period)})


class DashboardVisitorsView(APIView):
    authentication_classes = [DashboardJWTAuthentication]
    permission_classes = [IsDashboardUser, CanViewAnalytics]

    def get(self, request):
        period = request.query_params.get("period", "day")
        if period not in {"hour", "day", "week", "month"}:
            period = "day"
        return Response({"period": period, "data": get_visitors_timeseries(period)})


class DashboardSubmissionsView(APIView):
    authentication_classes = [DashboardJWTAuthentication]
    permission_classes = [IsDashboardUser, CanViewAnalytics]

    def get(self, request):
        period = request.query_params.get("period", "day")
        if period not in {"hour", "day", "week", "month"}:
            period = "day"
        return Response({"period": period, "data": get_submissions_timeseries(period)})


class DashboardSubmissionsHeatmapView(APIView):
    authentication_classes = [DashboardJWTAuthentication]
    permission_classes = [IsDashboardUser, CanViewAnalytics]

    def get(self, request):
        return Response({"data": get_submissions_by_time_of_day()})
