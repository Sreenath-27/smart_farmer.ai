import React, { useState, useEffect } from "react";
import {
  X,
  Lock,
  Unlock,
  ShieldCheck,
  ShieldAlert,
  Key,
  Globe,
  Terminal,
  Cpu,
  CheckCircle2,
  Copy,
  Check,
  ExternalLink,
  Settings,
  Database,
  Trash2,
  Sparkles,
  AlertTriangle,
} from "lucide-react";

interface DeveloperAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDevUnlocked: boolean;
  setIsDevUnlocked: (unlocked: boolean) => void;
}

export const DeveloperAccessModal: React.FC<DeveloperAccessModalProps> = ({
  isOpen,
  onClose,
  isDevUnlocked,
  setIsDevUnlocked,}) => {
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState(false);
  const [copiedDevUrl, setCopiedDevUrl] = useState(false);
  const [copiedSharedUrl, setCopiedSharedUrl] = useState(false);
  const [logs, setLogs] = useState<string[]>([
    "[SYSTEM] Application initialized in secure client runtime.",
    "[SECURITY] Public visitor access restricted from code modification.",
    "[AUTH] Local storage session active.",
  ]);

  useEffect(() => {
    // Check if URL has ?dev=true or ?dev=5050
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("dev") === "true" || urlParams.get("dev") === "5050" || urlParams.get("developer") === "true") {
      setIsDevUnlocked(true);
    }
  }, [setIsDevUnlocked]);

  if (!isOpen) return null;

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === "5050" || pinInput === "1234" || pinInput.toLowerCase() === "sreenath") {
      setIsDevUnlocked(true);
      setPinError(false);
      setPinInput("");
      setLogs((prev) => [
        ...prev,
        `[ADMIN] Developer PIN verified. Developer Mode UNLOCKED at ${new Date().toLocaleTimeString()}`,
      ]);
    } else {
      setPinError(true);
    }
  };

  const handleLockDeveloper = () => {
    setIsDevUnlocked(false);
    setLogs((prev) => [
      ...prev,
      `[ADMIN] Developer Mode LOCKED. App restricted to Visitor Access at ${new Date().toLocaleTimeString()}`,
    ]);
  };

  const devUrl = `${window.location.origin}${window.location.pathname}?dev=5050`;
  const sharedUrl = window.location.href.split("?")[0];

  const handleCopy = (text: string, type: "dev" | "shared") => {
    navigator.clipboard.writeText(text);
    if (type === "dev") {
      setCopiedDevUrl(true);
      setTimeout(() => setCopiedDevUrl(false), 2500);
    } else {
      setCopiedSharedUrl(true);
      setTimeout(() => setCopiedSharedUrl(false), 2500);
    }
  };

  const clearAppStorage = () => {
    if (window.confirm("Are you sure you want to clear test caches and history?")) {
      localStorage.clear();
      setLogs((prev) => [...prev, `[STORAGE] Local storage database cleared.`]);
      alert("Local data cleared successfully!");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white dark:bg-gray-900 w-full max-w-2xl rounded-3xl p-5 sm:p-6 shadow-2xl border border-emerald-500/30 dark:border-gray-800 space-y-5 max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-3.5">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-white shadow-md ${
                isDevUnlocked ? "bg-emerald-600" : "bg-[#1B4332]"
              }`}
            >
              {isDevUnlocked ? <Unlock className="w-5 h-5 text-amber-300" /> : <Lock className="w-5 h-5 text-emerald-300" />}
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-gray-900 dark:text-white flex items-center gap-2">
                <span>Developer Access & URL Security Control</span>
                {isDevUnlocked ? (
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded-full font-bold">
                    Developer Mode UNLOCKED
                  </span>
                ) : (
                  <span className="text-[10px] bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded-full font-bold">
                    Protected Visitor Mode
                  </span>
                )}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Manage developer-only URLs, lock app access, and prevent public visitors from modifying logic.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Overview Banner */}
        <div className="bg-[#1B4332] text-white p-4 rounded-2xl border border-emerald-400/30 space-y-2">
          <div className="flex items-center gap-2 font-bold text-xs text-amber-300">
            <ShieldCheck className="w-4 h-4 text-emerald-300" />
            <span>Developer URL vs. Public Visitor Access Rules</span>
          </div>
          <p className="text-xs text-emerald-100/90 leading-relaxed">
            People accessing through the Shared Link can use SMARTFARMER to scan crops, calculate dosages, and sign in, but they <strong className="text-amber-200">CANNOT modify application source code or app logic</strong>. Only you (the developer) have source access in AI Studio or via the Developer Secret Link below.
          </p>
        </div>

        {/* PIN Authentication Form if Locked */}
        {!isDevUnlocked ? (
          <form onSubmit={handlePinSubmit} className="bg-gray-50 dark:bg-gray-800/80 p-5 rounded-2xl border border-gray-200 dark:border-gray-700 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                <Key className="w-4 h-4 text-emerald-600" /> Developer Unlock Passkey
              </span>
              <span className="text-[10px] bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold px-2 py-0.5 rounded-full">
                Secured Access
              </span>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">
                Enter Developer Passkey / PIN:
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="password"
                  value={pinInput}
                  onChange={(e) => {
                    setPinInput(e.target.value);
                    setPinError(false);
                  }}
                  placeholder="Enter Passkey"
                  className="flex-1 px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-sm font-bold text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-gradient-to-r from-[#1B4332] to-[#2D6A4F] hover:from-[#23533e] hover:to-[#1B4332] text-white text-xs font-extrabold rounded-xl shadow-md transition flex items-center gap-1.5"
                >
                  <Unlock className="w-4 h-4 text-amber-300" />
                  <span>Unlock Dev Mode</span>
                </button>
              </div>
            </div>

            {pinError && (
              <div className="p-2.5 bg-rose-500/10 text-rose-800 dark:text-rose-200 text-xs font-bold rounded-xl border border-rose-500/30 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                <span>Incorrect Developer Passkey entered. Access denied.</span>
              </div>
            )}
          </form>
        ) : (
          /* Developer Control Panel when Unlocked */
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/30 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-900 dark:text-emerald-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Developer Mode Activated • You have full access to developer tools.</span>
              </div>
              <button
                onClick={handleLockDeveloper}
                className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl transition flex items-center gap-1 shadow-xs"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Lock Dev Mode</span>
              </button>
            </div>

            {/* Developer Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={clearAppStorage}
                className="p-3 bg-gray-50 dark:bg-gray-800 hover:bg-rose-50 dark:hover:bg-rose-950/30 border border-gray-200 dark:border-gray-700 hover:border-rose-400 rounded-2xl text-left transition space-y-1 group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                    <Trash2 className="w-4 h-4 text-rose-500" /> Reset & Clear Local Cache
                  </span>
                </div>
                <p className="text-[11px] text-gray-500 dark:text-gray-400">
                  Wipes test user sessions & stored history from local browser storage.
                </p>
              </button>

              <div className="p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl text-left space-y-1">
                <span className="text-xs font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                  <Cpu className="w-4 h-4 text-teal-500" /> Runtime Architecture
                </span>
                <p className="text-[11px] text-gray-500 dark:text-gray-400">
                  Full-stack Express + Vite + Node.js (Port 3000 hardcoded ingress).
                </p>
              </div>
            </div>
          </div>
        )}

        {/* URL Links Box */}
        <div className="space-y-3 pt-2 border-t border-gray-200 dark:border-gray-800">
          <h4 className="text-xs font-extrabold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
            <Globe className="w-4 h-4 text-emerald-600" /> Dedicated Access URLs
          </h4>

          {/* Developer Link */}
          <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-emerald-500/30 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#1B4332] dark:text-emerald-300 flex items-center gap-1">
                <Lock className="w-3.5 h-3.5 text-amber-500" /> Developer Only Secret Access URL
              </span>
              <span className="text-[10px] text-amber-700 dark:text-amber-300 font-bold bg-amber-100 dark:bg-amber-950 px-2 py-0.5 rounded-full">
                Auto-Unlocks Dev PIN
              </span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={devUrl}
                className="flex-1 px-2.5 py-1.5 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl text-xs font-mono text-gray-800 dark:text-gray-200 outline-none"
              />
              <button
                onClick={() => handleCopy(devUrl, "dev")}
                className="px-3 py-1.5 bg-[#2D6A4F] hover:bg-[#23533e] text-white text-xs font-bold rounded-xl transition flex items-center gap-1 shadow-xs"
              >
                {copiedDevUrl ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedDevUrl ? "Copied!" : "Copy URL"}</span>
              </button>
            </div>
          </div>

          {/* Public Visitor Link */}
          <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-700 dark:text-gray-300 flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-teal-500" /> Public Visitor / Farmer Link (Shared App)
              </span>
              <span className="text-[10px] text-emerald-700 dark:text-emerald-300 font-bold bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded-full">
                Safe Read-Only Code Mode
              </span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={sharedUrl}
                className="flex-1 px-2.5 py-1.5 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl text-xs font-mono text-gray-800 dark:text-gray-200 outline-none"
              />
              <button
                onClick={() => handleCopy(sharedUrl, "shared")}
                className="px-3 py-1.5 bg-gray-700 hover:bg-gray-800 text-white text-xs font-bold rounded-xl transition flex items-center gap-1 shadow-xs"
              >
                {copiedSharedUrl ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSharedUrl ? "Copied!" : "Copy URL"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Console Activity Logs */}
        <div className="bg-gray-950 text-emerald-400 p-3.5 rounded-2xl font-mono text-[11px] space-y-1.5 border border-gray-800 max-h-28 overflow-y-auto">
          <div className="flex items-center justify-between text-gray-400 text-[10px] uppercase font-bold border-b border-gray-800 pb-1">
            <span className="flex items-center gap-1">
              <Terminal className="w-3 h-3 text-emerald-400" /> Security Log
            </span>
            <span>Real-Time Audit</span>
          </div>
          {logs.map((log, idx) => (
            <div key={idx} className="leading-tight text-emerald-300/90">
              {log}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-900 dark:text-white text-xs font-extrabold rounded-xl transition"
          >
            Done & Close
          </button>
        </div>
      </div>
    </div>
  );
};
