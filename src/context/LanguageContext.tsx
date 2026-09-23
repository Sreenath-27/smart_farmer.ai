import React, { createContext, useContext, useState, useEffect } from "react";
import { LanguageCode } from "../types";
import { TRANSLATIONS } from "../data/languages";

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageCode>(() => {
    try {
      const saved = localStorage.getItem("agriguard_language");
      if (saved && ["en", "te", "hi", "ta", "kn"].includes(saved)) {
        return saved as LanguageCode;
      }
    } catch (e) {
      console.error("Error loading language preference", e);
    }
    return "en";
  });

  useEffect(() => {
    localStorage.setItem("agriguard_language", language);
  }, [language]);

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    const langDict = TRANSLATIONS[language] || TRANSLATIONS.en;
    return langDict[key] || TRANSLATIONS.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
};
