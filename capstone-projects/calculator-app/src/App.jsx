// ─────────────────────────────────────────────────────────────────────────────
// App.jsx — Root Component
// Orchestrator only: pulls state from useCalculator and distributes it.
// Contains zero business logic.
// ─────────────────────────────────────────────────────────────────────────────

import useCalculator from "./hooks/useCalculator";
import Display from "./components/Display";
import ButtonGrid from "./components/ButtonGrid";
import { formatDisplay } from "./utils/helpers";

const App = () => {
  const { display, activeOperator, handleInput } = useCalculator();

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      {/* Phone-like shell */}
      <div
        className="w-md overflow-hidden rounded-[40px] shadow-[0_40px_80px_rgba(0,0,0,0.9)]"
        style={{ border: "1px solid rgba(255,255,255,0.08)" }}
      >
        {/* Display */}
        <Display value={formatDisplay(display)} />

        {/* Buttons */}
        <ButtonGrid activeOperator={activeOperator} onInput={handleInput} />
      </div>
    </div>
  );
};

export default App;
