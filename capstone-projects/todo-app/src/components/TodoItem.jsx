// ─────────────────────────────────────────────────────────────────────────────
// TodoItem.jsx — Component
//
// Responsible for: rendering a single todo and handling its interactions
// (toggle, edit, delete). Receives callbacks from useTodos via App.
//
// Hooks used: useState, useRef, useEffect
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useRef, useEffect } from "react";
import { PRIORITY_META } from "../utils/constants";
import { formatDate } from "../utils/helpers";

const TodoItem = ({ todo, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const editInputRef = useRef(null);

  // Auto-focus the edit input whenever editing mode turns on
  useEffect(() => {
    if (isEditing) {
      editInputRef.current?.focus();
      editInputRef.current?.select();
    }
  }, [isEditing]);

  const handleEditSubmit = () => {
    const trimmed = editText.trim();
    if (trimmed && trimmed !== todo.text) {
      onEdit(todo.id, trimmed);
    } else {
      setEditText(todo.text); // reset if empty or unchanged
    }
    setIsEditing(false);
  };

  const handleEditKeyDown = (e) => {
    if (e.key === "Enter") handleEditSubmit();
    if (e.key === "Escape") {
      setEditText(todo.text);
      setIsEditing(false);
    }
  };

  const meta = PRIORITY_META[todo.priority];

  return (
    <div className={`todo-item ${todo.completed ? "completed" : ""}`}>
      {/* Priority accent bar */}
      <span
        className="priority-bar"
        style={{ background: meta.dot }}
        title={`Priority: ${meta.label}`}
      />

      {/* Checkbox */}
      <button
        className={`checkbox ${todo.completed ? "checked" : ""}`}
        onClick={() => onToggle(todo.id)}
        aria-label={todo.completed ? "Mark incomplete" : "Mark complete"}
      >
        {todo.completed && (
          <svg viewBox="0 0 12 10" fill="none" className="check-icon">
            <path
              d="M1 5l3.5 3.5L11 1"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>

      {/* Text / edit input */}
      <div className="todo-body">
        {isEditing ? (
          <input
            ref={editInputRef}
            className="edit-input"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleEditSubmit}
            onKeyDown={handleEditKeyDown}
          />
        ) : (
          <span
            className="todo-text"
            onDoubleClick={() => !todo.completed && setIsEditing(true)}
            title={todo.completed ? "" : "Double-click to edit"}
          >
            {todo.text}
          </span>
        )}

        <span className="todo-meta">
          <span className="priority-badge" style={{ color: meta.dot }}>
            ● {meta.label}
          </span>
          <span className="todo-date">{formatDate(todo.createdAt)}</span>
        </span>
      </div>

      {/* Action buttons */}
      <div className="todo-actions">
        {!todo.completed && (
          <button
            className="action-btn edit-btn"
            onClick={() => setIsEditing((v) => !v)}
            aria-label="Edit task"
            title="Edit"
          >
            <svg viewBox="0 0 16 16" fill="none">
              <path
                d="M11.5 2.5l2 2-8 8H3.5v-2l8-8z"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
        <button
          className="action-btn delete-btn"
          onClick={() => onDelete(todo.id)}
          aria-label="Delete task"
          title="Delete"
        >
          <svg viewBox="0 0 16 16" fill="none">
            <path
              d="M3 4h10M6 4V3h4v1M5 4v8h6V4H5z"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
