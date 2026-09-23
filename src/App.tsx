/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { AuthProvider } from "./context/AuthContext";
import { LanguageProvider } from "./context/LanguageContext";
import { HistoryProvider } from "./context/HistoryContext";
import { Header } from "./components/Header";
import { ThreeQuickActions } from "./components/ThreeQuickActions";
import { WeatherCard } from "./components/WeatherCard";
import { PlantScannerModal } from "./components/PlantScannerModal";
import { PesticideCatalog } from "./components/PesticideCatalog";
import { DosageCalculator } from "./components/DosageCalculator";
import { HistoryAndSavedMenu } from "./components/HistoryAndSavedMenu";
import { AIChatbotModal } from "./components/AIChatbotModal";
import { AuthModal } from "./components/AuthModal";
import { KnowledgeCenter } from "./components/KnowledgeCenter";
import { Marketplace } from "./components/Marketplace";
import { CommunityExpert } from "./components/CommunityExpert";
import { LoginPage } from "./components/LoginPage";
import { LeftSideMenu } from "./components/LeftSideMenu";
import { DeveloperFooter } from "./components/DeveloperFooter";
import { BottomNav } from "./components/BottomNav";
import { DeveloperAccessModal } from "./components/DeveloperAccessModal";
import {
  Smartphone,
  Monitor,
  ShieldCheck,
  Bookmark,
  Sparkles,
  Camera,
} from "lucide-react";
import { PlantScanResult } from "./types";

