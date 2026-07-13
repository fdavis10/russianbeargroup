export type LeadSource = "application" | "consultation";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

/** Fires after a form is successfully saved on the server (not on button click). */
export function trackLead(source: LeadSource) {
  window.fbq?.("track", "Lead", { content_name: source });
}
