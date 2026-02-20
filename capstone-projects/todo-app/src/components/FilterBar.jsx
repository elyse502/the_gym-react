// ─────────────────────────────────────────────────────────────────────────────
// FilterBar.jsx — Component
//
// Responsible for: filter tabs, search input, and "Clear completed" button.
// Pure presentational + event delegation upward to useTodos via App.
// ─────────────────────────────────────────────────────────────────────────────

import { useRef } from "react";
import { FILTERS } from "../utils/constants";

const FILTER_LABELS = {
  [FILTERS.ALL]: "All",
  [FILTERS.ACTIVE]: "Active",
  [FILTERS.COMPLETED]: "Completed",
};

const FilterBar = ({
  currentFilter,
  onFilterChange,
  searchQuery,
  onSearchChange,
  hasCompleted,
  onClearCompleted,
  stats,
}) => {
  const searchRef = useRef(null);

  return (
    <div className="filter-bar">
      {/* ── Stats ── */}
      <div className="filter-stats">
        <span className="stat">
          <strong>{stats.active}</strong> remaining
        </span>
        <span className="stat-divider">·</span>
        <span className="stat">
          <strong>{stats.completed}</strong> done
        </span>
      </div>

      {/* ── Filter tabs ── */}
      <div className="filter-tabs" role="tablist">
        {Object.values(FILTERS).map((f) => (
          <button
            key={f}
            role="tab"
            aria-selected={currentFilter === f}
            className={`filter-tab ${currentFilter === f ? "active" : ""}`}
            onClick={() => onFilterChange(f)}
          >
            {FILTER_LABELS[f]}
          </button>
        ))}
      </div>

      {/* ── Search ── */}
      <div className="search-wrapper">
        <svg className="search-icon" viewBox="0 0 16 16" fill="none">
          <circle
            cx="6.5"
            cy="6.5"
            r="4"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M10 10l3 3"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
        <input
          ref={searchRef}
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search tasks…"
          className="search-input"
        />
        {searchQuery && (
          <button
            className="search-clear"
            onClick={() => {
              onSearchChange("");
              searchRef.current?.focus();
            }}
            aria-label="Clear search"
          >
            ×
          </button>
        )}
      </div>

      {/* ── Clear completed ── */}
      {hasCompleted && (
        <button className="clear-btn" onClick={onClearCompleted}>
          Clear completed
        </button>
      )}
    </div>
  );
};

export default FilterBar;
