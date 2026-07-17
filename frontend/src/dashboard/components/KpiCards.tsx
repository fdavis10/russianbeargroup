import type { KpiStats } from "../api";
import { BarChart3, MousePointerClick, Send, TrendingUp, Users } from "lucide-react";

interface KpiCardsProps {
  stats: KpiStats | null;
  loading: boolean;
  rangeLabel?: string | null;
}

const cards = [
  { key: "total_submissions" as const, label: "Заявки", icon: Send, todayKey: "submissions_today" as const },
  { key: "total_visitors" as const, label: "Посетители", icon: Users, todayKey: "visitors_today" as const },
  { key: "total_clicks" as const, label: "Клики по форме", icon: MousePointerClick, todayKey: "clicks_today" as const },
  { key: "conversion_percent" as const, label: "Конверсия", icon: TrendingUp, suffix: "%", todayKey: null },
];

export function KpiCards({ stats, loading, rangeLabel }: KpiCardsProps) {
  return (
    <div className="space-y-3">
      {rangeLabel && (
        <p className="text-xs text-muted">
          Показатели за период: <span className="text-sand">{rangeLabel}</span>
        </p>
      )}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map(({ key, label, icon: Icon, suffix = "", todayKey }) => (
          <div
            key={key}
            className="glass-card rounded-2xl p-5 shadow-lg shadow-black/20 transition hover:border-sand/20"
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm text-muted">{label}</span>
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-sand/10 text-sand">
                <Icon size={18} />
              </span>
            </div>
            <p className="text-3xl font-bold text-cream transition-all duration-300">
              {loading || !stats ? "—" : `${stats[key]}${suffix}`}
            </p>
            {todayKey && stats && (
              <p className="mt-2 text-xs text-muted">
                Сегодня: <span className="text-sand">{stats[todayKey]}</span>
              </p>
            )}
            {key === "conversion_percent" && stats && (
              <p className="mt-2 flex items-center gap-1 text-xs text-muted">
                <BarChart3 size={12} /> заявки / клики за период
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
