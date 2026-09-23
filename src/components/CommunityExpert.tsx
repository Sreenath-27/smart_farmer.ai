import React, { useState } from "react";
import { MessageSquare, Users, Phone, Send, CheckCircle2, ShieldAlert } from "lucide-react";

export const CommunityExpert: React.FC = () => {
  const [question, setQuestion] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;
    setSubmitted(true);
    setQuestion("");
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section className="bg-white dark:bg-gray-900 rounded-3xl p-5 sm:p-6 shadow-sm border border-[#E8EEE3] dark:border-gray-800 my-6 space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E8EEE3] dark:border-gray-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#2D6A4F]/10 text-[#2D6A4F] dark:text-emerald-300 flex items-center justify-center font-bold">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-[#1B4332] dark:text-white">
              Connect with Agriculture Officers & Experts
            </h2>
            <p className="text-xs text-[#748367] dark:text-gray-400">
              Submit leaf photos directly to district agronomists & Krishi Vigyan Kendra (KVK) officers
            </p>
          </div>
        </div>

        <a
          href="tel:18001801551"
          className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow transition"
        >
          <Phone className="w-4 h-4 animate-bounce" />
          <span>Kisan Call Center Hotline (1800-180-1551)</span>
        </a>
      </div>

      <form onSubmit={handleSubmit} className="bg-gray-50 dark:bg-gray-800 p-4 rounded-2xl border border-gray-200 dark:border-gray-700 space-y-3">
        <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
          Ask a District Agriculture Expert
        </label>
        <textarea
          rows={3}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Describe crop issue, leaf discoloration, or pest attack..."
          className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-xs outline-none focus:ring-2 focus:ring-emerald-500"
        />

        <div className="flex justify-between items-center">
          <span className="text-[11px] text-gray-400">Average response time: &lt; 2 hours</span>
          <button
            type="submit"
            className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow transition flex items-center gap-1.5"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Send Question to Agronomist</span>
          </button>
        </div>

        {submitted && (
          <div className="p-3 bg-emerald-100 text-emerald-900 rounded-xl text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Question submitted! A local Krishi Vigyan Kendra agronomist will review your crop data.</span>
          </div>
        )}
      </form>
    </section>
  );
};
