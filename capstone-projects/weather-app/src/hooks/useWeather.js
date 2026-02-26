// ─────────────────────────────────────────────────────────────────────────────
// useWeather.js — Custom Hook
//
// Owns ALL weather state. Components only call handlers and read data.
// Two-step fetch: geocode city name → fetch weather for coordinates.
// Hooks used: useState, useEffect, useRef
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect, useRef } from "react";
import { geocodeCity, fetchWeather } from "../utils/weatherApi";
import { UNITS } from "../utils/constants";

const useWeather = () => {
  const [query, setQuery] = useState(null); // { cityName } triggers a fetch
  const [location, setLocation] = useState(null); // resolved { lat, lon, name, country, timezone }
  const [rawData, setRawData] = useState(null); // raw Open-Meteo response
  const [units, setUnits] = useState(UNITS.METRIC);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // useRef: stale-fetch guard — prevents older responses from overwriting newer ones
  const cancelRef = useRef(false);

  // ── Step 1: Geocode whenever a new city is searched ───────────────────────
  useEffect(() => {
    if (!query) return;

    cancelRef.current = false;
    setLoading(true);
    setError(null);
    setRawData(null);

    geocodeCity(query)
      .then((loc) => {
        if (!cancelRef.current) setLocation(loc);
      })
      .catch((err) => {
        if (!cancelRef.current) {
          setError(err.message);
          setLoading(false);
        }
      });

    return () => {
      cancelRef.current = true;
    };
  }, [query]);

  // ── Step 2: Fetch weather whenever location or units change ───────────────
  useEffect(() => {
    if (!location) return;

    cancelRef.current = false;
    setLoading(true);
    setError(null);

    fetchWeather(location.lat, location.lon, location.timezone, units)
      .then((data) => {
        if (!cancelRef.current) {
          setRawData(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelRef.current) {
          setError(err.message);
          setLoading(false);
        }
      });

    return () => {
      cancelRef.current = true;
    };
  }, [location, units]);

  // ── Derive structured data the components actually need ───────────────────
  const current =
    rawData && location
      ? {
          cityName: location.name,
          country: location.country,
          temp: rawData.current.temperature_2m,
          feelsLike: rawData.current.apparent_temperature,
          humidity: rawData.current.relative_humidity_2m,
          windSpeed: rawData.current.wind_speed_10m,
          pressure: rawData.current.surface_pressure,
          visibility: rawData.current.visibility,
          weatherCode: rawData.current.weather_code,
          isDay: rawData.current.is_day === 1,
          sunrise: rawData.daily.sunrise[0],
          sunset: rawData.daily.sunset[0],
        }
      : null;

  const forecast = rawData
    ? rawData.daily.time.slice(1).map((date, i) => ({
        date,
        weatherCode: rawData.daily.weather_code[i + 1],
        maxTemp: rawData.daily.temperature_2m_max[i + 1],
        minTemp: rawData.daily.temperature_2m_min[i + 1],
      }))
    : [];

  // ── Handlers ──────────────────────────────────────────────────────────────
  const searchCity = (cityName) => {
    const trimmed = cityName.trim();
    if (!trimmed) return;
    setError(null);
    setQuery(trimmed);
  };

  const toggleUnits = () =>
    setUnits((prev) => (prev === UNITS.METRIC ? UNITS.IMPERIAL : UNITS.METRIC));

  return {
    current,
    forecast,
    units,
    loading,
    error,
    hasData: !!current,
    searchCity,
    toggleUnits,
  };
};

export default useWeather;
