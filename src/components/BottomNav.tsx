import React from "react";
import {
  Home,
  Camera,
  FlaskConical,
  Calculator,
  Bookmark,
  Sparkles,
  CloudRain,
  ShieldCheck,
} from "lucide-react";

interface BottomNavProps {
  activeTab: string;
  onSelectTab: (tabId: string) => void;
  onOpenScanner: () => void;
  onOpenAiBot: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onSelectTab,
  onOpenScanner,
  onOpenAiBot,
}) => {
  // 5 Main Tabs with CAMERA placed strictly in the EXACT MIDDLE (index 2)
  const navItems = [
    {
      id: "home",
      label: "Home",
      icon: Home,
      action: () => onSelectTab("home"),
    },
    {
      id: "pesticides",
      label: "Pesticides",
      icon: FlaskConical,
      action: () => onSelectTab("pesticides"),
    },
    {
      id: "scan",
      label: "Camera Scan",
      icon: Camera,
      action: () => {
        onSelectTab("home");
        onOpenScanner();
      },
      isCenterCamera: true, // EXACT MIDDLE CAMERA SLOTS
    },
    {
      id: "dosage",
      label: "1-Acre Quantity",
      icon: Calculator,
      action: () => onSelectTab("dosage"),
    },
    {
      id: "history",
      label: "History & Saved",
      icon: Bookmark,
      action: () => onSelectTab("history"),
    },
  ];

  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 bg-[#0E2018]/95 backdrop-blur-xl border-t-2 border-emerald-400/50 text-white shadow-[0_-10px_35px_rgba(0,0,0,0.5)] pb-safe">
      {/* Shining Top Glow Accent Line */}
      <div className="h-0.5 w-full bg-gradient-to-r from-emerald-400 via-teal-300 via-amber-300 to-lime-400 animate-pulse" />

      <div className="max-w-md md:max-w-xl mx-auto px-3 py-1.5 flex items-center justify-between relative">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          // CAMERA IN THE EXACT MIDDLE
          if (item.isCenterCamera) {
            return (
              <div key={item.id} className="relative -top-5 flex flex-col items-center justify-center px-1">
                {/* Glowing Outer Ring Effect */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-emerald-400 via-lime-300 to-amber-300 blur-md opacity-80 animate-pulse pointer-events-none" />

                <button
                  onClick={item.action}
                  className="relative w-14 h-14 rounded-full bg-gradient-to-br from-emerald-400 via-teal-400 to-emerald-600 hover:from-emerald-300 hover:to-teal-500 text-gray-950 flex items-center justify-center shadow-[0_0_25px_rgba(52,211,153,0.9)] border-4 border-emerald-100 hover:scale-110 active:scale-95 transition-all duration-300 group"
                  title="Open Camera & Gallery Scanner"
                  aria-label="Camera Scan Leaf"
                >
                  <Camera className="w-7 h-7 text-gray-950 group-hover:rotate-12 transition-transform duration-300 drop-shadow-md" />
                  
                  {/* Shining badge indicator */}
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-400 border-2 border-gray-950 rounded-full flex items-center justify-center shadow-md animate-bounce">
                    <Sparkles className="w-2.5 h-2.5 text-gray-950" />
                  </span>
                </button>

                <span className="text-[10px] font-black tracking-tight text-emerald-300 drop-shadow-md mt-1 whitespace-nowrap uppercase">
                  {item.label}
                </span>
              </div>
            );
          }

          return (
            <button
              key={item.id}
              onClick={item.action}
              className={`flex-1 py-1.5 px-1 flex flex-col items-center justify-center rounded-2xl transition-all duration-200 relative group ${
                isActive
                  ? "bg-gradient-to-b from-emerald-500/30 to-teal-800/40 text-emerald-200 shadow-[0_0_15px_rgba(52,211,153,0.3)] border border-emerald-400/50 scale-105"
                  : "text-emerald-300/70 hover:text-white hover:bg-emerald-900/30"
              }`}
            >
              <Icon
                className={`w-5 h-5 transition-all duration-200 ${
                  isActive
                    ? "scale-110 text-emerald-300 drop-shadow-[0_0_8px_rgba(52,211,153,0.8)]"
                    : "text-emerald-200/70 group-hover:scale-105"
                }`}
              />

              <span
                className={`text-[10px] tracking-tight mt-0.5 font-extrabold transition-colors truncate max-w-[70px] ${
                  isActive ? "text-emerald-300 drop-shadow-sm" : "text-emerald-200/70"
                }`}
              >
                {item.label}
              </span>

              {/* Shining Flip Slide Indicator */}
              {isActive && (
                <div className="w-5 h-1 bg-gradient-to-r from-emerald-300 via-teal-200 to-amber-300 rounded-full mt-0.5 shadow-[0_0_10px_rgba(52,211,153,0.9)] animate-fade-in" />
              )}
            </button>
          );
        })}

        {/* Quick Voice Bot Floating Corner Trigger */}
        <button
          onClick={onOpenAiBot}
          className="p-2 rounded-xl bg-amber-400/20 hover:bg-amber-400/30 text-amber-300 border border-amber-300/40 flex items-center gap-1 transition text-[10px] font-black ml-1 active:scale-95"
          title="Ask AI Farm Assistant"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
          <span className="hidden sm:inline">AI Voice</span>
        </button>
      </div>
    </nav>
  );
};
