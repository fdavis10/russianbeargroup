import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { TimeseriesPoint } from "../api";

interface TimeseriesChartProps {
  title: string;
  data: TimeseriesPoint[];
  loading: boolean;
  color?: string;
}

function ChartTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { value: number }[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-white/10 bg-bg-card px-3 py-2 text-sm shadow-xl">
      <p className="text-muted">{label}</p>
      <p className="font-semibold text-sand">{payload[0].value}</p>
    </div>
  );
}

export function TimeseriesChart({
  title,
  data,
  loading,
  color = "#c4a35a",
}: TimeseriesChartProps) {
  return (
    <div className="glass-card rounded-2xl p-5 shadow-lg shadow-black/20">
      <h3 className="mb-4 text-base font-semibold text-cream">{title}</h3>
      {loading ? (
        <div className="flex h-64 items-center justify-center text-muted">Загрузка...</div>
      ) : data.length === 0 ? (
        <div className="flex h-64 items-center justify-center text-muted">Нет данных</div>
      ) : (
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
            <XAxis
              dataKey="label"
              tick={{ fill: "#9a9a9a", fontSize: 11 }}
              interval="preserveStartEnd"
            />
            <YAxis tick={{ fill: "#9a9a9a", fontSize: 11 }} allowDecimals={false} />
            <Tooltip content={<ChartTooltip />} cursor={{ fill: "rgba(196,163,90,0.08)" }} />
            <Bar dataKey="value" radius={[6, 6, 0, 0]} animationDuration={600}>
              {data.map((_, index) => (
                <Cell key={index} fill={color} fillOpacity={0.85} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
