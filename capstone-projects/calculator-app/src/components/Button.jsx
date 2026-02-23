// ─────────────────────────────────────────────────────────────────────────────
// Button.jsx — Component
// Responsible for: rendering a single button with the correct colour scheme
// and calling the parent's onClick handler.
//
// Colour rules (matching the iOS calculator screenshot):
//   operator  → orange (#f5a623) background, white label
//   action    → mid-grey (#a5a5a5) background, black label
//   number /
//   decimal   → dark-grey (#333333) background, white label
//   equals    → orange background, white label
//   wide (0)  → spans 2 columns, left-aligned text
// ─────────────────────────────────────────────────────────────────────────────

import { BUTTON_TYPES } from "../utils/constants";

const getButtonStyles = (type, value, activeOperator) => {
  const isActiveOp = type === BUTTON_TYPES.OPERATOR && value === activeOperator;

  // When this operator is "active" (selected but not yet confirmed),
  // invert colours: white bg, orange text — just like the real iOS calculator.
  if (isActiveOp) {
    return "bg-white text-[#f5a623] active:bg-orange-100";
  }

  switch (type) {
    case BUTTON_TYPES.OPERATOR:
      return "bg-[#f5a623] text-white active:bg-[#ffc266]";
    case BUTTON_TYPES.EQUALS:
      return "bg-[#f5a623] text-white active:bg-[#ffc266]";
    case BUTTON_TYPES.ACTION:
      return "bg-[#a5a5a5] text-black active:bg-[#d4d4d2]";
    default:
      return "bg-[#333333] text-white active:bg-[#737373]";
  }
};

const Button = ({
  label,
  value,
  type,
  wide = false,
  activeOperator,
  onClick,
}) => {
  const colorStyles = getButtonStyles(type, value, activeOperator);

  return (
    <button
      onClick={() => onClick(value, type)}
      className={`
        ${colorStyles}
        ${wide ? "col-span-2 justify-center pl-7" : "justify-center"}
        flex items-center
        h-20.5 rounded-full
        text-[34px] font-light
        font-['SF_Pro_Display','Helvetica_Neue',sans-serif]
        select-none cursor-pointer
        transition-opacity duration-75
        focus:outline-none
        shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]
      `}
      aria-label={label}
    >
      {label}
    </button>
  );
};

export default Button;
