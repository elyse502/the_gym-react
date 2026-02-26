// ─────────────────────────────────────────────────────────────────────────────
// helpers.js — Pure utility functions. No React, no side-effects.
// ─────────────────────────────────────────────────────────────────────────────

/** Rounds a number to the nearest integer. */
export const roundTemp = (n) => Math.round(n);

/**
 * Formats an ISO datetime string (e.g. "2025-06-12T14:00") to a short time.
 * e.g. "02:00 PM"
 */
export const formatTime = (isoString) =>
  new Date(isoString).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

/**
 * Formats an ISO date string (e.g. "2025-06-12") to a short weekday.
 * e.g. "Thu"
 */
export const formatDay = (isoDateString) =>
  new Date(isoDateString + "T12:00:00").toLocaleDateString("en-US", {
    weekday: "short",
  });

/**
 * Open-Meteo returns wind speed in m/s (metric) or mph (imperial).
 * We request km/h for metric so this just formats the number.
 */
export const formatWind = (speed) => Math.round(speed);

/**
 * Converts a decimal humidity value to a display string.
 */
export const formatHumidity = (rh) => `${Math.round(rh)}%`;

/**
 * Converts visibility in metres to kilometres.
 */
export const formatVisibility = (metres) => `${(metres / 1000).toFixed(1)} km`;
