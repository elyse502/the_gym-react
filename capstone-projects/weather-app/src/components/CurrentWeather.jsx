import StatCard from "./StatCard";
import { roundTemp, formatTime, formatVisibility } from "../utils/helpers";
import {
  UNIT_SYMBOLS,
  WIND_UNIT_LABELS,
  getWmoInfo,
  getTheme,
} from "../utils/constants";

const CurrentWeather = ({ data, units }) => {
  const symbol = UNIT_SYMBOLS[units];
  const windUnit = WIND_UNIT_LABELS[units];
  const wmo = getWmoInfo(data.weatherCode);
  const theme = getTheme(data.weatherCode);

  return (
    <div className="flex flex-col gap-4">
      {/* City + country */}
      <div className="flex items-baseline gap-2 flex-wrap">
        <h2 className="font-outfit font-extrabold text-white tracking-tight leading-none text-4xl sm:text-5xl">
          {data.cityName}
        </h2>
        <span className="text-xl text-white/50 font-light">{data.country}</span>
      </div>

      {/* Big temperature + emoji */}
      <div className="flex items-center gap-4">
        <span className="font-outfit font-extralight text-white leading-none tracking-tighter text-[90px] sm:text-[110px]">
          {roundTemp(data.temp)}
          {symbol}
        </span>
        <span className="text-6xl sm:text-7xl leading-none">{wmo.emoji}</span>
      </div>

      {/* Condition + feels like */}
      <div className="flex flex-col gap-1">
        <p className={`text-xl font-medium ${theme.accentTw}`}>{wmo.label}</p>
        <p className="text-sm text-white/50 tracking-wide">
          Feels like {roundTemp(data.feelsLike)}
          {symbol}
          &nbsp;·&nbsp; Humidity {data.humidity}%
        </p>
      </div>

      {/* Stat grid... */}
    </div>
  );
};

export default CurrentWeather;
