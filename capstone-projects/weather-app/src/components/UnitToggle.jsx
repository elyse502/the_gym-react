import { UNITS } from "../utils/constants";

const UnitToggle = ({ units, onToggle }) => {
  const isCelsius = units === UNITS.METRIC;

  return (
    <button
      onClick={onToggle}
      title={`Switch to ${isCelsius ? "°F" : "°C"}`}
      className="flex items-center gap-0.5 bg-white/10 border border-white/20 rounded-full p-1 backdrop-blur-md hover:border-white/30 transition-colors duration-150 flex-shrink-0"
    >
      {["°C", "°F"].map((label) => {
        const active = (label === "°C") === isCelsius;
        return (
          <span
            key={label}
            className={`px-3 py-1 rounded-full text-sm font-semibold tracking-wide transition-all duration-200 ${
              active ? "bg-white/90 text-slate-800" : "text-white/55"
            }`}
          >
            {label}
          </span>
        );
      })}
    </button>
  );
};

export default UnitToggle;
