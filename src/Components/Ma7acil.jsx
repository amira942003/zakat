import { useState } from 'react';
import { ChevronDown, Trash } from "lucide-react";
import { WarninIcon } from '@/assets/Svg/WarninIcon';
import { MessagePopup } from './MessagePopup';
import { useApi } from "@/ApiProvider";
import { useLanguage } from '@/Components/LanguageProvider';

export const Ma7acil = () => {
  const api = useApi();
  const { language } = useLanguage();
  const [crops, setCrops] = useState([]);
  const [collapsedCrops, setCollapsedCrops] = useState({});
  const [popup, setPopup] = useState({ message: '', type: '' });
  const [isLoading, setIsLoading] = useState(false);

  const RATES = { rain: 0.10, mixed: 0.075, artificial: 0.05 };
  const NISAB = 653; // 653 kg

  // -------------------- Traductions --------------------
  const t = {
    ar: {
      pageTitle: "زكاة المحاصيل الزراعية",
      pageDesc: "احسب زكاة محاصيلك الزراعية وفقاً للمعايير الشرعية المعتمدة",
      formHeader: "بيانات المحاصيل الزراعية",
      nisabInfo: `النصاب: ${NISAB.toLocaleString()} كغ • أضف محاصيلك واحسب زكاتها`,
      cropType: "نوع المحصول",
      cropTypePlaceholder: "أدخل نوع المحصول (قمح، شعير، تمر...)",
      wateringMethod: "طريقة السقي",
      wateringOptions: { rain: "سقي بالمطر (10%)", mixed: "سقي مختلط (7.5%)", artificial: "سقي اصطناعي (5%)" },
      quantity: "الكمية (كيلوغرام)",
      quantityPlaceholder: "أدخل الكمية",
      ownershipType: "نوع الملكية",
      ownershipOptions: { individual: "ملكية فردية", shared: "ملكية مشتركة" },
      ownershipShare: "نصيبك من الملكية (%)",
      ownershipSharePlaceholder: "أدخل النسبة المئوية",
      zakatDue: "الزكاة المستحقة:",
      addCrop: "إضافة محصول جديد",
      calculateZakat: "احسب الزكاة",
      saveResults: "حفظ النتائج",
      saving: "جاري الحفظ...",
      popupLogin: "يجب تسجيل الدخول أولاً للحفظ",
      popupNoZakat: "لا توجد محاصيل مستحقة للزكاة للحفظ",
      popupSaved: "تم حفظ المحاصيل بنجاح!",
      popupFailed: "فشل حفظ المحاصيل، حاول مرة أخرى",
      infoCardTitle: "معلومات مهمة",
      infoCardText: `النصاب للمحاصيل الزراعية: ${NISAB.toLocaleString()} كيلوغرام • السقي بالمطر أو الأنهار: 10% من المحصول • السقي المختلط: 7.5% من المحصول • السقي الاصطناعي (بالآلات): 5% من المحصول`
    },
    fr: {
      pageTitle: "Zakat des cultures agricoles",
      pageDesc: "Calculez la zakat de vos cultures agricoles selon les normes islamiques",
      formHeader: "Informations sur les cultures",
      nisabInfo: `Nissab: ${NISAB.toLocaleString()} kg • Ajoutez vos cultures et calculez leur zakat`,
      cropType: "Type de culture",
      cropTypePlaceholder: "Entrez le type de culture (blé, orge, dattes...)",
      wateringMethod: "Méthode d'arrosage",
      wateringOptions: { rain: "Pluvial (10%)", mixed: "Mixte (7.5%)", artificial: "Artificiel (5%)" },
      quantity: "Quantité (kg)",
      quantityPlaceholder: "Entrez la quantité",
      ownershipType: "Type de propriété",
      ownershipOptions: { individual: "Propriété individuelle", shared: "Propriété partagée" },
      ownershipShare: "Votre part (%)",
      ownershipSharePlaceholder: "Entrez le pourcentage",
      zakatDue: "Zakat due:",
      addCrop: "Ajouter une culture",
      calculateZakat: "Calculer la zakat",
      saveResults: "Enregistrer les résultats",
      saving: "Enregistrement...",
      popupLogin: "Vous devez être connecté pour enregistrer",
      popupNoZakat: "Aucune culture éligible à la zakat",
      popupSaved: "Cultures enregistrées avec succès !",
      popupFailed: "Échec de l'enregistrement, réessayez",
      infoCardTitle: "Informations importantes",
      infoCardText: `Nissab pour les cultures agricoles: ${NISAB.toLocaleString()} kg • Arrosage pluvial ou rivière: 10% • Arrosage mixte: 7,5% • Arrosage artificiel: 5%`
    },
    en: {
      pageTitle: "Agricultural Crops Zakat",
      pageDesc: "Calculate the zakat of your crops according to Islamic rules",
      formHeader: "Crop Information",
      nisabInfo: `Nissab: ${NISAB.toLocaleString()} kg • Add your crops and calculate their zakat`,
      cropType: "Crop Type",
      cropTypePlaceholder: "Enter crop type (wheat, barley, dates...)",
      wateringMethod: "Watering Method",
      wateringOptions: { rain: "Rain (10%)", mixed: "Mixed (7.5%)", artificial: "Artificial (5%)" },
      quantity: "Quantity (kg)",
      quantityPlaceholder: "Enter quantity",
      ownershipType: "Ownership Type",
      ownershipOptions: { individual: "Individual", shared: "Shared" },
      ownershipShare: "Your share (%)",
      ownershipSharePlaceholder: "Enter percentage",
      zakatDue: "Zakat due:",
      addCrop: "Add Crop",
      calculateZakat: "Calculate Zakat",
      saveResults: "Save Results",
      saving: "Saving...",
      popupLogin: "You must login first to save",
      popupNoZakat: "No crops eligible for zakat",
      popupSaved: "Crops saved successfully!",
      popupFailed: "Save failed, try again",
      infoCardTitle: "Important Information",
      infoCardText: `Nissab for agricultural crops: ${NISAB.toLocaleString()} kg • Rain or river irrigation: 10% • Mixed: 7.5% • Artificial: 5%`
    }
  }[language];

  // --- Fonctions déjà existantes (toggleCrop, addCrop, updateCrop, removeCrop, calculateZakat, etc.) ---
  // Tu peux copier exactement ce que tu avais avant, juste remplacer tous les textes par t.xxx
  // Par exemple :
  // t.pageTitle, t.pageDesc, t.formHeader, t.nisabInfo, t.cropType, t.cropTypePlaceholder, t.wateringMethod, t.wateringOptions.rain, etc.

  const formatNumber = (num) =>
    !num ? "" : num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  const getTotalZakat = () => crops.reduce((total, crop) => total + (crop.zakatDue || 0), 0);
  const getWateringMethodLabel = (method) => t.wateringOptions[method] || method;

  return (
    <>
      <div dir={language === 'ar' ? "rtl" : "ltr"} className="w-full mx-auto min-h-screen bg-gradient-to-br from-gray-50 to-emerald-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-700 text-white py-12 md:py-16 mt-12 md:mt-15 mb-2">
          <div className="container text-center mx-auto px-4 md:px-6">
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 md:mb-4">{t.pageTitle}</h1>
            <p className="text-sm sm:text-base md:text-lg opacity-90 max-w-2xl mx-auto">{t.pageDesc}</p>
          </div>
        </div>

        {/* Form Header */}
        <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-1">{t.formHeader}</h2>
        <p className="text-gray-600 text-xs md:text-sm break-words">{t.nisabInfo}</p>

        {/* Remplacer tous les labels, placeholders, boutons, options et messages par t.xxx */}
        {/* Exemple : */}
        {/* <label>{t.cropType}</label> */}
        {/* <input placeholder={t.cropTypePlaceholder} /> */}
        {/* <select> <option>{t.wateringOptions.rain}</option> ... </select> */}
        {/* <button>{t.addCrop}</button> */}
        {/* popup.message = t.popupSaved, t.popupFailed, etc. */}
        {/* infoCardTitle = t.infoCardTitle, infoCardText = t.infoCardText */}

        {/* Ici tu peux copier tout le reste de ton code HTML/JSX en remplaçant juste les textes par t.xxx */}
      </div>

      <MessagePopup
        message={popup.message}
        type={popup.type}
        onClose={() => setPopup({ message: "", type: "" })}
      />
    </>
  );
};
