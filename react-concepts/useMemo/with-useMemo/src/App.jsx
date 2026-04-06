import { useState, useMemo } from "react";

const App = () => {
  const [number, setNumber] = useState(0);
  const [dark, setDark] = useState(false);

  const memoCalcutation = useMemo(() => {
    return expensiveFunction(number);
  }, [number]);

  // const calculation = expensiveFunction(number);

  return (
    <div
      className={`min-h-screen flex items-center justify-center ${
        dark ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <div className="p-6 border rounded-md space-y-4 w-80 text-center">
        <h1 className="text-lg font-semibold">useMemo Demo</h1>

        <input
          type="number"
          value={number}
          onChange={(e) => setNumber(e.target.valueAsNumber)}
          className="w-full p-2 border rounded text-black"
        />

        <h2 className="text-sm">
          Calculation: <span className="font-medium">{memoCalcutation}</span>
        </h2>

        <button
          onClick={() => setDark(!dark)}
          className="px-4 py-2 border rounded hover:bg-gray-200 text-black"
        >
          Toggle Theme
        </button>
      </div>
    </div>
  );
};

function expensiveFunction(num) {
  console.log("Loop Started");
  for (let i = 0; i < 1000000000; i++) {
    return num;
  }
}

export default App;
