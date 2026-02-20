// ─────────────────────────────────────────────────────────────────────────────
// TodoList.jsx — Component
//
// Responsible for: rendering the collection of todos or an empty-state message.
// Delegates individual item rendering to TodoItem.
// ─────────────────────────────────────────────────────────────────────────────

import TodoItem from "./TodoItem";

const TodoList = ({ todos, onToggle, onDelete, onEdit }) => {
  if (todos.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">✓</div>
        <p className="empty-title">All clear</p>
        <p className="empty-sub">Add a task above to get started</p>
      </div>
    );
  }

  return (
    <div className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

export default TodoList;
