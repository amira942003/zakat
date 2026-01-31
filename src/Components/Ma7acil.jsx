import { useState } from "react";
import { ChevronDown, Trash } from "lucide-react";
import { WarninIcon } from "@/assets/Svg/WarninIcon";
import { MessagePopup } from "./MessagePopup";
import { useApi } from "@/ApiProvider";
import { useLanguage } from "C:\Users\Mira\ZAKAT\zakat\src\Components\LanguageProvider.jsx";

export const Ma7acil = () => {
  const api = useApi();
  const { language, t } = useLanguage();

  const [crops, setCrops] = useState([]);
  const [collapsedCrops, setCollapsedCrops] = useState({});
  const [popup, setPopup] = useState({ message: "", type: "" });
  const [isLoading, setIsLoading] = useState(false);

  const RATES = { rain: 0.10, mixed: 0.075, artificial: 0.05 };
  const NISAB = 653; // kg

  const formatNumber = (num) =>
    !num ? "" : num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  const toggleCrop = (index) =>
    setCollapsedCrops((prev) => ({ ...prev, [index]: !prev[index] }));

  const addCrop = () =>
    setCrops((prev) => [
      ...prev,
      {
        cropType: "",
        wateringMethod: "rain",
        quantity: "",
        ownershipType: "individual",
        ownershipShare: "",
        zakatDue: 0,
      },
    ]);

  const updateCrop = (index, field, value) => {
    const updated = [...crops];
    updated[index][field] = value;
    setCrops(updated);
  };

  const removeCrop = (index) => {
    setCrops(crops.filter((_, i) => i !== index));
    const newCollapsed = { ...collapsedCrops };
    delete newCollapsed[index];
    setCollapsedCrops(newCollapsed);
  };

  const calculateZakat = () => {
    const updated = crops.map((crop) => {
      const qty = parseFloat(crop.quantity) || 0;
      const share = parseFloat(crop.ownershipShare) || 0;
      const rate = RATES[crop.wateringMethod] || 0;
      let applicableQty = qty;

      if (crop.ownershipType === "shared") {
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

  const getTotalZakat = () =>
    crops.reduce((total, crop) => total + (crop.zakatDue || 0), 0);

  const saveZakatHistory = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setPopup({ message: t("popup", "loginRequired"), type: "error" });
      return;
    }

    const cropsWithZakat = crops.filter((crop) => crop.zakatDue > 0);
    if (!cropsWithZakat.length) {
      setPopup({ message: t("popup", "noCrops"), type: "error" });
      return;
    }

    setIsLoading(true);
    let successCount = 0;
    let failCount = 0;

    for (const crop of cropsWithZakat) {
      const zakatData = {
        zakat_amount: crop.zakatDue,
        total_amount: parseFloat(crop.quantity) || 0,
        corp_type: crop.cropType || "N/A",
      };

      const [data, status, error] = await api.post("/create-ma7acil/", zakatData);

      if (!error && status >= 200 && status < 300) {
        successCount++;
        setPopup({ message: t("popup", "saveSuccess"), type: "success" });
        setCrops([]);
        setCollapsedCrops({});
      } else {
        failCount++;
        setPopup({ message: t("popup", "saveError"), type: "error" });
      }
    }
    setIsLoading(false);
    setTimeout(() => setPopup({ message: "", type: "" }), 3000);
  };

  const getWateringLabel = (method) => t("form", "wateringOptions")[method];

  return (
    <div dir={language === "ar" ? "rtl" : "ltr"} className="w-full min-h-screen bg-gradient-to-br from-gray-50 to-emerald-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-700 text-white py-12 md:py-16 mt-12 md:mt-15 mb-2">
        <div className="container text-center mx-auto px-4 md:px-6">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 md:mb-4">{t("header", "title")}</h1>
          <p className="text-sm sm:text-base md:text-lg opacity-90 max-w-2xl mx-auto">{t("header", "subtitle")}</p>
        </div>
      </div>

      {/* Form */}
      <div className="px-3 sm:px-4 md:px-6 mx-auto pb-8 md:pb-12 max-w-4xl">
        <div className="bg-white rounded-lg md:rounded-2xl shadow-lg md:shadow-xl border border-gray-200 overflow-hidden">
          <div className="form-header bg-gradient-to-r from-gray-50 to-emerald-50 border-b border-gray-200 p-4 md:p-6">
            <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-1">{t("form", "cropData")}</h2>
            <p className="text-gray-600 text-xs md:text-sm">{t("form", "nisab")}: {NISAB.toLocaleString()} kg</p>
          </div>

          <div className="p-4 md:p-8 form-container space-y-4 md:space-y-6">
            {crops.map((crop, index) => (
              <div key={index} className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-lg overflow-hidden">
                {/* Header */}
                <div onClick={() => toggleCrop(index)} className="flex items-center justify-between p-3 md:p-4 cursor-pointer hover:bg-emerald-100/50 gap-2">
                  <h3 className="text-sm md:text-lg font-bold text-emerald-800 truncate">{crop.cropType || `${t("form", "cropType")} ${index + 1}`}</h3>
                  {crop.zakatDue > 0 && <span className="px-2 py-1 bg-emerald-600 text-white text-xs rounded-full">{crop.zakatDue.toFixed(2)} kg</span>}
                  <div className={`transform transition-transform duration-300 ${collapsedCrops[index] ? "rotate-180" : ""}`}>
                    <ChevronDown className="w-4 h-4 md:w-5 md:h-5 text-emerald-600" />
                  </div>
                  <button onClick={(e) => { e.stopPropagation(); removeCrop(index); }} className="text-red-500 p-1 md:p-2 rounded-full"> <Trash className="w-4 h-4" /> </button>
                </div>

                {/* Content */}
                <div className={`transition-all duration-300 overflow-hidden ${collapsedCrops[index] ? "max-h-0 opacity-0" : "max-h-[3000px] opacity-100"}`}>
                  <div className="p-3 md:p-4 space-y-3 md:space-y-4">
                    {/* Type */}
                    <div>
                      <label className="font-semibold text-gray-700">{t("form", "cropType")}</label>
                      <input className="cal-input" type="text" value={crop.cropType} onChange={(e)=>updateCrop(index,"cropType",e.target.value)} placeholder={t("form","cropTypePlaceholder")} />
                    </div>

                    {/* Watering */}
                    <div>
                      <label className="font-semibold text-gray-700">{t("form", "wateringMethod")}</label>
                      <select className="select-form" value={crop.wateringMethod} onChange={(e)=>updateCrop(index,"wateringMethod",e.target.value)}>
                        <option value="rain">{getWateringLabel("rain")}</option>
                        <option value="mixed">{getWateringLabel("mixed")}</option>
                        <option value="artificial">{getWateringLabel("artificial")}</option>
                      </select>
                    </div>

                    {/* Quantity */}
                    <div>
                      <label className="font-semibold text-gray-700">{t("form", "quantity")}</label>
                      <input type="text" className="cal-input" value={formatNumber(crop.quantity)} onChange={(e)=>{ const val=e.target.value.replace(/,/g,""); if(!isNaN(val)&&val>=0) updateCrop(index,"quantity",val);}} placeholder="0" />
                    </div>

                    {/* Ownership */}
                    <div>
                      <label className="font-semibold text-gray-700">{t("form", "ownershipType")}</label>
                      <select className="select-form" value={crop.ownershipType} onChange={(e)=>updateCrop(index,"ownershipType",e.target.value)}>
                        <option value="individual">{t("form","ownershipOptions").individual}</option>
                        <option value="shared">{t("form","ownershipOptions").shared}</option>
                      </select>
                    </div>

                    {crop.ownershipType==="shared" && (
                      <div>
                        <label className="font-semibold text-gray-700">{t("form","ownershipShare")}</label>
                        <input type="number" className="cal-input" value={crop.ownershipShare} onChange={(e)=>updateCrop(index,"ownershipShare",e.target.value)} min="0" max="100" />
                      </div>
                    )}

                    {/* Zakat */}
                    {crop.zakatDue>=0 && (
                      <div className="bg-green-100 border border-green-300 rounded-lg p-3">
                        <span className="font-bold text-green-800">{t("form","zakatDue")}</span>
                        <span className="text-green-700 font-bold">{crop.zakatDue.toFixed(2)} kg</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}

            <button onClick={addCrop} className="custom-button w-full sm:w-1/2">{t("form","addCrop")}</button>

            {crops.length>0 && (
              <div className="text-center mt-6 space-y-3">
                <button onClick={calculateZakat} className="custom-button w-full sm:w-1/2">{t("form","calculate")}</button>
                {getTotalZakat()>0 && (
                  <button onClick={saveZakatHistory} disabled={isLoading} className="custom-button w-full sm:w-1/2">
                    {isLoading ? t("buttons","loading") : t("form","save")}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Info Card */}
        <div className="mt-6 bg-amber-50 border border-amber-200 rounded-lg p-4 md:p-6">
          <h3 className="font-bold text-amber-800">{t("infoCard","title")}</h3>
          <p className="text-amber-700 text-xs md:text-sm">{t("infoCard","text").replace("{nisab}",NISAB.toLocaleString())}</p>
        </div>
      </div>

      {/* Popup */}
      <MessagePopup message={popup.message} type={popup.type} onClose={()=>setPopup({message:"",type:""})} />
    </div>
  );
};
