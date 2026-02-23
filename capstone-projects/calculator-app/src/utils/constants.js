// ─────────────────────────────────────────────────────────────────────────────
// constants.js
// Single source of truth for button layout and operation identifiers.
// Change the button grid here and everything updates automatically.
// ─────────────────────────────────────────────────────────────────────────────

export const BUTTON_TYPES = {
  NUMBER: "number",
  OPERATOR: "operator",
  ACTION: "action",
  EQUALS: "equals",
  DECIMAL: "decimal",
};

export const OPERATORS = {
  ADD: "+",
  SUBTRACT: "-",
  MULTIPLY: "×",
  DIVIDE: "÷",
};

// The button grid — top to bottom, left to right.
// type drives colour; value is what gets passed to the handler.
export const BUTTON_GRID = [
  { label: "AC", value: "AC", type: BUTTON_TYPES.ACTION },
  { label: "+/-", value: "+/-", type: BUTTON_TYPES.ACTION },
  { label: "%", value: "%", type: BUTTON_TYPES.ACTION },
  { label: "÷", value: "÷", type: BUTTON_TYPES.OPERATOR },

  { label: "7", value: "7", type: BUTTON_TYPES.NUMBER },
  { label: "8", value: "8", type: BUTTON_TYPES.NUMBER },
  { label: "9", value: "9", type: BUTTON_TYPES.NUMBER },
  { label: "×", value: "×", type: BUTTON_TYPES.OPERATOR },

  { label: "4", value: "4", type: BUTTON_TYPES.NUMBER },
  { label: "5", value: "5", type: BUTTON_TYPES.NUMBER },
  { label: "6", value: "6", type: BUTTON_TYPES.NUMBER },
  { label: "-", value: "-", type: BUTTON_TYPES.OPERATOR },

  { label: "1", value: "1", type: BUTTON_TYPES.NUMBER },
  { label: "2", value: "2", type: BUTTON_TYPES.NUMBER },
  { label: "3", value: "3", type: BUTTON_TYPES.NUMBER },
  { label: "+", value: "+", type: BUTTON_TYPES.OPERATOR },

  { label: "0", value: "0", type: BUTTON_TYPES.NUMBER, wide: true },
  { label: ".", value: ".", type: BUTTON_TYPES.DECIMAL },
  { label: "=", value: "=", type: BUTTON_TYPES.EQUALS },
];
