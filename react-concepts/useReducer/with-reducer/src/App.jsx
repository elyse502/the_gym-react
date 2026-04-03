/**
 * useReducer is a hook that allows you to manage state in a functional component.
 * It is an alternative to useState and is often used when you have complex state logic that involves
 * multiple sub-values or when the next state depends on the previous one.
 *
 * The useReducer hook takes a reducer function and an initial state as arguments and returns an array
 * with the current state and a dispatch function.
 *
 * The reducer function is a pure function that takes the current state and an action as arguments and
 * returns the new state based on the action type.
 *
 * The dispatch function is used to send actions to the reducer, which will then update the state accordingly.
 *
 * In this example, we have a simple counter application that uses useReducer to manage the count state. The reducer
 * function handles two action types: "increase" and "decrease", which update the count accordingly. The App component
 * renders the current count and two buttons to increase or decrease the count.
 *
 * Overall, useReducer is a powerful hook that can help you manage complex state logic in your React applications, making
 * it easier to maintain and debug your code.
 */
import { useReducer } from "react";

const ACTION = {
  INCREASE: "increase",
  DECREASE: "decrease",
};

const initialState = { count: 0 };

const reducer = (state, action) => {
  switch (action.type) {
    case ACTION.INCREASE:
      return { count: state.count + 1 };
    case ACTION.DECREASE:
      return { count: state.count - 1 };
    default:
      return state;
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const increaseCount = () => {
    dispatch({ type: "increase" });
  };

  const decreaseCount = () => {
    dispatch({ type: "decrease" });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        Count: {state.count}
      </h2>
      <div className="flex space-x-4">
        <button
          onClick={increaseCount}
          className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-600 transition"
        >
          Increase
        </button>
        <button
          onClick={decreaseCount}
          className="px-6 py-2 bg-orange-500 text-white font-semibold rounded-lg shadow hover:bg-orange-600 transition"
        >
          Decrease
        </button>
      </div>
    </div>
  );
};

export default App;
