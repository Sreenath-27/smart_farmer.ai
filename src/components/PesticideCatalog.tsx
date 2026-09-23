import React, { useState } from "react";
import {
  FlaskConical,
  Search,
  Filter,
  ShieldCheck,
  AlertOctagon,
  Clock,
  QrCode,
  Check,
  X,
  Info,
  DollarSign,
  ChevronRight,
  Leaf,
} from "lucide-react";
import { PESTICIDES_DATABASE } from "../data/pesticidesData";
import { PesticideCatalogItem } from "../types";
import { useLanguage } from "../context/LanguageContext";

interface PesticideCatalogProps {
  onSelectForDosage?: (pesticide: PesticideCatalogItem) => void;
}

export const PesticideCatalog: React.FC<PesticideCatalogProps> = ({ onSelectForDosage }) => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeItem, setActiveItem] = useState<PesticideCatalogItem | null>(null);
  const [showQrModal, setShowQrModal] = useState(false);
  const [scannedResult, setScannedResult] = useState<PesticideCatalogItem | null>(null);

  const categories = ["All", "Bio/Organic", "Chemical Fungicide", "Insecticide", "Bactericide"];

  const filteredPesticides = PESTICIDES_DATABASE.filter((item) => {
    const matchesCategory =
      selectedCategory === "All" || item.category.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesSearch =
      item.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.activeIngredient.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.targetCrops.some((c) => c.toLowerCase().includes(searchQuery.toLowerCase())) ||
      item.targetDiseases.some((d) => d.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleSimulateQrScan = () => {
    // Pick random item from database
    const randomPest = PESTICIDES_DATABASE[Math.floor(Math.random() * PESTICIDES_DATABASE.length)];
    setScannedResult(randomPest);
  };

  const getToxicityBadgeClass = (level: string) => {
    if (level.includes("Red")) return "bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/80 dark:text-rose-200";
    if (level.includes("Yellow")) return "bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/80 dark:text-amber-200";
    if (level.includes("Blue")) return "bg-sky-100 text-sky-800 border-sky-300 dark:bg-sky-950/80 dark:text-sky-200";
    return "bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/80 dark:text-emerald-200";
  };

  return (
    <section className="bg-white dark:bg-gray-900 rounded-3xl p-5 sm:p-6 shadow-sm border border-[#E8EEE3] dark:border-gray-800 my-6 space-y-6">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E8EEE3] dark:border-gray-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-[#2D6A4F]/10 text-[#2D6A4F] dark:text-emerald-300 flex items-center justify-center font-bold">
              <FlaskConical className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-[#1B4332] dark:text-white flex items-center gap-2">
                2. {t("typesOfPesticides")}
              </h2>
              <p className="text-xs text-[#748367] dark:text-gray-400">
                Scientifically approved bio-pesticides, fungicides, insecticides & safety guide
              </p>
            </div>
          </div>
        </div>

        {/* Scan Bottle QR Simulator */}
        <button
          onClick={() => {
            setShowQrModal(true);
            setScannedResult(null);
          }}
          className="px-4 py-2 bg-[#2D6A4F] hover:bg-[#23533e] text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-sm transition active:scale-95"
        >
          <QrCode className="w-4 h-4" />
          <span>Scan Bottle QR Code</span>
        </button>
      </div>

      {/* Search & Filter Options */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search by product name, active ingredient, crop (e.g. Tomato, Paddy)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-xs outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                selectedCategory === cat
                  ? "bg-teal-700 text-white shadow-md"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Pesticide Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPesticides.map((item) => (
          <div
            key={item.id}
            className="bg-gray-50 dark:bg-gray-800/80 rounded-2xl p-4 border border-gray-200 dark:border-gray-700/80 hover:border-teal-500/50 transition shadow-sm hover:shadow-md flex flex-col justify-between space-y-3"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <span className="text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider bg-teal-100 text-teal-800 dark:bg-teal-900/60 dark:text-teal-300">
                  {item.category}
                </span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${getToxicityBadgeClass(item.toxicityLevel)}`}>
                  {item.toxicityLevel}
                </span>
              </div>

              <h3 className="text-sm font-extrabold text-gray-900 dark:text-white leading-snug">
                {item.productName}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                Active: <span className="font-semibold text-gray-700 dark:text-gray-300">{item.activeIngredient}</span>
              </p>
              <p className="text-[11px] text-gray-400 dark:text-gray-500">
                Mfr: {item.manufacturer}
              </p>

              {/* Dosage & Waiting Period */}
              <div className="mt-3 bg-white dark:bg-gray-900 p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 space-y-1 text-xs">
                <div className="flex justify-between text-gray-700 dark:text-gray-300">
                  <span className="text-gray-400 font-medium">Dosage / Acre:</span>
                  <span className="font-bold">{item.dosagePerAcre}</span>
                </div>
                <div className="flex justify-between text-gray-700 dark:text-gray-300">
                  <span className="text-gray-400 font-medium">Harvest Waiting:</span>
                  <span className="font-bold text-amber-600 dark:text-amber-400">{item.waitingPeriodDays} Days</span>
                </div>
                <div className="flex justify-between text-gray-700 dark:text-gray-300">
                  <span className="text-gray-400 font-medium">Spray Timing:</span>
                  <span className="font-bold">{item.sprayTiming}</span>
                </div>
              </div>

              {/* Target Crops */}
              <div className="mt-2">
                <span className="text-[10px] font-bold text-gray-400 uppercase">Target Crops:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {item.targetCrops.map((crop, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-0.5 rounded-md font-medium"
                    >
                      {crop}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-2 border-t border-gray-200 dark:border-gray-700/60 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-gray-400 uppercase block">Est. Price</span>
                <span className="text-sm font-extrabold text-teal-700 dark:text-teal-400">
                  ₹{item.pricePerUnit} <span className="text-[10px] font-normal text-gray-400">/ {item.unit}</span>
                </span>
              </div>

              <button
                onClick={() => setActiveItem(item)}
                className="px-3 py-1.5 bg-teal-800 hover:bg-teal-900 text-white text-xs font-bold rounded-lg transition flex items-center gap-1"
              >
                <span>Full Safety Guide</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal for Selected Pesticide */}
      {activeItem && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-900 w-full max-w-2xl rounded-3xl p-6 shadow-2xl border border-teal-500/30 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-gray-200 dark:border-gray-800 pb-3">
              <div>
                <span className="text-xs font-bold text-teal-600 dark:text-teal-400 uppercase">
                  {activeItem.category}
                </span>
                <h3 className="text-xl font-extrabold text-gray-900 dark:text-white">
                  {activeItem.productName}
                </h3>
                <p className="text-xs text-gray-500">Mfr: {activeItem.manufacturer}</p>
              </div>
              <button
                onClick={() => setActiveItem(null)}
                className="p-1 rounded-full text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-gray-700 dark:text-gray-300">
              <div className="p-3 bg-teal-50 dark:bg-teal-950/40 rounded-xl border border-teal-200 dark:border-teal-800 space-y-1">
                <div><strong>Active Ingredient:</strong> {activeItem.activeIngredient}</div>
                <div><strong>Toxicity Rating:</strong> {activeItem.toxicityLevel}</div>
                <div><strong>Dosage per Acre:</strong> {activeItem.dosagePerAcre}</div>
                <div><strong>Dosage per Liter Water:</strong> {activeItem.dosagePerLiterWater}</div>
              </div>

              <div>
                <strong className="block text-gray-900 dark:text-white font-bold mb-1">Safety & Mixing Instructions:</strong>
                <p className="p-3 bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 rounded-xl border border-amber-200 dark:border-amber-800/60 leading-relaxed">
                  {activeItem.safetyInstructions}
                </p>
              </div>

              {activeItem.organicAlternative && (
                <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800 flex items-start gap-2">
                  <Leaf className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-emerald-900 dark:text-emerald-300 font-bold block">Organic / Bio Alternative:</strong>
                    <span>{activeItem.organicAlternative}</span>
                  </div>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-gray-200 dark:border-gray-800 flex justify-end">
              <button
                onClick={() => setActiveItem(null)}
                className="px-5 py-2 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-xs font-bold rounded-xl"
              >
                Close Guide
              </button>
            </div>
          </div>
        </div>
      )}

      {/* QR Code Scanner Simulation Modal */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-900 w-full max-w-md rounded-3xl p-6 shadow-2xl border border-teal-500/30 text-center space-y-4">
            <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-800 pb-3">
              <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <QrCode className="w-5 h-5 text-teal-600" />
                Pesticide Bottle QR Scanner
              </h3>
              <button onClick={() => setShowQrModal(false)} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {!scannedResult ? (
              <div className="space-y-4 py-4">
                <div className="w-48 h-48 mx-auto border-4 border-dashed border-teal-500 rounded-2xl flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-800 relative overflow-hidden">
                  <QrCode className="w-16 h-16 text-teal-600 animate-pulse" />
                  <div className="absolute inset-x-0 h-0.5 bg-teal-500 top-1/2 animate-ping" />
                  <p className="text-[11px] text-gray-400 mt-3 font-medium">Point camera at bottle QR code</p>
                </div>

                <button
                  onClick={handleSimulateQrScan}
                  className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow transition"
                >
                  Simulate Scanning Bottle Barcode / QR
                </button>
              </div>
            ) : (
              <div className="text-left bg-teal-50 dark:bg-teal-950/40 p-4 rounded-2xl border border-teal-300 dark:border-teal-800 space-y-2">
                <div className="flex items-center gap-2 text-teal-700 dark:text-teal-300 text-xs font-bold">
                  <Check className="w-4 h-4 text-teal-600" />
                  Bottle QR Code Verified: {scannedResult.qrCodeId}
                </div>
                <h4 className="text-sm font-extrabold text-gray-900 dark:text-white">{scannedResult.productName}</h4>
                <p className="text-xs text-gray-600 dark:text-gray-300">Active: {scannedResult.activeIngredient}</p>
                <p className="text-xs text-gray-600 dark:text-gray-300"><strong>Dosage/Acre:</strong> {scannedResult.dosagePerAcre}</p>
                <p className="text-[11px] text-amber-800 dark:text-amber-200 bg-amber-100/50 dark:bg-amber-900/30 p-2 rounded-lg">
                  <strong>Safety Note:</strong> {scannedResult.safetyInstructions}
                </p>

                <button
                  onClick={() => setShowQrModal(false)}
                  className="w-full mt-2 py-2 bg-teal-800 text-white text-xs font-bold rounded-xl"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
