// ─────────────────────────────────────────────────────────────────────────────
// TodoForm.jsx — Component
//
// Responsible for: capturing user input and calling addTodo.
// Knows nothing about the todo list — pure input concern.
//
// Hooks used: useState, useRef
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useRef } from "react";
import { PRIORITY, PRIORITY_META } from "../utils/constants";

const TodoForm = ({ onAdd }) => {
  const [text, setText] = useState("");
  const [priority, setPriority] = useState(PRIORITY.MEDIUM);
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) {
      // Shake the input to signal empty submission
      inputRef.current?.focus();
      return;
    }
    onAdd(text, priority);
    setText("");
    setPriority(PRIORITY.MEDIUM);
    inputRef.current?.focus();
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      {/* ── Text input ── */}
      <div className="input-wrapper">
        <span className="input-icon">+</span>
        <input
          ref={inputRef}
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new task…"
          className="todo-input"
          autoFocus
        />
      </div>

      {/* ── Priority selector + submit ── */}
      <div className="form-actions">
        <div className="priority-group">
          {Object.values(PRIORITY).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPriority(p)}
              className={`priority-btn ${priority === p ? "active" : ""}`}
              style={{
                "--dot-color": PRIORITY_META[p].dot,
                borderColor:
                  priority === p ? PRIORITY_META[p].dot : "transparent",
                color: priority === p ? PRIORITY_META[p].dot : undefined,
              }}
            >
              <span
                className="priority-dot"
                style={{ background: PRIORITY_META[p].dot }}
              />
              {PRIORITY_META[p].label}
            </button>
          ))}
        </div>

        <button type="submit" className="submit-btn">
          Add Task
        </button>
      </div>
    </form>
  );
};

export default TodoForm;
