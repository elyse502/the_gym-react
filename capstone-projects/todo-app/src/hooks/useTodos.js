// ─────────────────────────────────────────────────────────────────────────────
// useTodos.js  — Custom Hook
//
// This hook owns ALL todo state and business logic.
// Components call these functions and read derived data — they never
// manipulate state or touch localStorage directly.
//
// Hooks used: useState, useEffect (as per learning scope)
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect } from "react";
import { STORAGE_KEY, FILTERS, PRIORITY } from "../utils/constants";
import {
  generateId,
  getCurrentTimestamp,
  readFromStorage,
  writeToStorage,
} from "../utils/helpers";

const useTodos = () => {
  // ── State ──────────────────────────────────────────────────────────────────
  // Initialise from localStorage so data survives page refreshes
  const [todos, setTodos] = useState(() => readFromStorage(STORAGE_KEY, []));
  const [filter, setFilter] = useState(FILTERS.ALL);
  const [searchQuery, setSearchQuery] = useState("");

  // ── Side-effect: persist whenever todos change ─────────────────────────────
  useEffect(() => {
    writeToStorage(STORAGE_KEY, todos);
  }, [todos]);

  // ── Action: Add ────────────────────────────────────────────────────────────
  const addTodo = (text, priority = PRIORITY.MEDIUM) => {
    if (!text.trim()) return;

    const newTodo = {
      id: generateId(),
      text: text.trim(),
      completed: false,
      priority,
      createdAt: getCurrentTimestamp(),
    };

    setTodos((prev) => [newTodo, ...prev]);
  };

  // ── Action: Toggle completed ───────────────────────────────────────────────
  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  // ── Action: Delete ─────────────────────────────────────────────────────────
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  // ── Action: Edit text ──────────────────────────────────────────────────────
  const editTodo = (id, newText) => {
    if (!newText.trim()) return;
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, text: newText.trim() } : todo,
      ),
    );
  };

  // ── Action: Clear all completed ────────────────────────────────────────────
  const clearCompleted = () => {
    setTodos((prev) => prev.filter((todo) => !todo.completed));
  };

  // ── Derived: filter + search applied together ──────────────────────────────
  const filteredTodos = todos.filter((todo) => {
    const matchesFilter =
      filter === FILTERS.ALL ||
      (filter === FILTERS.ACTIVE && !todo.completed) ||
      (filter === FILTERS.COMPLETED && todo.completed);

    const matchesSearch = todo.text
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  // ── Derived: stats for the header counter ─────────────────────────────────
  const stats = {
    total: todos.length,
    active: todos.filter((t) => !t.completed).length,
    completed: todos.filter((t) => t.completed).length,
  };

  return {
    // Data
    todos: filteredTodos,
    stats,
    filter,
    searchQuery,
    // Actions
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted,
    setFilter,
    setSearchQuery,
  };
};

export default useTodos;
