import React, { useContext, useEffect, useState } from "react";
import { ZakatPrice } from "./ZakatPrice";
import { MessagePopup } from "../../../Components/MessagePopup";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/Components/ui/tooltip";
import { ZakatContext } from "../../../Components/ZakatProvider";
import { ChevronDown, ChevronUp, Plus, Minus } from "lucide-react";
import { WarninIcon } from "@/assets/Svg/WarninIcon";
import { Link } from "react-router-dom";
import { GoldPrice } from "./GoldPrice";
import { zakatForm } from "../../../Components/zakatFormData";

import { getZakatForm, useLanguage } from "@/Components/LanguageProvider";
import { LanguageSwitcher } from "@/Components/LanguageSwitcher";

export const formatNumber = (num) =>
  !num ? "" : num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

export const CalForm = () => {
  const { nissab, setZakatFormInfos, setShowResult, showResult, setPopup, popup } = useContext(ZakatContext);
  const { language, t } = useLanguage();

  const [methodCalcul, setMethodCalcul] = useState("Maliki");
  const [formData, setFormData] = useState([]);
  const [companyType, setCompanyType] = useState("SARL");
  const [collapsedSections, setCollapsedSections] = useState({});
  const [additionalFields, setAdditionalFields] = useState({});

  useEffect(() => {
    setFormData(zakatForm);
  }, [language]);

  const toggleSection = (sectionName) => {
    setCollapsedSections(prev => ({ ...prev, [sectionName]: !prev[sectionName] }));
  };

  const addField = (fieldName) => {
    setAdditionalFields(prev => ({
      ...prev,
      [fieldName]: [...(prev[fieldName] || []), { id: Date.now(), value: "" }]
    }));
  };

  const removeField = (fieldName, fieldId) => {
    setAdditionalFields(prev => ({
      ...prev,
      [fieldName]: prev[fieldName].filter(f => f.id !== fieldId)
    }));
  };

  const handleAdditionalFieldChange = (fieldName, fieldId, value) => {
    const rawValue = value.replace(/,/g, "");
    if (!isNaN(rawValue) && rawValue >= 0) {
      setAdditionalFields(prev => ({
        ...prev,
        [fieldName]: prev[fieldName].map(f => f.id === fieldId ? { ...f, value: rawValue } : f)
      }));
    }
  };

  const calculateTotalForField = (fieldName, mainValue) => {
    const mainVal = Number(mainValue) || 0;
    const additionalVals = (additionalFields[fieldName] || []).reduce((sum, f) => sum + (Number(f.value) || 0), 0);
    return mainVal + additionalVals;
  };

  const updateFieldValue = (fields, targetName, newValue) => {
    return fields.map(field => {
      if (field.name === targetName) return { ...field, value: newValue };
      if (field.children && field.children.length > 0)
        return { ...field, children: updateFieldValue(field.children, targetName, newValue) };
      return field;
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const rawValue = value.replace(/,/g, "");
    if (!isNaN(rawValue) && rawValue >= 0) {
      setFormData(prev => updateFieldValue(prev, name, rawValue));
    }
  };

  const flattenData = (fields, acc = {}) => {
    fields.forEach(field => {
      if (field.children && field.children.length > 0) flattenData(field.children, acc);
      else acc[field.name] = calculateTotalForField(field.name, field.value);
    });
    return acc;
  };

  const calcZakat = (method) => {
    if (nissab === null) {
      setPopup({ message: " يرجى تحديد نسبة النصاب", type: 'error' });
      return;
    }
    const values = flattenData(formData);
    const commonAssets =
      (values.x1 || 0) + (values.x2 || 0) + (values.x3 || 0) +
      (values.x4 || 0) + (values.x5 || 0) + (values.x6 || 0) +
      (values.a1 || 0) + (values.a4 || 0) + (values.a5 || 0);

    let zakatBase = 0, A = 0, F = 0;

    switch (method) {
      case "Maliki":
        const somme = (values.y1 || 0) + (values.y2 || 0) + (values.y3 || 0) + (values.y4 || 0) +
          (values.y6 || 0) + (values.z1 || 0) + (values.z2 || 0) + (values.a2 || 0) +
          (values.a3 || 0) + (values.a6 || 0) + (values.a7 || 0) + (values.a8 || 0);
        const D = (values.c1 || 0) + (values.c2 || 0) + (values.c4 || 0) + (values.c5 || 0) + (values.c6 || 0);
        companyType === "SARL" ? A = (values.SPA || 0) : A = (values.SPA || 0) + (values.SARL || 0);
        const C = A - (values.limit || 0);
        if (C <= D) F = D - C;
        zakatBase = commonAssets + somme - F;
        break;
      case "AAOIFI":
        zakatBase = commonAssets +
          (values.y1 || 0) + (values.y2 || 0) + (values.y3 || 0) + (values.y4 || 0) +
          (values.z1 || 0) + (values.z2 || 0) + (values.z3 || 0) + (values.z4 || 0) +
          (values.a2 || 0) + (values.a3 || 0) + (values.a6 || 0) + (values.a7 || 0) + (values.a8 || 0) -
          ((values.c1 || 0) + (values.c2 || 0) + (values.c4 || 0) + (values.c5 || 0) + (values.c6 || 0));
        break;
      case "Alioua":
        zakatBase = commonAssets +
          (values.x7 || 0) + (values.x8 || 0) + (values.x9 || 0) +
          (values.y1 || 0) + (values.y2 || 0) + (values.y3 || 0) + (values.y4 || 0) +
          (values.y5 || 0) + (values.y6 || 0) + (values.y7 || 0) +
          (values.z1 || 0) + (values.z2 || 0) + (values.z3 || 0) + (values.z4 || 0) +
          (values.a2 || 0) + (values.a3 || 0) + (values.a6 || 0) + (values.a7 || 0) + (values.a8 || 0) -
          ((values.c1 || 0) + (values.c2 || 0) + (values.c3 || 0) + (values.c4 || 0) + (values.c5 || 0) + (values.c6 || 0));
        break;
      case "Net":
        zakatBase = commonAssets;
        break;
    }

    const zakat = zakatBase > nissab ? zakatBase * 0.025 : 0;
    const calculationDate = new Date().toISOString().split("T")[0];
    setZakatFormInfos(prevState => ({
      ...prevState,
      zakatAmount: zakat.toFixed(2),
      totalAmount: zakatBase.toFixed(2),
      calculationDate: calculationDate,
    }));
    setShowResult(true);
  };

  const renderInputs = (fields, depth = 0, companyType) =>
    fields.map((field, idx) => {
      if (field.name === "SARL" && companyType === "SARL") return null;
      const desc = field.description ? field.description[language] : "";
      if (field.children && field.children.length > 0) {
        return (
          <div key={idx} className="my-2">
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-lg overflow-hidden">
              <div
                className="flex items-center justify-between p-4 cursor-pointer hover:bg-emerald-100/50 transition-colors duration-200"
                onClick={() => toggleSection(field.name)}
              >
                <h3 className="font-bold text-lg text-emerald-800">{field.label}</h3>
                <ChevronDown className={`w-5 h-5 text-emerald-600 transform ${collapsedSections[field.name] ? "rotate-180" : ""}`} />
              </div>
              <div className={`p-2 transition-all duration-300 ease-in-out overflow-hidden ${collapsedSections[field.name] ? "max-h-0 opacity-0" : "max-h-[2000px] opacity-100"}`}>
                {renderInputs(field.children, depth + 1, companyType)}
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div key={idx} className="cal-input-bg my-2">
            <label className="font-semibold text-gray-700">{field.label}</label>
            {desc && <p className="text-sm text-gray-500">{desc}</p>}
            <input
              type="text"
              name={field.name}
              value={formatNumber(field.value || "")}
              onChange={handleChange}
              placeholder={t('ui.enterAmount')}
              className="cal-input"
            />
            {additionalFields[field.name] && additionalFields[field.name].map((af, i) => (
              <div key={af.id} className="flex items-center mt-2">
                <input
                  type="text"
                  value={formatNumber(af.value)}
                  onChange={(e) => handleAdditionalFieldChange(field.name, af.id, e.target.value)}
                  className="cal-input"
                  placeholder={t('ui.enterAdditionalAmount')}
                />
                <button type="button" onClick={() => removeField(field.name, af.id)} className="ml-2 p-1.5 bg-red-100 hover:bg-red-200 text-red-600 rounded-full">
                  <Minus className="w-4 h-4" />
                </button>
              </div>
            ))}
            <button type="button" onClick={() => addField(field.name)} className="mt-1 p-1.5 bg-emerald-100 hover:bg-emerald-200 text-emerald-600 rounded-full">
              <Plus className="w-4 h-4" />
            </button>
          </div>
        );
      }
    });

  const getVisibleFields = () => methodCalcul === "Maliki" ? formData : formData.slice(0, -1);

  return (
    <div dir={language === 'ar' ? 'rtl' : 'ltr'} className="w-full min-h-screen bg-gradient-to-br from-gray-50 to-emerald-50">
      <LanguageSwitcher />
      <GoldPrice />
      <div className="max-w-4xl mx-auto p-6">
        {renderInputs(getVisibleFields(), 0, companyType)}
        <div className="text-center mt-6">
          <button onClick={() => calcZakat(methodCalcul)} className="bg-emerald-600 text-white py-3 px-6 rounded font-bold">
            {t('ui.calculate')}
          </button>
        </div>
      </div>
      {showResult && <ZakatPrice />}
      <MessagePopup message={popup.message} type={popup.type} onClose={() => setPopup({ message: "", type: "" })} />
    </div>
  );
};
