import React, { useState } from "react";
import {
  Calculator,
  Droplets,
  Ruler,
  Layers,
  Clock,
  Sparkles,
  CheckCircle2,
  DollarSign,
  AlertTriangle,
  Info,
  RefreshCw,
  Share2,
} from "lucide-react";
import { PESTICIDES_DATABASE } from "../data/pesticidesData";
import { useLanguage } from "../context/LanguageContext";

export const DosageCalculator: React.FC = () => {
  const { t } = useLanguage();

  // Inputs
  const [landUnit, setLandUnit] = useState<"Acre" | "Hectare">("Acre");
  const [landArea, setLandArea] = useState<number>(1.0); // Defaults to 1 Acre as requested!
  const [cropType, setCropType] = useState("Tomato");
  const [selectedPesticideId, setSelectedPesticideId] = useState(PESTICIDES_DATABASE[0].id);
  const [tankCapacityLiters, setTankCapacityLiters] = useState<number>(15); // 15L backpack

  const selectedPesticide =
    PESTICIDES_DATABASE.find((p) => p.id === selectedPesticideId) || PESTICIDES_DATABASE[0];

  // Convert land to Acres for standard calculation (1 Hectare = 2.471 Acres)
  const totalAcres = landUnit === "Acre" ? landArea : landArea * 2.471;

  // Base Specs for 1 Acre:
  // Standard water needed per acre = 200 Liters
  const baseWaterPerAcre = 200;
  const totalWaterRequiredLiters = Math.round(baseWaterPerAcre * totalAcres);

  // Extract base dosage numerical rate per acre
  // e.g., "500 grams in 200 Liters Water" -> 500g, "200 ml in 200 Liters Water" -> 200ml
  const dosageMatch = selectedPesticide.dosagePerAcre.match(/(\d+)\s*(ml|grams|g|kg|L)/i);
  const baseRateValue = dosageMatch ? parseFloat(dosageMatch[1]) : 250;
  const baseRateUnit = dosageMatch ? dosageMatch[2] : "ml";

  const totalPesticideQuantity = Math.round(baseRateValue * totalAcres * 10) / 10;

  // Pesticide per Liter water (Mixing Ratio)
  const mixingRatioPerLiter = Math.round((baseRateValue / baseWaterPerAcre) * 100) / 100;

  // Pesticide needed per single tank refill
  const pesticidePerTankRefill = Math.round(mixingRatioPerLiter * tankCapacityLiters * 10) / 10;

  // Number of Tank Refills
  const numberOfTankRefills = Math.ceil(totalWaterRequiredLiters / tankCapacityLiters);

  // Estimated spray duration (approx 1.5 hours per acre with backpack sprayer, faster with boom/drone)
  const estimatedHours = Math.round((totalAcres * (tankCapacityLiters >= 200 ? 0.5 : 1.5)) * 10) / 10;

  // Cost Estimation
  const estPesticideCost = Math.round(selectedPesticide.pricePerUnit * totalAcres);
  const estLaborCost = Math.round(500 * totalAcres);
  const totalCost = estPesticideCost + estLaborCost;

  return (
    <section className="bg-white dark:bg-gray-900 rounded-3xl p-5 sm:p-6 shadow-sm border border-[#E8EEE3] dark:border-gray-800 my-6 space-y-6">
      {/* Title Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E8EEE3] dark:border-gray-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-[#2D6A4F] text-white flex items-center justify-center font-bold shadow-sm">
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-[#1B4332] dark:text-white flex items-center gap-2">
              3. {t("dosageFor1Acre")} Calculator
            </h2>
            <p className="text-xs text-[#748367] dark:text-gray-400">
              Calculate exact pesticide quantity, mixing ratio & water tank refills
            </p>
          </div>
        </div>

        <div className="px-3 py-1 bg-[#F9FBF7] dark:bg-emerald-950/60 text-[#2D6A4F] dark:text-emerald-300 text-xs font-bold rounded-full border border-[#E8EEE3] dark:border-emerald-800 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#2D6A4F]" />
          <span>Dynamic Real-Time Calculation</span>
        </div>
      </div>

      {/* Input Controls Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 bg-white dark:bg-gray-800 p-5 rounded-2xl border border-gray-200 dark:border-gray-700/80 shadow-sm">
        {/* Input 1: Land Area & Unit */}
        <div>
          <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1.5">
            Land Area ({landUnit})
          </label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min="0.1"
              max="500"
              step="0.25"
              value={landArea}
              onChange={(e) => setLandArea(Math.max(0.1, parseFloat(e.target.value) || 1))}
              className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white font-extrabold text-sm outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <div className="flex rounded-xl overflow-hidden border border-gray-300 dark:border-gray-700 text-xs font-bold">
              <button
                onClick={() => setLandUnit("Acre")}
                className={`px-2.5 py-2 transition ${
                  landUnit === "Acre" ? "bg-emerald-600 text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
                }`}
              >
                Acre
              </button>
              <button
                onClick={() => setLandUnit("Hectare")}
                className={`px-2.5 py-2 transition ${
                  landUnit === "Hectare" ? "bg-emerald-600 text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
                }`}
              >
                Ha
              </button>
            </div>
          </div>
          <span className="text-[10px] text-gray-400 mt-1 block">Default: 1.0 Acre</span>
        </div>

        {/* Input 2: Crop Type */}
        <div>
          <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1.5">
            Crop Type
          </label>
          <select
            value={cropType}
            onChange={(e) => setCropType(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white font-bold text-xs outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="Tomato">Tomato (క్యాప్సికం/టమాటా)</option>
            <option value="Paddy Rice">Paddy Rice (వరి)</option>
            <option value="Cotton">Cotton (పత్తి)</option>
            <option value="Chilli">Chilli (మిరప)</option>
            <option value="Wheat">Wheat (గోధుమ)</option>
            <option value="Maize">Maize (జొన్న/మొక్కజొన్న)</option>
            <option value="Sugarcane">Sugarcane (చెరకు)</option>
            <option value="Mango">Mango (మామిడి)</option>
          </select>
          <span className="text-[10px] text-gray-400 mt-1 block">Adjusts target canopy water volume</span>
        </div>

        {/* Input 3: Select Pesticide */}
        <div>
          <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1.5">
            Pesticide Product
          </label>
          <select
            value={selectedPesticideId}
            onChange={(e) => setSelectedPesticideId(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white font-bold text-xs outline-none focus:ring-2 focus:ring-emerald-500 truncate"
          >
            {PESTICIDES_DATABASE.map((pest) => (
              <option key={pest.id} value={pest.id}>
                {pest.productName}
              </option>
            ))}
          </select>
          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 mt-1 block truncate">
            Rate: {selectedPesticide.dosagePerAcre}
          </span>
        </div>

        {/* Input 4: Water Tank Capacity */}
        <div>
          <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1.5">
            Water Tank Capacity
          </label>
          <select
            value={tankCapacityLiters}
            onChange={(e) => setTankCapacityLiters(parseInt(e.target.value))}
            className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white font-bold text-xs outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value={15}>15 Liters (Knapsack Hand/Battery Sprayer)</option>
            <option value={20}>20 Liters (Heavy Duty Battery Pump)</option>
            <option value={200}>200 Liters (Drum Sprayer / Tractor Mounted)</option>
            <option value={500}>500 Liters (Boom Sprayer Tank)</option>
          </select>
          <span className="text-[10px] text-gray-400 mt-1 block">Used to calculate tank refills</span>
        </div>
      </div>

      {/* Main Calculated Results Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Total Pesticide Needed */}
        <div className="bg-[#2D6A4F] text-white p-5 rounded-2xl shadow-sm relative overflow-hidden">
          <div className="text-[11px] uppercase tracking-wider text-emerald-100 font-bold mb-1">
            Pesticide Quantity ({landArea} {landUnit})
          </div>
          <div className="text-2xl font-black tracking-tight">
            {totalPesticideQuantity} {baseRateUnit}
          </div>
          <p className="text-xs text-emerald-100/90 mt-1">
            ({baseRateValue} {baseRateUnit} per 1 Acre)
          </p>
        </div>

        {/* Metric 2: Total Water Required */}
        <div className="bg-[#1B4332] text-white p-5 rounded-2xl shadow-sm relative overflow-hidden">
          <div className="text-[11px] uppercase tracking-wider text-emerald-200 font-bold mb-1">
            Total Water Required
          </div>
          <div className="text-2xl font-black tracking-tight">
            {totalWaterRequiredLiters} Liters
          </div>
          <p className="text-xs text-emerald-200/90 mt-1">
            (200L water per 1 Acre)
          </p>
        </div>

        {/* Metric 3: Tank Refills Needed */}
        <div className="bg-[#2D6A4F] text-white p-5 rounded-2xl shadow-sm relative overflow-hidden">
          <div className="text-[11px] uppercase tracking-wider text-emerald-100 font-bold mb-1">
            Tank Refills Needed
          </div>
          <div className="text-2xl font-black tracking-tight">
            {numberOfTankRefills} Refills
          </div>
          <p className="text-xs text-emerald-100/90 mt-1">
            ({tankCapacityLiters}L per tank refill)
          </p>
        </div>

        {/* Metric 4: Estimated Spray Duration */}
        <div className="bg-[#1B4332] text-white p-5 rounded-2xl shadow-sm relative overflow-hidden">
          <div className="text-[11px] uppercase tracking-wider text-emerald-200 font-bold mb-1">
            Estimated Spray Duration
          </div>
          <div className="text-2xl font-black tracking-tight">
            ~{estimatedHours} Hours
          </div>
          <p className="text-xs text-emerald-300 mt-1">
            Est. Total Cost: ₹{totalCost}
          </p>
        </div>
      </div>

      {/* Mixing Step-by-Step Practical Recipe Box */}
      <div className="bg-[#1B4332] text-white p-5 rounded-2xl shadow-sm border border-[#E8EEE3]/20 space-y-3">
        <div className="flex items-center justify-between border-b border-[#2D6A4F]/60 pb-2">
          <h3 className="text-sm font-extrabold text-emerald-100 flex items-center gap-2">
            <Droplets className="w-4 h-4 text-emerald-400" />
            Farmer Mixing Guide Recipe for {landArea} {landUnit} ({selectedPesticide.productName})
          </h3>
          <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#2D6A4F]/60 text-emerald-200 font-mono">
            Mixing Ratio: {mixingRatioPerLiter} {baseRateUnit} / Liter Water
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="bg-emerald-950/60 p-3 rounded-xl border border-emerald-700/40">
            <span className="text-emerald-400 font-bold block mb-1">Step 1: Single Tank Dose</span>
            For each <strong>{tankCapacityLiters} Liter tank refill</strong>, add exactly{" "}
            <strong className="text-emerald-300 underline font-black">{pesticidePerTankRefill} {baseRateUnit}</strong> of{" "}
            {selectedPesticide.productName}.
          </div>

          <div className="bg-emerald-950/60 p-3 rounded-xl border border-emerald-700/40">
            <span className="text-emerald-400 font-bold block mb-1">Step 2: Mixing Technique</span>
            Dissolve the pesticide in a small 2-liter bucket of water first, stir thoroughly, then pour into the main {tankCapacityLiters}L spray tank and top up with clean water.
          </div>

          <div className="bg-emerald-950/60 p-3 rounded-xl border border-emerald-700/40">
            <span className="text-emerald-400 font-bold block mb-1">Step 3: Spraying Routine</span>
            Spray uniformly across leaves in morning hours (6 AM - 9 AM) or evening. Repeat total {numberOfTankRefills} tank refills.
          </div>
        </div>

        {/* Safety Note */}
        <p className="text-[11px] text-amber-200 bg-amber-950/50 p-2.5 rounded-xl border border-amber-800/50 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0" />
          <span>
            <strong>Safety Warning:</strong> {selectedPesticide.safetyInstructions} Harvest Waiting Period: <strong>{selectedPesticide.waitingPeriodDays} Days</strong>.
          </span>
        </p>
      </div>
    </section>
  );
};
