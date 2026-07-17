const SESSION_KEY = "rb_session_id";

export function getSessionId(): string {
  let id = sessionStorage.getItem(SESSION_KEY);
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

export async function trackEvent(
  eventType: "page_view" | "form_click" | "form_submit",
  metadata: Record<string, string> = {},
) {
  try {
    const base = import.meta.env.VITE_API_URL ?? "/api";
    await fetch(`${base}/analytics/track/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event_type: eventType,
        session_id: getSessionId(),
        metadata,
      }),
    });
  } catch {
    // analytics must not break the site
  }
}
