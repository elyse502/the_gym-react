import Counter from "./features/counter/counter";
import Users from "./features/users/Users";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-400 p-6">
      <h1 className="text-2xl font-bold mb-4">Redux Toolkit Demo</h1>

      <Counter />
      <Users />
    </div>
  );
};

export default App;
