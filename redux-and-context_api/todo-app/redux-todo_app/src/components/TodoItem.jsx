import { useDispatch } from "react-redux";
import { toggleTodo, deleteTodo, editTodo } from "../features/todos/todoSlice";
import { useState } from "react";

function TodoItem({ todo }) {
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState(todo.text);

  function handleEdit() {
    dispatch(editTodo({ id: todo.id, text: value }));
    setEdit(false);
  }

  return (
    <li className="flex items-center justify-between border p-2 mb-2">
      <div>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => dispatch(toggleTodo(todo.id))}
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
          onClick={() => dispatch(deleteTodo(todo.id))}
        >
          Delete
        </button>
      </div>
    </li>
  );
}

export default TodoItem;
