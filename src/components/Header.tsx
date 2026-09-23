import React, { useState } from "react";
import {
  Sprout,
  User,
  Globe,
  Sun,
  Moon,
  LogOut,
  ChevronDown,
  ShieldAlert,
  Sparkles,
  CloudRain,
  Menu,
  Lock,
  Unlock,
  ShieldCheck,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import { SUPPORTED_LANGUAGES } from "../data/languages";
import { LanguageCode } from "../types";

interface HeaderProps {
  onOpenAuth: () => void;
  onOpenAiBot: () => void;
  onOpenMenu?: () => void;
  onOpenDevAccess?: () => void;
  isDevUnlocked?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenAuth,
  onOpenAiBot,
  onOpenMenu,
  onOpenDevAccess,
  isDevUnlocked,
}) => {
  const { user } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const [showLangMenu, setShowLangMenu] = useState(false);

  const currentLang = SUPPORTED_LANGUAGES.find((l) => l.code === language) || SUPPORTED_LANGUAGES[0];

  return (
    <header className="sticky top-0 z-40 bg-gradient-to-r from-[#0E2018] via-[#1B4332] to-[#122E22] dark:from-[#08120D] dark:to-[#0B1A12] text-white border-b-2 border-emerald-400/40 shadow-[0_4px_20px_rgba(0,0,0,0.3)] transition-colors">
      {/* Top Shining Light Accent Streak */}
      <div className="h-0.5 w-full bg-gradient-to-r from-emerald-400 via-lime-300 via-amber-300 to-teal-400" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between">
        {/* Brand Logo & Menu Button */}
        <div className="flex items-center gap-2 sm:gap-3">
          {onOpenMenu && (
            <button
              onClick={onOpenMenu}
              className="px-3 py-1.5 bg-[#2D6A4F] hover:bg-emerald-600 text-white rounded-xl border border-emerald-300/40 transition flex items-center gap-1.5 shadow-[0_0_12px_rgba(52,211,153,0.3)] active:scale-95 group"
              title="Open Navigation Menu"
              aria-label="Open Navigation Menu"
            >
              <Menu className="w-5 h-5 text-emerald-300 group-hover:rotate-90 transition-transform" />
              <span className="hidden xs:inline text-xs font-black text-emerald-100 uppercase tracking-wide">
                Menu
              </span>
            </button>
          )}

          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center shadow-[0_0_15px_rgba(52,211,153,0.6)] border border-emerald-200">
            <Sprout className="w-6 h-6 text-gray-950 font-black" />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tight text-white flex items-center gap-1.5 drop-shadow-sm">
              {t("appName")}
            </h1>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* AI Voice Assistant Trigger */}
          <button
            onClick={onOpenAiBot}
            className="px-3 py-1.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-400 text-gray-950 font-extrabold text-xs rounded-xl flex items-center gap-1.5 shadow-[0_0_15px_rgba(52,211,153,0.5)] border border-white transition hover:scale-105 active:scale-95"
          >
            <Sparkles className="w-4 h-4 text-gray-950 animate-pulse" />
            <span className="hidden md:inline">{t("aiAssistant")}</span>
          </button>

          {/* Regional Language Selector */}
          <div className="relative">
            <button
              onClick={() => setShowLangMenu(!showLangMenu)}
              className="px-2.5 py-1.5 bg-[#2D6A4F]/60 hover:bg-[#2D6A4F] text-emerald-100 border border-emerald-400/40 rounded-xl text-xs font-bold flex items-center gap-1.5 transition shadow-xs"
            >
              <Globe className="w-3.5 h-3.5 text-amber-300" />
              <span>{currentLang.nativeName}</span>
              <ChevronDown className="w-3 h-3 text-emerald-300" />
            </button>

            {showLangMenu && (
              <div className="absolute right-0 mt-2 w-44 bg-gray-900 text-white rounded-2xl shadow-2xl border border-emerald-500/40 py-1.5 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-amber-300 border-b border-gray-800">
                  Select Language
                </div>
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code as LanguageCode);
                      setShowLangMenu(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-emerald-950 transition ${
                      language === lang.code
                        ? "font-bold text-emerald-300 bg-emerald-900/40"
                        : "text-gray-200"
                    }`}
                  >
                    <span>{lang.nativeName}</span>
                    <span className="text-[10px] text-gray-400">{lang.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* User Login Profile Button */}
          <button
            onClick={onOpenAuth}
            className="flex items-center gap-2 pl-2 pr-3 py-1 bg-[#2D6A4F]/80 hover:bg-[#2D6A4F] border border-emerald-400/40 rounded-xl transition shadow-xs"
          >
            {user?.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="w-7 h-7 rounded-full object-cover border border-emerald-300 shadow-xs"
              />
            ) : (
              <div className="w-7 h-7 rounded-full bg-emerald-600 flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
            )}
            <div className="text-left hidden sm:block">
              <div className="text-xs font-bold text-white leading-tight flex items-center gap-1">
                <span className="truncate max-w-[100px]">{user?.name || "Farmer"}</span>
                {user?.authMode === "google" && (
                  <span className="text-[9px] bg-white text-gray-800 px-1 rounded font-bold">G</span>
                )}
                {user?.authMode === "github" && (
                  <span className="text-[9px] bg-gray-900 text-white px-1 rounded font-bold">GH</span>
                )}
                {user?.authMode === "facebook" && (
                  <span className="text-[9px] bg-[#1877F2] text-white px-1 rounded font-bold">f</span>
                )}
              </div>
              <div className="text-[10px] text-emerald-200 font-medium truncate max-w-[110px]">
                📍 {user?.village || "Location"}
              </div>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};
