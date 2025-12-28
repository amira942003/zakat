import React, { useContext, useEffect, useState } from "react";
import { ZakatPrice } from "./ZakatPrice";
import { MessagePopup } from "../../../Components/MessagePopup";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/Components/ui/tooltip";
import { ZakatContext } from "../../../Components/ZakatProvider";
import { ChevronDown, Plus, Minus } from "lucide-react";
import { Link } from "react-router-dom";
import { GoldPrice } from "./GoldPrice";
import { zakatForm } from "../../../Components/zakatFormData";
import { useLanguage } from "@/Components/LanguageProvider";
import { LanguageSwitcher } from "@/Components/LanguageSwitcher";

export const formatNumber = (num) =>
  !num ? "" : num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

export const CalForm = () => {
  const {
    nissab,
    setZakatFormInfos,
    setShowResult,
    showResult,
    setPopup,
    popup,
  } = useContext(ZakatContext);

  const { language, t } = useLanguage();

  const [methodCalcul, setMethodCalcul] = useState("Maliki");
  const [formData, setFormData] = useState([]);
  const [companyType, setCompanyType] = useState("SARL");
  const [collapsedSections, setCollapsedSections] = useState({});
  const [additionalFields, setAdditionalFields] = useState({});

  useEffect(() => {
    setFormData(zakatForm);
  }, [language]);

  const toggleSection = (name) => {
    setCollapsedSections((p) => ({ ...p, [name]: !p[name] }));
  };

  const addField = (name) => {
    setAdditionalFields((p) => ({
      ...p,
      [name]: [...(p[name] || []), { id: Date.now(), value: "" }],
    }));
  };

  const removeField = (name, id) => {
    setAdditionalFields((p) => ({
      ...p,
      [name]: p[name].filter((f) => f.id !== id),
    }));
  };

  const handleAdditionalFieldChange = (name, id, value) => {
    const raw = value.replace(/,/g, "");
    if (!isNaN(raw) && raw >= 0) {
      setAdditionalFields((p) => ({
        ...p,
        [name]: p[name].map((f) =>
          f.id === id ? { ...f, value: raw } : f
        ),
      }));
    }
  };

  const updateFieldValue = (fields, target, value) =>
    fields.map((f) => {
      if (f.name === target) return { ...f, value };
      if (f.children?.length)
        return { ...f, children: updateFieldValue(f.children, target, value) };
      return f;
    });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const raw = value.replace(/,/g, "");
    if (!isNaN(raw) && raw >= 0) {
      setFormData((p) => updateFieldValue(p, name, raw));
    }
  };

  const calculateTotalForField = (name, main) => {
    const mainVal = Number(main) || 0;
    const extra =
      (additionalFields[name] || []).reduce(
        (s, f) => s + (Number(f.value) || 0),
        0
      );
    return mainVal + extra;
  };

  const flattenData = (fields, acc = {}) => {
    fields.forEach((f) => {
      if (f.children?.length) flattenData(f.children, acc);
      else acc[f.name] = calculateTotalForField(f.name, f.value);
    });
    return acc;
  };

  const renderInputs = (fields) =>
    fields.map((field) => {
      if (field.name === "SARL" && companyType === "SARL") return null;

      const desc = field.description?.[language];

      if (field.children?.length) {
        return (
          <div key={field.name} className="my-3">
            <div className="border rounded-lg bg-emerald-50">
              <div
                onClick={() => toggleSection(field.name)}
                className="flex justify-between items-center p-4 cursor-pointer"
              >
                <h3 className="font-bold text-emerald-800">
                  {field.label}
                </h3>
                <ChevronDown
                  className={`transition-transform ${
                    collapsedSections[field.name] ? "rotate-180" : ""
                  }`}
                />
              </div>

              {!collapsedSections[field.name] && (
                <div className="p-3">
                  {renderInputs(field.children)}
                </div>
              )}
            </div>
          </div>
        );
      }

      return (
        <div key={field.name} className="my-3">
          {/* LABEL + ? TOOLTIP */}
          <div className="flex items-center gap-2">
            <label className="font-semibold text-gray-700">
              {field.label}
            </label>

            {desc && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="cursor-pointer text-emerald-600 font-bold">
                    ?
                  </span>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs text-sm">
                  {desc}
                </TooltipContent>
              </Tooltip>
            )}
          </div>

          <input
            type="text"
            name={field.name}
            value={formatNumber(field.value || "")}
            onChange={handleChange}
            placeholder={t("ui.enterAmount")}
            className="cal-input mt-1"
          />

          {(additionalFields[field.name] || []).map((af) => (
            <div key={af.id} className="flex items-center mt-2">
              <input
                type="text"
                value={formatNumber(af.value)}
                onChange={(e) =>
                  handleAdditionalFieldChange(
                    field.name,
                    af.id,
                    e.target.value
                  )
                }
                className="cal-input"
                placeholder={t("ui.enterAdditionalAmount")}
              />
              <button
                onClick={() => removeField(field.name, af.id)}
                className="ml-2 text-red-600"
              >
                <Minus size={16} />
              </button>
            </div>
          ))}

          <button
            onClick={() => addField(field.name)}
            className="mt-1 text-emerald-600"
          >
            <Plus size={16} />
          </button>
        </div>
      );
    });

  return (
    <div dir={language === "ar" ? "rtl" : "ltr"}>
      <LanguageSwitcher />
      <GoldPrice />

      <div className="max-w-4xl mx-auto p-6">
        {renderInputs(formData)}

        <div className="text-center mt-6">
          <button
            onClick={() => setShowResult(true)}
            className="bg-emerald-600 text-white px-6 py-3 rounded font-bold"
          >
            {t("ui.calculate")}
          </button>
        </div>
      </div>

      {showResult && <ZakatPrice />}

      <MessagePopup
        message={popup.message}
        type={popup.type}
        onClose={() => setPopup({ message: "", type: "" })}
      />
    </div>
  );
};
