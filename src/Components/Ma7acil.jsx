import { useState } from "react";
import { ChevronDown, Trash } from "lucide-react";
import { WarninIcon } from "@/assets/Svg/WarninIcon";
import { MessagePopup } from "./MessagePopup";
import { useApi } from "@/ApiProvider";
import { useTranslation } from "react-i18next";

export const Ma7acil = () => {
  const { t } = useTranslation();
  const api = useApi();

  const [crops, setCrops] = useState([]);
  const [collapsedCrops, setCollapsedCrops] = useState({});
  const [popup, setPopup] = useState({ message: "", type: "" });
  const [isLoading, setIsLoading] = useState(false);

  const RATES = {
    rain: 0.1,
    mixed: 0.075,
    artificial: 0.05,
  };

  const NISAB = 653;

  const saveZakatHistory = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setPopup({ message: t("ma7acil.loginRequired"), type: "error" });
      return;
    }

    const cropsWithZakat = crops.filter(c => c.zakatDue > 0);

    if (cropsWithZakat.length === 0) {
      setPopup({ message: t("ma7acil.noZakatToSave"), type: "error" });
      return;
    }

    setIsLoading(true);

    for (const crop of cropsWithZakat) {
      const zakatData = {
        zakat_amount: crop.zakatDue,
        total_amount: parseFloat(crop.quantity) || 0,
        corp_type: crop.cropType || t("ma7acil.crop"),
      };

      const [, status, error] = await api.post("/create-ma7acil/", zakatData);

      if (!error && status >= 200 && status < 300) {
        setPopup({ message: t("ma7acil.saveSuccess"), type: "success" });
        setCrops([]);
        setCollapsedCrops({});
      } else {
        setPopup({ message: t("ma7acil.saveError"), type: "error" });
      }
    }

    setIsLoading(false);
  };

  const toggleCrop = index => {
    setCollapsedCrops(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const addCrop = () => {
    setCrops(prev => [
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
  };

  const updateCrop = (index, field, value) => {
    const updated = [...crops];
    updated[index][field] = value;
    setCrops(updated);
  };

  const removeCrop = index => {
    setCrops(crops.filter((_, i) => i !== index));
  };

  const calculateZakat = () => {
    const updated = crops.map(crop => {
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

  const getWateringLabel = method =>
    t(`ma7acil.${method}`);

  const getTotalZakat = () =>
    crops.reduce((sum, c) => sum + (c.zakatDue || 0), 0);

  return (
    <div dir="rtl" className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="bg-emerald-800 text-white text-center py-14 mt-12">
        <h1 className="text-4xl font-bold">{t("ma7acil.title")}</h1>
        <p className="opacity-90 mt-2">{t("ma7acil.subtitle")}</p>
      </div>

      {/* Form */}
      <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded-xl mt-6">
        <h2 className="font-bold text-xl mb-2">
          {t("ma7acil.formTitle")}
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          {t("ma7acil.nisabInfo")}
        </p>

        {crops.map((crop, index) => (
          <div key={index} className="border rounded-lg mb-4">

            <div
              onClick={() => toggleCrop(index)}
              className="flex justify-between items-center p-4 cursor-pointer bg-emerald-50"
            >
              <strong>
                {crop.cropType || `${t("ma7acil.crop")} ${index + 1}`}
              </strong>

              <div className="flex items-center gap-3">
                <button onClick={() => removeCrop(index)}>
                  <Trash className="w-4 h-4 text-red-500" />
                </button>
                <ChevronDown />
              </div>
            </div>

            {!collapsedCrops[index] && (
              <div className="p-4 space-y-3">

                <input
                  className="cal-input"
                  placeholder={t("ma7acil.cropTypePlaceholder")}
                  value={crop.cropType}
                  onChange={e =>
                    updateCrop(index, "cropType", e.target.value)
                  }
                />

                <select
                  className="select-form"
                  value={crop.wateringMethod}
                  onChange={e =>
                    updateCrop(index, "wateringMethod", e.target.value)
                  }
                >
                  <option value="rain">{t("ma7acil.rain")}</option>
                  <option value="mixed">{t("ma7acil.mixed")}</option>
                  <option value="artificial">{t("ma7acil.artificial")}</option>
                </select>

                <input
                  className="cal-input"
                  placeholder={t("ma7acil.quantityPlaceholder")}
                  value={crop.quantity}
                  onChange={e =>
                    updateCrop(index, "quantity", e.target.value)
                  }
                />

                <select
                  className="select-form"
                  value={crop.ownershipType}
                  onChange={e =>
                    updateCrop(index, "ownershipType", e.target.value)
                  }
                >
                  <option value="individual">{t("ma7acil.individual")}</option>
                  <option value="shared">{t("ma7acil.shared")}</option>
                </select>

                {crop.ownershipType === "shared" && (
                  <input
                    className="cal-input"
                    placeholder={t("ma7acil.ownershipShare")}
                    value={crop.ownershipShare}
                    onChange={e =>
                      updateCrop(index, "ownershipShare", e.target.value)
                    }
                  />
                )}

                <div className="font-bold text-emerald-700">
                  {t("ma7acil.zakatDue")} : {crop.zakatDue.toFixed(2)} kg
                </div>

              </div>
            )}
          </div>
        ))}

        <button onClick={addCrop} className="custom-button w-full mt-4">
          {t("ma7acil.addCrop")}
        </button>

        {crops.length > 0 && (
          <div className="mt-6 text-center space-y-3">
            <button onClick={calculateZakat} className="custom-button w-full">
              {t("ma7acil.calculate")}
            </button>

            {getTotalZakat() > 0 && (
              <button
                onClick={saveZakatHistory}
                disabled={isLoading}
                className="custom-button w-full"
              >
                {isLoading ? t("ma7acil.saving") : t("ma7acil.save")}
              </button>
            )}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="max-w-4xl mx-auto mt-6 bg-amber-50 border p-4 rounded-lg flex gap-3">
        <WarninIcon />
        <div>
          <h3 className="font-bold">{t("ma7acil.infoTitle")}</h3>
          <p className="text-sm">{t("ma7acil.infoText")}</p>
        </div>
      </div>

      <MessagePopup
        message={popup.message}
        type={popup.type}
        onClose={() => setPopup({ message: "", type: "" })}
      />
    </div>
  );
};
