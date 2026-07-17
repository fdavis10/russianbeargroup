import { Download } from "lucide-react";

interface DateRangePickerProps {
  from: string;
  to: string;
  onFromChange: (value: string) => void;
  onToChange: (value: string) => void;
  onApply: () => void;
  onReset: () => void;
  onExport: () => void;
  exporting?: boolean;
  customActive: boolean;
}

export function DateRangePicker({
  from,
  to,
  onFromChange,
  onToChange,
  onApply,
  onReset,
  onExport,
  exporting = false,
  customActive,
}: DateRangePickerProps) {
  const inputClass =
    "rounded-lg border border-white/10 bg-bg px-3 py-2 text-sm text-cream outline-none transition focus:border-sand/50 [color-scheme:dark]";

  return (
    <div className="glass-card rounded-2xl p-4 shadow-lg shadow-black/20">
      <div className="mb-3 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-sm font-semibold text-cream">Произвольный период</h3>
          <p className="text-xs text-muted">
            Укажите точные дату и время — например, с 13.07.2026 16:59 по 17.07.2026 17:00
          </p>
        </div>
        {customActive && (
          <span className="inline-flex w-fit rounded-full border border-sand/30 bg-sand/10 px-2.5 py-1 text-xs font-semibold text-sand">
            Фильтр активен
          </span>
        )}
      </div>

      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:flex-wrap">
        <label className="flex min-w-[12rem] flex-1 flex-col gap-1.5">
          <span className="text-xs text-muted">С</span>
          <input
            type="datetime-local"
            value={from}
            onChange={(e) => onFromChange(e.target.value)}
            className={inputClass}
          />
        </label>
        <label className="flex min-w-[12rem] flex-1 flex-col gap-1.5">
          <span className="text-xs text-muted">По</span>
          <input
            type="datetime-local"
            value={to}
            onChange={(e) => onToChange(e.target.value)}
            className={inputClass}
          />
        </label>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={onApply}
            className="rounded-lg bg-sand px-4 py-2 text-sm font-semibold text-bg transition hover:bg-sand-light"
          >
            Применить
          </button>
          <button
            type="button"
            onClick={onReset}
            className="rounded-lg border border-white/10 px-4 py-2 text-sm text-muted transition hover:border-white/20 hover:text-cream"
          >
            Сбросить
          </button>
          <button
            type="button"
            onClick={onExport}
            disabled={exporting}
            className="inline-flex items-center gap-2 rounded-lg border border-sand/30 bg-sand/10 px-4 py-2 text-sm font-semibold text-sand transition hover:border-sand/50 hover:bg-sand/15 disabled:opacity-60"
          >
            <Download size={16} />
            {exporting ? "Формирование..." : "Скачать HTML-отчёт"}
          </button>
        </div>
      </div>
    </div>
  );
}
