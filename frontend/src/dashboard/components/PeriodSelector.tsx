import type { Period } from "../api";

const LABELS: Record<Period, string> = {
  hour: "Час",
  day: "День",
  week: "Неделя",
  month: "Месяц",
};

interface PeriodSelectorProps {
  value: Period;
  onChange: (period: Period) => void;
}

export function PeriodSelector({ value, onChange }: PeriodSelectorProps) {
  const periods: Period[] = ["hour", "day", "week", "month"];

  return (
    <div className="flex flex-wrap gap-2">
      {periods.map((period) => (
        <button
          key={period}
          type="button"
          onClick={() => onChange(period)}
          className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
            value === period
              ? "bg-sand/20 text-sand border border-sand/40"
              : "border border-white/10 text-muted hover:border-white/20 hover:text-cream"
          }`}
        >
          {LABELS[period]}
        </button>
      ))}
    </div>
  );
}
