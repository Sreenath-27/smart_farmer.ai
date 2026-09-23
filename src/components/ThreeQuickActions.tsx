import React from "react";
import { Camera, FlaskConical, Calculator, Sparkles, ArrowRight, ShieldCheck } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

interface ThreeQuickActionsProps {
  onOpenScanner: () => void;
  onOpenPesticides: () => void;
  onOpenDosage: () => void;
}

export const ThreeQuickActions: React.FC<ThreeQuickActionsProps> = ({
  onOpenScanner,
  onOpenPesticides,
  onOpenDosage,
}) => {
  const { t } = useLanguage();

  return (
    <section className="my-6">
      <div className="flex items-center justify-between mb-3 px-1">
        <div>
          <h2 className="text-lg font-black text-[#1B4332] dark:text-emerald-100 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            Core Farmer Tools
          </h2>
          <p className="text-xs text-[#748367] dark:text-gray-400 font-medium">
            Quick 1-tap access to plant disease scan, pesticide directory, and 1-acre calculator
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* ICON 1: Upload from Gallery or Camera Access - Shining Emerald Gold Gradient */}
        <button
          onClick={onOpenScanner}
          className="group relative text-left bg-gradient-to-br from-[#1B4332] via-[#2D6A4F] to-[#122E22] hover:from-[#23533e] hover:to-[#1B4332] text-white rounded-3xl p-5 shadow-[0_10px_30px_rgba(45,106,79,0.3)] hover:shadow-[0_15px_35px_rgba(52,211,153,0.5)] transition-all duration-300 transform hover:-translate-y-1 overflow-hidden border-2 border-emerald-400/40"
        >
          {/* Shining Top Light Flare */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-400/20 rounded-full blur-2xl pointer-events-none group-hover:bg-emerald-300/30 transition-all" />

          <div className="flex items-start justify-between mb-3 relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-400 to-lime-300 flex items-center justify-center text-gray-950 shadow-[0_0_20px_rgba(52,211,153,0.8)] border border-white group-hover:scale-110 transition-transform">
              <Camera className="w-6 h-6 text-gray-950 font-black" />
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-950/80 text-amber-300 text-[10px] font-black uppercase tracking-wider border border-amber-300/40 shadow-sm">
              Icon #1
            </span>
          </div>

          <h3 className="text-lg font-black text-white mb-1 flex items-center gap-2 relative z-10 drop-shadow-sm">
            1. {t("uploadCamera")}
          </h3>
          <p className="text-xs text-emerald-100/90 leading-relaxed mb-4 relative z-10 font-medium">
            Take a leaf photo or upload from gallery. Instant plant disease diagnosis, severity %, & solutions.
          </p>

          <div className="inline-flex items-center gap-1.5 text-xs font-black text-gray-950 bg-gradient-to-r from-emerald-300 via-teal-200 to-lime-300 px-4 py-2 rounded-xl shadow-md group-hover:scale-105 transition relative z-10">
            <Camera className="w-3.5 h-3.5 text-gray-950" />
            <span>Open Camera Scanner</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1 text-gray-950 group-hover:translate-x-1 transition-transform" />
          </div>
        </button>

        {/* ICON 2: Types of Pesticides - Shining Deep Forest Cyan Gradient */}
        <button
          onClick={onOpenPesticides}
          className="group relative text-left bg-gradient-to-br from-[#122E22] via-[#1B4332] to-[#2D6A4F] hover:from-[#1B4332] hover:to-[#143326] text-white rounded-3xl p-5 shadow-[0_10px_30px_rgba(27,67,50,0.3)] hover:shadow-[0_15px_35px_rgba(45,212,191,0.5)] transition-all duration-300 transform hover:-translate-y-1 overflow-hidden border-2 border-teal-400/40"
        >
          {/* Shining Top Light Flare */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-teal-400/20 rounded-full blur-2xl pointer-events-none group-hover:bg-teal-300/30 transition-all" />

          <div className="flex items-start justify-between mb-3 relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-teal-300 to-cyan-300 flex items-center justify-center text-gray-950 shadow-[0_0_20px_rgba(45,212,191,0.8)] border border-white group-hover:scale-110 transition-transform">
              <FlaskConical className="w-6 h-6 text-gray-950 font-black" />
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-950/80 text-teal-300 text-[10px] font-black uppercase tracking-wider border border-teal-400/40 shadow-sm">
              Icon #2
            </span>
          </div>

          <h3 className="text-lg font-black text-white mb-1 flex items-center gap-2 relative z-10 drop-shadow-sm">
            2. {t("typesOfPesticides")}
          </h3>
          <p className="text-xs text-emerald-100/90 leading-relaxed mb-4 relative z-10 font-medium">
            Explore bio-pesticides, organic alternatives, chemical fungicides, safety ratings & bottle QR scan.
          </p>

          <div className="inline-flex items-center gap-1.5 text-xs font-black text-gray-950 bg-gradient-to-r from-teal-200 via-emerald-200 to-cyan-200 px-4 py-2 rounded-xl shadow-md group-hover:scale-105 transition relative z-10">
            <FlaskConical className="w-3.5 h-3.5 text-gray-950" />
            <span>Browse Directory</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1 text-gray-950 group-hover:translate-x-1 transition-transform" />
          </div>
        </button>

        {/* ICON 3: How much quantity for 1 Acre - Shining Amber Gold Gradient */}
        <button
          onClick={onOpenDosage}
          className="group relative text-left bg-gradient-to-br from-[#1B4332] via-[#2D6A4F] to-[#0E2018] hover:from-[#23533e] hover:to-[#1B4332] text-white rounded-3xl p-5 shadow-[0_10px_30px_rgba(245,158,11,0.2)] hover:shadow-[0_15px_35px_rgba(251,191,36,0.5)] transition-all duration-300 transform hover:-translate-y-1 overflow-hidden border-2 border-amber-400/40"
        >
          {/* Shining Top Light Flare */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/20 rounded-full blur-2xl pointer-events-none group-hover:bg-amber-300/30 transition-all" />

          <div className="flex items-start justify-between mb-3 relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-300 to-yellow-300 flex items-center justify-center text-gray-950 shadow-[0_0_20px_rgba(251,191,36,0.8)] border border-white group-hover:scale-110 transition-transform">
              <Calculator className="w-6 h-6 text-gray-950 font-black" />
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-950/80 text-amber-300 text-[10px] font-black uppercase tracking-wider border border-amber-300/40 shadow-sm">
              Icon #3
            </span>
          </div>

          <h3 className="text-lg font-black text-white mb-1 flex items-center gap-2 relative z-10 drop-shadow-sm">
            3. {t("dosageFor1Acre")}
          </h3>
          <p className="text-xs text-emerald-100/90 leading-relaxed mb-4 relative z-10 font-medium">
            Calculate exact pesticide (ml/g), water liters, mixing ratio, tank refills & duration for 1 Acre.
          </p>

          <div className="inline-flex items-center gap-1.5 text-xs font-black text-gray-950 bg-gradient-to-r from-amber-300 via-yellow-200 to-emerald-300 px-4 py-2 rounded-xl shadow-md group-hover:scale-105 transition relative z-10">
            <Calculator className="w-3.5 h-3.5 text-gray-950" />
            <span>Calculate 1 Acre</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1 text-gray-950 group-hover:translate-x-1 transition-transform" />
          </div>
        </button>
      </div>
    </section>
  );
};
