import React, { useState } from "react";
import {
  BookmarkCheck,
  BookOpen,
  Calendar,
  CheckCircle2,
  Trash2,
  MapPin,
  Plus,
  PlusCircle,
  FileText,
  Clock,
  Sparkles,
  AlertTriangle,
  ChevronRight,
  ShieldAlert,
} from "lucide-react";
import { useHistory } from "../context/HistoryContext";
import { useLanguage } from "../context/LanguageContext";

export const HistoryAndSavedMenu: React.FC = () => {
  const {
    savedScans,
    deleteScanResult,
    toggleTreatmentApplied,
    farmPlots,
    addFarmPlot,
    diaryEntries,
    addDiaryEntry,
  } = useHistory();

  const { t } = useLanguage();

  const [activeTab, setActiveTab] = useState<"scans" | "diary" | "farms">("scans");

  // New Diary Entry Form state
  const [showAddDiaryModal, setShowAddDiaryModal] = useState(false);
  const [diaryPlotName, setDiaryPlotName] = useState(farmPlots[0]?.name || "North Acre Tomato Field");
  const [diaryActivity, setDiaryActivity] = useState<"Pesticide Spray" | "Fertilizer" | "Irrigation" | "Disease Inspection">("Pesticide Spray");
  const [diaryProduct, setDiaryProduct] = useState("Copper Oxychloride 50% WP");
  const [diaryQuantity, setDiaryQuantity] = useState("500g in 200L Water");
  const [diaryNotes, setDiaryNotes] = useState("");

  // New Farm Plot Form state
  const [showAddPlotModal, setShowAddPlotModal] = useState(false);
  const [plotName, setPlotName] = useState("");
  const [plotLocation, setPlotLocation] = useState("");
  const [plotAcres, setPlotAcres] = useState("2.0");
  const [plotCrops, setPlotCrops] = useState("Paddy Rice");

  const handleSaveDiary = (e: React.FormEvent) => {
    e.preventDefault();
    addDiaryEntry({
      date: new Date().toISOString().split("T")[0],
      farmPlotName: diaryPlotName,
      activityType: diaryActivity,
      productUsed: diaryProduct,
      quantityApplied: diaryQuantity,
      weatherCondition: "Clear Weather 29°C",
      notes: diaryNotes || "Spray completed as scheduled.",
    });
    setShowAddDiaryModal(false);
    setDiaryNotes("");
  };

  const handleSavePlot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!plotName) return;
    addFarmPlot({
      name: plotName,
      location: plotLocation || "Local Farm Plot",
      acres: parseFloat(plotAcres) || 1.0,
      cropsGrown: plotCrops || "Vegetables",
      infectedZonesCount: 0,
      healthScorePercent: 95,
      lastScanDate: new Date().toISOString().split("T")[0],
    });
    setShowAddPlotModal(false);
    setPlotName("");
  };

  return (
    <section id="history-saved-section" className="bg-white dark:bg-gray-900 rounded-3xl p-5 sm:p-6 shadow-sm border border-[#E8EEE3] dark:border-gray-800 my-6 space-y-6">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E8EEE3] dark:border-gray-800 pb-4">
        <div>
          <h2 className="text-xl font-extrabold text-[#1B4332] dark:text-white flex items-center gap-2">
            <BookmarkCheck className="w-6 h-6 text-[#2D6A4F] dark:text-emerald-400" />
            {t("savedMenu")} (Scan Records, Diary & Saved Farms)
          </h2>
          <p className="text-xs text-[#748367] dark:text-gray-400">
            Review past disease scan reports, log spray history & monitor farm health tracking
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-1.5 bg-[#F9FBF7] dark:bg-gray-800 p-1 rounded-2xl border border-[#E8EEE3] dark:border-gray-700">
          <button
            onClick={() => setActiveTab("scans")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === "scans"
                ? "bg-[#2D6A4F] text-white shadow-sm"
                : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Saved Scans ({savedScans.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("diary")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === "diary"
                ? "bg-[#2D6A4F] text-white shadow-sm"
                : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Farm Diary ({diaryEntries.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("farms")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === "farms"
                ? "bg-[#2D6A4F] text-white shadow-sm"
                : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Saved Farms ({farmPlots.length})</span>
          </button>
        </div>
      </div>

      {/* TAB 1: SAVED SCANS */}
      {activeTab === "scans" && (
        <div className="space-y-4">
          {savedScans.length === 0 ? (
            <div className="text-center py-10 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-2xl">
              <BookOpen className="w-10 h-10 text-gray-300 mx-auto mb-2" />
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">No saved plant scans yet</p>
              <p className="text-xs text-gray-400 mt-1">Use the Camera Scanner above to analyze a leaf and click 'Save Scan Report'.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {savedScans.map((scan) => (
                <div
                  key={scan.id}
                  className="bg-gray-50 dark:bg-gray-800/80 rounded-2xl p-4 border border-gray-200 dark:border-gray-700 space-y-3 shadow-sm hover:shadow-md transition"
                >
                  <div className="flex items-start gap-3">
                    <img
                      src={scan.imageUrl}
                      alt={scan.cropName}
                      className="w-16 h-16 rounded-xl object-cover border border-gray-300 dark:border-gray-600 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-[10px] text-gray-400 font-mono">
                          {new Date(scan.timestamp).toLocaleDateString()}
                        </span>
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                            scan.severity === "High"
                              ? "bg-rose-100 text-rose-800 dark:bg-rose-950/80 dark:text-rose-200"
                              : "bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-200"
                          }`}
                        >
                          {scan.severity} Severity
                        </span>
                      </div>
                      <h4 className="text-sm font-extrabold text-gray-900 dark:text-white truncate">
                        {scan.diseaseName}
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Crop: <strong>{scan.cropName}</strong> ({scan.confidencePercent}% AI match)
                      </p>
                    </div>
                  </div>

                  {/* Treatment Applied Status */}
                  <div className="bg-white dark:bg-gray-900 p-2.5 rounded-xl border border-gray-200 dark:border-gray-700/80 flex items-center justify-between text-xs">
                    <button
                      onClick={() => toggleTreatmentApplied(scan.id)}
                      className={`flex items-center gap-2 font-bold transition ${
                        scan.treatmentApplied
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
                      }`}
                    >
                      <CheckCircle2
                        className={`w-4 h-4 ${
                          scan.treatmentApplied ? "text-emerald-600 fill-emerald-100" : "text-gray-400"
                        }`}
                      />
                      <span>{scan.treatmentApplied ? "Pesticide Treatment Applied" : "Mark Treatment Completed"}</span>
                    </button>

                    <button
                      onClick={() => deleteScanResult(scan.id)}
                      className="text-gray-400 hover:text-rose-600 transition p-1"
                      title="Delete saved report"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: FARM DIARY */}
      {activeTab === "diary" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Record spray dates, fertilizers, weather conditions & pesticide applications
            </p>
            <button
              onClick={() => setShowAddDiaryModal(true)}
              className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow transition"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Log New Application</span>
            </button>
          </div>

          <div className="space-y-3">
            {diaryEntries.map((entry) => (
              <div
                key={entry.id}
                className="bg-gray-50 dark:bg-gray-800/80 rounded-2xl p-4 border border-gray-200 dark:border-gray-700/80 space-y-2 text-xs"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-200 dark:border-gray-700/60 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold">
                      {entry.activityType}
                    </span>
                    <span className="font-extrabold text-gray-900 dark:text-white">
                      {entry.farmPlotName}
                    </span>
                  </div>
                  <span className="text-gray-400 font-mono text-[11px]">{entry.date}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-700 dark:text-gray-300">
                  <div><strong>Product Applied:</strong> {entry.productUsed}</div>
                  <div><strong>Quantity:</strong> {entry.quantityApplied}</div>
                  <div><strong>Weather:</strong> {entry.weatherCondition}</div>
                  <div><strong>Notes:</strong> {entry.notes}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: SAVED FARMS */}
      {activeTab === "farms" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Monitor infection heatmaps and plot protection levels across your land plots
            </p>
            <button
              onClick={() => setShowAddPlotModal(true)}
              className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow transition"
            >
              <Plus className="w-4 h-4" />
              <span>Add Farm Plot</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {farmPlots.map((plot) => (
              <div
                key={plot.id}
                className="bg-gray-50 dark:bg-gray-800/80 rounded-2xl p-4 border border-gray-200 dark:border-gray-700 space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-sm font-extrabold text-gray-900 dark:text-white">
                      {plot.name}
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                      {plot.location} ({plot.acres} Acres)
                    </p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 text-xs font-bold">
                    {plot.healthScorePercent}% Health
                  </span>
                </div>

                <div className="text-xs text-gray-600 dark:text-gray-300">
                  <strong>Crops Grown:</strong> {plot.cropsGrown}
                </div>

                {/* Heatmap Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] text-gray-500">
                    <span>Infection Area Tracker</span>
                    <span>{plot.infectedZonesCount} infected zones</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden flex">
                    <div
                      style={{ width: `${100 - plot.healthScorePercent}%` }}
                      className="bg-rose-500 h-full"
                    />
                    <div
                      style={{ width: `${plot.healthScorePercent}%` }}
                      className="bg-emerald-500 h-full"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Diary Modal */}
      {showAddDiaryModal && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <form onSubmit={handleSaveDiary} className="bg-white dark:bg-gray-900 w-full max-w-md rounded-2xl p-5 space-y-3">
            <h3 className="text-base font-bold text-gray-900 dark:text-white">Log Farm Treatment Application</h3>
            
            <div>
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">Select Farm Plot</label>
              <select
                value={diaryPlotName}
                onChange={(e) => setDiaryPlotName(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-gray-300 dark:border-gray-700 text-xs bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                {farmPlots.map((p) => (
                  <option key={p.id} value={p.name}>{p.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">Product Applied</label>
              <input
                type="text"
                value={diaryProduct}
                onChange={(e) => setDiaryProduct(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-gray-300 dark:border-gray-700 text-xs bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
                required
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">Quantity / Dosage Applied</label>
              <input
                type="text"
                value={diaryQuantity}
                onChange={(e) => setDiaryQuantity(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-gray-300 dark:border-gray-700 text-xs bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
                required
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">Notes</label>
              <textarea
                value={diaryNotes}
                onChange={(e) => setDiaryNotes(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-gray-300 dark:border-gray-700 text-xs bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
                rows={2}
                placeholder="Targeted leaf blight, clear weather..."
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowAddDiaryModal(false)}
                className="px-4 py-2 text-xs font-bold bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-xs font-bold bg-emerald-600 text-white rounded-xl shadow"
              >
                Save Entry
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Add Plot Modal */}
      {showAddPlotModal && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <form onSubmit={handleSavePlot} className="bg-white dark:bg-gray-900 w-full max-w-md rounded-2xl p-5 space-y-3">
            <h3 className="text-base font-bold text-gray-900 dark:text-white">Add New Farm Plot</h3>

            <div>
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">Plot Name</label>
              <input
                type="text"
                placeholder="e.g. East Acre Cotton Field"
                value={plotName}
                onChange={(e) => setPlotName(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-gray-300 dark:border-gray-700 text-xs bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
                required
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">Location / Village</label>
              <input
                type="text"
                placeholder="e.g. Tenali Sector 3"
                value={plotLocation}
                onChange={(e) => setPlotLocation(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-gray-300 dark:border-gray-700 text-xs bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">Size in Acres</label>
              <input
                type="number"
                step="0.5"
                value={plotAcres}
                onChange={(e) => setPlotAcres(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-gray-300 dark:border-gray-700 text-xs bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowAddPlotModal(false)}
                className="px-4 py-2 text-xs font-bold bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-xs font-bold bg-emerald-600 text-white rounded-xl shadow"
              >
                Add Plot
              </button>
            </div>
          </form>
        </div>
      )}
    </section>
  );
};
