from rest_framework.permissions import BasePermission

from .models import DashboardRole, DashboardUser


class IsDashboardUser(BasePermission):
    def has_permission(self, request, view):
        return isinstance(getattr(request, "user", None), DashboardUser)


class HasDashboardRole(BasePermission):
    allowed_roles: set[str] = set()

    def has_permission(self, request, view):
        user = getattr(request, "user", None)
        if not isinstance(user, DashboardUser):
            return False
        return user.role in self.allowed_roles


class CanViewAnalytics(HasDashboardRole):
    allowed_roles = {
        DashboardRole.ADMIN,
        DashboardRole.MANAGER,
        DashboardRole.VIEWER,
    }


class CanManageDashboard(HasDashboardRole):
    allowed_roles = {DashboardRole.ADMIN, DashboardRole.MANAGER}
