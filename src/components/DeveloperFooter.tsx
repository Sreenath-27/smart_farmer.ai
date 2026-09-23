import React from "react";
import {
  Code,
  Github,
  Mail,
  ExternalLink,
  ShieldCheck,
  Building2,
  Terminal,
  MapPin,
  UserCheck,
} from "lucide-react";

export const DeveloperFooter: React.FC = () => {
  return (
    <section id="developer-section" className="bg-[#122E22] text-white py-12 px-4 sm:px-6 lg:px-8 border-t-2 border-emerald-500/30">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Section Title */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-emerald-900/80 text-emerald-300 text-xs font-black rounded-full border border-emerald-500/30 shadow-inner">
            <Code className="w-3.5 h-3.5 text-emerald-400" />
            <span>Site Developer & System Architect</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Developed by Sreenath • SVCE Student
          </h2>
          <p className="text-xs sm:text-sm text-emerald-200/80 max-w-xl mx-auto">
            Crafted for Smart Agriculture, Plant Disease Diagnosis & Real-time Weather Rain Forecasting.
          </p>
        </div>

        {/* Main Developer Showcase Card */}
        <div className="bg-[#1B4332] rounded-3xl p-6 sm:p-8 border border-emerald-400/30 shadow-2xl relative overflow-hidden space-y-6">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Top Header Row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-emerald-700/50 pb-4">
            <div>
              <div className="flex items-center gap-2 text-emerald-300 font-mono text-xs font-bold mb-1">
                <Terminal className="w-4 h-4 text-emerald-400" />
                <span>Full-Stack AI Developer Profile</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
                <span>Sreenath</span>
                <span className="text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-3 py-0.5 rounded-full font-bold">
                  SVCE Student
                </span>
              </h3>
            </div>

            <div className="bg-emerald-500 text-gray-950 font-black text-xs px-3.5 py-1.5 rounded-xl shadow-md flex items-center gap-2 shrink-0">
              <ShieldCheck className="w-4 h-4 text-gray-950" />
              <span>Verified AI Engineer</span>
            </div>
          </div>

            {/* Bio Description */}
            <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed font-medium">
              Designed and engineered SMARTFARMER — an end-to-end intelligent agricultural platform integrating plant disease diagnostics, 1-acre pesticide dosage calculations, and real-time location weather predictions for Indian farmers.
            </p>

            {/* Key Credentials Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 bg-emerald-950/60 rounded-2xl border border-emerald-500/30 space-y-1">
                <div className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <UserCheck className="w-3.5 h-3.5 text-emerald-400" /> Developer
                </div>
                <p className="text-xs font-black text-white">
                  Sreenath
                </p>
              </div>

              <div className="p-3 bg-emerald-950/60 rounded-2xl border border-emerald-500/30 space-y-1">
                <div className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-emerald-400" /> College
                </div>
                <p className="text-xs font-black text-white">
                  SVCE Student
                </p>
              </div>

              <div className="p-3 bg-emerald-950/60 rounded-2xl border border-emerald-500/30 space-y-1">
                <div className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" /> Location
                </div>
                <p className="text-xs font-black text-white">
                  Tirupati, AP
                </p>
              </div>
            </div>

            {/* Tech Stack Badges */}
            <div className="space-y-2 pt-1">
              <span className="text-[11px] font-bold text-emerald-300 uppercase tracking-wider block">
                Technologies & Architecture Used:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  "React 18",
                  "TypeScript",
                  "Tailwind CSS",
                  "Google Gemini AI API",
                  "Node.js Express",
                  "Open-Meteo Weather API",
                  "Geolocation API",
                  "PWA Capabilities",
                ].map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-lg bg-[#2D6A4F] text-emerald-100 text-[11px] font-bold border border-emerald-400/20 shadow-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Developer Contact & Links */}
            <div className="pt-3 border-t border-emerald-700/50 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs text-emerald-200/80 font-medium">
                <span>Primary Contact:</span>
                <a
                  href="mailto:srinadhsrinadh505@gmail.com"
                  className="text-emerald-300 font-bold hover:underline"
                >
                  srinadhsrinadh505@gmail.com
                </a>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href="mailto:srinadhsrinadh505@gmail.com"
                  className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-gray-950 font-black text-xs rounded-xl flex items-center gap-2 transition shadow-md active:scale-95"
                >
                  <Mail className="w-4 h-4 text-gray-950" />
                  <span>Contact Developer</span>
                </a>

                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 bg-[#2D6A4F] hover:bg-[#23533e] text-white font-bold text-xs rounded-xl flex items-center gap-2 border border-emerald-400/30 transition active:scale-95"
                >
                  <Github className="w-4 h-4 text-emerald-300" />
                  <span>GitHub Profile</span>
                  <ExternalLink className="w-3 h-3 text-emerald-300" />
                </a>
              </div>
            </div>
          </div>
        </div>
    </section>
  );
};
