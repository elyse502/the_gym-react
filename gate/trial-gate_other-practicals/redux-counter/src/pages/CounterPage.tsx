import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../app/store";
import { decrement, increment } from "../features/counter/counterSlice";

const CounterPage = () => {
  const value = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6">
      <h1 className="text-3xl font-semibold">Redux Counter</h1>

      <p className="text-4xl font-bold">{value}</p>

      <div className="flex gap-4">
        <button
          onClick={() => dispatch(decrement())}
          className="px-4 py-2 rounded-md 
                     bg-gray-800 text-white 
                     dark:bg-red-600 dark:text-white"
        >
          Decrement
        </button>

        <button
          onClick={() => dispatch(increment())}
          className="px-4 py-2 rounded-md 
                     bg-black text-white 
                     dark:bg-black dark:text-white"
        >
          Increment
        </button>
      </div>
    </div>
  );
};

export default CounterPage;
