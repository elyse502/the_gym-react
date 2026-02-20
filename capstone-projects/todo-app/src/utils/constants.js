// ─────────────────────────────────────────────────────────────────────────────
// constants.js
// Single source of truth for every magic value used across the app.
// Change a value here and it updates everywhere automatically.
// ─────────────────────────────────────────────────────────────────────────────

export const STORAGE_KEY = "taskflow_todos_v1";

export const FILTERS = {
  ALL: "all",
  ACTIVE: "active",
  COMPLETED: "completed",
};

export const PRIORITY = {
  LOW: "low",
  MEDIUM: "medium",
  HIGH: "high",
};

// Visual metadata for each priority level — kept here so components stay clean
export const PRIORITY_META = {
  low: { label: "Low", dot: "#4ade80" },
  medium: { label: "Medium", dot: "#facc15" },
  high: { label: "High", dot: "#f87171" },
};
