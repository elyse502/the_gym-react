import { useState, useRef } from "react";

const SearchBar = ({ onSearch, loading }) => {
  const [input, setInput] = useState("");
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;
    onSearch(input);
    setInput("");
    inputRef.current?.blur();
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      {/* ── Input row: icon + text + inline button (sm+) ── */}
      <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl sm:rounded-full px-4 py-3 shadow-lg focus-within:border-white/40 transition-colors duration-200">
        {/* Search icon */}
        <svg
          className="w-4 h-4 text-white/50 flex-shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>

        {/* Text input — min-w-0 stops it from pushing siblings off-screen */}
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search city…"
          disabled={loading}
          className="flex-1 min-w-0 bg-transparent border-none outline-none text-white text-sm placeholder:text-white/35 disabled:opacity-50"
        />

        {/* Inline button — sm screens and up only */}
        <button
          type="submit"
          disabled={!input.trim() || loading}
          className="hidden sm:block flex-shrink-0 bg-white/90 text-slate-800 rounded-full px-5 py-1.5 text-sm font-semibold tracking-wide disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white transition-all duration-150 active:scale-95"
        >
          {loading ? "…" : "Search"}
        </button>
      </div>

      {/* ── Full-width button — mobile only (<sm) ── */}
      <button
        type="submit"
        disabled={!input.trim() || loading}
        className="sm:hidden mt-2 w-full bg-white/90 text-slate-800 rounded-2xl py-3 text-sm font-semibold tracking-wide disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white transition-all duration-150 active:scale-95"
      >
        {loading ? "Fetching weather…" : "Search"}
      </button>
    </form>
  );
};

export default SearchBar;
