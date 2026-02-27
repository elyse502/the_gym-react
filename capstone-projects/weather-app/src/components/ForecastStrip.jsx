import { UNIT_SYMBOLS, getWmoInfo, getTheme } from "../utils/constants";
import { formatDay, roundTemp } from "../utils/helpers";

const DayCard = ({ date, weatherCode, maxTemp, minTemp, units, accentTw }) => {
  const wmo = getWmoInfo(weatherCode);
  const symbol = UNIT_SYMBOLS[units];

  return (
    <div className="flex flex-col items-center gap-2 bg-white/[0.07] border border-white/10 rounded-2xl px-4 py-4 backdrop-blur-sm min-w-27 flex-1 hover:bg-white/12 transition-colors duration-150 cursor-default">
      <p className="text-[11px] font-bold text-white/55 uppercase tracking-widest">
        {formatDay(date)}
      </p>
      <span className="text-4xl leading-none">{wmo.emoji}</span>
      <p className={`text-xl font-bold tracking-tight ${accentTw}`}>
        {roundTemp(maxTemp)}
        {symbol}
      </p>
      <p className="text-sm text-white/40">
        {roundTemp(minTemp)}
        {symbol}
      </p>
    </div>
  );
};

const ForecastStrip = ({ forecast, units, weatherCode }) => {
  if (!forecast.length) return null;
  const { accentTw } = getTheme(weatherCode);

  return (
    <div>
      <h3 className="text-[11px] font-semibold text-white/40 uppercase tracking-[0.14em] mb-3">
        5-Day Forecast
      </h3>
      <div className="flex gap-2.5 overflow-x-auto no-scrollbar pb-1">
        {forecast.map((day) => (
          <DayCard key={day.date} {...day} units={units} accentTw={accentTw} />
        ))}
      </div>
    </div>
  );
};

export default ForecastStrip;
