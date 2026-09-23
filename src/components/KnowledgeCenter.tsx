import React, { useState } from "react";
import {
  BookOpen,
  Award,
  Calendar,
  CheckCircle2,
  ExternalLink,
  Search,
  Sparkles,
} from "lucide-react";
import { GOVERNMENT_SCHEMES } from "../data/knowledgeBase";

export const KnowledgeCenter: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "Subsidy", "Equipment", "Insurance"];

  const filteredSchemes = GOVERNMENT_SCHEMES.filter(
    (s) => selectedCategory === "All" || s.category === selectedCategory
  );

  return (
    <section className="bg-white dark:bg-gray-900 rounded-3xl p-5 sm:p-6 shadow-sm border border-[#E8EEE3] dark:border-gray-800 my-6 space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E8EEE3] dark:border-gray-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#2D6A4F]/10 text-[#2D6A4F] dark:text-emerald-300 flex items-center justify-center font-bold">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-[#1B4332] dark:text-white">
              Government Subsidies & Agriculture Knowledge
            </h2>
            <p className="text-xs text-[#748367] dark:text-gray-400">
              PM-KISAN ₹6000, 50%-80% Sprayer & Drone subsidies, Fasal Bima crop insurance
            </p>
          </div>
        </div>

        <div className="flex gap-1.5 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                selectedCategory === cat
                  ? "bg-amber-600 text-white shadow-sm"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredSchemes.map((scheme) => (
          <div
            key={scheme.id}
            className="bg-gray-50 dark:bg-gray-800/80 rounded-2xl p-4 border border-gray-200 dark:border-gray-700 space-y-3"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-200 font-bold">
                {scheme.category}
              </span>
              <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400">
                {scheme.subsidyPercent}
              </span>
            </div>

            <h3 className="text-sm font-extrabold text-gray-900 dark:text-white">
              {scheme.title}
            </h3>

            <div className="space-y-1 text-xs text-gray-600 dark:text-gray-300">
              <p><strong>Benefits:</strong> {scheme.benefits}</p>
              <p><strong>Eligibility:</strong> {scheme.eligibility}</p>
              <p><strong>How to Apply:</strong> {scheme.howToApply}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
