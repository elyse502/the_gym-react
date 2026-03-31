import { createContext, useContext, useReducer, useEffect } from "react";

const TodoContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [
        ...state,
        {
          id: Date.now(),
          text: action.payload,
          completed: false,
        },
      ];

    case "TOGGLE":
      return state.map((todo) =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo,
      );

    case "DELETE":
      return state.filter((todo) => todo.id !== action.payload);

    case "EDIT":
      return state.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, text: action.payload.text }
          : todo,
      );

    default:
      return state;
  }
}

export function TodoProvider({ children }) {
  // Load initial state from localStorage BEFORE first render
  const [todos, dispatch] = useReducer(reducer, [], () => {
    try {
      const stored = localStorage.getItem("todos");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Save to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function addTodo(text) {
    dispatch({ type: "ADD", payload: text });
  }

  function toggleTodo(id) {
    dispatch({ type: "TOGGLE", payload: id });
  }

  function deleteTodo(id) {
    dispatch({ type: "DELETE", payload: id });
  }

  function editTodo(id, text) {
    dispatch({ type: "EDIT", payload: { id, text } });
  }

  return (
    <TodoContext.Provider
      value={{ todos, addTodo, toggleTodo, deleteTodo, editTodo }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export function useTodos() {
  return useContext(TodoContext);
}
