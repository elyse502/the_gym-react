import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../features/todos/todoSlice";

function TodoInput() {
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault(); // prevent page reload
    if (!text.trim()) return;

    dispatch(addTodo(text));
    setText("");
  }

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <input
        className="border p-2 mr-2"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add todo"
      />
      <button type="submit" className="bg-blue-500 text-white px-3 py-2">
        Add
      </button>
    </form>
  );
}

export default TodoInput;
