import { createContext, useContext, useReducer } from "react";

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
  const [todos, dispatch] = useReducer(reducer, []);

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
