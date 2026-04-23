import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { increment, decrement, reset } from "./counterSlice";

const Counter = () => {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <div className="p-4 border rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-2">Counter</h2>
      <p className="text-2xl mb-4">{count}</p>

      <div className="flex gap-2">
        <button
          onClick={() => dispatch(increment())}
          className="px-3 py-1 bg-green-500 text-white rounded"
        >
          +
        </button>

        <button
          onClick={() => dispatch(decrement())}
          className="px-3 py-1 bg-red-500 text-white rounded"
        >
          -
        </button>

        <button
          onClick={() => dispatch(reset())}
          className="px-3 py-1 bg-gray-500 text-white rounded"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Counter;
