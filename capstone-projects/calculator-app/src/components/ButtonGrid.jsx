// ─────────────────────────────────────────────────────────────────────────────
// ButtonGrid.jsx — Component
// Responsible for: laying out every calculator button in a 4-column grid.
// Reads the BUTTON_GRID array from constants so adding/removing buttons
// never requires touching this file.
// ─────────────────────────────────────────────────────────────────────────────

import { BUTTON_GRID } from "../utils/constants";
import Button from "./Button";

const ButtonGrid = ({ activeOperator, onInput }) => {
  return (
    <div className="grid grid-cols-4 gap-3 bg-black p-3">
      {BUTTON_GRID.map((btn) => (
        <Button
          key={btn.value + btn.type}
          label={btn.label}
          value={btn.value}
          type={btn.type}
          wide={btn.wide ?? false}
          activeOperator={activeOperator}
          onClick={onInput}
        />
      ))}
    </div>
  );
};

export default ButtonGrid;
