import React, { useState } from "react";
import {
  CloudRain,
  CloudSun,
  Droplets,
  Wind,
  Gauge,
  Sliders,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  Clock,
  CloudLightning,
  SunMedium,
  Info,
  Layers,
  MapPin,
  Flame,
  CloudDrizzle,
} from "lucide-react";
import { RainPredictionInput, RainPredictionResult } from "../types";

export const RainPredictor: React.FC = () => {
  // Input parameters state
  const [inputs, setInputs] = useState<RainPredictionInput>({
    temperatureC: 28,
    humidityPercent: 82,
    windSpeedKmh: 14,
    pressureHpa: 1004,
    cloudCoverPercent: 85,
    season: "Monsoon / Rainy Season",
    location: "Andhra Pradesh Delta Farm",
    timeOfDay: "Afternoon (1:00 PM - 4:00 PM)",
  });

  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState<RainPredictionResult | null>({
    willRain: true,
    rainProbabilityPercent: 88,
    statusText: "Heavy Downpour & Thunderstorm Expected ⛈️",
    predictedRainfallMm: 24,
    expectedStartTimeHours: "Within 1 to 3 hours",
    cloudDensityAssessment: "Thick nimbostratus clouds with 85% coverage and high moisture saturation.",
    dewPointC: 24.8,
    sprayRecommendation: {
      safeToSpray: false,
      rainfastnessRisk: "Severe",
      advisoryMessage: "DO NOT SPRAY PESTICIDES OR FERTILIZERS NOW. Imminent rain will wash away crop chemicals and waste your money.",
      bestAlternativeWindow: "Wait until tomorrow morning 6:30 AM after rain subsides and leaves dry.",
    },
    meteorologicalExplanation: "Low atmospheric pressure (1004 hPa) combined with 82% humidity and high cloud density creates strong convective updrafts, resulting in high rain probability.",
  });

  // Preset Scenarios
  const scenarios = [
    {
      name: "⛈️ Heavy Monsoon Depression",
      data: {
        temperatureC: 27,
        humidityPercent: 88,
        windSpeedKmh: 22,
        pressureHpa: 998,
        cloudCoverPercent: 95,
        season: "Monsoon / Rainy Season",
        timeOfDay: "Afternoon (1:00 PM - 4:00 PM)",
      },
    },
    {
      name: "☀️ Hot Dry Summer Day",
      data: {
        temperatureC: 38,
        humidityPercent: 32,
        windSpeedKmh: 8,
        pressureHpa: 1014,
        cloudCoverPercent: 10,
        season: "Summer (Pre-Monsoon)",
        timeOfDay: "Noon (11:00 AM - 2:00 PM)",
      },
    },
    {
      name: "🌦️ Humid Overcast Evening",
      data: {
        temperatureC: 25,
        humidityPercent: 74,
        windSpeedKmh: 12,
        pressureHpa: 1008,
        cloudCoverPercent: 70,
        season: "Post-Monsoon",
        timeOfDay: "Evening (5:00 PM - 7:00 PM)",
      },
    },
    {
      name: "🍃 Cool Clear Winter Morning",
      data: {
        temperatureC: 18,
        humidityPercent: 55,
        windSpeedKmh: 6,
        pressureHpa: 1018,
        cloudCoverPercent: 15,
        season: "Winter",
        timeOfDay: "Early Morning (6:00 AM - 9:00 AM)",
      },
    },
  ];

  const handlePredict = async (currentInputs = inputs) => {
    setLoading(true);
    try {
      const res = await fetch("/api/predict-rain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(currentInputs),
      });

      if (res.ok) {
        const data = await res.json();
        setPrediction(data);
      } else {
        throw new Error("Failed server rain prediction");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const applyScenario = (scenarioData: Partial<RainPredictionInput>) => {
    const updated = { ...inputs, ...scenarioData };
    setInputs(updated);
    handlePredict(updated);
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-3xl p-5 sm:p-6 shadow-sm border border-[#E8EEE3] dark:border-gray-800 my-6 space-y-6">
      {/* Title Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E8EEE3] dark:border-gray-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#1B4332] text-white flex items-center justify-center font-bold shadow-sm">
            <CloudRain className="w-6 h-6 text-emerald-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-extrabold text-[#1B4332] dark:text-white">
                Predict Rain Status with Specified Data
              </h2>
              <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#2D6A4F]/10 text-[#2D6A4F] font-bold border border-[#2D6A4F]/20">
                AI + Physics Predictor
              </span>
            </div>
            <p className="text-xs text-[#748367] dark:text-gray-400 mt-0.5">
              Specify custom temperature, humidity, wind, and barometric pressure to forecast rainfall & spray safety
            </p>
          </div>
        </div>

        <button
          onClick={() => handlePredict()}
          disabled={loading}
          className="px-5 py-2.5 bg-[#2D6A4F] hover:bg-[#23533e] text-white text-xs font-bold rounded-2xl flex items-center gap-2 shadow-sm transition active:scale-95 disabled:opacity-50"
        >
          {loading ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <Sparkles className="w-4 h-4 text-emerald-300" />
          )}
          <span>{loading ? "Calculating..." : "Predict Rain Now"}</span>
        </button>
      </div>

      {/* Preset Weather Scenarios Quick Select */}
      <div className="space-y-2">
        <label className="text-xs font-extrabold text-[#1B4332] dark:text-emerald-200 uppercase tracking-wider flex items-center gap-1.5">
          <Sliders className="w-3.5 h-3.5 text-[#2D6A4F]" />
          Quick Test Scenarios:
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {scenarios.map((sc, idx) => (
            <button
              key={idx}
              onClick={() => applyScenario(sc.data)}
              className="p-2.5 text-left rounded-2xl bg-[#F9FBF7] dark:bg-gray-800/80 hover:bg-[#E8EEE3]/50 border border-[#E8EEE3] dark:border-gray-700 transition text-xs font-semibold text-[#1B4332] dark:text-gray-200 hover:border-[#2D6A4F]"
            >
              {sc.name}
            </button>
          ))}
        </div>
      </div>

      {/* Specified Input Controls Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 bg-[#F9FBF7] dark:bg-gray-800/50 p-5 rounded-3xl border border-[#E8EEE3] dark:border-gray-700/60">
        {/* Input 1: Temperature */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-xs font-bold text-[#1B4332] dark:text-gray-200">
            <span className="flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-amber-500" />
              1. Temperature (°C)
            </span>
            <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-900 font-mono text-xs">
              {inputs.temperatureC}°C
            </span>
          </div>
          <input
            type="range"
            min="10"
            max="48"
            value={inputs.temperatureC}
            onChange={(e) => setInputs({ ...inputs, temperatureC: Number(e.target.value) })}
            className="w-full accent-[#2D6A4F] cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-gray-500 font-mono">
            <span>10°C (Cold)</span>
            <span>28°C (Mild)</span>
            <span>48°C (Extreme Heat)</span>
          </div>
        </div>

        {/* Input 2: Relative Humidity */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-xs font-bold text-[#1B4332] dark:text-gray-200">
            <span className="flex items-center gap-1.5">
              <Droplets className="w-4 h-4 text-cyan-500" />
              2. Relative Humidity (%)
            </span>
            <span className="px-2 py-0.5 rounded bg-cyan-100 text-cyan-900 font-mono text-xs">
              {inputs.humidityPercent}%
            </span>
          </div>
          <input
            type="range"
            min="10"
            max="100"
            value={inputs.humidityPercent}
            onChange={(e) => setInputs({ ...inputs, humidityPercent: Number(e.target.value) })}
            className="w-full accent-[#2D6A4F] cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-gray-500 font-mono">
            <span>10% (Arid)</span>
            <span>60% (Moderate)</span>
            <span>100% (Saturated)</span>
          </div>
        </div>

        {/* Input 3: Wind Speed */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-xs font-bold text-[#1B4332] dark:text-gray-200">
            <span className="flex items-center gap-1.5">
              <Wind className="w-4 h-4 text-emerald-600" />
              3. Wind Speed (km/h)
            </span>
            <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 font-mono text-xs">
              {inputs.windSpeedKmh} km/h
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="60"
            value={inputs.windSpeedKmh}
            onChange={(e) => setInputs({ ...inputs, windSpeedKmh: Number(e.target.value) })}
            className="w-full accent-[#2D6A4F] cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-gray-500 font-mono">
            <span>0 (Calm)</span>
            <span>20 (Breezy)</span>
            <span>60 (Gale Force)</span>
          </div>
        </div>

        {/* Input 4: Barometric Pressure */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-xs font-bold text-[#1B4332] dark:text-gray-200">
            <span className="flex items-center gap-1.5">
              <Gauge className="w-4 h-4 text-purple-600" />
              4. Pressure (hPa)
            </span>
            <span className="px-2 py-0.5 rounded bg-purple-100 text-purple-900 font-mono text-xs">
              {inputs.pressureHpa} hPa
            </span>
          </div>
          <input
            type="range"
            min="970"
            max="1030"
            value={inputs.pressureHpa}
            onChange={(e) => setInputs({ ...inputs, pressureHpa: Number(e.target.value) })}
            className="w-full accent-[#2D6A4F] cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-gray-500 font-mono">
            <span>970 (Cyclone Low)</span>
            <span>1013 (Normal)</span>
            <span>1030 (High Pressure)</span>
          </div>
        </div>

        {/* Input 5: Cloud Cover */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-xs font-bold text-[#1B4332] dark:text-gray-200">
            <span className="flex items-center gap-1.5">
              <CloudSun className="w-4 h-4 text-[#2D6A4F]" />
              5. Cloud Cover (%)
            </span>
            <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 font-mono text-xs">
              {inputs.cloudCoverPercent}%
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={inputs.cloudCoverPercent}
            onChange={(e) => setInputs({ ...inputs, cloudCoverPercent: Number(e.target.value) })}
            className="w-full accent-[#2D6A4F] cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-gray-500 font-mono">
            <span>0% (Clear Sky)</span>
            <span>50% (Partly)</span>
            <span>100% (Overcast)</span>
          </div>
        </div>

        {/* Input 6: Season & Location Dropdowns */}
        <div className="space-y-2">
          <div>
            <label className="text-xs font-bold text-[#1B4332] dark:text-gray-200 block mb-1">
              6. Agricultural Season
            </label>
            <select
              value={inputs.season}
              onChange={(e) => setInputs({ ...inputs, season: e.target.value })}
              className="w-full p-2 bg-white dark:bg-gray-800 border border-[#E8EEE3] dark:border-gray-700 rounded-xl text-xs font-medium text-gray-800 dark:text-gray-200 focus:outline-none focus:border-[#2D6A4F]"
            >
              <option value="Monsoon / Rainy Season">Monsoon / Rainy Season (Kharif)</option>
              <option value="Post-Monsoon (Rabi)">Post-Monsoon (Rabi)</option>
              <option value="Summer (Pre-Monsoon)">Summer (Pre-Monsoon)</option>
              <option value="Winter">Winter Season</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-[#1B4332] dark:text-gray-200 block mb-1">
              7. Location / Region
            </label>
            <input
              type="text"
              value={inputs.location}
              onChange={(e) => setInputs({ ...inputs, location: e.target.value })}
              placeholder="e.g. Delta Agricultural Field"
              className="w-full p-2 bg-white dark:bg-gray-800 border border-[#E8EEE3] dark:border-gray-700 rounded-xl text-xs font-medium text-gray-800 dark:text-gray-200 focus:outline-none focus:border-[#2D6A4F]"
            />
          </div>
        </div>
      </div>

      {/* PREDICTION RESULT DISPLAY PANEL */}
      {prediction && (
        <div className="space-y-5 border-t border-[#E8EEE3] dark:border-gray-800 pt-5">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-extrabold text-[#1B4332] dark:text-emerald-200 uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#2D6A4F]" />
              AI Weather Prediction Analysis
            </h3>
            <span className="text-xs font-mono text-gray-500">
              Dew Point: <strong className="text-gray-800 dark:text-gray-200">{prediction.dewPointC}°C</strong>
            </span>
          </div>

          {/* Key Banner Card */}
          <div
            className={`p-6 rounded-3xl text-white shadow-sm transition-all border ${
              prediction.willRain
                ? "bg-[#1B4332] border-emerald-400/30"
                : "bg-[#2D6A4F] border-emerald-300/30"
            }`}
          >
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center text-white border border-white/20 shadow-inner">
                  {prediction.willRain ? (
                    prediction.rainProbabilityPercent > 75 ? (
                      <CloudLightning className="w-9 h-9 text-amber-300" />
                    ) : (
                      <CloudRain className="w-9 h-9 text-cyan-300" />
                    )
                  ) : (
                    <SunMedium className="w-9 h-9 text-amber-300" />
                  )}
                </div>
                <div>
                  <div className="text-2xl font-black tracking-tight">{prediction.statusText}</div>
                  <div className="text-xs text-emerald-100/90 mt-1 flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Expected Timeframe: <strong>{prediction.expectedStartTimeHours}</strong></span>
                  </div>
                </div>
              </div>

              {/* Rain Probability Gauge Pill */}
              <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl text-center min-w-[160px]">
                <div className="text-[10px] uppercase tracking-wider text-emerald-100 font-bold mb-1">
                  Rain Probability
                </div>
                <div className="text-3xl font-black text-white">{prediction.rainProbabilityPercent}%</div>
                <div className="w-full bg-white/20 h-2 rounded-full mt-2 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      prediction.rainProbabilityPercent > 60
                        ? "bg-amber-400"
                        : prediction.rainProbabilityPercent > 35
                        ? "bg-cyan-300"
                        : "bg-emerald-300"
                    }`}
                    style={{ width: `${prediction.rainProbabilityPercent}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 4 Detail Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-[#F9FBF7] dark:bg-gray-800 p-4 rounded-2xl border border-[#E8EEE3] dark:border-gray-700">
              <div className="text-[11px] font-bold text-[#748367] uppercase tracking-wider mb-1">
                Predicted Rainfall
              </div>
              <div className="text-xl font-extrabold text-[#1B4332] dark:text-white flex items-baseline gap-1">
                {prediction.predictedRainfallMm} <span className="text-xs font-medium">mm</span>
              </div>
              <p className="text-[11px] text-gray-500 mt-1">
                {prediction.predictedRainfallMm > 10
                  ? "Heavy volume precipitation"
                  : prediction.predictedRainfallMm > 0
                  ? "Light to moderate drizzle"
                  : "0 mm (Dry)"}
              </p>
            </div>

            <div className="bg-[#F9FBF7] dark:bg-gray-800 p-4 rounded-2xl border border-[#E8EEE3] dark:border-gray-700">
              <div className="text-[11px] font-bold text-[#748367] uppercase tracking-wider mb-1">
                Calculated Dew Point
              </div>
              <div className="text-xl font-extrabold text-[#1B4332] dark:text-white">
                {prediction.dewPointC}°C
              </div>
              <p className="text-[11px] text-gray-500 mt-1">
                Moisture condensation threshold
              </p>
            </div>

            <div className="bg-[#F9FBF7] dark:bg-gray-800 p-4 rounded-2xl border border-[#E8EEE3] dark:border-gray-700">
              <div className="text-[11px] font-bold text-[#748367] uppercase tracking-wider mb-1">
                Rainfastness Risk
              </div>
              <div className="text-xl font-extrabold text-[#1B4332] dark:text-white flex items-center gap-1.5">
                <span
                  className={`px-2 py-0.5 text-xs font-bold rounded-lg ${
                    prediction.sprayRecommendation.rainfastnessRisk === "Severe" ||
                    prediction.sprayRecommendation.rainfastnessRisk === "High"
                      ? "bg-rose-100 text-rose-800"
                      : "bg-emerald-100 text-emerald-800"
                  }`}
                >
                  {prediction.sprayRecommendation.rainfastnessRisk} Risk
                </span>
              </div>
              <p className="text-[11px] text-gray-500 mt-1">Risk of spray wash-off</p>
            </div>

            <div className="bg-[#F9FBF7] dark:bg-gray-800 p-4 rounded-2xl border border-[#E8EEE3] dark:border-gray-700">
              <div className="text-[11px] font-bold text-[#748367] uppercase tracking-wider mb-1">
                Safe to Spray?
              </div>
              <div className="text-xl font-extrabold text-[#1B4332] dark:text-white flex items-center gap-1.5">
                {prediction.sprayRecommendation.safeToSpray ? (
                  <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1 text-sm font-bold">
                    <CheckCircle2 className="w-4 h-4" /> YES (Safe)
                  </span>
                ) : (
                  <span className="text-rose-600 dark:text-rose-400 flex items-center gap-1 text-sm font-bold">
                    <AlertTriangle className="w-4 h-4" /> NO (Unsafe)
                  </span>
                )}
              </div>
              <p className="text-[11px] text-gray-500 mt-1">Chemical application safety</p>
            </div>
          </div>

          {/* Farmer Spray Advisory Banner */}
          <div
            className={`p-4 rounded-2xl border flex items-start gap-3 ${
              prediction.sprayRecommendation.safeToSpray
                ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 text-emerald-950 dark:text-emerald-100"
                : "bg-amber-50 dark:bg-amber-950/40 border-amber-200 text-amber-950 dark:text-amber-100"
            }`}
          >
            {prediction.sprayRecommendation.safeToSpray ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            )}
            <div className="space-y-1">
              <div className="text-xs font-bold uppercase tracking-wider">
                Farmer Spraying Advisory:
              </div>
              <p className="text-xs font-semibold leading-relaxed">
                {prediction.sprayRecommendation.advisoryMessage}
              </p>
              <div className="text-[11px] font-bold text-[#2D6A4F] dark:text-emerald-300 mt-1">
                💡 Recommended Window: {prediction.sprayRecommendation.bestAlternativeWindow}
              </div>
            </div>
          </div>

          {/* Detailed Meteorological Scientific Explanation */}
          <div className="bg-[#F9FBF7] dark:bg-gray-800/80 p-4 rounded-2xl border border-[#E8EEE3] dark:border-gray-700 text-xs text-gray-700 dark:text-gray-300 space-y-1">
            <div className="font-extrabold text-[#1B4332] dark:text-emerald-200 flex items-center gap-1.5">
              <Info className="w-4 h-4 text-[#2D6A4F]" />
              Atmospheric Science Breakdown:
            </div>
            <p className="leading-relaxed">{prediction.meteorologicalExplanation}</p>
            <p className="text-[11px] text-[#748367] mt-1">
              Assessment: {prediction.cloudDensityAssessment}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