function MainAppContent() {
  const [isPhoneFrame, setIsPhoneFrame] = useState(false);
  const [currentView, setCurrentView] = useState<"dashboard" | "login">("dashboard");

  // Slide Tab State (In-place slide switching without jumping/scrolling top-to-bottom)
  const [activeTab, setActiveTab] = useState<string>("home");

  // Modals state
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [isAiBotOpen, setIsAiBotOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [isDevModalOpen, setIsDevModalOpen] = useState(false);
  const [isDevUnlocked, setIsDevUnlocked] = useState(false);

  useEffect(() => {
    // Always enforce dark mode as requested
    document.documentElement.classList.add("dark");
  }, []);

  const handleSelectTab = (tabId: string) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const handleOpenDosageWithScan = (scan: PlantScanResult) => {
    handleSelectTab("dosage");
  };

  return (
    <div className="min-h-screen text-gray-900 dark:text-gray-100 font-sans transition-colors bg-full-green-plants pb-24">
      {currentView === "login" ? (
        <LoginPage onBackToApp={() => setCurrentView("dashboard")} />
      ) : (
        /* Main Container Frame */
        <div
          className={`${
            isPhoneFrame
              ? "max-w-md mx-auto my-6 rounded-[2.5rem] border-[10px] border-[#1B4332] dark:border-gray-800 shadow-2xl overflow-hidden bg-[#F9FBF7] dark:bg-gray-900"
              : "w-full min-h-screen"
          }`}
        >
          {/* Header App Bar */}
          <Header
            onOpenAuth={() => setCurrentView("login")}
            onOpenAiBot={() => setIsAiBotOpen(true)}
            onOpenMenu={() => setIsSideMenuOpen(true)}
            onOpenDevAccess={() => setIsDevModalOpen(true)}
            isDevUnlocked={isDevUnlocked}
          />

          {/* Plant Background Decorative Top Hero Banner with Shining Colors */}
          <div className="relative overflow-hidden bg-gradient-to-br from-[#0E2018] via-[#1B4332] to-[#122E22] text-white py-8 px-6 border-b-2 border-emerald-400/40 shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=80"
              alt="Lush green plant crop field background"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover opacity-25 mix-blend-overlay"
            />
            {/* Shining Ambient Radial Glows */}
            <div className="absolute -top-20 -left-20 w-80 h-80 bg-emerald-400/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-amber-400/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white drop-shadow-md">
                  Protect Your Crops & Maximize Yield
                </h1>
                <p className="text-xs sm:text-sm text-emerald-100 max-w-2xl leading-relaxed font-medium">
                  Scan leaf diseases instantly, calculate 1-acre pesticide dosages, and view live location weather.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setIsScannerOpen(true)}
                  className="px-5 py-2.5 bg-gradient-to-r from-emerald-400 via-teal-400 to-lime-300 hover:from-emerald-300 hover:to-teal-300 text-gray-950 text-xs font-black rounded-2xl shadow-[0_0_20px_rgba(52,211,153,0.8)] border-2 border-white flex items-center gap-2 transition hover:scale-105 active:scale-95"
                >
                  <Camera className="w-4 h-4 text-gray-950 font-black" />
                  <span>Open Camera Scanner</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Body Content Views */}
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 space-y-8">
            {/* 1. Live Weather & 3 Core Tools */}
            {activeTab === "home" && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <WeatherCard />

                {/* THE 3 PROMINENT MAIN INTERFACE ICONS */}
                <ThreeQuickActions
                  onOpenScanner={() => setIsScannerOpen(true)}
                  onOpenPesticides={() => handleSelectTab("pesticides")}
                  onOpenDosage={() => handleSelectTab("dosage")}
                />
              </div>
            )}

            {/* 2. TYPES OF PESTICIDES */}
            {activeTab === "pesticides" && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <PesticideCatalog />
              </div>
            )}

            {/* 3. 1-ACRE DOSAGE QUANTITY */}
            {activeTab === "dosage" && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <DosageCalculator />
              </div>
            )}

            {/* 4. HISTORY & SAVED MENU */}
            {activeTab === "history" && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <HistoryAndSavedMenu />
              </div>
            )}

            {/* 5. COMMUNITY, SCHEMES & MARKETPLACE */}
            {activeTab === "community" && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <KnowledgeCenter />
                <Marketplace />
                <CommunityExpert />
              </div>
            )}
          </main>

          {/* Developer Showcase Section */}
          <DeveloperFooter />

          {/* Footer */}
          <footer className="bg-[#0E2018] text-emerald-200/90 py-6 text-center text-xs border-t border-emerald-500/30 space-y-1">
            <p className="font-bold text-white">SMARTFARMER — Smart Agriculture Platform © 2026</p>
            <p className="text-emerald-300/80">
              Empowering Farmers with Plant Disease Detection & Exact Location Weather Predictions
            </p>
          </footer>
        </div>
      )}

      {/* Floating Left Side Navigation & Quick Tools Menu */}
      <LeftSideMenu
        onOpenScanner={() => setIsScannerOpen(true)}
        onOpenAiBot={() => setIsAiBotOpen(true)}
        onOpenLoginPage={() => setCurrentView("login")}
        onOpenDevAccess={() => setIsDevModalOpen(true)}
        onSelectTab={(tabId) => handleSelectTab(tabId)}
        isOpenExternal={isSideMenuOpen}
        onOpenExternal={() => setIsSideMenuOpen(true)}
        onCloseExternal={() => setIsSideMenuOpen(false)}
      />

      {/* Bottom Navigation Flips (Camera in Exact Middle with Shining Colors) */}
      <BottomNav
        activeTab={activeTab}
        onSelectTab={(tabId) => handleSelectTab(tabId)}
        onOpenScanner={() => setIsScannerOpen(true)}
        onOpenAiBot={() => setIsAiBotOpen(true)}
      />

      {/* Modals */}
      <PlantScannerModal
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        onOpenDosageWithScan={handleOpenDosageWithScan}
      />

      <AIChatbotModal
        isOpen={isAiBotOpen}
        onClose={() => setIsAiBotOpen(false)}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />

      <DeveloperAccessModal
        isOpen={isDevModalOpen}
        onClose={() => setIsDevModalOpen(false)}
        isDevUnlocked={isDevUnlocked}
        setIsDevUnlocked={setIsDevUnlocked}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <HistoryProvider>
          <MainAppContent />
        </HistoryProvider>
      </LanguageProvider>
    </AuthProvider>
  );
}
