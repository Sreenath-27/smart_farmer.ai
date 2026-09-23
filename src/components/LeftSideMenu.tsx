import React, { useState } from "react";
import {
  Menu,
  X,
  User,
  Sprout,
  CloudRain,
  Calculator,
  Pill,
  BookOpen,
  Store,
  Users,
  BookmarkCheck,
  Globe,
  Sun,
  Moon,
  MapPin,
  LogIn,
  ChevronRight,
  Code,
  Sparkles,
  Navigation,
  CheckCircle2,
  Github,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import { SUPPORTED_LANGUAGES } from "../data/languages";

interface LeftSideMenuProps {
  onOpenScanner: () => void;
  onOpenAiBot: () => void;
  onOpenLoginPage: () => void;
  onOpenDevAccess?: () => void;
  onSelectTab?: (tabId: string) => void;
  isOpenExternal?: boolean;
  onCloseExternal?: () => void;
  onOpenExternal?: () => void;
}

export const LeftSideMenu: React.FC<LeftSideMenuProps> = ({
  onOpenScanner,
  onOpenAiBot,
  onOpenLoginPage,
  onOpenDevAccess,
  onSelectTab,
  isOpenExternal,
  onCloseExternal,
  onOpenExternal,
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const { user, requestExactLocation, isLocating } = useAuth();
  const { language, setLanguage } = useLanguage();

  const isOpen = isOpenExternal !== undefined ? isOpenExternal : internalIsOpen;

  const handleOpen = () => {
    if (onOpenExternal) onOpenExternal();
    else setInternalIsOpen(true);
  };

  const handleClose = () => {
    if (onCloseExternal) onCloseExternal();
    else setInternalIsOpen(false);
  };

  const handleNavClick = (tabOrSectionId?: string, action?: () => void) => {
    handleClose();
    if (action) {
      action();
      return;
    }
    if (tabOrSectionId && onSelectTab) {
      if (tabOrSectionId === "history-section" || tabOrSectionId === "history") {
        onSelectTab("history");
      } else if (tabOrSectionId === "dosage-calculator" || tabOrSectionId === "dosage") {
        onSelectTab("dosage");
      } else if (tabOrSectionId === "pesticides-section" || tabOrSectionId === "pesticides") {
        onSelectTab("pesticides");
      } else if (
        tabOrSectionId === "gov-schemes-section" ||
        tabOrSectionId === "community-forum-section" ||
        tabOrSectionId === "mandi-prices-section" ||
        tabOrSectionId === "community"
      ) {
        onSelectTab("community");
      } else {
        onSelectTab("home");
      }
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  };

  return (
    <>
      {/* Slide-Over Menu Backdrop */}
      {isOpen && (
        <div
          onClick={handleClose}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs transition-opacity animate-fade-in"
        />
      )}

      {/* Slide-Over Left Side Drawer */}
      <aside
        className={`fixed left-0 top-0 bottom-0 z-50 w-80 sm:w-96 bg-white dark:bg-gray-900 shadow-2xl border-r border-[#E8EEE3] dark:border-gray-800 flex flex-col justify-between transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Menu Header */}
        <div className="p-4 bg-[#1B4332] text-white flex items-center justify-between border-b border-emerald-700/50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300">
              <Sprout className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-black text-sm text-white tracking-wide">
                SMARTFARMER Navigation
              </h2>
              <p className="text-[10px] text-emerald-200/80">
                Quick Access & Farm Tools
              </p>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-full bg-emerald-900/60 hover:bg-emerald-800 text-emerald-200 flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6 divide-y divide-gray-100 dark:divide-gray-800">
          {/* User Profile Card / Login Prompt */}
          <div className="pb-4">
            {user ? (
              <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl border border-emerald-200 dark:border-emerald-800 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shadow-md">
                  {user.avatarUrl ? (
                    <img
                      src={user.avatarUrl}
                      alt={user.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    user.name.charAt(0)
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1 text-emerald-900 dark:text-emerald-200 font-bold text-xs truncate">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="truncate">{user.name}</span>
                  </div>
                  <p className="text-[11px] text-emerald-700 dark:text-emerald-400 truncate">
                    📍 {user.village}, {user.districtState}
                  </p>
                </div>
              </div>
            ) : (
              <button
                onClick={() => handleNavClick(undefined, onOpenLoginPage)}
                className="w-full p-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold text-xs flex items-center justify-between shadow-md transition group"
              >
                <div className="flex items-center gap-2.5">
                  <LogIn className="w-4 h-4 text-emerald-200" />
                  <span>Farmer Login / Sign Up</span>
                </div>
                <ChevronRight className="w-4 h-4 text-emerald-200 group-hover:translate-x-1 transition" />
              </button>
            )}
          </div>

          {/* Core App Features */}
          <div className="pt-4 space-y-1">
            <span className="text-[10px] font-black uppercase tracking-wider text-gray-400 dark:text-gray-500 px-2 block mb-2">
              🌾 Main Features
            </span>

            <button
              onClick={() => handleNavClick("history-section")}
              className="w-full text-left px-3 py-2.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-xs font-bold text-amber-900 dark:text-amber-200 border border-amber-500/30 flex items-center justify-between group transition"
            >
              <div className="flex items-center gap-2.5">
                <BookmarkCheck className="w-4 h-4 text-amber-500 group-hover:scale-110 transition" />
                <span>Saved Scans & Diagnosis History</span>
              </div>
              <ChevronRight className="w-4 h-4 text-amber-500" />
            </button>

            <button
              onClick={() => handleNavClick("plant-scanner-section", onOpenScanner)}
              className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-emerald-50 dark:hover:bg-gray-800 text-xs font-bold text-gray-700 dark:text-gray-200 flex items-center justify-between group transition"
            >
              <div className="flex items-center gap-2.5">
                <Sprout className="w-4 h-4 text-emerald-600 group-hover:scale-110 transition" />
                <span>Crop Disease Diagnosis</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </button>

            <button
              onClick={() => handleNavClick("weather-section")}
              className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-emerald-50 dark:hover:bg-gray-800 text-xs font-bold text-gray-700 dark:text-gray-200 flex items-center justify-between group transition"
            >
              <div className="flex items-center gap-2.5">
                <CloudRain className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition" />
                <span>Live Location Weather</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </button>

            <button
              onClick={() => handleNavClick("dosage-calculator")}
              className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-emerald-50 dark:hover:bg-gray-800 text-xs font-bold text-gray-700 dark:text-gray-200 flex items-center justify-between group transition"
            >
              <div className="flex items-center gap-2.5">
                <Calculator className="w-4 h-4 text-amber-500 group-hover:scale-110 transition" />
                <span>1-Acre Pesticide Calculator</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </button>

            <button
              onClick={() => handleNavClick("gov-schemes-section")}
              className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-emerald-50 dark:hover:bg-gray-800 text-xs font-bold text-gray-700 dark:text-gray-200 flex items-center justify-between group transition"
            >
              <div className="flex items-center gap-2.5">
                <BookmarkCheck className="w-4 h-4 text-teal-600 group-hover:scale-110 transition" />
                <span>PM-KISAN & Telangana Schemes</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </button>

            <button
              onClick={() => handleNavClick("community-forum-section")}
              className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-emerald-50 dark:hover:bg-gray-800 text-xs font-bold text-gray-700 dark:text-gray-200 flex items-center justify-between group transition"
            >
              <div className="flex items-center gap-2.5">
                <Users className="w-4 h-4 text-indigo-500 group-hover:scale-110 transition" />
                <span>Farmer Community & Experts</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </button>

            <button
              onClick={() => handleNavClick("mandi-prices-section")}
              className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-emerald-50 dark:hover:bg-gray-800 text-xs font-bold text-gray-700 dark:text-gray-200 flex items-center justify-between group transition"
            >
              <div className="flex items-center gap-2.5">
                <Store className="w-4 h-4 text-rose-500 group-hover:scale-110 transition" />
                <span>Daily Mandi Rates</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </button>

            <button
              onClick={() => handleNavClick("developer-section")}
              className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-purple-50 dark:hover:bg-purple-950/40 text-xs font-bold text-purple-700 dark:text-purple-300 flex items-center justify-between group transition"
            >
              <div className="flex items-center gap-2.5">
                <Code className="w-4 h-4 text-purple-600 group-hover:scale-110 transition" />
                <span>Meet Developer (Sreenath)</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </button>
          </div>

          {/* Location & GPS Control */}
          <div className="pt-4 space-y-2">
            <span className="text-[10px] font-black uppercase tracking-wider text-gray-400 dark:text-gray-500 px-2 block">
              📍 Location Services
            </span>
            <button
              onClick={requestExactLocation}
              disabled={isLocating}
              className="w-full px-3 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-xs font-bold text-gray-800 dark:text-gray-200 flex items-center justify-between transition"
            >
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-600" />
                <span>{isLocating ? "Detecting GPS..." : "Detect Live Location"}</span>
              </div>
              <Navigation className="w-3.5 h-3.5 text-gray-400" />
            </button>
          </div>

          {/* Regional Languages Selection */}
          <div className="pt-4 space-y-2">
            <span className="text-[10px] font-black uppercase tracking-wider text-gray-400 dark:text-gray-500 px-2 block">
              🌐 Select App Language
            </span>
            <div className="grid grid-cols-2 gap-1.5">
              {SUPPORTED_LANGUAGES.slice(0, 6).map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition flex items-center justify-between ${
                    language === lang.code
                      ? "bg-emerald-600 text-white shadow-sm"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                >
                  <span>{lang.nativeName}</span>
                  {language === lang.code && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-200" />}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Menu Footer */}
        <div className="p-4 bg-gray-50 dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800 text-center">
          <p className="text-xs font-bold text-emerald-800 dark:text-emerald-400">
            SMARTFARMER v2.5
          </p>
          <p className="text-[10px] text-gray-500">
            Developed by Sreenath • SVCE Student
          </p>
        </div>
      </aside>
    </>
  );
};
