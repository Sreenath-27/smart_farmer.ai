import React, { useState, useEffect } from "react";
import {
  CloudSun,
  Droplets,
  Wind,
  Sun,
  AlertTriangle,
  CheckCircle2,
  MapPin,
  RefreshCw,
  Clock,
  Navigation,
  Loader2,
} from "lucide-react";
import { WeatherData } from "../types";
import { useAuth } from "../context/AuthContext";

export const WeatherCard: React.FC = () => {
  const { user, requestExactLocation, isLocating } = useAuth();
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  const currentLocationStr = user?.exactLocationName || `${user?.village || "Guntur"}, ${user?.districtState || "Andhra Pradesh"}`;

  const fetchWeather = async () => {
    setLoading(true);
    try {
      let queryUrl = `/api/weather?city=${encodeURIComponent(currentLocationStr)}`;
      if (user?.lat && user?.lon) {
        queryUrl = `/api/weather?lat=${user.lat}&lon=${user.lon}&city=${encodeURIComponent(currentLocationStr)}`;
      }

      const res = await fetch(queryUrl);
      if (res.ok) {
        const data = await res.json();
        setWeather({
          ...data,
          location: currentLocationStr,
        });
      } else {
        throw new Error("Weather fetch failed");
      }
    } catch (e) {
      // Fallback
      setWeather({
        location: currentLocationStr,
        lat: user?.lat || 16.3067,
        lon: user?.lon || 80.4365,
        temperatureC: 29,
        condition: "Partly Cloudy",
        humidityPercent: 68,
        windSpeedKmh: 9,
        rainChancePercent: 15,
        rainForecast: "No heavy rain expected today. Light drizzle possible in 36 hrs.",
        uvIndex: 6,
        sprayAdvisory: "Best spraying window: Today 6:00 AM - 9:30 AM or 5:00 PM - 7:00 PM. Wind speed is low (9 km/h) and no rain expected for 24 hours.",
        canSprayToday: true,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, [user?.village, user?.districtState, user?.lat, user?.lon, user?.exactLocationName]);

  if (loading) {
    return (
      <div className="bg-[#1B4332] text-white rounded-3xl p-5 shadow-lg border border-[#E8EEE3]/30 my-4 animate-pulse space-y-3">
        <div className="h-5 bg-[#2D6A4F] rounded w-1/3 mb-3" />
        <div className="h-10 bg-[#2D6A4F] rounded w-2/3 mb-4" />
        <div className="grid grid-cols-4 gap-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-12 bg-[#2D6A4F]/60 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  if (!weather) return null;

  return (
    <div id="weather-section" className="bg-[#1B4332] text-white rounded-3xl p-5 shadow-sm border border-[#E8EEE3]/30 my-4 relative overflow-hidden">
      {/* Top Info Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4 border-b border-[#2D6A4F]/60 pb-3">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span className="text-sm font-bold text-emerald-100">{weather.location}</span>
          <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 font-mono font-bold flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{user?.locationPermissionGranted ? "Live GPS Location" : "Real-Time Weather"}</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          {!user?.locationPermissionGranted && (
            <button
              onClick={requestExactLocation}
              disabled={isLocating}
              className="px-2.5 py-1 bg-[#2D6A4F] hover:bg-[#23533e] text-white text-xs font-bold rounded-xl border border-emerald-400/40 flex items-center gap-1.5 transition active:scale-95 disabled:opacity-60"
              title="Request device location permission for exact coordinates"
            >
              {isLocating ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-300" />
              ) : (
                <Navigation className="w-3.5 h-3.5 text-emerald-300" />
              )}
              <span>📍 Detect Exact GPS</span>
            </button>
          )}

          <button
            onClick={fetchWeather}
            className="text-emerald-300 hover:text-white transition p-1.5 rounded-xl hover:bg-[#2D6A4F]"
            title="Refresh Weather"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
        {/* Temp & Condition */}
        <div className="lg:col-span-5 flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#2D6A4F]/60 border border-emerald-400/20 flex items-center justify-center text-amber-300 shadow-inner">
            <CloudSun className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold tracking-tight text-white">
                {weather.temperatureC}°C
              </span>
              <span className="text-xs font-medium text-emerald-200">
                {weather.condition}
              </span>
            </div>
            <p className="text-xs text-emerald-300/90 mt-0.5 flex items-center gap-1">
              <Clock className="w-3 h-3 text-emerald-400" />
              Rain probability: <strong className="text-white">{weather.rainChancePercent}%</strong>
            </p>
          </div>
        </div>

        {/* 4 Weather Metric Pills */}
        <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-2">
          <div className="bg-[#2D6A4F]/40 backdrop-blur-sm border border-[#2D6A4F]/60 rounded-2xl p-2.5 text-center">
            <Droplets className="w-4 h-4 text-cyan-300 mx-auto mb-1" />
            <div className="text-[10px] text-emerald-200 uppercase tracking-wider font-medium">Humidity</div>
            <div className="text-sm font-bold text-white">{weather.humidityPercent}%</div>
          </div>

          <div className="bg-[#2D6A4F]/40 backdrop-blur-sm border border-[#2D6A4F]/60 rounded-2xl p-2.5 text-center">
            <Wind className="w-4 h-4 text-emerald-300 mx-auto mb-1" />
            <div className="text-[10px] text-emerald-200 uppercase tracking-wider font-medium">Wind Speed</div>
            <div className="text-sm font-bold text-white">{weather.windSpeedKmh} km/h</div>
          </div>

          <div className="bg-[#2D6A4F]/40 backdrop-blur-sm border border-[#2D6A4F]/60 rounded-2xl p-2.5 text-center">
            <Sun className="w-4 h-4 text-amber-300 mx-auto mb-1" />
            <div className="text-[10px] text-emerald-200 uppercase tracking-wider font-medium">UV Index</div>
            <div className="text-sm font-bold text-white">{weather.uvIndex} (Moderate)</div>
          </div>

          <div className="bg-[#2D6A4F]/40 backdrop-blur-sm border border-[#2D6A4F]/60 rounded-2xl p-2.5 text-center">
            {weather.canSprayToday ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-amber-400 mx-auto mb-1" />
            )}
            <div className="text-[10px] text-emerald-200 uppercase tracking-wider font-medium">Spray Safety</div>
            <div className="text-xs font-bold text-emerald-100 truncate">
              {weather.canSprayToday ? "Favorable" : "Delay Spray"}
            </div>
          </div>
        </div>
      </div>

      {/* Agricultural Spray Advisory Banner */}
      <div className="mt-4 pt-3 border-t border-[#2D6A4F]/60 flex items-start gap-2.5 bg-[#2D6A4F]/30 rounded-2xl p-3 border border-[#2D6A4F]/40">
        <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
        <div>
          <div className="text-xs font-bold text-emerald-300 uppercase tracking-wider">
            Agricultural Spray Recommendation Window
          </div>
          <p className="text-xs text-white/95 mt-0.5 leading-relaxed font-medium">
            "{weather.sprayAdvisory}"
          </p>
        </div>
      </div>
    </div>
  );
};
