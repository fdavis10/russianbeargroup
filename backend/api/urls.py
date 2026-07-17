from django.urls import path

from .dashboard_views import (
    AnalyticsTrackView,
    DashboardClicksView,
    DashboardKpiView,
    DashboardLoginView,
    DashboardMeView,
    DashboardReportView,
    DashboardSubmissionsHeatmapView,
    DashboardSubmissionsView,
    DashboardVisitorsView,
)
from .views import (
    ConsultationView,
    ContactView,
    DocumentDetailView,
    DocumentsListView,
    LandingContentView,
)

urlpatterns = [
    path("content/", LandingContentView.as_view(), name="landing-content"),
    path("contact/", ContactView.as_view(), name="contact"),
    path("consultation/", ConsultationView.as_view(), name="consultation"),
    path("documents/", DocumentsListView.as_view(), name="documents-list"),
    path("documents/<str:doc_id>/", DocumentDetailView.as_view(), name="document-detail"),
    path("analytics/track/", AnalyticsTrackView.as_view(), name="analytics-track"),
    path("dashboard/auth/login/", DashboardLoginView.as_view(), name="dashboard-login"),
    path("dashboard/auth/me/", DashboardMeView.as_view(), name="dashboard-me"),
    path("dashboard/kpi/", DashboardKpiView.as_view(), name="dashboard-kpi"),
    path("dashboard/clicks/", DashboardClicksView.as_view(), name="dashboard-clicks"),
    path("dashboard/visitors/", DashboardVisitorsView.as_view(), name="dashboard-visitors"),
    path("dashboard/submissions/", DashboardSubmissionsView.as_view(), name="dashboard-submissions"),
    path(
        "dashboard/submissions-heatmap/",
        DashboardSubmissionsHeatmapView.as_view(),
        name="dashboard-submissions-heatmap",
    ),
    path("dashboard/report/", DashboardReportView.as_view(), name="dashboard-report"),
]
