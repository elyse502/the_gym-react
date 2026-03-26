import { useState } from "react";
import { useTodos } from "../context/TodoContext";

function TodoInput() {
  const [text, setText] = useState("");
  const { addTodo } = useTodos();

  function handleSubmit(e) {
    e.preventDefault(); // prevent page reload
    if (!text.trim()) return;

    addTodo(text);
    setText("");
  }

  return (
    <form className="p-4" onSubmit={handleSubmit}>
      <input
        className="border p-2 mr-2"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add todo"
      />
      <button
        type="submit"
        disabled={!text.trim()}
        className="bg-blue-500 text-white px-3 py-2 disabled:opacity-50"
      >
        Add
      </button>
    </form>
  );
}

export default TodoInput;
