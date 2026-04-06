import { useState } from "react";
import PrintTable from "./components/PrintTable";

const App = () => {
  const [number, setNumber] = useState(1);
  const [darkTheme, setDarkTheme] = useState(false);

  const calculateTable = () => {
    return [number * 1, number * 2, number * 3, number * 4, number * 5];
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center ${
        darkTheme ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <div className="p-6 border rounded-md space-y-4 w-80 text-center">
        <h1 className="text-lg font-semibold">
          Table Generator (Without useCallback)
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
