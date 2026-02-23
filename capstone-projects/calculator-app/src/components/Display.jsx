// ─────────────────────────────────────────────────────────────────────────────
// Display.jsx — Component
// Responsible for: rendering the numeric output area only.
// Font-size adapts so long numbers never overflow.
// ─────────────────────────────────────────────────────────────────────────────

import { getDisplayFontSize } from "../utils/helpers";

const Display = ({ value }) => {
  const sizeClass = getDisplayFontSize(value);

  return (
    <div className="w-full bg-[#1c1c1e] flex items-end justify-end px-6 py-5 min-h-32.5">
      <span
        className={`${sizeClass} font-light text-white tracking-tight transition-all duration-150 select-none font-['SF_Pro_Display','Helvetica_Neue',sans-serif]`}
        style={{ lineHeight: 1.05 }}
      >
        {value}
      </span>
    </div>
  );
};

export default Display;
