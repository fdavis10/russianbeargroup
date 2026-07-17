import { LogOut } from "lucide-react";
import { useAuth } from "../AuthContext";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-cream">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-bg/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
          <div>
            <h1 className="text-lg font-bold text-sand">Аналитика сайта</h1>
            <p className="text-xs text-muted">IRC «Russian Bear»</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-medium text-cream">{user?.name}</p>
              <p className="text-xs text-muted">{user?.role_label}</p>
            </div>
            <button
              type="button"
              onClick={logout}
              className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-sm text-muted transition hover:border-sand/30 hover:text-sand"
            >
              <LogOut size={16} />
              Выйти
            </button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">{children}</main>
    </div>
  );
}
