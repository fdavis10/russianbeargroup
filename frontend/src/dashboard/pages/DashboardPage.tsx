import { useCallback, useEffect, useState } from "react";
import { DashboardLayout } from "../components/DashboardLayout";
import { KpiCards } from "../components/KpiCards";
import { PeriodSelector } from "../components/PeriodSelector";
import { SubmissionsHeatmap } from "../components/SubmissionsHeatmap";
import { TimeseriesChart } from "../components/TimeseriesChart";
import {
  fetchClicks,
  fetchKpi,
  fetchSubmissions,
  fetchSubmissionsHeatmap,
  fetchVisitors,
  type KpiStats,
  type Period,
  type TimeseriesPoint,
} from "../api";

export function DashboardPage() {
  const [period, setPeriod] = useState<Period>("day");
  const [kpi, setKpi] = useState<KpiStats | null>(null);
  const [clicks, setClicks] = useState<TimeseriesPoint[]>([]);
  const [visitors, setVisitors] = useState<TimeseriesPoint[]>([]);
  const [submissions, setSubmissions] = useState<TimeseriesPoint[]>([]);
  const [heatmap, setHeatmap] = useState<Awaited<ReturnType<typeof fetchSubmissionsHeatmap>>>([]);
  const [loadingKpi, setLoadingKpi] = useState(true);
  const [loadingCharts, setLoadingCharts] = useState(true);
  const [loadingHeatmap, setLoadingHeatmap] = useState(true);

  const loadKpi = useCallback(async () => {
    setLoadingKpi(true);
    try {
      setKpi(await fetchKpi());
    } finally {
      setLoadingKpi(false);
    }
  }, []);

  const loadCharts = useCallback(async (p: Period) => {
    setLoadingCharts(true);
    try {
      const [c, v, s] = await Promise.all([
        fetchClicks(p),
        fetchVisitors(p),
        fetchSubmissions(p),
      ]);
      setClicks(c);
      setVisitors(v);
      setSubmissions(s);
    } finally {
      setLoadingCharts(false);
    }
  }, []);

  const loadHeatmap = useCallback(async () => {
    setLoadingHeatmap(true);
    try {
      setHeatmap(await fetchSubmissionsHeatmap());
    } finally {
      setLoadingHeatmap(false);
    }
  }, []);

  useEffect(() => {
    loadKpi();
    loadHeatmap();
  }, [loadKpi, loadHeatmap]);

  useEffect(() => {
    loadCharts(period);
  }, [period, loadCharts]);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <section>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted">
            Ключевые показатели
          </h2>
          <KpiCards stats={kpi} loading={loadingKpi} />
        </section>

        <section>
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted">
              Динамика
            </h2>
            <PeriodSelector value={period} onChange={setPeriod} />
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <TimeseriesChart
              title="Клики по форме"
              data={clicks}
              loading={loadingCharts}
              color="#c4a35a"
            />
            <TimeseriesChart
              title="Посетители"
              data={visitors}
              loading={loadingCharts}
              color="#7eb8da"
            />
            <TimeseriesChart
              title="Заявки"
              data={submissions}
              loading={loadingCharts}
              color="#8bc48a"
            />
            <SubmissionsHeatmap data={heatmap} loading={loadingHeatmap} />
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}
