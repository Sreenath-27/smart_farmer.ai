import React, { useState, useEffect } from "react";
import {
  User,
  MapPin,
  CheckCircle2,
  Navigation,
  Loader2,
  ArrowRight,
  LogOut,
  Sprout,
  AlertCircle,
  Phone,
  Check,
  ChevronLeft,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";

interface LoginPageProps {
  onBackToApp?: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onBackToApp }) => {
  const {
    user,
    isLoggedIn,
    loginAsGuest,
    loginWithGoogle,
    loginWithFacebook,
    logout,
    updateProfile,
    requestExactLocation,
    isLocating,
    locationError,
  } = useAuth();

  const { language } = useLanguage();

  // Helper to check if text is a placeholder/dummy value
  const isDummyName = (n?: string) => !n || n === "Guest Farmer" || n === "Farmer User" || n === "Registered Farmer" || n === "Crop Farmer";
  const isDummyPhone = (p?: string) => !p || p === "9876543210" || p === "9988776655";
  const isDummyLocation = (l?: string) => !l || l === "Ananthapur" || l === "Ananthapur, Andhra Pradesh";

  // Form Fields - Start completely BLANK for new users
  const [name, setName] = useState(!isDummyName(user?.name) ? (user?.name || "") : "");
  const [phone, setPhone] = useState(!isDummyPhone(user?.emailOrPhone) ? (user?.emailOrPhone || "") : "");
  const [location, setLocation] = useState(!isDummyLocation(user?.village) ? (user?.village || "") : "");

  // Feedback State
  const [statusMsg, setStatusMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Sync profile when user changes
  useEffect(() => {
    if (user) {
      if (!isDummyName(user.name)) setName(user.name);
      if (!isDummyPhone(user.emailOrPhone)) setPhone(user.emailOrPhone);
      if (!isDummyLocation(user.village)) setLocation(user.village);
    }
  }, [user]);

  // Handle GPS Auto-Location
  const handleDetectGPS = async () => {
    setErrorMsg(null);
    setStatusMsg("Detecting your exact GPS location...");
    try {
      await requestExactLocation();
      setStatusMsg("📍 Exact GPS Location detected and updated!");
    } catch (e: any) {
      setErrorMsg(locationError || "GPS permission denied or unavailable.");
    }
  };

  // Sync location from context if updated by requestExactLocation
  useEffect(() => {
    if (user?.village) {
      setLocation(user.village);
    }
  }, [user?.village]);

  // Handle Direct Login / Save Profile
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!name.trim()) {
      setErrorMsg("Please enter your name.");
      return;
    }
    if (!phone.trim() || phone.length < 8) {
      setErrorMsg("Please enter a valid mobile number.");
      return;
    }

    setLoading(true);

    try {
      // Update profile or set user
      updateProfile({
        name: name.trim(),
        emailOrPhone: phone.trim(),
        village: location.trim() || "Ananthapur, Andhra Pradesh",
        districtState: location.trim() || "Andhra Pradesh",
      });

      setStatusMsg("🎉 Success! Your details have been saved and logged in.");
      
      if (onBackToApp) {
        setTimeout(() => {
          onBackToApp();
        }, 600);
      }
    } catch (err: any) {
      setErrorMsg("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Social & Guest Quick Logins
  const handleGoogle = async () => {
    setErrorMsg(null);
    setLoading(true);
    try {
      await loginWithGoogle({ name: "Google Farmer" });
      setStatusMsg("Logged in with Google account! 🌐");
      if (onBackToApp) setTimeout(onBackToApp, 600);
    } catch (e) {
      setErrorMsg("Google login failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleFacebook = async () => {
    setErrorMsg(null);
    setLoading(true);
    try {
      await loginWithFacebook({ name: "Facebook Farmer" });
      setStatusMsg("Logged in with Facebook account! 👤");
      if (onBackToApp) setTimeout(onBackToApp, 600);
    } catch (e) {
      setErrorMsg("Facebook login failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleGuest = () => {
    setErrorMsg(null);
    loginAsGuest();
    setStatusMsg("Logged in as Guest Farmer! 🌾");
    if (onBackToApp) setTimeout(onBackToApp, 600);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-[#0D2818] to-gray-950 py-8 px-4 flex flex-col items-center justify-center">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-emerald-500/30 overflow-hidden">
        
        {/* Top Header Card */}
        <div className="bg-gradient-to-r from-[#1B4332] via-[#2D6A4F] to-[#1B4332] p-6 text-white text-center relative">
          {onBackToApp && (
            <button
              onClick={onBackToApp}
              className="absolute left-4 top-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition text-white"
              title="Back to App"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}

          <div className="w-16 h-16 bg-amber-400 text-gray-950 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg font-black border-2 border-amber-300">
            <Sprout className="w-9 h-9 text-[#0D2818]" />
          </div>

          <h1 className="text-2xl font-black tracking-tight text-white flex items-center justify-center gap-1.5">
            Smart🌱Farmer
          </h1>
          <p className="text-xs text-emerald-200 mt-1 font-medium">
            Crop Protection, Pesticide Guide & Local Weather
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5">
          
          {/* Status / Error Alerts */}
          {statusMsg && (
            <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/80 border-2 border-emerald-500/50 rounded-2xl text-xs font-bold text-emerald-800 dark:text-emerald-200 flex items-center gap-2 animate-in fade-in duration-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
              <span>{statusMsg}</span>
            </div>
          )}

          {errorMsg && (
            <div className="p-3.5 bg-rose-50 dark:bg-rose-950/80 border-2 border-rose-500/50 rounded-2xl text-xs font-bold text-rose-800 dark:text-rose-200 flex items-center gap-2 animate-in fade-in duration-200">
              <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Clean Unified Form: Name, Number, Exact Location */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* 1. Full Name */}
            <div>
              <label className="text-xs font-extrabold text-gray-700 dark:text-gray-300 block mb-1.5">
                👤 Full Name:
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-emerald-600">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter full name"
                  className="w-full pl-10 pr-3 py-3 rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/80 text-sm font-bold text-gray-900 dark:text-white outline-none focus:border-emerald-500 transition"
                />
              </div>
            </div>

            {/* 2. Mobile Number */}
            <div>
              <label className="text-xs font-extrabold text-gray-700 dark:text-gray-300 block mb-1.5">
                📱 Phone Number:
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-3.5 font-black text-xs text-emerald-700 dark:text-emerald-400 select-none">
                  +91
                </div>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                  placeholder="Enter 10-digit mobile number"
                  maxLength={10}
                  className="w-full pl-14 pr-3 py-3 rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/80 text-sm font-bold text-gray-900 dark:text-white outline-none focus:border-emerald-500 transition"
                />
              </div>
            </div>

            {/* 3. Exact Location with GPS Auto-Detect */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-extrabold text-gray-700 dark:text-gray-300">
                  📍 Exact Location (Village/City):
                </label>
                <button
                  type="button"
                  onClick={handleDetectGPS}
                  disabled={isLocating}
                  className="text-[11px] font-black text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 active:scale-95"
                >
                  {isLocating ? (
                    <>
                      <Loader2 className="w-3 h-3 animate-spin" />
                      <span>Detecting GPS...</span>
                    </>
                  ) : (
                    <>
                      <Navigation className="w-3 h-3" />
                      <span>Auto-Detect GPS</span>
                    </>
                  )}
                </button>
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-emerald-600">
                  <MapPin className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Enter village, mandal or district"
                  className="w-full pl-10 pr-3 py-3 rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/80 text-sm font-bold text-gray-900 dark:text-white outline-none focus:border-emerald-500 transition"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-gradient-to-r from-[#1B4332] via-emerald-800 to-[#1B4332] hover:from-emerald-900 hover:to-emerald-800 text-amber-300 font-black text-sm rounded-2xl shadow-lg transition flex items-center justify-center gap-2 active:scale-98 mt-2"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <Check className="w-5 h-5 text-amber-300" />
                  <span>Login & Continue</span>
                  <ArrowRight className="w-4 h-4 text-amber-300" />
                </>
              )}
            </button>
          </form>

          {/* Social & Guest Options */}
          <div className="pt-3 border-t border-gray-200 dark:border-gray-800 text-center space-y-3">
            <p className="text-[10px] font-extrabold uppercase text-gray-400 tracking-wider">
              Quick Alternative Logins
            </p>

            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={handleGoogle}
                className="py-2.5 px-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl text-xs font-black text-gray-800 dark:text-gray-100 transition shadow-sm flex flex-col items-center justify-center gap-1 active:scale-95"
              >
                <span className="text-base">🌐</span>
                <span>Google</span>
              </button>

              <button
                type="button"
                onClick={handleFacebook}
                className="py-2.5 px-2 bg-blue-50 dark:bg-blue-950/40 hover:bg-blue-100 border border-blue-200 dark:border-blue-800 rounded-xl text-xs font-black text-blue-700 dark:text-blue-300 transition shadow-sm flex flex-col items-center justify-center gap-1 active:scale-95"
              >
                <span className="text-base">👤</span>
                <span>Facebook</span>
              </button>

              <button
                type="button"
                onClick={handleGuest}
                className="py-2.5 px-2 bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 border border-emerald-300 dark:border-emerald-800 rounded-xl text-xs font-black text-emerald-800 dark:text-emerald-300 transition shadow-sm flex flex-col items-center justify-center gap-1 active:scale-95"
              >
                <span className="text-base">🌾</span>
                <span>Guest</span>
              </button>
            </div>
          </div>

          {/* Log Out Option if user is active */}
          {isLoggedIn && user && (
            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={logout}
                className="text-xs font-extrabold text-rose-600 dark:text-rose-400 hover:underline inline-flex items-center gap-1"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Log Out Current Account</span>
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
