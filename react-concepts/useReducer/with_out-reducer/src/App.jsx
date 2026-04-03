import { useState } from "react";

const App = () => {
  const [count, setCount] = useState(0);

  const increaseCount = () => {
    setCount((prev) => prev + 1);
  };

  const decreaseCount = () => {
    setCount((prev) => prev - 1);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Count: {count}</h2>
      <div className="flex space-x-4">
        <button
          onClick={increaseCount}
          className="px-6 py-2 bg-green-500 text-white font-semibold rounded-lg shadow cursor-pointer hover:bg-green-600 transition"
        >
          Increase
        </button>
        <button
          onClick={decreaseCount}
          className="px-6 py-2 bg-red-500 text-white font-semibold rounded-lg shadow cursor-pointer hover:bg-red-600 transition"
        >
          Decrease
        </button>
      </div>
    </div>
  );
};

export default App;
