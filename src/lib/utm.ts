export type UTMs = {
  source?: string;
  medium?: string;
  campaign?: string;
};

export function getCurrentUTMs(): UTMs {
  if (typeof window === "undefined") return {};
  const url = new URL(window.location.href);
  return {
    source: url.searchParams.get("utm_source") || undefined,
    medium: url.searchParams.get("utm_medium") || undefined,
    campaign: url.searchParams.get("utm_campaign") || undefined,
  };
}

export function saveUTMsToLocalStorage(utms: UTMs) {
  if (typeof window === "undefined") return;
  localStorage.setItem("utm_data", JSON.stringify(utms));
}

export function getSavedUTMs(): UTMs {
  if (typeof window === "undefined") return {};
  const stored = localStorage.getItem("utm_data");
  return stored ? JSON.parse(stored) : {};
}

export function getLastTouchUTMs(): UTMs {
  const current = getCurrentUTMs();
  if (current.source || current.medium || current.campaign) {
    saveUTMsToLocalStorage(current);
    return current;
  }
  return getSavedUTMs();
}
