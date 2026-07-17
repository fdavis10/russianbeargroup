import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL ?? "/api";
const TOKEN_KEY = "dashboard_token";

export interface DashboardUser {
  id: number;
  username: string;
  name: string;
  role: "admin" | "manager" | "viewer";
  role_label: string;
  created_at: string;
}

export interface KpiStats {
  total_clicks: number;
  total_visitors: number;
  total_submissions: number;
  submissions_today: number;
  clicks_today: number;
  visitors_today: number;
  conversion_percent: number;
  range_from?: string;
  range_to?: string;
}

export interface TimeseriesPoint {
  label: string;
  value: number;
}

export interface HeatmapPoint {
  hour: number;
  weekday: number;
  weekday_label: string;
  hour_label: string;
  count: number;
}

export type Period = "hour" | "day" | "week" | "month";

export interface DateRange {
  from: string;
  to: string;
}

export interface AnalyticsQuery {
  period: Period;
  range?: DateRange | null;
}

const client = axios.create({ baseURL: API_BASE });

client.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

function toParams(query: AnalyticsQuery) {
  const params: Record<string, string> = { period: query.period };
  if (query.range?.from) params.from = query.range.from;
  if (query.range?.to) params.to = query.range.to;
  return params;
}

export function getStoredToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setStoredToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearStoredToken() {
  localStorage.removeItem(TOKEN_KEY);
}

export async function login(username: string, password: string) {
  const { data } = await client.post<{ token: string; user: DashboardUser }>(
    "/dashboard/auth/login/",
    { username, password },
  );
  setStoredToken(data.token);
  return data.user;
}

export async function fetchMe(): Promise<DashboardUser> {
  const { data } = await client.get<DashboardUser>("/dashboard/auth/me/");
  return data;
}

export async function fetchKpi(query: AnalyticsQuery): Promise<KpiStats> {
  const { data } = await client.get<KpiStats>("/dashboard/kpi/", { params: toParams(query) });
  return data;
}

export async function fetchClicks(query: AnalyticsQuery) {
  const { data } = await client.get<{ period: Period; data: TimeseriesPoint[] }>(
    "/dashboard/clicks/",
    { params: toParams(query) },
  );
  return data.data;
}

export async function fetchVisitors(query: AnalyticsQuery) {
  const { data } = await client.get<{ period: Period; data: TimeseriesPoint[] }>(
    "/dashboard/visitors/",
    { params: toParams(query) },
  );
  return data.data;
}

export async function fetchSubmissions(query: AnalyticsQuery) {
  const { data } = await client.get<{ period: Period; data: TimeseriesPoint[] }>(
    "/dashboard/submissions/",
    { params: toParams(query) },
  );
  return data.data;
}

export async function fetchSubmissionsHeatmap(query: AnalyticsQuery): Promise<HeatmapPoint[]> {
  const { data } = await client.get<{ data: HeatmapPoint[] }>("/dashboard/submissions-heatmap/", {
    params: toParams(query),
  });
  return data.data;
}

export async function downloadReport(query: AnalyticsQuery) {
  const { data } = await client.get<Blob>("/dashboard/report/", {
    params: toParams(query),
    responseType: "blob",
  });

  const url = URL.createObjectURL(data);
  const link = document.createElement("a");
  const stamp = new Date().toISOString().slice(0, 16).replace("T", "_").replace(":", "");
  link.href = url;
  link.download = `analytics-report-${stamp}.html`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

/** Convert datetime-local value to ISO-like string for API */
export function localInputToIso(value: string): string {
  if (!value) return "";
  return value.length === 16 ? `${value}:00` : value;
}
