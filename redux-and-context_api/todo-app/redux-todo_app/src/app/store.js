import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../features/todos/todoSlice";

// Load from localStorage
function loadState() {
  try {
    const stored = localStorage.getItem("todos");
    return stored ? { todos: { todos: JSON.parse(stored) } } : undefined;
  } catch {
    return undefined;
  }
}

// Save to localStorage
function saveState(state) {
  try {
    const todos = state.todos.todos;
    localStorage.setItem("todos", JSON.stringify(todos));
  } catch {
    // ignore errors
  }
}

const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
  preloadedState: loadState(),
});

// Subscribe to store changes
store.subscribe(() => {
  saveState(store.getState());
});

export { store };
