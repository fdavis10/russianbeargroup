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

const client = axios.create({ baseURL: API_BASE });

client.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

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

export async function fetchKpi(): Promise<KpiStats> {
  const { data } = await client.get<KpiStats>("/dashboard/kpi/");
  return data;
}

export async function fetchClicks(period: Period) {
  const { data } = await client.get<{ period: Period; data: TimeseriesPoint[] }>(
    "/dashboard/clicks/",
    { params: { period } },
  );
  return data.data;
}

export async function fetchVisitors(period: Period) {
  const { data } = await client.get<{ period: Period; data: TimeseriesPoint[] }>(
    "/dashboard/visitors/",
    { params: { period } },
  );
  return data.data;
}

export async function fetchSubmissions(period: Period) {
  const { data } = await client.get<{ period: Period; data: TimeseriesPoint[] }>(
    "/dashboard/submissions/",
    { params: { period } },
  );
  return data.data;
}

export async function fetchSubmissionsHeatmap(): Promise<HeatmapPoint[]> {
  const { data } = await client.get<{ data: HeatmapPoint[] }>(
    "/dashboard/submissions-heatmap/",
  );
  return data.data;
}
