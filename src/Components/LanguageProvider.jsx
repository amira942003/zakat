// languageProvider.js
import { createContext, useContext, useState } from "react";

// -------------------- Translations --------------------
export const translations = {
  ar: {
    goldPrice: {
      title: "سعر الغرام الواحد من الذهب (24 قيراط) بالدينار الجزائري:",
      inputLabel: "أدخل سعر الغرام",
      placeholder: "أدخل السعر هنا",
      infoText: "يُرجى إدخال سعر الغرام الحالي للذهب عيار 24 قيراط في السوق الجزائرية لحساب النصاب بدقة",
      pricePerGram: "سعر الغرام",
      nissab: "النصاب",
      grams: "غرام"
    },
    forms: { /* ton ancien contenu forms ici */ },
    ui: {
      title: "المنصة الموثوقة والمخصصة لمساعدة الشركات في حساب زكاتها المستحقة بسهولة ودقة",
      subtitle: "نهدف إلى تسهيل عملية احتساب الزكاة للشركات وفقًا لأحكام الشريعة الإسلامية، وذلك لدعم التكافل الاجتماعي والمساهمة في التنمية المستدامة للمجتمع",
      calculationMethod: "طريقة الحساب",
      companyType: "نوع الشركة",
      calculate: "احسب الزكاة",
      addField: "إضافة حقل آخر",
      removeField: "حذف هذا الحقل",
      additionalField: "حقل إضافي",
      total: "المجموع",
      enterAmount: "أدخل المبلغ",
      enterAdditionalAmount: "أدخل المبلغ الإضافي",
      assetsData: "بيانات الأصول والممتلكات",
      assetsDescription: "يرجى إدخال جميع الأصول والممتلكات الخاضعة للزكاة",
      importantInfo: "معلومة مهمة",
      warningText: "يُرجى التأكد من دقة البيانات المدخلة قبل الحساب...",
      note: "ملاحظة:",
      noteText: "يمكنكم إضافة حقول إضافية لأي عنصر بالنقر على زر الإضافة (+) بجانب كل حقل.",
      show: "إظهار",
      hide: "إخفاء",
      // UserInfos
      profile: "الملف الشخصي",
      managePersonalInfo: "إدارة معلوماتك الشخصية وإعدادات الحساب",
      accountInfo: "معلومات الحساب",
      password: "كلمة المرور",
      updateAccountInfo: "قم بتحديث معلومات حسابك.",
      username: "اسم المستخدم",
      email: "البريد الإلكتروني",
      firstName: "الاسم الأول",
      lastName: "الاسم الأخير",
      enterUsername: "أدخل اسم المستخدم",
      enterEmail: "أدخل البريد الإلكتروني",
      enterFirstName: "أدخل الاسم الأول",
      enterLastName: "أدخل الاسم الأخير",
      updateInfo: "تحديث المعلومات",
      updating: "جاري التحديث...",
      changePassword: "تغيير كلمة المرور",
      enterOldNewPassword: "قم بإدخال كلمة المرور القديمة والجديدة",
      currentPassword: "كلمة المرور الحالية",
      newPassword: "كلمة المرور الجديدة",
      enterCurrentPassword: "أدخل كلمة المرور الحالية",
      enterNewPassword: "أدخل كلمة المرور الجديدة",
      updatePassword: "تحديث كلمة المرور",
      newPasswordRequired: "كلمة المرور الجديدة مطلوبة!",
      oldPasswordRequired: "كلمة المرور القديمة مطلوبة!",
      pleaseEnterNewPassword: "يرجى إدخال كلمة المرور الجديدة",
      errorOccurred: "حدث خطأ",
      dataUpdatedSuccessfully: "تم تحديث البيانات بنجاح",
      failedToLoadUserInfo: "فشل تحميل معلومات المستخدم.",
      // UserHistory
      zakatHistory: "تاريخ الزكاة",
      viewZakatHistory: "عرض سجل حساباتك السابقة للزكاة",
      noHistoryFound: "لم يتم العثور على سجل",
      noCalculationsYet: "لم تقم بأي حسابات للزكاة بعد",
      date: "التاريخ",
      method: "الطريقة",
      companyTypeLabel: "نوع الشركة",
      zakatAmount: "مبلغ الزكاة",
      details: "التفاصيل",
      loading: "جاري التحميل...",
      close: "إغلاق",
      calculationDetails: "تفاصيل الحساب",
      section1: {
        title: "الزكاة: التزام ديني ودعم للتكافل الاجتماعي",
        text: "على هذا الموقع، يمكن للشركات حساب قيمة الزكاة الواجبة عليها وفقًا للشريعة الإسلامية...",
        button: "اعرف المزيد"
      },
      section2: {
        title: "نحو مجتمع أكثر تماسكًا: دور الشركات في دعم الفئات الأقل حظًا وتحقيق الأثر الإيجابي",
        text: "تتُعَدُّ هذه المبادرة خطوةً هامة تُحقّق العديد من الفوائد للمجتمع...",
        button: "اعرف المزيد",
        imageAlt: "صورة مسجد"
      },
      section3: {
        title: "سهولة ودقة في حساب زكاة الشركات وفق الشريعة الإسلامية",
        text: "ييعمل هذا الموقع بطريقة بسيطة وفعالة لمساعدة الشركات في حساب زكاة الشركات...",
        button: "ابدأ الآن",
        imageAlt: "صورة حساب الزكاة"
      }
    },
    methods: { /* ton ancien contenu methods ici */ }
  },
  fr: {
    goldPrice: {
      title: "Prix d'un gramme d'or (24 carats) en DZD :",
      inputLabel: "Entrez le prix du gramme",
      placeholder: "Entrez le prix ici",
      infoText: "Veuillez entrer le prix actuel du gramme d'or 24 carats sur le marché algérien pour calculer le Nissab avec précision",
      pricePerGram: "Prix par gramme",
      nissab: "Nissab",
      grams: "grammes"
    },
    forms: { /* contenu forms fr ici */ },
    ui: { /* contenu ui fr ici */ },
    methods: { /* contenu methods fr ici */ }
  },
  en: {
    goldPrice: {
      title: "Price of one gram of gold (24K) in DZD:",
      inputLabel: "Enter gold price",
      placeholder: "Enter price here",
      infoText: "Please enter the current price of 24K gold per gram in the Algerian market to calculate Nissab accurately",
      pricePerGram: "Price per gram",
      nissab: "Nissab",
      grams: "grams"
    },
    forms: { /* contenu forms en ici */ },
    ui: { /* contenu ui en ici */ },
    methods: { /* contenu methods en ici */ }
  }
};

// -------------------- Language Context --------------------
const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("ar");

  const t = (key) => {
    const keys = key.split(".");
    let value = translations[language];
    for (const k of keys) value = value?.[k];
    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);

// -------------------- Form Generator --------------------
export const getZakatForm = (t) => [
  /* ton ancien contenu getZakatForm ici */
];
