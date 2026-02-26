// ─────────────────────────────────────────────────────────────────────────────
// constants.js
// Open-Meteo is 100% free — no API key, no account, no credit card.
// Docs: https://open-meteo.com/en/docs
// ─────────────────────────────────────────────────────────────────────────────

// Base URLs
export const GEOCODING_URL = "https://geocoding-api.open-meteo.com/v1/search";
export const FORECAST_URL = "https://api.open-meteo.com/v1/forecast";

// Unit systems
export const UNITS = {
  METRIC: "metric",
  IMPERIAL: "imperial",
};

export const UNIT_SYMBOLS = {
  [UNITS.METRIC]: "°C",
  [UNITS.IMPERIAL]: "°F",
};

export const WIND_UNIT_LABELS = {
  [UNITS.METRIC]: "km/h",
  [UNITS.IMPERIAL]: "mph",
};

// Open-Meteo WMO weather interpretation codes → emoji + label + theme
// Full table: https://open-meteo.com/en/docs#weathervariables
export const WMO_CODES = {
  0: { label: "Clear Sky", emoji: "☀️", theme: "clear" },
  1: { label: "Mainly Clear", emoji: "🌤️", theme: "clear" },
  2: { label: "Partly Cloudy", emoji: "⛅", theme: "clouds" },
  3: { label: "Overcast", emoji: "☁️", theme: "clouds" },
  45: { label: "Foggy", emoji: "🌫️", theme: "atmosphere" },
  48: { label: "Icy Fog", emoji: "🌫️", theme: "atmosphere" },
  51: { label: "Light Drizzle", emoji: "🌦️", theme: "drizzle" },
  53: { label: "Drizzle", emoji: "🌦️", theme: "drizzle" },
  55: { label: "Heavy Drizzle", emoji: "🌧️", theme: "rain" },
  61: { label: "Slight Rain", emoji: "🌧️", theme: "rain" },
  63: { label: "Rain", emoji: "🌧️", theme: "rain" },
  65: { label: "Heavy Rain", emoji: "🌧️", theme: "rain" },
  71: { label: "Slight Snowfall", emoji: "❄️", theme: "snow" },
  73: { label: "Snowfall", emoji: "❄️", theme: "snow" },
  75: { label: "Heavy Snowfall", emoji: "❄️", theme: "snow" },
  77: { label: "Snow Grains", emoji: "🌨️", theme: "snow" },
  80: { label: "Slight Showers", emoji: "🌦️", theme: "rain" },
  81: { label: "Rain Showers", emoji: "🌧️", theme: "rain" },
  82: { label: "Violent Showers", emoji: "🌧️", theme: "rain" },
  85: { label: "Snow Showers", emoji: "🌨️", theme: "snow" },
  86: { label: "Heavy Snow Showers", emoji: "🌨️", theme: "snow" },
  95: { label: "Thunderstorm", emoji: "⛈️", theme: "thunderstorm" },
  96: { label: "Thunderstorm + Hail", emoji: "⛈️", theme: "thunderstorm" },
  99: { label: "Thunderstorm + Hail", emoji: "⛈️", theme: "thunderstorm" },
};

// Visual themes — gradient is applied via one inline style (runtime value);
// accentTw is a Tailwind arbitrary-value class for text colour.
export const WEATHER_THEMES = {
  clear: {
    gradient: "linear-gradient(135deg,#0f2027 0%,#203a43 50%,#2c5364 100%)",
    accentTw: "text-[#f9ca24]",
  },
  clouds: {
    gradient: "linear-gradient(135deg,#2c3e50 0%,#485563 50%,#29323c 100%)",
    accentTw: "text-[#a4b0be]",
  },
  rain: {
    gradient: "linear-gradient(135deg,#1f2d3d 0%,#2e4057 50%,#3a5068 100%)",
    accentTw: "text-[#6ab0c8]",
  },
  drizzle: {
    gradient: "linear-gradient(135deg,#2c3e50 0%,#3d5a6e 50%,#4a7c8e 100%)",
    accentTw: "text-[#89c4d4]",
  },
  snow: {
    gradient: "linear-gradient(135deg,#1e2a3a 0%,#3b5068 50%,#6b8fa8 100%)",
    accentTw: "text-[#c8e0ee]",
  },
  thunderstorm: {
    gradient: "linear-gradient(135deg,#1a1a2e 0%,#16213e 50%,#0f3460 100%)",
    accentTw: "text-[#7b8cde]",
  },
  atmosphere: {
    gradient: "linear-gradient(135deg,#2d3436 0%,#636e72 50%,#b2bec3 100%)",
    accentTw: "text-[#b2bec3]",
  },
  default: {
    gradient: "linear-gradient(135deg,#0f2027 0%,#203a43 50%,#2c5364 100%)",
    accentTw: "text-[#74b9ff]",
  },
};

export const getWmoInfo = (code) =>
  WMO_CODES[code] ?? { label: "Unknown", emoji: "🌡️", theme: "default" };

export const getTheme = (code) => {
  const { theme } = getWmoInfo(code);
  return WEATHER_THEMES[theme] ?? WEATHER_THEMES.default;
};

export const QUICK_CITIES = [
  "Kigali",
  "Tokyo",
  "Juba",
  "London",
  "Paris",
  "Dubai",
];
