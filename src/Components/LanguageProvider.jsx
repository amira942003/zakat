// languageProvider.js
import { createContext, useContext, useState } from "react";

// -------------------- Translations --------------------
export const translations = {
  ar: {
    forms: {
      "1": {
        label: "النقود وما في حكمها",
        fields: {
          x1: "نقدية بالصندوق",
          x2: "نقدية لدى المصارف",
          x3: "شيكات مصادق عليها",
          x4: "العملات الأجنبية",
          x5: "أصول رقمية متاحة",
          x6: "ودائع أمانة",
          x7: "قرض حسن مُقرض",
          x8: "إيرادات مستحقة",
          x9: "نقود من بيع أصول"
        }
      },
      "2": {
        label: "الذمم المدينة",
        fields: {
          y1: "ديون حالّة مرجوّة",
          y2: "ديون مؤجّلة",
          y3: "أوراق قبض",
          y4: "ديون مرجوّة",
          y5: "ديون عن بيع أصول",
          y6: "إيرادات إيجار",
          y7: "ديون مشكوك فيها"
        }
      },
      "3": {
        label: "الاستثمارات الزكوية",
        fields: {
          z1: "أسهم للتجارة",
          z2: "حصص عقارية",
          z3: "استثمارات سندات",
          z4: "أسهم بنية العائد"
        }
      },
      "4": {
        label: "عروض التجارة والمخزون",
        fields: {
          a1: "بضاعة تامة",
          a2: "بضاعة تحت التشغيل",
          a3: "مواد أولية",
          a4: "بضاعة في الطريق",
          a5: "بضاعة أمانة",
          a6: "قطع غيار",
          a7: "عروض تجارة",
          a8: "عقارات للتجارة",
          a9: "بضاعة كاسدة"
        }
      },
      "6": {
        label: "الالتزامات واجبة الخصم",
        fields: {
          c1: "قروض قصيرة الأجل",
          c2: "أوراق دفع",
          c3: "حقوق موظفين",
          c4: "ضرائب مستحقة",
          c5: "أرباح مضاربة",
          c6: "تأمينات العملاء",
          c7: "احتياطيات عامة"
        }
      },
      malikiAssets: {
        label: "الذمات المالية",
        fields: {
          SPA: "ذمة المالية للشركة",
          SARL: "ذمة المالية للشخص",
          limit: "حد المفلس"
        }
      }
    },
    methods: {
      Maliki: "مالكي",
      Hanafi: "حنفي",
      Shafi: "شافعي"
    },
    ui: {
      goldPrice: {
        title: "سعر الغرام الواحد من الذهب (24 قيراط) بالدينار الجزائري",
        inputLabel: "أدخل سعر الغرام",
        placeholder: "أدخل سعر الغرام الحالي للذهب عيار 24 قيراط",
        infoText: "يُرجى إدخال سعر الغرام الحالي للذهب عيار 24 قيراط في السوق الجزائرية لحساب النصاب بدقة",
        pricePerGram: "سعر الغرام",
        nissab: "النصاب",
        grams: "غرام"
      },
      assetsData: "بيانات الأصول والممتلكات",
      assetsDescription: "يرجى إدخال جميع الأصول والممتلكات الخاضعة للزكاة",
      calculationMethod: "طريقة الحساب",
      companyType: "نوع الشركة",
      calculate: "احسب الزكاة",
      addField: "إضافة حقل آخر",
      removeField: "حذف هذا الحقل",
      additionalField: "حقل إضافي",
      total: "المجموع",
      enterAmount: "أدخل المبلغ",
      enterAdditionalAmount: "أدخل المبلغ الإضافي",
      importantInfo: "معلومة مهمة",
      warningText: "يُرجى التأكد من دقة البيانات المدخلة قبل الحساب...",
      note: "ملاحظة:",
      noteText: "يمكنكم إضافة حقول إضافية لأي عنصر بالنقر على زر الإضافة (+) بجانب كل حقل.",
      show: "إظهار",
      hide: "إخفاء"
    }
  },
  fr: {
    forms: {
      "1": {
        label: "Argent et équivalents",
        fields: {
          x1: "Liquidités en caisse",
          x2: "Liquidités en banque",
          x3: "Chèques certifiés",
          x4: "Devises étrangères",
          x5: "Actifs numériques disponibles",
          x6: "Dépôts en fiducie",
          x7: "Prêt à bon crédit",
          x8: "Revenus à recevoir",
          x9: "Argent provenant de la vente d'actifs"
        }
      },
      "2": {
        label: "Créances",
        fields: {
          y1: "Dettes à court terme attendues",
          y2: "Dettes différées",
          y3: "Effets à recevoir",
          y4: "Dettes attendues",
          y5: "Dettes provenant de la vente d'actifs",
          y6: "Revenus locatifs",
          y7: "Dettes douteuses"
        }
      },
      "3": {
        label: "Investissements soumis à la Zakat",
        fields: {
          z1: "Actions commerciales",
          z2: "Parts immobilières",
          z3: "Investissements en obligations",
          z4: "Actions avec retour sur investissement"
        }
      },
      "4": {
        label: "Marchandises et stocks",
        fields: {
          a1: "Marchandise finie",
          a2: "Marchandise en cours",
          a3: "Matières premières",
          a4: "Marchandise en transit",
          a5: "Marchandise en fiducie",
          a6: "Pièces détachées",
          a7: "Offres commerciales",
          a8: "Immobilier commercial",
          a9: "Marchandise périmée"
        }
      },
      "6": {
        label: "Obligations déductibles",
        fields: {
          c1: "Prêts à court terme",
          c2: "Effets à payer",
          c3: "Droits des employés",
          c4: "Taxes à payer",
          c5: "Profits des tiers",
          c6: "Assurances clients",
          c7: "Réserves générales"
        }
      },
      malikiAssets: {
        label: "Actifs financiers",
        fields: {
          SPA: "Actifs de la société",
          SARL: "Actifs de l'individu",
          limit: "Limite de faillite"
        }
      }
    },
    methods: {
      Maliki: "Maliki",
      Hanafi: "Hanafi",
      Shafi: "Shafi"
    },
    ui: {
      goldPrice: {
        title: "Prix d'un gramme d'or (24 carats) en DZD",
        inputLabel: "Entrez le prix du gramme",
        placeholder: "Entrez le prix actuel de l'or 24 carats",
        infoText: "Veuillez saisir le prix actuel de l'or 24 carats sur le marché algérien pour calculer le nissab avec précision",
        pricePerGram: "Prix par gramme",
        nissab: "Nissab",
        grams: "grammes"
      },
      assetsData: "Données des actifs et propriétés",
      assetsDescription: "Veuillez saisir tous les actifs et propriétés soumis à la Zakat",
      calculationMethod: "Méthode de calcul",
      companyType: "Type de société",
      calculate: "Calculer la Zakat",
      addField: "Ajouter un autre champ",
      removeField: "Supprimer ce champ",
      additionalField: "Champ supplémentaire",
      total: "Total",
      enterAmount: "Entrer le montant",
      enterAdditionalAmount: "Entrer le montant supplémentaire",
      importantInfo: "Information importante",
      warningText: "Veuillez vérifier l'exactitude des données saisies avant le calcul",
      note: "Note:",
      noteText: "Vous pouvez ajouter des champs supplémentaires pour n'importe quel élément",
      show: "Afficher",
      hide: "Masquer"
    }
  },
  en: {
    forms: {
      "1": {
        label: "Cash and equivalents",
        fields: {
          x1: "Cash on hand",
          x2: "Cash at banks",
          x3: "Certified checks",
          x4: "Foreign currencies",
          x5: "Available digital assets",
          x6: "Fiduciary deposits",
          x7: "Good loan granted",
          x8: "Receivable income",
          x9: "Money from sale of assets"
        }
      },
      "2": {
        label: "Receivables",
        fields: {
          y1: "Expected short-term debts",
          y2: "Deferred debts",
          y3: "Receivable papers",
          y4: "Expected debts",
          y5: "Debts from sale of assets",
          y6: "Rental income",
          y7: "Doubtful debts"
        }
      },
      "3": {
        label: "Zakat investments",
        fields: {
          z1: "Trade stocks",
          z2: "Real estate shares",
          z3: "Bond investments",
          z4: "Return on investment stocks"
        }
      },
      "4": {
        label: "Goods and inventory",
        fields: {
          a1: "Finished goods",
          a2: "Goods in process",
          a3: "Raw materials",
          a4: "Goods in transit",
          a5: "Goods held in trust",
          a6: "Spare parts",
          a7: "Commercial offers",
          a8: "Commercial real estate",
          a9: "Spoiled goods"
        }
      },
      "6": {
        label: "Deductible liabilities",
        fields: {
          c1: "Short-term loans",
          c2: "Payable papers",
          c3: "Employee rights",
          c4: "Taxes payable",
          c5: "Profits for others",
          c6: "Client insurance",
          c7: "General reserves"
        }
      },
      malikiAssets: {
        label: "Financial assets",
        fields: {
          SPA: "Company assets",
          SARL: "Individual assets",
          limit: "Bankruptcy limit"
        }
      }
    },
    methods: {
      Maliki: "Maliki",
      Hanafi: "Hanafi",
      Shafi: "Shafi"
    },
    ui: {
      goldPrice: {
        title: "Gold Price per Gram (24 Carats) in DZD",
        inputLabel: "Enter gold price per gram",
        placeholder: "Enter current 24 carat gold price",
        infoText: "Please enter the current 24 carat gold price in Algerian market to calculate Nissab accurately",
        pricePerGram: "Price per gram",
        nissab: "Nissab",
        grams: "grams"
      },
      assetsData: "Assets and Properties Data",
      assetsDescription: "Please enter all assets and properties subject to Zakat",
      calculationMethod: "Calculation Method",
      companyType: "Company Type",
      calculate: "Calculate Zakat",
      addField: "Add Another Field",
      removeField: "Remove This Field",
      additionalField: "Additional Field",
      total: "Total",
      enterAmount: "Enter Amount",
      enterAdditionalAmount: "Enter Additional Amount",
      importantInfo: "Important Information",
      warningText: "Please verify the accuracy of the entered data before calculation...",
      note: "Note:",
      noteText: "You can add additional fields for any item by clicking the add (+) button next to each field.",
      show: "Show",
      hide: "Hide"
    }
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
