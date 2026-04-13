import { useDispatch, useSelector } from "react-redux";
import { increment, decrement } from "./features/counterSlice";
import type { RootState, AppDispatch } from "./features/store";

const App = () => {
  const value = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-500">
      <h1 className="text-6xl font-bold mb-8">{value}</h1>

      <div className="flex gap-4">
        <button
          onClick={() => dispatch(increment())}
          className="px-6 py-3 bg-green-500 text-white rounded-lg"
        >
          +
        </button>

        <button
          onClick={() => dispatch(decrement())}
          className="px-6 py-3 bg-red-500 text-white rounded-lg"
        >
          -
        </button>
      </div>
    </div>
  );
};

export default App;
