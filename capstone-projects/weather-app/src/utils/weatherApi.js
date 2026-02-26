// ─────────────────────────────────────────────────────────────────────────────
// weatherApi.js — API Service Layer
//
// Uses Open-Meteo (https://open-meteo.com) — completely free, no API key.
// Two-step flow:
//   1. Geocoding API  → converts city name → { lat, lon, displayName }
//   2. Forecast API   → fetches current + 7-day daily forecast for those coords
// ─────────────────────────────────────────────────────────────────────────────

import { GEOCODING_URL, FORECAST_URL, UNITS } from "./constants";

/**
 * Step 1 — Resolve a city name to coordinates via Open-Meteo Geocoding API.
 * Returns { lat, lon, name, country, timezone }
 */
export const geocodeCity = async (city) => {
  const url = `${GEOCODING_URL}?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;
  const res = await fetch(url);

  if (!res.ok)
    throw new Error(`Geocoding request failed (HTTP ${res.status}).`);

  const data = await res.json();

  if (!data.results || data.results.length === 0) {
    throw new Error(
      `City "${city}" not found. Check the spelling and try again.`,
    );
  }

  const r = data.results[0];
  return {
    lat: r.latitude,
    lon: r.longitude,
    name: r.name,
    country: r.country_code?.toUpperCase() ?? "",
    timezone: r.timezone ?? "auto",
  };
};

/**
 * Step 2 — Fetch weather for coordinates.
 * Returns a normalised object with { current, daily } that the hook consumes.
 */
export const fetchWeather = async (lat, lon, timezone, units) => {
  const isImperial = units === UNITS.IMPERIAL;

  // Choose the correct unit parameters for Open-Meteo
  const tempUnit = isImperial ? "fahrenheit" : "celsius";
  const windUnit = isImperial ? "mph" : "kmh";

  const params = new URLSearchParams({
    latitude: lat,
    longitude: lon,
    timezone,
    temperature_unit: tempUnit,
    wind_speed_unit: windUnit,
    // Current conditions variables
    current: [
      "temperature_2m",
      "apparent_temperature",
      "relative_humidity_2m",
      "weather_code",
      "wind_speed_10m",
      "surface_pressure",
      "visibility",
      "is_day",
    ].join(","),
    // Daily forecast variables (7 days)
    daily: [
      "weather_code",
      "temperature_2m_max",
      "temperature_2m_min",
      "sunrise",
      "sunset",
    ].join(","),
    forecast_days: 6,
  });

  const res = await fetch(`${FORECAST_URL}?${params}`);
  if (!res.ok) throw new Error(`Weather request failed (HTTP ${res.status}).`);

  return res.json();
};
