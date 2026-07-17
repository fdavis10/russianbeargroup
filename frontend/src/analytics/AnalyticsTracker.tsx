import { useEffect } from "react";
import { trackEvent } from "./track";

export function AnalyticsTracker() {
  useEffect(() => {
    trackEvent("page_view", { page: "home" });
  }, []);

  return null;
}
