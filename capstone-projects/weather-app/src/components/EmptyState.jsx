import { QUICK_CITIES } from "../utils/constants";

const EmptyState = ({ onSearch }) => (
  <div className="flex flex-col items-center text-center py-10 gap-6">
    <span className="text-7xl leading-none animate-pulse">🌍</span>

    <div>
      <h2 className="font-outfit font-bold text-white/85 text-2xl mb-2">
        Where in the world are you?
      </h2>
      <p className="text-sm text-white/40 leading-relaxed">
        Search any city to see live weather conditions
        <br />
        and a 5-day forecast.
      </p>
    </div>

    <div className="flex flex-wrap justify-center gap-2">
      {QUICK_CITIES.map((city) => (
        <button
          key={city}
          onClick={() => onSearch(city)}
          className="bg-white/[0.08] border border-white/15 rounded-full px-4 py-2 text-[13px] text-white/65 font-sans tracking-wide hover:bg-white/15 hover:text-white transition-all duration-150 active:scale-95"
        >
          {city}
        </button>
      ))}
    </div>
  </div>
);

export default EmptyState;
