import React from "react";
import "../CSS/Zakat1.css";
import { useLanguage, getZakatForm } from "../Components/languageProvider";

export const Zakat1 = () => {
  const { t, setLanguage, language } = useLanguage();
  const zakatForm = getZakatForm(t);

  return (
    <div className="zakat center">
      <div className="language-switcher">
        <button disabled={language === "ar"} onClick={() => setLanguage("ar")}>AR</button>
        <button disabled={language === "fr"} onClick={() => setLanguage("fr")}>FR</button>
        <button disabled={language === "en"} onClick={() => setLanguage("en")}>EN</button>
      </div>

      <div className="zakat-box-container center">
        <div className="zakat-box">
          <div className="right-zakat-box"></div>
          <div className="left-zakat-box">
            <h2>{t("ui.title")}</h2>
            <p>{t("ui.subtitle")}</p>
          </div>
        </div>
      </div>

      <div className="form-container">
        {zakatForm.map((section) => (
          <div key={section.name} className="form-section">
            <h3>{section.label}</h3>
            {section.children.map((field) => (
              <div key={field.name} className="form-field">
                <label>{field.label}</label>
                <input type="number" placeholder={t("ui.enterAmount")} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
