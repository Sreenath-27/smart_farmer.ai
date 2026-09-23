import React, { createContext, useContext, useState, useEffect } from "react";
import { PlantScanResult, FarmPlot, FarmDiaryEntry } from "../types";
import { SAMPLE_CROP_PHOTOS } from "../data/sampleScans";

interface HistoryContextType {
  savedScans: PlantScanResult[];
  addScanResult: (scan: PlantScanResult) => void;
  deleteScanResult: (id: string) => void;
  toggleTreatmentApplied: (id: string) => void;
  
  farmPlots: FarmPlot[];
  addFarmPlot: (plot: Omit<FarmPlot, "id">) => void;
  
  diaryEntries: FarmDiaryEntry[];
  addDiaryEntry: (entry: Omit<FarmDiaryEntry, "id">) => void;
  
  isOffline: boolean;
  toggleOfflineMode: () => void;
}

const HistoryContext = createContext<HistoryContextType | undefined>(undefined);

const INITIAL_SCANS: PlantScanResult[] = [
  SAMPLE_CROP_PHOTOS[0].sampleResult,
  SAMPLE_CROP_PHOTOS[1].sampleResult,
];

const INITIAL_PLOTS: FarmPlot[] = [
  {
    id: "plot-1",
    name: "North Acre Tomato Field",
    location: "Guntur Plot 4B",
    acres: 1.5,
    cropsGrown: "Tomato (Hybrid 3150)",
    infectedZonesCount: 2,
    healthScorePercent: 78,
    lastScanDate: "2026-07-25",
  },
  {
    id: "plot-2",
    name: "River Bank Paddy Field",
    location: "Vangara Sector A",
    acres: 2.0,
    cropsGrown: "Paddy Rice (BPT 5204)",
    infectedZonesCount: 1,
    healthScorePercent: 88,
    lastScanDate: "2026-07-26",
  },
];

const INITIAL_DIARY: FarmDiaryEntry[] = [
  {
    id: "diary-1",
    date: "2026-07-25",
    farmPlotName: "North Acre Tomato Field",
    activityType: "Pesticide Spray",
    productUsed: "Copper Oxychloride 50% WP",
    quantityApplied: "750g in 300L Water (1.5 Acres)",
    weatherCondition: "Clear Morning 28°C",
    notes: "Targeted Early Blight spot outbreak on lower branches.",
  },
  {
    id: "diary-2",
    date: "2026-07-20",
    farmPlotName: "River Bank Paddy Field",
    activityType: "Fertilizer",
    productUsed: "Neem Coated Urea + Potash",
    quantityApplied: "50 kg Urea + 25 kg MOP",
    weatherCondition: "Overcast",
    notes: "Second top dressing applied before boot leaf stage.",
  },
];

export const HistoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [savedScans, setSavedScans] = useState<PlantScanResult[]>(() => {
    try {
      const saved = localStorage.getItem("agriguard_saved_scans");
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error("Error loading saved scans", e);
    }
    return INITIAL_SCANS;
  });

  const [farmPlots, setFarmPlots] = useState<FarmPlot[]>(() => {
    try {
      const saved = localStorage.getItem("agriguard_farm_plots");
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error("Error loading farm plots", e);
    }
    return INITIAL_PLOTS;
  });

  const [diaryEntries, setDiaryEntries] = useState<FarmDiaryEntry[]>(() => {
    try {
      const saved = localStorage.getItem("agriguard_diary_entries");
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error("Error loading diary entries", e);
    }
    return INITIAL_DIARY;
  });

  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    localStorage.setItem("agriguard_saved_scans", JSON.stringify(savedScans));
  }, [savedScans]);

  useEffect(() => {
    localStorage.setItem("agriguard_farm_plots", JSON.stringify(farmPlots));
  }, [farmPlots]);

  useEffect(() => {
    localStorage.setItem("agriguard_diary_entries", JSON.stringify(diaryEntries));
  }, [diaryEntries]);

  const addScanResult = (scan: PlantScanResult) => {
    setSavedScans((prev) => [scan, ...prev]);
  };

  const deleteScanResult = (id: string) => {
    setSavedScans((prev) => prev.filter((s) => s.id !== id));
  };

  const toggleTreatmentApplied = (id: string) => {
    setSavedScans((prev) =>
      prev.map((s) => (s.id === id ? { ...s, treatmentApplied: !s.treatmentApplied } : s))
    );
  };

  const addFarmPlot = (plot: Omit<FarmPlot, "id">) => {
    const newPlot: FarmPlot = { ...plot, id: `plot-${Date.now()}` };
    setFarmPlots((prev) => [...prev, newPlot]);
  };

  const addDiaryEntry = (entry: Omit<FarmDiaryEntry, "id">) => {
    const newEntry: FarmDiaryEntry = { ...entry, id: `diary-${Date.now()}` };
    setDiaryEntries((prev) => [newEntry, ...prev]);
  };

  const toggleOfflineMode = () => {
    setIsOffline((prev) => !prev);
  };

  return (
    <HistoryContext.Provider
      value={{
        savedScans,
        addScanResult,
        deleteScanResult,
        toggleTreatmentApplied,
        farmPlots,
        addFarmPlot,
        diaryEntries,
        addDiaryEntry,
        isOffline,
        toggleOfflineMode,
      }}
    >
      {children}
    </HistoryContext.Provider>
  );
};

export const useHistory = () => {
  const ctx = useContext(HistoryContext);
  if (!ctx) throw new Error("useHistory must be used within HistoryProvider");
  return ctx;
};
