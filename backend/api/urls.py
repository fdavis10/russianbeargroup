from django.urls import path

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
]
