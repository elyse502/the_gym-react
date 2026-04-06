/**
 * With useCallback
 * useCallback is a React hook that returns a memoized version of the callback function that only changes if one
 * of the dependencies has changed. This is useful when passing callbacks to optimized child components that rely
 * on reference equality to prevent unnecessary renders.
 *
 * In this example, we have a component that generates a multiplication table based on a number input.
 * The calculateTable function is wrapped with useCallback, which means it will only be recreated when
 * the number state changes. This prevents unnecessary re-renders of the PrintTable component when the
 * theme is toggled, as the reference to calculateTable remains the same.
 *
 * If we were to define calculateTable without useCallback, it would be recreated on every render, causing PrintTable
 * to re-render even when the number hasn't changed, leading to potential performance issues.
 *
 * Note: The useCallback hook is particularly beneficial when passing functions to child components that are
 * memoized with React.memo, as it helps to avoid unnecessary re-renders by ensuring that the function reference
 * remains stable unless its dependencies change.
 */
import { useState, useCallback } from "react";
import PrintTable from "./components/PrintTable";
import { useMemo } from "react";

const App = () => {
  const [number, setNumber] = useState(1);
  const [darkTheme, setDarkTheme] = useState(false);

  const calculateTable = useCallback(
    (value) => {
      let newNum = value + number;
      return [newNum * 1, newNum * 2, newNum * 3, newNum * 4, newNum * 5];
    },
    [number],
  );

  /**
   * Using useMemo instead of useCallback would not be appropriate here, as we want to memoize the function itself, 
   * not the result of the function. useMemo is used to memoize values, while useCallback is used to memoize functions.
   * 
   * And using useMemo you can't pass parameters to the memoized function, which is a key requirement in this scenario since 
   * we want to calculate the table based on a dynamic value (the number input).
   * 
   * Even when calling calculateTable inside the PrintTable component, we want to ensure that the function reference remains 
   * stable, which is why useCallback is the correct choice in this scenario. And we call it passing parentheses to ensure that 
   * we are passing the function reference, not the result of the function.
   *

   
  const calculateTable = useMemo(() => {
    return [number * 1, number * 2, number * 3, number * 4, number * 5];
  }, [number]);
  */

  // -----------------------------------------------------------------------------------------------------------------------------

  /*
  const calculateTable = () => {
    return [number * 1, number * 2, number * 3, number * 4, number * 5];
  };
  */

  return (
    <div
      className={`min-h-screen flex items-center justify-center ${
        darkTheme ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <div className="p-6 border rounded-md space-y-4 w-80 text-center">
        <h1 className="text-lg font-semibold">
          Table Generator (With useCallback)
        </h1>

        <input
          type="number"
          value={number}
          onChange={(e) => setNumber(e.target.valueAsNumber)}
          className="w-full p-2 border rounded text-black"
        />

        <PrintTable calculateTable={calculateTable} />

        <button
          onClick={() => setDarkTheme(!darkTheme)}
          className="px-4 py-2 border rounded hover:bg-gray-200 text-black"
        >
          Toggle Theme
        </button>
      </div>
    </div>
  );
};

export default App;
