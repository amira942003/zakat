import { createContext, useContext, useState } from "react";
import { translations } from "./translations";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState("fr"); // langue par défaut

  const t = (key) => {
    const keys = key.split(".");
    let value = translations[lang];

    for (let k of keys) {
      if (!value) return key;
      value = value[k];
    }

    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
