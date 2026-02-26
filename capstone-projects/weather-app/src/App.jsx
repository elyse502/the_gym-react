import { useEffect, useRef } from "react";
import useWeather from "./hooks/useWeather";
import SearchBar from "./components/SearchBar";
import UnitToggle from "./components/UnitToggle";
import CurrentWeather from "./components/CurrentWeather";
import ForecastStrip from "./components/ForecastStrip";
import LoadingSpinner from "./components/LoadingSpinner";
import ErrorMessage from "./components/ErrorMessage";
import EmptyState from "./components/EmptyState";
import { WEATHER_THEMES, getTheme } from "./utils/constants";
import "./index.css";

const App = () => {
  const {
    current,
    forecast,
    units,
    loading,
    error,
    hasData,
    searchCity,
    toggleUnits,
  } = useWeather();

  const theme = current
    ? getTheme(current.weatherCode)
    : WEATHER_THEMES.default;

  // useRef: reference the shell div to smoothly transition the background
  // gradient via CSS — avoids a re-render on every animation frame.
  const shellRef = useRef(null);
  useEffect(() => {
    if (shellRef.current) {
      shellRef.current.style.background = theme.gradient;
    }
  }, [theme.gradient]);

  return (
    <div
      ref={shellRef}
      className="weather-transition min-h-screen flex flex-col items-center px-4 py-10 sm:py-14 font-sans"
      style={{ background: WEATHER_THEMES.default.gradient }} // initial value before first fetch
    >
      <div className="w-full max-w-2xl flex flex-col gap-5 relative z-10">
        {/* Top bar */}
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <SearchBar onSearch={searchCity} loading={loading} />
          </div>
          <UnitToggle units={units} onToggle={toggleUnits} />
        </div>

        {/* Title — shown only before first search */}
        {!hasData && !loading && !error && (
          <div className="text-center pt-2">
            <h1 className="font-outfit font-extrabold text-white tracking-tighter leading-none text-5xl sm:text-6xl mb-1">
              SkyWatch
            </h1>
            <p className="text-[11px] text-white/30 uppercase tracking-[0.18em]">
              Live Weather · 5-Day Forecast
            </p>
          </div>
        )}

        {/* Main glass card */}
        <div className="bg-black/25 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 sm:p-9 flex flex-col gap-7 shadow-[0_32px_80px_rgba(0,0,0,0.45)]">
          {loading && <LoadingSpinner />}
          {error && !loading && <ErrorMessage message={error} />}
          {!loading && !error && !hasData && (
            <EmptyState onSearch={searchCity} />
          )}

          {!loading && !error && hasData && (
            <>
              <CurrentWeather data={current} units={units} />
              <div className="h-px bg-white/[0.08] -mx-1" />

              {/* ForecastStrip... */}
            </>
          )}
        </div>

        {/* Footer */}
        <p className="text-center text-[11px] text-white/20 tracking-widest uppercase">
          Weather data by Open-Meteo · Built with React
        </p>
      </div>
    </div>
  );
};

export default App;
