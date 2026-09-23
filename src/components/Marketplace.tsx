import React from "react";
import { ShoppingBag, MapPin, Phone, Star, CheckCircle2 } from "lucide-react";
import { MARKETPLACE_ITEMS } from "../data/knowledgeBase";

export const Marketplace: React.FC = () => {
  return (
    <section className="bg-white dark:bg-gray-900 rounded-3xl p-5 sm:p-6 shadow-sm border border-[#E8EEE3] dark:border-gray-800 my-6 space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E8EEE3] dark:border-gray-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#2D6A4F]/10 text-[#2D6A4F] dark:text-emerald-300 flex items-center justify-center font-bold">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-[#1B4332] dark:text-white">
              Farmer Marketplace & Local Dealers
            </h2>
            <p className="text-xs text-[#748367] dark:text-gray-400">
              Compare prices, verified pesticides, fertilizers & battery sprayers from nearby dealers
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {MARKETPLACE_ITEMS.map((item) => (
          <div
            key={item.id}
            className="bg-gray-50 dark:bg-gray-800/80 rounded-2xl p-4 border border-gray-200 dark:border-gray-700 flex flex-col justify-between space-y-3"
          >
            <div>
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-28 object-cover rounded-xl border border-gray-200 dark:border-gray-700 mb-2"
              />
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300 font-bold uppercase">
                {item.category}
              </span>
              <h3 className="text-xs font-extrabold text-gray-900 dark:text-white mt-1 leading-snug">
                {item.name}
              </h3>

              <div className="text-xs font-extrabold text-emerald-700 dark:text-emerald-400 mt-1">
                ₹{item.priceRupees}
              </div>

              <div className="text-[11px] text-gray-500 dark:text-gray-400 mt-2 space-y-0.5">
                <div className="font-semibold text-gray-800 dark:text-gray-200">{item.dealerName}</div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-emerald-600" />
                  <span>{item.dealerLocation} ({item.dealerDistanceKm} km away)</span>
                </div>
              </div>
            </div>

            <a
              href={`tel:${item.dealerPhone}`}
              className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow transition"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Dealer ({item.dealerPhone})</span>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};
