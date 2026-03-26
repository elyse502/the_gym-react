import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";

function App() {
  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-xl p-4">Context Todo App</h1>
      <TodoInput />
      <TodoList />
    </div>
  );
}

export default App;
