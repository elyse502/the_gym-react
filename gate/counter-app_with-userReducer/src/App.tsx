import { useReducer } from "react";

// 1. Define action types as a const (single source of truth)
const ACTIONS = {
  INCREMENT: "increment",
  DECREMENT: "decrement",
  RESET: "reset",
} as const;

// 2. Derive Action type from ACTIONS (type-safe union)
type Action =
  | { type: typeof ACTIONS.INCREMENT }
  | { type: typeof ACTIONS.DECREMENT }
  | { type: typeof ACTIONS.RESET };

// 3. Define state shape
interface State {
  counter: number;
}

// 4. Initial state
const initialState: State = { counter: 0 };

// 5. Reducer function (handles all actions)
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case ACTIONS.INCREMENT:
      return { counter: state.counter + 1 };

    case ACTIONS.DECREMENT:
      return { counter: state.counter - 1 };

    case ACTIONS.RESET:
      return initialState;

    default:
      return state; // fallback (should never hit if types are correct)
  }
}

// 6. Main component
const App = () => {
  // 7. useReducer hook for state management
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    // 8. Full-page centered layout with background
    <div className="flex items-center justify-center min-h-screen bg-gray-400">
      {/* 9. Card container */}
      <div className="bg-white shadow-lg rounded-2xl p-8 text-center space-y-6">
        {/* 10. Counter display */}
        <h1 className="text-5xl font-bold text-gray-800">{state.counter}</h1>

        {/* 11. Action buttons */}
        <div className="flex gap-4 justify-center">
          {/* 12. Increment button */}
          <button
            onClick={() => dispatch({ type: ACTIONS.INCREMENT })}
            className="px-5 py-2 rounded-xl bg-green-500 text-white font-semibold hover:bg-green-600 active:scale-95 transition cursor-pointer"
          >
            +
          </button>

          {/* 13. Decrement button */}
          <button
            onClick={() => dispatch({ type: ACTIONS.DECREMENT })}
            className="px-5 py-2 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 active:scale-95 transition cursor-pointer"
          >
            -
          </button>

          {/* 14. Reset button */}
          <button
            onClick={() => dispatch({ type: ACTIONS.RESET })}
            className="px-5 py-2 rounded-xl bg-gray-700 text-white font-semibold hover:bg-gray-800 active:scale-95 transition cursor-pointer"
          >
            RESET
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
