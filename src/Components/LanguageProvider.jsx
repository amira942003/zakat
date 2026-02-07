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
        },
        descriptions: {
          x1: "النقود المتوفرة مباشرة في صندوق الشركة أو المكتب",
          x2: "النقود الموجودة في الحسابات المصرفية الجارية أو تحت الطلب",
          x3: "الشيكات الصادرة والمصدّقة من البنوك والتي يمكن صرفها",
          x4: "أي أموال نقدية بعملات أجنبية متاحة في الشركة",
          x5: "الأموال الرقمية أو العملات المشفرة المتاحة للتصرف فيها",
          x6: "الودائع التي يمكن سحبها أو التصرف فيها عند الحاجة",
          x7: "القروض الحسنة التي تم إعطاؤها والتي لم يتم تحصيلها بعد",
          x8: "الإيرادات المستحقة على الشركة ولم يتم قبضها بعد",
          x9: "الأموال الناتجة من بيع أصول لا تدخل ضمن الزكاة"
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
        },
        descriptions: {
          y1: "الديون المستحقة حالياً من العملاء والمتوقع تحصيلها قريباً",
          y2: "الديون التي تم تأجيل تحصيلها والمتوقعة الحصول عليها لاحقاً",
          y3: "الشيكات أو المستندات التي تثبت الحق في استلام الأموال",
          y4: "القروض الحسنة أو الديون الخاصة بمبيعات حصرية",
          y5: "الديون الناتجة عن بيع أصول لا تدخل ضمن الزكاة",
          y6: "الإيرادات المؤجلة من العقارات أو المعدات المؤجرة",
          y7: "الديون التي لا يُتوقع تحصيلها بسهولة أو مستحيلة"
        }
      },
      "3": {
        label: "الاستثمارات الزكوية",
        fields: {
          z1: "أسهم للتجارة",
          z2: "حصص عقارية",
          z3: "استثمارات سندات",
          z4: "أسهم بنية العائد"
        },
        descriptions: {
          z1: "الأسهم والسندات والحصص المستخدمة في التجارة",
          z2: "الحصص في العقارات التي تستخدم للأغراض التجارية",
          z3: "الاستثمارات في السندات وأذون الخزينة القابلة للزكاة",
          z4: "الأسهم المحتفظ بها بغرض العائد على المدى الطويل"
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
        },
        descriptions: {
          a1: "البضائع الجاهزة للبيع دون أي تعديل",
          a2: "البضائع في مرحلة التصنيع أو التجهيز",
          a3: "المواد الخام المستخدمة في الإنتاج",
          a4: "البضائع التي تم شراؤها ولكن لم تصل بعد",
          a5: "البضائع المخزنة أو المعطاة للآخرين تحت الأمانة",
          a6: "قطع الغيار المخصصة للبيع أو التجارة",
          a7: "البضائع التي تم الحصول عليها كهدية أو إرث",
          a8: "العقارات المستخدمة للتجارة والاحتكار",
          a9: "البضائع الفاسدة أو غير المعدة للبيع"
        }
      },
      "5": {
        label: "الأسهم",
        fields: {
          s1: "أسهم للاحتكار",
          s2: "أسهم بنية"
        },
        descriptions: {
          s1: "الأسهم المتداولة في الأسواق المحلية",
          s2: "الأسهم المتداولة في الأسواق الدولية"
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
        },
        descriptions: {
          c1: "القروض القصيرة الأجل التي يجب دفعها خلال السنة",
          c2: "المبالغ المستحقة للدفع للموردين أو الدائنين",
          c3: "الالتزامات تجاه الموظفين مثل الرواتب والإجازات",
          c4: "الضرائب المستحقة على الشركة خلال السنة",
          c5: "الأرباح التي تخص شركاء أو مستثمرين آخرين",
          c6: "أي تأمينات أو مبالغ مقدمة من العملاء للرد عليها",
          c7: "المخصصات المالية العامة والاحتياطيات المتوقعة"
        }
      }
    },
    methods: {
      Maliki: "مالكي",
      Hanafi: "حنفي",
      Shafi: "شافعي",
      AAOIFI: "هيئة المحاسبة",
      Alioua: "علي وع",
      Net: "صافي"
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
      title: "المنصة الموثوقة والمخصصة لمساعدة الشركات في حساب زكاتها المستحقة بسهولة ودقة",
      subtitle: "نهدف إلى تسهيل عملية احتساب الزكاة للشركات وفقًا لأحكام الشريعة الإسلامية، وذلك لدعم التكافل الاجتماعي والمساهمة في التنمية المستدامة للمجتمع",
      calculate: "احسب الزكاة",
      addField: "إضافة حقل آخر",
      removeField: "حذف هذا الحقل",
      total: "المجموع",
      show: "إظهار",
      hide: "إخفاء",
      profile: "الملف الشخصي",
      accountInfo: "معلومات الحساب",
      password: "كلمة المرور",
      updateInfo: "تحديث المعلومات",
      updatePassword: "تحديث كلمة المرور",
      zakatHistory: "تاريخ الزكاة",
      date: "التاريخ",
      method: "الطريقة",
      companyTypeLabel: "نوع الشركة",
      zakatAmount: "مبلغ الزكاة",
      details: "التفاصيل",
      close: "إغلاق",
      loading: "جاري التحميل...",
      ma7acil: {
        title: "المخازن",
        addWarehouse: "إضافة مخزن جديد",
        removeWarehouse: "حذف المخزن",
        warehouseName: "اسم المخزن",
        warehouseLocation: "الموقع",
        warehouseCapacity: "السعة"
      }
    }
  },
  fr: {
    forms: {
      "1": {
        label: "Argent liquide et équivalents",
        fields: {
          x1: "Liquidités en caisse",
          x2: "Liquidités en banque",
          x3: "Chèques certifiés",
          x4: "Devises étrangères",
          x5: "Actifs numériques disponibles",
          x6: "Dépôts en fiducie",
          x7: "Prêt bienveillant accordé",
          x8: "Revenus à recevoir",
          x9: "Argent provenant de la vente d'actifs"
        },
        descriptions: {
          x1: "Argent disponible immédiatement en caisse",
          x2: "Argent disponible sur les comptes bancaires",
          x3: "Chèques émis et certifiés par les banques",
          x4: "Argent liquide en devises étrangères",
          x5: "Crypto-monnaies et autres actifs numériques disponibles",
          x6: "Dépôts pouvant être retirés ou utilisés",
          x7: "Prêts accordés mais non encore encaissés",
          x8: "Revenus dus mais non encore perçus",
          x9: "Argent provenant de la vente d'actifs non soumis à la zakat"
        }
      },
      "2": {
        label: "Créances clients",
        fields: {
          y1: "Créances à court terme",
          y2: "Créances différées",
          y3: "Effets à recevoir",
          y4: "Créances honorables",
          y5: "Créances sur ventes d'actifs",
          y6: "Revenus locatifs",
          y7: "Créances douteuses"
        },
        descriptions: {
          y1: "Créances dues actuellement et attendues bientôt",
          y2: "Créances dont l'encaissement est différé",
          y3: "Chèques ou documents prouvant un droit de recevoir de l'argent",
          y4: "Prêts bienveillants ou créances spéciales",
          y5: "Créances provenant de la vente d'actifs non soumis à la zakat",
          y6: "Revenus différés provenant de biens loués",
          y7: "Créances difficiles ou impossibles à encaisser"
        }
      },
      "3": {
        label: "Investissements",
        fields: {
          z1: "Actions commerciales",
          z2: "Parts immobilières",
          z3: "Investissements obligataires",
          z4: "Actions à revenu"
        },
        descriptions: {
          z1: "Actions et obligations utilisées pour le commerce",
          z2: "Parts dans l'immobilier utilisées à des fins commerciales",
          z3: "Investissements en obligations soumis à la zakat",
          z4: "Actions détenues pour le revenu à long terme"
        }
      },
      "4": {
        label: "Stocks et marchandises",
        fields: {
          a1: "Marchandise complète",
          a2: "Marchandise en production",
          a3: "Matières premières",
          a4: "Marchandise en transit",
          a5: "Marchandise en dépôt",
          a6: "Pièces détachées",
          a7: "Offres commerciales",
          a8: "Immobilier commercial",
          a9: "Marchandise périmée"
        },
        descriptions: {
          a1: "Marchandise prête à la vente",
          a2: "Marchandise en cours de fabrication",
          a3: "Matières premières pour la production",
          a4: "Marchandise achetée mais non livrée",
          a5: "Marchandise stockée ou donnée en dépôt",
          a6: "Pièces détachées pour vente",
          a7: "Marchandise reçue comme don ou héritage",
          a8: "Immobilier utilisé pour le commerce",
          a9: "Marchandise périmée ou invendable"
        }
      },
      "5": {
        label: "Actions",
        fields: {
          s1: "Actions locales",
          s2: "Actions internationales"
        },
        descriptions: {
          s1: "Actions cotées sur les marchés locaux",
          s2: "Actions cotées sur les marchés internationaux"
        }
      },
      "6": {
        label: "Dettes à déduire",
        fields: {
          c1: "Prêts à court terme",
          c2: "Effets à payer",
          c3: "Droits des employés",
          c4: "Taxes dues",
          c5: "Profits de partenariat",
          c6: "Cautions clients",
          c7: "Réserves générales"
        },
        descriptions: {
          c1: "Prêts à rembourser dans l'année",
          c2: "Sommes à payer aux fournisseurs",
          c3: "Obligations envers les employés",
          c4: "Taxes dues à l'administration",
          c5: "Profits revenant aux partenaires",
          c6: "Cautions ou avances clients",
          c7: "Réserves et provisions prévues"
        }
      }
    },
    methods: {
      Maliki: "Maliki",
      Hanafi: "Hanafi",
      Shafi: "Shafi",
      AAOIFI: "AAOIFI",
      Alioua: "Alioua",
      Net: "Net"
    },
    ui: {
      goldPrice: {
        title: "Prix du gramme d'or (24 carats) en DZD",
        inputLabel: "Entrez le prix du gramme",
        placeholder: "Entrez le prix actuel du gramme d'or 24 carats",
        infoText: "Veuillez saisir le prix actuel du gramme pour calculer le nissab avec précision",
        pricePerGram: "Prix par gramme",
        nissab: "Nissab",
        grams: "Grammes"
      },
      title: "Plateforme pour aider les entreprises à calculer la zakat",
      subtitle: "Faciliter le calcul de la zakat selon la loi islamique pour soutenir la solidarité et le développement",
      calculate: "Calculer la zakat",
      addField: "Ajouter un champ",
      removeField: "Supprimer un champ",
      total: "Total",
      show: "Afficher",
      hide: "Masquer",
      profile: "Profil",
      accountInfo: "Infos du compte",
      password: "Mot de passe",
      updateInfo: "Mettre à jour infos",
      updatePassword: "Mettre à jour mot de passe",
      zakatHistory: "Historique de la zakat",
      date: "Date",
      method: "Méthode",
      companyTypeLabel: "Type d'entreprise",
      zakatAmount: "Montant de la zakat",
      details: "Détails",
      close: "Fermer",
      loading: "Chargement...",
      ma7acil: {
        title: "Entrepôts",
        addWarehouse: "Ajouter un entrepôt",
        removeWarehouse: "Supprimer l'entrepôt",
        warehouseName: "Nom de l'entrepôt",
        warehouseLocation: "Emplacement",
        warehouseCapacity: "Capacité"
      }
    }
  },
  en: {
    forms: {
      "1": {
        label: "Cash and equivalents",
        fields: {
          x1: "Cash in hand",
          x2: "Bank balances",
          x3: "Certified checks",
          x4: "Foreign currencies",
          x5: "Available digital assets",
          x6: "Trust deposits",
          x7: "Benevolent loan given",
          x8: "Receivable income",
          x9: "Money from asset sales"
        },
        descriptions: {
          x1: "Cash available immediately",
          x2: "Money in bank accounts",
          x3: "Checks issued and certified by banks",
          x4: "Cash in foreign currencies",
          x5: "Digital assets available",
          x6: "Deposits that can be withdrawn",
          x7: "Loans given but not yet collected",
          x8: "Income due but not yet received",
          x9: "Money from asset sales not subject to zakat"
        }
      },
      "2": {
        label: "Accounts receivable",
        fields: {
          y1: "Current receivables",
          y2: "Deferred receivables",
          y3: "Receivable notes",
          y4: "Honorable receivables",
          y5: "Receivables from asset sales",
          y6: "Rental income",
          y7: "Doubtful receivables"
        },
        descriptions: {
          y1: "Receivables due soon",
          y2: "Receivables deferred for later",
          y3: "Checks or documents proving the right to receive money",
          y4: "Good loans or special receivables",
          y5: "Receivables from asset sales not subject to zakat",
          y6: "Deferred income from rented properties",
          y7: "Receivables hard or impossible to collect"
        }
      },
      "3": {
        label: "Investments",
        fields: {
          z1: "Trading stocks",
          z2: "Property shares",
          z3: "Bond investments",
          z4: "Revenue stocks"
        },
        descriptions: {
          z1: "Stocks and bonds used for trade",
          z2: "Shares in properties used for business",
          z3: "Bond investments subject to zakat",
          z4: "Stocks held for long-term income"
        }
      },
      "4": {
        label: "Merchandise and inventory",
        fields: {
          a1: "Finished goods",
          a2: "Goods in production",
          a3: "Raw materials",
          a4: "Goods in transit",
          a5: "Goods in deposit",
          a6: "Spare parts",
          a7: "Trade offers",
          a8: "Commercial real estate",
          a9: "Perished goods"
        },
        descriptions: {
          a1: "Goods ready for sale",
          a2: "Goods under production",
          a3: "Raw materials for production",
          a4: "Goods purchased but not yet delivered",
          a5: "Stored or entrusted goods",
          a6: "Spare parts for sale",
          a7: "Goods received as gifts or inheritance",
          a8: "Properties used for trade",
          a9: "Spoiled or unsellable goods"
        }
      },
      "5": {
        label: "Stocks",
        fields: {
          s1: "Local stocks",
          s2: "International stocks"
        },
        descriptions: {
          s1: "Stocks listed locally",
          s2: "Stocks listed internationally"
        }
      },
      "6": {
        label: "Liabilities to deduct",
        fields: {
          c1: "Short-term loans",
          c2: "Notes payable",
          c3: "Employee rights",
          c4: "Taxes due",
          c5: "Partnership profits",
          c6: "Customer deposits",
          c7: "General reserves"
        },
        descriptions: {
          c1: "Loans to repay within the year",
          c2: "Amounts payable to suppliers",
          c3: "Obligations towards employees",
          c4: "Taxes due",
          c5: "Profits for partners",
          c6: "Deposits from customers",
          c7: "Reserves and provisions"
        }
      }
    },
    methods: {
      Maliki: "Maliki",
      Hanafi: "Hanafi",
      Shafi: "Shafi",
      AAOIFI: "AAOIFI",
      Alioua: "Alioua",
      Net: "Net"
    },
    ui: {
      goldPrice: {
        title: "Price per gram of gold (24 carats) in DZD",
        inputLabel: "Enter price per gram",
        placeholder: "Enter current price per gram of 24-carat gold",
        infoText: "Enter current gold price to calculate nissab accurately",
        pricePerGram: "Price per gram",
        nissab: "Nissab",
        grams: "Grams"
      },
      title: "Platform to help companies calculate zakat",
      subtitle: "Facilitating zakat calculation according to Islamic law to support solidarity and development",
      calculate: "Calculate zakat",
      addField: "Add field",
      removeField: "Remove field",
      total: "Total",
      show: "Show",
      hide: "Hide",
      profile: "Profile",
      accountInfo: "Account info",
      password: "Password",
      updateInfo: "Update info",
      updatePassword: "Update password",
      zakatHistory: "Zakat history",
      date: "Date",
      method: "Method",
      companyTypeLabel: "Company type",
      zakatAmount: "Zakat amount",
      details: "Details",
      close: "Close",
      loading: "Loading...",
      ma7acil: {
        title: "Warehouses",
        addWarehouse: "Add warehouse",
        removeWarehouse: "Remove warehouse",
        warehouseName: "Warehouse name",
        warehouseLocation: "Location",
        warehouseCapacity: "Capacity"
      }
    }
  }
};

export const LanguageContext = createContext();
export const useLanguage = () => useContext(LanguageContext);
export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("ar");
  const t = translations[language];
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
