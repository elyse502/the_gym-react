// ─────────────────────────────────────────────────────────────────────────────
// helpers.js
// Pure utility functions — no React, no side-effects, easy to unit-test.
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Generates a unique ID using timestamp + random suffix.
 * Avoids pulling in an external library like uuid.
 */
export const generateId = () =>
  `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

/**
 * Returns the current moment as an ISO 8601 string.
 * e.g. "2025-06-12T10:30:00.000Z"
 */
export const getCurrentTimestamp = () => new Date().toISOString();

/**
 * Formats an ISO date string into a short human-readable label.
 * e.g. "Jun 12" or "Jun 12, 2024" when the year differs from today.
 */
export const formatDate = (isoString) => {
  const date = new Date(isoString);
  const today = new Date();
  const sameYear = date.getFullYear() === today.getFullYear();

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    ...(sameYear ? {} : { year: "numeric" }),
  });
};

/**
 * Safely reads a JSON value from localStorage.
 * Returns `fallback` when the key is missing or JSON is malformed.
 */
export const readFromStorage = (key, fallback = null) => {
  try {
    const raw = localStorage.getItem(key);
    return raw !== null ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

/**
 * Safely serialises and writes a value to localStorage.
 * Silently fails in environments where storage is unavailable (e.g. incognito quota).
 */
export const writeToStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.warn("[TaskFlow] localStorage write failed:", err.message);
  }
};
