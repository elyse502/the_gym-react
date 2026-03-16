import React, { useReducer } from "react";

const App = () => {
  function reducer(state, action) {
    switch (action.type) {
      case "increment":
        return { count: state.count + 1 };
      case "decrement":
        return { count: state.count - 1 };
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-gray-800 mb-8">{state.count}</h1>

      <div className="flex space-x-4">
        <button
          onClick={() => dispatch({ type: "increment" })}
          className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow hover:bg-green-600 transition"
        >
          +
        </button>

        <button
          onClick={() => dispatch({ type: "decrement" })}
          className="px-6 py-3 bg-red-500 text-white font-semibold rounded-lg shadow hover:bg-red-600 transition"
        >
          -
        </button>
      </div>
    </div>
  );
};

export default App;
