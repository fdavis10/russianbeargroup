import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { HeatmapPoint } from "../api";

interface SubmissionsHeatmapProps {
  data: HeatmapPoint[];
  loading: boolean;
}

export function SubmissionsHeatmap({ data, loading }: SubmissionsHeatmapProps) {
  const byHour = Array.from({ length: 24 }, (_, hour) => {
    const total = data.filter((d) => d.hour === hour).reduce((s, d) => s + d.count, 0);
    return { hour_label: `${hour.toString().padStart(2, "0")}:00`, count: total };
  });

  return (
    <div className="glass-card rounded-2xl p-5 shadow-lg shadow-black/20">
      <h3 className="mb-1 text-base font-semibold text-cream">
        Заявки по времени суток
      </h3>
      <p className="mb-4 text-xs text-muted">Распределение по часам (все дни)</p>
      {loading ? (
        <div className="flex h-64 items-center justify-center text-muted">Загрузка...</div>
      ) : (
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={byHour} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
            <XAxis
              dataKey="hour_label"
              tick={{ fill: "#9a9a9a", fontSize: 10 }}
              interval={2}
            />
            <YAxis tick={{ fill: "#9a9a9a", fontSize: 11 }} allowDecimals={false} />
            <Tooltip
              content={({ active, payload, label }) =>
                active && payload?.length ? (
                  <div className="rounded-lg border border-white/10 bg-bg-card px-3 py-2 text-sm">
                    <p className="text-muted">{label}</p>
                    <p className="font-semibold text-sand">{payload[0].value} заявок</p>
                  </div>
                ) : null
              }
              cursor={{ fill: "rgba(196,163,90,0.08)" }}
            />
            <Bar dataKey="count" fill="#c4a35a" fillOpacity={0.85} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
