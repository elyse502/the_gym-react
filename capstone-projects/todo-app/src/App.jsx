// ─────────────────────────────────────────────────────────────────────────────
// App.jsx — Root Component
//
// Orchestrator: pulls state from useTodos and passes it down to components.
// This file has no business logic of its own — it's a wiring layer.
// ─────────────────────────────────────────────────────────────────────────────

import useTodos from "./hooks/useTodos";
import TodoForm from "./components/TodoForm";
import FilterBar from "./components/FilterBar";
import TodoList from "./components/TodoList";
import "./index.css";

const App = () => {
  const {
    todos,
    stats,
    filter,
    searchQuery,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted,
    setFilter,
    setSearchQuery,
  } = useTodos();

  return (
    <div className="app-shell">
      {/* ── Background decoration ── */}
      <div className="bg-blob blob-1" />
      <div className="bg-blob blob-2" />

      <main className="app-card">
        {/* ── Header ── */}
        <header className="app-header">
          <div className="header-left">
            <div className="logo-mark">TF</div>
            <div>
              <h1 className="app-title">TaskFlow</h1>
              <p className="app-subtitle">Stay focused. Ship it.</p>
            </div>
          </div>
          <div className="total-badge">
            {stats.total} {stats.total === 1 ? "task" : "tasks"}
          </div>
        </header>

        {/* ── Add task form ── */}
        <TodoForm onAdd={addTodo} />

        {/* ── Filter + Search bar ── */}
        <FilterBar
          currentFilter={filter}
          onFilterChange={setFilter}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          hasCompleted={stats.completed > 0}
          onClearCompleted={clearCompleted}
          stats={stats}
        />

        {/* ── Progress bar ── */}
        {stats.total > 0 && (
          <div className="progress-track">
            <div
              className="progress-fill"
              style={{ width: `${(stats.completed / stats.total) * 100}%` }}
            />
          </div>
        )}

        {/* ── Todo list ── */}
        <TodoList
          todos={todos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onEdit={editTodo}
        />

        {/* ── Footer ── */}
        <footer className="app-footer">
          Made with ❤️ by{" "}
          <a
            href="https://elyseedev.netlify.app"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-amber-500 italic transition-colors duration-200 hover:text-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
          >
            ElyséeDev
          </a>
        </footer>
      </main>
    </div>
  );
};

export default App;
