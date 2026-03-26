import { useState } from "react";
import { useTodos } from "../context/TodoContext";

function TodoItem({ todo }) {
  const { toggleTodo, deleteTodo, editTodo } = useTodos();
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState(todo.text);

  function handleEdit() {
    editTodo(todo.id, value);
    setEdit(false);
  }

  return (
    <li className="flex justify-between border p-2 mb-2">
      <div>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
        />

        {edit ? (
          <input
            className="border ml-2"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        ) : (
          <span className={`ml-2 ${todo.completed ? "line-through" : ""}`}>
            {todo.text}
          </span>
        )}
      </div>

      <div>
        {edit ? (
          <button
            className="bg-green-500 text-white px-2 mr-2"
            onClick={handleEdit}
          >
            Save
          </button>
        ) : (
          <button
            className="bg-yellow-500 text-white px-2 mr-2"
            onClick={() => setEdit(true)}
          >
            Edit
          </button>
        )}

        <button
          className="bg-red-500 text-white px-2"
          onClick={() => deleteTodo(todo.id)}
        >
          Delete
        </button>
      </div>
    </li>
  );
}

export default TodoItem;
