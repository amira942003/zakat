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
      "5": {
        label: "الأسهم",
        fields: {
          s1: "أسهم محلية",
          s2: "أسهم دولية",
          s3: "أسهم نمو",
          s4: "أسهم توزيعات أرباح"
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
      hide: "إخفاء",
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
        text: `على هذا الموقع، يمكن للشركات حساب قيمة الزكاة الواجبة عليها وفقًا للشريعة الإسلامية. وكما جاء في القرآن الكريم، فإن أداء الزكاة يعتبر من أركان الإسلام الأساسية، إذ يقول الله تعالى: "خُذْ مِنْ أَمْوَالِهِمْ صَدَقَةً تُطَهِّرُهُمْ وَتُزَكِّيهِمْ بِهَا" (سورة التوبة، الآية 103). ويقول تعالى أيضًا: "وَأَقِيمُوا الصَّلَاةَ وَآتُوا الزَّكَاةَ" (سورة البقرة، الآية 43). كل الشركات ملزمة شرعاً بأداء الزكاة المستحقة على أموالها لدعم الفقراء والمحتاجين، وذلك تأكيدًا للتضامن والعدالة الاجتماعية التي يدعو إليها الإسلام. ووفقًا لأحكام الشريعة، يتم حساب نسبة الزكاة على أساس موجودات الشركات وأرباحها السنوية. ستُستخدم أموال الزكاة التي تجمع من هذه الشركات كمساهمة في إنشاء أوقاف (WAKF) للمنافع العامة، وهي عبارة عن مشاريع استثمارية تدرّ عوائد مالية تُستخدم لخدمة المجتمع.`,
        button: "اعرف المزيد"
      },
      section2: {
        title: "نحو مجتمع أكثر تماسكًا: دور الشركات في دعم الفئات الأقل حظًا وتحقيق الأثر الإيجابي",
        text: `تتُعَدُّ هذه المبادرة خطوةً هامة تُحقّق العديد من الفوائد للمجتمع، من خلال تعزيز التضامن الاجتماعي وتلبية احتياجات الفئات الأقل حظًا. بالإضافة إلى ذلك، فإن لها تأثيرًا إيجابيًا مباشرًا على صورة الشركات المشاركة. ومن خلال وضع علامة اعتماد لهذه الشركات، نوفر رمزًا يعكس التزامها بالمسؤولية الاجتماعية. كما نخطط لإنشاء مقاطع فيديو تُظهر التغيرات الإيجابية والمشاريع التي تم تمويلها بفضل هذه التبرعات، مما يُبرز الأثر الواقعي لهذه المساهمات. وبذلك، يمكن للشركات تعزيز سياساتها في مجال المسؤولية الاجتماعية (CSR)، وإظهار اهتمامها الحقيقي بالمجتمع. علاوة على ذلك، يمكن لهذه الشركات الاستفادة من ميزة خصم هذه التبرعات من الضرائب، مما يشجعها أكثر على المشاركة الفعالة في هذا العمل النبيل.`,
        button: "اعرف المزيد",
        imageAlt: "صورة مسجد"
      },
      section3: {
        title: "سهولة ودقة في حساب زكاة الشركات وفق الشريعة الإسلامية",
        text: `ييعمل هذا الموقع بطريقة بسيطة وفعالة لمساعدة الشركات في حساب الزكاة المستحقة عليها وفقاً للمعايير الشرعية. أولاً، يتعين على المستخدم تعريف نوع شركته واختيار القطاع الذي تنتمي إليه. ثم سيُطلب منه الإجابة على بعض الأسئلة المتعلقة بالشركة ووضعها المالي، مثل قيمة الأصول، حجم الإيرادات السنوية، وقيمة رأس المال العامل، وغيرها من المعلومات المالية المهمة. استنادًا إلى هذه المعلومات المدخلة، سيقوم الموقع بتحديد الصيغة المناسبة لحساب الزكاة وفقًا لنوع الشركة ومعايير الشريعة الإسلامية. يقوم الموقع تلقائيًا بحساب المبلغ المستحق من الزكاة بناءً على البيانات المقدمة من المستخدم، ليتمكن المستخدم من معرفة المبلغ الواجب دفعه. هذه العملية تسهل على الشركات الامتثال لأحكام الزكاة وتساعدها على أداء واجباتها الدينية بسهولة ودقة، مع ضمان توجيه الأموال إلى مستحقيها وفقاً لأحكام الشريعة الإسلامية.`,
        button: "ابدأ الآن",
        imageAlt: "صورة حساب الزكاة"
      }
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
      "5": {
        label: "Actions",
        fields: {
          s1: "Actions locales",
          s2: "Actions internationales",
          s3: "Actions de croissance",
          s4: "Actions à dividendes"
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
      Shafi: "Shafi",
      AAOIFI: "AAOIFI",
      Alioua: "Alioua",
      Net: "Net"
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
      title: "La plateforme de confiance dédiée à aider les entreprises à calculer facilement et précisément leur zakat due",
      subtitle: "Notre objectif est de faciliter le processus de calcul de la Zakat pour les entreprises conformément aux dispositions de la charia islamique, afin de soutenir la solidarité sociale et de contribuer au développement durable de la société",
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
      hide: "Masquer",
      profile: "Profil",
      managePersonalInfo: "Gérez vos informations personnelles et paramètres du compte",
      accountInfo: "Infos du compte",
      password: "Mot de passe",
      updateAccountInfo: "Mettez à jour vos informations de compte.",
      username: "Nom d'utilisateur",
      email: "Email",
      firstName: "Prénom",
      lastName: "Nom de famille",
      enterUsername: "Entrez le nom d'utilisateur",
      enterEmail: "Entrez l'email",
      enterFirstName: "Entrez le prénom",
      enterLastName: "Entrez le nom de famille",
      updateInfo: "Mettre à jour",
      updating: "Mise à jour...",
      changePassword: "Changer le mot de passe",
      enterOldNewPassword: "Entrez l'ancien et le nouveau mot de passe",
      currentPassword: "Mot de passe actuel",
      newPassword: "Nouveau mot de passe",
      enterCurrentPassword: "Entrez le mot de passe actuel",
      enterNewPassword: "Entrez le nouveau mot de passe",
      updatePassword: "Mettre à jour le mot de passe",
      newPasswordRequired: "Le nouveau mot de passe est requis!",
      oldPasswordRequired: "L'ancien mot de passe est requis!",
      pleaseEnterNewPassword: "Veuillez entrer un nouveau mot de passe",
      errorOccurred: "Une erreur est survenue",
      dataUpdatedSuccessfully: "Les informations ont été mises à jour avec succès",
      failedToLoadUserInfo: "Échec du chargement des informations utilisateur.",
      zakatHistory: "Historique Zakat",
      viewZakatHistory: "Consultez l'historique de vos calculs Zakat précédents",
      noHistoryFound: "Aucun historique trouvé",
      noCalculationsYet: "Vous n'avez pas encore effectué de calculs Zakat",
      date: "Date",
      method: "Méthode",
      companyTypeLabel: "Type de société",
      zakatAmount: "Montant Zakat",
      details: "Détails",
      loading: "Chargement...",
      close: "Fermer",
      calculationDetails: "Détails du calcul",
      section1: {
        title: "Zakat : Engagement religieux et soutien à la solidarité sociale",
        text: `Sur ce site web, les entreprises peuvent calculer leur obligation de Zakat conformément à la loi islamique. Comme l'indique le Saint Coran, le versement de la Zakat est l'un des piliers fondamentaux de l'Islam. Dieu Tout-Puissant dit : « Prélève de leurs biens une aumône par laquelle tu les purifies et les fais croître en bien » (Sourate At-Tawbah, verset 103). Il dit également : « Accomplis la prière et acquitte-toi de la Zakat » (Sourate Al-Baqarah, verset 43). Toutes les entreprises ont l'obligation religieuse de verser la Zakat sur leurs biens afin de soutenir les pauvres et les nécessiteux, affirmant ainsi la solidarité et la justice sociale prônées par l'Islam. Conformément aux règles de la charia, le taux de la Zakat est calculé en fonction des actifs et des bénéfices annuels de l'entreprise. Les fonds de Zakat collectés auprès de ces entreprises serviront à la constitution de waqfs (fondations waqf) d'utilité publique, c'est-à-dire des projets d'investissement générant des revenus destinés à servir la communauté.`,
        button: "En savoir plus"
      },
      section2: {
        title: "Vers une société plus solidaire : rôle des entreprises dans le soutien aux moins favorisés",
        text: `Cette initiative représente une avancée majeure qui apporte de nombreux bienfaits à la société en renforçant la solidarité et en répondant aux besoins des plus démunis. De plus, elle a un impact direct et positif sur l'image des entreprises participantes. En leur attribuant un label de certification, nous leur offrons un symbole qui témoigne de leur engagement en matière de responsabilité sociale. Nous prévoyons également de réaliser des vidéos illustrant les changements positifs et les projets financés par ces dons, mettant ainsi en lumière l'impact concret de ces contributions. Cela permet aux entreprises d'améliorer leurs politiques RSE et de démontrer leur véritable souci du bien commun. Par ailleurs, ces entreprises peuvent bénéficier de dons déductibles d'impôt, ce qui les encourage davantage à participer activement à cette noble cause.`,
        button: "En savoir plus",
        imageAlt: "Image mosquée"
      },
      section3: {
        title: "Facilité et précision dans le calcul de la Zakat des entreprises selon la charia",
        text: `Ce site web permet aux entreprises de calculer facilement et efficacement leur Zakat (aumône légale islamique) conformément aux principes de la Charia. L'utilisateur doit d'abord définir le type de son entreprise et sélectionner son secteur d'activité. Il lui sera ensuite demandé de répondre à quelques questions concernant l'entreprise et sa situation financière, notamment la valeur de ses actifs, son chiffre d'affaires annuel, son fonds de roulement et d'autres informations financières importantes. À partir de ces informations, le site web déterminera la formule de calcul de la Zakat appropriée, en fonction du type d'entreprise et des principes de la Charia. Le montant de la Zakat due est calculé automatiquement à partir des données fournies par l'utilisateur, qui peut ainsi connaître le montant à payer. Ce processus facilite le respect des obligations liées à la Zakat pour les entreprises et les aide à s'acquitter de leurs obligations religieuses facilement et précisément, tout en garantissant que les fonds soient versés à leurs bénéficiaires légitimes, conformément aux principes de la Charia.`,
        button: "Commencer maintenant",
        imageAlt: "Image calcul Zakat"
      }
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
      "5": {
        label: "Stocks",
        fields: {
          s1: "Local stocks",
          s2: "International stocks",
          s3: "Growth stocks",
          s4: "Dividend stocks"
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
      Shafi: "Shafi",
      AAOIFI: "AAOIFI",
      Alioua: "Alioua",
      Net: "Net"
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
      title: "The trusted platform dedicated to helping companies calculate their due zakat easily and accurately",
      subtitle: "We aim to facilitate the calculation of Zakat for companies in accordance with the provisions of Islamic Sharia, in order to support social solidarity and contribute to the sustainable development of society",
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
      hide: "Hide",
      profile: "Profile",
      managePersonalInfo: "Manage your personal info and account settings",
      accountInfo: "Account Info",
      password: "Password",
      updateAccountInfo: "Update your account info.",
      username: "Username",
      email: "Email",
      firstName: "First Name",
      lastName: "Last Name",
      enterUsername: "Enter username",
      enterEmail: "Enter email",
      enterFirstName: "Enter first name",
      enterLastName: "Enter last name",
      updateInfo: "Update Info",
      updating: "Updating...",
      changePassword: "Change Password",
      enterOldNewPassword: "Enter old and new password",
      currentPassword: "Current Password",
      newPassword: "New Password",
      enterCurrentPassword: "Enter current password",
      enterNewPassword: "Enter new password",
      updatePassword: "Update Password",
      newPasswordRequired: "New password is required!",
      oldPasswordRequired: "Old password is required!",
      pleaseEnterNewPassword: "Please enter a new password",
      errorOccurred: "An error occurred",
      dataUpdatedSuccessfully: "Data updated successfully",
      failedToLoadUserInfo: "Failed to load user information.",
      zakatHistory: "Zakat History",
      viewZakatHistory: "View your previous Zakat calculation records",
      noHistoryFound: "No history found",
      noCalculationsYet: "You haven't made any Zakat calculations yet",
      date: "Date",
      method: "Method",
      companyTypeLabel: "Company Type",
      zakatAmount: "Zakat Amount",
      details: "Details",
      loading: "Loading...",
      close: "Close",
      calculationDetails: "Calculation Details",
      section1: {
        title: "Zakat: Religious Obligation and Support for Social Solidarity",
        text: `On this website, companies can calculate their Zakat obligation according to Islamic law. As stated in the Holy Quran, paying Zakat is one of the fundamental pillars of Islam. God Almighty says: "Take from their wealth a charity by which you purify them and cause them to increase [in goodness]" (Surah At-Tawbah, verse 103). He also says: "And establish prayer and give Zakat" (Surah Al-Baqarah, verse 43). All companies are religiously obligated to pay Zakat on their wealth to support the poor and needy, thus affirming the solidarity and social justice that Islam calls for. According to Sharia rulings, the Zakat rate is calculated based on the company's assets and annual profits. The Zakat funds collected from these companies will be used as a contribution to establishing Waqfs (endowments) for public benefit, which are investment projects that generate financial returns used to serve the community`,
        button: "Learn More"
      },
      section2: {
        title: "Towards a More Cohesive Society: Companies Supporting Less Fortunate Groups",
        text: `This initiative is a significant step that yields numerous benefits for society by strengthening social solidarity and addressing the needs of the less fortunate. Furthermore, it has a direct and positive impact on the image of participating companies. By awarding these companies a certification mark, we provide a symbol that reflects their commitment to social responsibility. We also plan to create videos showcasing the positive changes and projects funded by these donations, highlighting the tangible impact of these contributions. This allows companies to enhance their CSR policies and demonstrate their genuine concern for the community. Moreover, these companies can benefit from tax-deductible donations, further encouraging their active participation in this noble endeavor`,
        button: "Learn More",
        imageAlt: "Mosque Image"
      },
      section3: {
        title: "Ease and Accuracy in Calculating Corporate Zakat According to Sharia",
        text: `This website works in a simple and efficient way to help companies calculate their Zakat (Islamic alms) according to Sharia principles. First, the user must define their company type and select the sector it belongs to. They will then be asked to answer some questions about the company and its financial situation, such as the value of assets, annual revenue, working capital, and other important financial information. Based on this entered information, the website will determine the appropriate formula for calculating Zakat according to the company type and Islamic Sharia principles. The website automatically calculates the amount of Zakat due based on the data provided by the user, allowing them to know the amount that must be paid. This process makes it easier for companies to comply with Zakat regulations and helps them fulfill their religious obligations easily and accurately, while ensuring that the funds are directed to their rightful recipients according to Islamic Sharia principles`,
        button: "Start Now",
        imageAlt: "Zakat Calculation Image"
      }
    }
  }
};

// -------------------- Form Generator --------------------
export const getZakatForm = (t) => [
  {
    name: "1",
    label: t('forms.1.label'),
    children: [
      { name: 'x1', label: t('forms.1.fields.x1'), children: [] },
      { name: 'x2', label: t('forms.1.fields.x2'), children: [] },
      { name: 'x3', label: t('forms.1.fields.x3'), children: [] },
      { name: 'x4', label: t('forms.1.fields.x4'), children: [] },
      { name: 'x5', label: t('forms.1.fields.x5'), children: [] },
      { name: 'x6', label: t('forms.1.fields.x6'), children: [] },
      { name: 'x7', label: t('forms.1.fields.x7'), children: [] },
      { name: 'x8', label: t('forms.1.fields.x8'), children: [] },
      { name: 'x9', label: t('forms.1.fields.x9'), children: [] },
    ]
  },
  {
    name: '2',
    label: t('forms.2.label'),
    children: [
      { name: 'y1', label: t('forms.2.fields.y1'), children: [] },
      { name: 'y2', label: t('forms.2.fields.y2'), children: [] },
      { name: 'y3', label: t('forms.2.fields.y3'), children: [] },
      { name: 'y4', label: t('forms.2.fields.y4'), children: [] },
      { name: 'y5', label: t('forms.2.fields.y5'), children: [] },
      { name: 'y6', label: t('forms.2.fields.y6'), children: [] },
      { name: 'y7', label: t('forms.2.fields.y7'), children: [] },
    ]
  },
  {
    name: '3',
    label: t('forms.3.label'),
    children: [
      { name: 'z1', label: t('forms.3.fields.z1'), children: [] },
      { name: 'z2', label: t('forms.3.fields.z2'), children: [] },
      { name: 'z3', label: t('forms.3.fields.z3'), children: [] },
      { name: 'z4', label: t('forms.3.fields.z4'), children: [] },
    ]
  },
  {
    name: '4',
    label: t('forms.4.label'),
    children: [
      { name: 'a1', label: t('forms.4.fields.a1'), children: [] },
      { name: 'a2', label: t('forms.4.fields.a2'), children: [] },
      { name: 'a3', label: t('forms.4.fields.a3'), children: [] },
      { name: 'a4', label: t('forms.4.fields.a4'), children: [] },
      { name: 'a5', label: t('forms.4.fields.a5'), children: [] },
      { name: 'a6', label: t('forms.4.fields.a6'), children: [] },
      { name: 'a7', label: t('forms.4.fields.a7'), children: [] },
      { name: 'a8', label: t('forms.4.fields.a8'), children: [] },
      { name: 'a9', label: t('forms.4.fields.a9'), children: [] },
    ]
  },
  {
    name: '5',
    label: t('forms.5.label'),
    children: [
      { name: 's1', label: t('forms.5.fields.s1'), children: [] },
      { name: 's2', label: t('forms.5.fields.s2'), children: [] },
      { name: 's3', label: t('forms.5.fields.s3'), children: [] },
      { name: 's4', label: t('forms.5.fields.s4'), children: [] },
    ]
  },
  {
    name: '6',
    label: t('forms.6.label'),
    children: [
      { name: 'c1', label: t('forms.6.fields.c1'), children: [] },
      { name: 'c2', label: t('forms.6.fields.c2'), children: [] },
      { name: 'c3', label: t('forms.6.fields.c3'), children: [] },
      { name: 'c4', label: t('forms.6.fields.c4'), children: [] },
      { name: 'c5', label: t('forms.6.fields.c5'), children: [] },
      { name: 'c6', label: t('forms.6.fields.c6'), children: [] },
      { name: 'c7', label: t('forms.6.fields.c7'), children: [] },
    ]
  },
  {
    name: "malikiAssets",
    label: t('forms.malikiAssets.label'),
    children: [
      { name: "SPA", label: t('forms.malikiAssets.fields.SPA'), children: [] },
      { name: "SARL", label: t('forms.malikiAssets.fields.SARL'), children: [] },
      { name: "limit", label: t('forms.malikiAssets.fields.limit'), children: [] }
    ]
  }
];

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