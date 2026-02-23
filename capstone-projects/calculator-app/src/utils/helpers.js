// ─────────────────────────────────────────────────────────────────────────────
// helpers.js
// Pure utility functions — no React, no side-effects, fully unit-testable.
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Performs a binary arithmetic operation between two numeric strings.
 * Returns the result as a number.
 */
export const calculate = (a, b, operator) => {
  const numA = parseFloat(a);
  const numB = parseFloat(b);

  switch (operator) {
    case "+":
      return numA + numB;
    case "-":
      return numA - numB;
    case "×":
      return numA * numB;
    case "÷":
      return numB === 0 ? "Error" : numA / numB;
    default:
      return numB;
  }
};

/**
 * Formats a raw number for display.
 * - Limits to 9 significant digits to avoid overflow on the screen.
 * - Strips unnecessary trailing zeros from decimals.
 * - Returns "Error" strings unchanged.
 */
export const formatDisplay = (value) => {
  if (value === "Error") return "Error";

  const num = parseFloat(value);
  if (isNaN(num)) return "0";

  // Use exponential notation for very large / very small numbers
  if (Math.abs(num) >= 1e10 || (Math.abs(num) < 1e-6 && num !== 0)) {
    return num.toExponential(4);
  }

  // Otherwise limit to 9 significant figures and strip trailing zeros
  const formatted = parseFloat(num.toPrecision(9)).toString();
  return formatted;
};

/**
 * Decides the font-size class based on display string length,
 * so long numbers shrink to fit the display area.
 */
export const getDisplayFontSize = (displayValue) => {
  const len = displayValue.length;
  if (len <= 6) return "text-7xl";
  if (len <= 9) return "text-5xl";
  if (len <= 12) return "text-4xl";
  return "text-3xl";
};
