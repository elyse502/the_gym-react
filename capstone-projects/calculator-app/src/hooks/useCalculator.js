// ─────────────────────────────────────────────────────────────────────────────
// useCalculator.js — Custom Hook
//
// Owns ALL calculator state and business logic.
// Components call these handlers and read display values — they never
// touch state or arithmetic directly.
//
// Key behaviour (matching the spec):
//   • Pressing an operator after digits stores the first operand and clears
//     the display ready for the second number.
//   • Pressing a SECOND operator before pressing "=" first computes the
//     pending operation, displays the result, then sets that as the new
//     first operand for the chained operation.
//   • "=" finalises the calculation and shows the result.
// ─────────────────────────────────────────────────────────────────────────────

import { useState } from "react";
import { calculate, formatDisplay } from "../utils/helpers";
import { BUTTON_TYPES } from "../utils/constants";

const useCalculator = () => {
  // What's shown on screen right now
  const [display, setDisplay] = useState("0");
  // The first operand stored when an operator is pressed
  const [firstOperand, setFirstOperand] = useState(null);
  // The pending operator ("+", "-", "×", "÷")
  const [operator, setOperator] = useState(null);
  // Whether the next digit press should start a fresh number
  const [waitingForSecond, setWaitingForSecond] = useState(false);
  // Track the active operator button for highlighting
  const [activeOperator, setActiveOperator] = useState(null);

  // ── Number digit pressed ──────────────────────────────────────────────────
  const handleNumber = (digit) => {
    if (waitingForSecond) {
      // Start fresh display for the second operand
      setDisplay(digit);
      setWaitingForSecond(false);
    } else {
      setDisplay((prev) =>
        prev === "0" || prev === "Error" ? digit : prev + digit,
      );
    }
  };

  // ── Decimal point ─────────────────────────────────────────────────────────
  const handleDecimal = () => {
    if (waitingForSecond) {
      setDisplay("0.");
      setWaitingForSecond(false);
      return;
    }
    if (!display.includes(".")) {
      setDisplay((prev) => prev + ".");
    }
  };

  // ── Operator pressed (+, -, ×, ÷) ────────────────────────────────────────
  const handleOperator = (nextOperator) => {
    const current = parseFloat(display);

    if (firstOperand !== null && !waitingForSecond) {
      // Chain: compute the pending operation first, show result, continue
      const result = calculate(firstOperand, current, operator);
      const formatted = formatDisplay(result);
      setDisplay(formatted);
      setFirstOperand(parseFloat(formatted));
    } else {
      // First operator press — store the current number
      setFirstOperand(current);
    }

    setOperator(nextOperator);
    setActiveOperator(nextOperator);
    setWaitingForSecond(true);
  };

  // ── Equals ────────────────────────────────────────────────────────────────
  const handleEquals = () => {
    if (operator === null || firstOperand === null) return;

    const result = calculate(firstOperand, parseFloat(display), operator);
    const formatted = formatDisplay(result);

    setDisplay(formatted);
    setFirstOperand(null);
    setOperator(null);
    setActiveOperator(null);
    setWaitingForSecond(false);
  };

  // ── AC — All Clear ────────────────────────────────────────────────────────
  const handleAllClear = () => {
    setDisplay("0");
    setFirstOperand(null);
    setOperator(null);
    setActiveOperator(null);
    setWaitingForSecond(false);
  };

  // ── +/- toggle ────────────────────────────────────────────────────────────
  const handleToggleSign = () => {
    setDisplay((prev) =>
      prev.startsWith("-") ? prev.slice(1) : prev === "0" ? "0" : "-" + prev,
    );
  };

  // ── Percentage ────────────────────────────────────────────────────────────
  const handlePercent = () => {
    setDisplay((prev) => formatDisplay(parseFloat(prev) / 100));
  };

  // ── Master dispatcher — called by Button with type + value ────────────────
  const handleInput = (value, type) => {
    switch (type) {
      case BUTTON_TYPES.NUMBER:
        handleNumber(value);
        break;
      case BUTTON_TYPES.DECIMAL:
        handleDecimal();
        break;
      case BUTTON_TYPES.OPERATOR:
        handleOperator(value);
        break;
      case BUTTON_TYPES.EQUALS:
        handleEquals();
        break;
      case BUTTON_TYPES.ACTION:
        if (value === "AC") handleAllClear();
        if (value === "+/-") handleToggleSign();
        if (value === "%") handlePercent();
        break;
      default:
        break;
    }
  };

  return { display, activeOperator, handleInput };
};

export default useCalculator;
