import { useState } from 'react';
import { ChevronDown, Trash } from "lucide-react";
import { WarninIcon } from '@/assets/Svg/WarninIcon';
import { MessagePopup } from './MessagePopup';
import { useApi } from "@/ApiProvider";
import { useLanguage } from '@/Components/LanguageProvider';
import { translations } from './translations';

export const Ma7acil = () => {
  const api = useApi();
  const { language } = useLanguage();
  const t = translations[language];

  const [crops, setCrops] = useState([]);
  const [collapsedCrops, setCollapsedCrops] = useState({});
  const [popup, setPopup] = useState({ message: '', type: '' });
  const [isLoading, setIsLoading] = useState(false);

  const RATES = { rain: 0.10, mixed: 0.075, artificial: 0.05 };
  const NISAB = 653;

  const toggleCrop = (index) => setCollapsedCrops(prev => ({ ...prev, [index]: !prev[index] }));
  const addCrop = () => setCrops(prev => [...prev, { cropType: '', wateringMethod: 'rain', quantity: '', ownershipType: 'individual', ownershipShare: '', zakatDue: 0 }]);
  const updateCrop = (i, f, v) => { const u = [...crops]; u[i][f] = v; setCrops(u); };
  const removeCrop = (i) => { setCrops(crops.filter((_, idx) => idx !== i)); const nc = { ...collapsedCrops }; delete nc[i]; setCollapsedCrops(nc); };

  const formatNumber = (num) => !num ? "" : num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  const getWateringMethodLabel = (method) => t.wateringOptions[method] || method;
  const getTotalZakat = () => crops.reduce((total, c) => total + (c.zakatDue || 0), 0);

  // --- CALCUL DES ZAKAT
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

      const zakatDue = applicableQty * rate;
      return { ...crop, zakatDue };
    });
    setCrops(updated);
  };

  // --- SAUVEGARDE
  const saveZakatHistory = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) { setPopup({ message: "يجب تسجيل الدخول أولاً للحفظ", type: "error" }); return; }

    const cropsWithZakat = crops.filter((crop) => crop.zakatDue > 0);
    if (cropsWithZakat.length === 0) { setPopup({ message: "لا توجد محاصيل مستحقة للزكاة للحفظ", type: "error" }); return; }

    setIsLoading(true);
    for (const crop of cropsWithZakat) {
      const zakatData = { zakat_amount: crop.zakatDue, total_amount: parseFloat(crop.quantity) || 0, corp_type: crop.cropType || "غير محدد" };
      const [data, status, error] = await api.post("/create-ma7acil/", zakatData);
      if (!error && status >= 200 && status < 300) { setPopup({ message: "تم حفظ المحاصيل بنجاح!", type: "success" }); setCrops([]); setCollapsedCrops({}); } 
      else { console.error("Save failed:", error || data); setPopup({ message: "فشل حفظ المحاصيل، حاول مرة أخرى", type: "error" }); }
    }
    setIsLoading(false);
    setTimeout(() => setPopup({ message: "", type: "" }), 3000);
  };

  return (
    <div dir={language==='ar'?'rtl':'ltr'} className="w-full mx-auto min-h-screen bg-gradient-to-br from-gray-50 to-emerald-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-700 text-white py-12 md:py-16 mt-12 md:mt-15 mb-2 text-center">
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 md:mb-4">{t.pageTitle}</h1>
        <p className="text-sm sm:text-base md:text-lg opacity-90 max-w-2xl mx-auto">{t.pageDesc}</p>
      </div>

      {/* Form container */}
      <div className="px-3 sm:px-4 md:px-6 mx-auto pb-8 md:pb-12 max-w-4xl">
        <div className="bg-white rounded-lg md:rounded-2xl shadow-lg md:shadow-xl border border-gray-200 overflow-hidden">
          <div className="form-header bg-gradient-to-r from-gray-50 to-emerald-50 border-b border-gray-200 p-4 md:p-6">
            <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-1">{t.formHeader}</h2>
            <p className="text-gray-600 text-xs md:text-sm break-words">{t.nisabInfo}</p>
          </div>

          {/* Crops list */}
          <div className="p-4 md:p-8 form-container space-y-4 md:space-y-6">
            {crops.map((crop,index)=>(
              <div key={index} className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-lg overflow-hidden">
                {/* header + buttons */}
                <div className="flex items-center justify-between p-3 md:p-4 cursor-pointer hover:bg-emerald-100/50 transition-colors duration-200 gap-2" onClick={()=>toggleCrop(index)}>
                  <h3 className="text-sm md:text-lg font-bold text-emerald-800 select-none truncate">{crop.cropType||`${t.cropType} ${index+1}`}</h3>
                  <div className="flex items-center gap-2">
                    <button onClick={e=>{e.stopPropagation();removeCrop(index)}} className="p-1.5 md:p-2 text-red-500 hover:bg-red-100 rounded-full transition-colors"><Trash className="w-4 h-4 md:w-5 md:h-5" stroke='#036116'/></button>
                    <div className={`transform transition-transform duration-300 ${collapsedCrops[index]?"rotate-180":""}`}><ChevronDown className="w-4 h-4 md:w-5 md:h-5 text-emerald-600"/></div>
                  </div>
                </div>

                {/* contenu */}
                <div className={`p-0 m-0 transition-all duration-300 ease-in-out overflow-hidden ${collapsedCrops[index]?"max-h-0 opacity-0":"max-h-[3000px] opacity-100"}`}>
                  {/* ici tu peux continuer à mettre tous tes inputs, selects, labels comme avant */}
                </div>
              </div>
            ))}

            <div className="text-center">
              <button onClick={addCrop} className="custom-button py-3 md:py-4 rounded-sm w-full sm:w-1/2 font-bold text-sm md:text-base">{t.addCrop}</button>
            </div>

            {/* Boutons calculer + sauvegarder */}
            {crops.length>0 && (
              <div className="text-center mt-6 md:mt-10 pt-4 md:pt-6 border-t border-gray-200 space-y-3">
                <button onClick={calculateZakat} className="custom-button py-3 md:py-4 rounded-sm w-full sm:w-1/2 font-bold text-sm md:text-base">{t.calculateZakat}</button>
                {getTotalZakat()>0 && (
                  <button onClick={saveZakatHistory} disabled={isLoading} className="custom-button py-3 md:py-4 rounded-sm w-full sm:w-1/2 font-bold text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed">
                    {isLoading?t.saving:t.saveResults}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <MessagePopup message={popup.message} type={popup.type} onClose={()=>setPopup({message:"",type:""})}/>
    </div>
  );
};
