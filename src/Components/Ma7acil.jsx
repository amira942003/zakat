import { useState } from 'react';
import { ChevronDown, ChevronUp, Trash } from "lucide-react";
import { WarninIcon } from '@/assets/Svg/WarninIcon';
import { MessagePopup } from './MessagePopup';
import { useApi } from "@/ApiProvider";
import { useLanguage } from '@/Components/LanguageProvider';
import { translations } from './translations'; // <-- fichier de traduction

export const Ma7acil = () => {
  const api = useApi();
  const { language } = useLanguage();
  const t = translations[language]; // <- récupération des textes selon la langue

  const [crops, setCrops] = useState([]);
  const [collapsedCrops, setCollapsedCrops] = useState({});
  const [popup, setPopup] = useState({ message: '', type: '' });
  const [isLoading, setIsLoading] = useState(false);

  const RATES = {
    rain: 0.10,
    mixed: 0.075,
    artificial: 0.05,
  };
  const NISAB = 653; // 653 kg

  const saveZakatHistory = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setPopup({ message: t.loginFirst, type: "error" });
      return;
    }

    const cropsWithZakat = crops.filter((crop) => crop.zakatDue > 0);

    if (cropsWithZakat.length === 0) {
      setPopup({ message: t.noZakatToSave, type: "error" });
      return;
    }

    setIsLoading(true);
    let successCount = 0;
    let failCount = 0;

    for (const crop of cropsWithZakat) {
      const zakatData = {
        zakat_amount: crop.zakatDue,
        total_amount: parseFloat(crop.quantity) || 0,
        corp_type: crop.cropType || t.undefinedCrop,
      };

      const [data, status, error] = await api.post("/create-ma7acil/", zakatData);

      if (!error && status >= 200 && status < 300) {
        successCount++;
        setPopup({ message: t.saveSuccess, type: "success" });
        setCrops([]);
        setCollapsedCrops({});
      } else {
        failCount++;
        console.error("Save failed:", error || data);
        setPopup({ message: t.saveFailed, type: "error" });
      }
    }

    setIsLoading(false);

    setTimeout(() => {
      setPopup({ message: "", type: "" });
    }, 3000);
  };

  const toggleCrop = (index) => {
    setCollapsedCrops(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const addCrop = () => {
    setCrops(prev => [
      ...prev,
      { cropType: '', wateringMethod: 'rain', quantity: '', ownershipType: 'individual', ownershipShare: '', zakatDue: 0 },
    ]);
  };

  const updateCrop = (index, field, value) => {
    const updated = [...crops];
    updated[index][field] = value;
    setCrops(updated);
  };

  const removeCrop = (index) => {
    const updated = crops.filter((_, i) => i !== index);
    setCrops(updated);
    const newCollapsed = { ...collapsedCrops };
    delete newCollapsed[index];
    setCollapsedCrops(newCollapsed);
  };

  const calculateZakat = () => {
    const updated = crops.map(crop => {
      const qty = parseFloat(crop.quantity) || 0;
      const share = parseFloat(crop.ownershipShare) || 0;
      const rate = RATES[crop.wateringMethod] || 0;

      let applicableQty = qty;
      if (crop.ownershipType === 'shared') {
        const shareQty = (qty * share) / 100;
        if (shareQty < NISAB) return { ...crop, zakatDue: 0 };
        applicableQty = shareQty;
      } else {
        if (qty < NISAB) return { ...crop, zakatDue: 0 };
      }

      return { ...crop, zakatDue: applicableQty * rate };
    });

    setCrops(updated);
  };

  const formatNumber = (num) => !num ? "" : num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  const getTotalZakat = () => crops.reduce((total, crop) => total + (crop.zakatDue || 0), 0);

  const getWateringMethodLabel = (method) => {
    const labels = {
      rain: t.rainLabel,
      mixed: t.mixedLabel,
      artificial: t.artificialLabel,
    };
    return labels[method] || method;
  };

  return (
    <>
      <div dir="rtl" className="w-full mx-auto min-h-screen bg-gradient-to-br from-gray-50 to-emerald-50">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-700 text-white py-12 md:py-16 mt-12 md:mt-15 mb-2">
          <div className="container text-center mx-auto px-4 md:px-6">
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 md:mb-4">{t.pageTitle}</h1>
            <p className="text-sm sm:text-base md:text-lg opacity-90 max-w-2xl mx-auto">{t.pageDesc}</p>
          </div>
        </div>

        {/* Main Form Container */}
        <div className="px-3 sm:px-4 md:px-6 mx-auto pb-8 md:pb-12">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg md:rounded-2xl shadow-lg md:shadow-xl border border-gray-200 overflow-hidden">
              
              {/* Form Header */}
              <div className="form-header bg-gradient-to-r from-gray-50 to-emerald-50 border-b border-gray-200 p-4 md:p-6">
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="w-3 h-6 md:h-8 bg-emerald-600 rounded-full flex-shrink-0"></div>
                  <div className="min-w-0">
                    <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-1">{t.formHeader}</h2>
                    <p className="text-gray-600 text-xs md:text-sm break-words">{t.nisabInfo} {NISAB.toLocaleString()} كغ</p>
                  </div>
                </div>
              </div>

              {/* Form Content */}
              <div className="p-4 md:p-8 form-container">
                <div className="space-y-4 md:space-y-6">
                  {crops.map((crop, index) => (
                    <div key={index} className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-lg overflow-hidden">
                      {/* Crop Header */}
                      <div className="flex items-center justify-between p-3 md:p-4 cursor-pointer hover:bg-emerald-100/50 transition-colors duration-200 gap-2"
                        onClick={() => toggleCrop(index)}>
                        <div className="flex items-center min-w-0 gap-2 md:gap-3">
                          <div className="w-1 h-5 md:h-6 bg-emerald-600 rounded-full flex-shrink-0"></div>
                          <h3 className="text-sm md:text-lg font-bold text-emerald-800 select-none truncate">
                            {crop.cropType || `${t.crop} ${index + 1}`}
                          </h3>
                          {crop.zakatDue > 0 && (
                            <span className="px-2 md:px-3 py-1 bg-emerald-600 text-white text-xs md:text-sm rounded-full whitespace-nowrap">
                              {crop.zakatDue.toFixed(2)} كغ
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <button
                            onClick={(e) => { e.stopPropagation(); removeCrop(index); }}
                            className="p-1.5 md:p-2 text-red-500 hover:bg-red-100 rounded-full transition-colors"
                          >
                            <Trash className="w-4 h-4 md:w-5 md:h-5" stroke='#036116'></Trash>
                          </button>
                          <span className="text-xs md:text-sm text-emerald-600 font-medium hidden sm:inline">
                            {collapsedCrops[index] ? t.show : t.hide}
                          </span>
                          <div className={`transform transition-transform duration-300 ${collapsedCrops[index] ? "rotate-180" : ""}`}>
                            <ChevronDown className="w-4 h-4 md:w-5 md:h-5 text-emerald-600" />
                          </div>
                        </div>
                      </div>

                      {/* Crop Content */}
                      {/* ... Toutes les sections des inputs remplacées par t.xxx ... */}
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>

        <MessagePopup
          message={popup.message}
          type={popup.type}
          onClose={() => setPopup({ message: "", type: "" })}
        />
      </div>
    </>
  );
};
