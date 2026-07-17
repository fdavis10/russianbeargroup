import { useCallback, useEffect, useMemo, useState } from "react";
import { DashboardLayout } from "../components/DashboardLayout";
import { DateRangePicker } from "../components/DateRangePicker";
import { KpiCards } from "../components/KpiCards";
import { PeriodSelector } from "../components/PeriodSelector";
import { SubmissionsHeatmap } from "../components/SubmissionsHeatmap";
import { TimeseriesChart } from "../components/TimeseriesChart";
import {
  downloadReport,
  fetchClicks,
  fetchKpi,
  fetchSubmissions,
  fetchSubmissionsHeatmap,
  fetchVisitors,
  localInputToIso,
  type AnalyticsQuery,
  type DateRange,
  type KpiStats,
  type Period,
  type TimeseriesPoint,
} from "../api";

function toLocalInputValue(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function formatRangeLabel(fromIso: string, toIso: string): string {
  const format = (value: string) => {
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return value;
    return d.toLocaleString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  return `${format(fromIso)} — ${format(toIso)}`;
}

export function DashboardPage() {
  const [period, setPeriod] = useState<Period>("day");
  const [draftFrom, setDraftFrom] = useState("");
  const [draftTo, setDraftTo] = useState("");
  const [appliedRange, setAppliedRange] = useState<DateRange | null>(null);
  const [rangeError, setRangeError] = useState("");

  const [kpi, setKpi] = useState<KpiStats | null>(null);
  const [clicks, setClicks] = useState<TimeseriesPoint[]>([]);
  const [visitors, setVisitors] = useState<TimeseriesPoint[]>([]);
  const [submissions, setSubmissions] = useState<TimeseriesPoint[]>([]);
  const [heatmap, setHeatmap] = useState<Awaited<ReturnType<typeof fetchSubmissionsHeatmap>>>([]);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);

  const query = useMemo<AnalyticsQuery>(
    () => ({ period, range: appliedRange }),
    [period, appliedRange],
  );

  const rangeLabel = useMemo(() => {
    if (appliedRange) return formatRangeLabel(appliedRange.from, appliedRange.to);
    if (kpi?.range_from && kpi?.range_to) return formatRangeLabel(kpi.range_from, kpi.range_to);
    return null;
  }, [appliedRange, kpi]);

  const loadAll = useCallback(async (q: AnalyticsQuery) => {
    setLoading(true);
    try {
      const [k, c, v, s, h] = await Promise.all([
        fetchKpi(q),
        fetchClicks(q),
        fetchVisitors(q),
        fetchSubmissions(q),
        fetchSubmissionsHeatmap(q),
      ]);
      setKpi(k);
      setClicks(c);
      setVisitors(v);
      setSubmissions(s);
      setHeatmap(h);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAll(query);
  }, [query, loadAll]);

  function handleApplyRange() {
    setRangeError("");
    if (!draftFrom || !draftTo) {
      setRangeError("Укажите дату и время начала и окончания.");
      return;
    }
    const from = localInputToIso(draftFrom);
    const to = localInputToIso(draftTo);
    if (new Date(from) > new Date(to)) {
      setRangeError("Дата начала не может быть позже даты окончания.");
      return;
    }
    setAppliedRange({ from, to });
  }

  function handleResetRange() {
    setDraftFrom("");
    setDraftTo("");
    setAppliedRange(null);
    setRangeError("");
  }

  function handlePeriodChange(next: Period) {
    setPeriod(next);
  }

  async function handleExport() {
    setExporting(true);
    try {
      await downloadReport(query);
    } catch {
      setRangeError("Не удалось скачать отчёт. Попробуйте ещё раз.");
    } finally {
      setExporting(false);
    }
  }

  useEffect(() => {
    if (draftFrom || draftTo) return;
    const end = new Date();
    const start = new Date(end.getTime() - 4 * 24 * 60 * 60 * 1000);
    setDraftFrom(toLocalInputValue(start));
    setDraftTo(toLocalInputValue(end));
  }, [draftFrom, draftTo]);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <section className="space-y-3">
          <DateRangePicker
            from={draftFrom}
            to={draftTo}
            onFromChange={setDraftFrom}
            onToChange={setDraftTo}
            onApply={handleApplyRange}
            onReset={handleResetRange}
            onExport={handleExport}
            exporting={exporting}
            customActive={Boolean(appliedRange)}
          />
          {rangeError && (
            <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">
              {rangeError}
            </p>
          )}
        </section>

        <section>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted">
            Ключевые показатели
          </h2>
          <KpiCards stats={kpi} loading={loading} rangeLabel={rangeLabel} />
        </section>

        <section>
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted">
              Динамика
            </h2>
            <PeriodSelector value={period} onChange={handlePeriodChange} />
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <TimeseriesChart
              title="Клики по форме"
              data={clicks}
              loading={loading}
              color="#c4a35a"
            />
            <TimeseriesChart
              title="Посетители"
              data={visitors}
              loading={loading}
              color="#7eb8da"
            />
            <TimeseriesChart
              title="Заявки"
              data={submissions}
              loading={loading}
              color="#8bc48a"
            />
            <SubmissionsHeatmap data={heatmap} loading={loading} />
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}
