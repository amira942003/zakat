// src/Components/ZakatFormData.js
export const zakatForm = [
  {
    name: "1",
    label: "النقود وما في حكمها",
    description: {
      ar: "الأموال السائلة والعملات النقدية وأي أصول قابلة للتصرف مباشرة.",
      fr: "Argent liquide, devises et tout actif disponible immédiatement.",
      en: "Cash, currencies, and any directly accessible assets."
    },
    children: [
      { name: 'x1', label: 'نقدية بالصندوق', description: { ar: "النقود الموجودة في الصندوق.", fr: "Argent dans la caisse.", en: "Cash in the safe." }, children: [] },
      { name: 'x2', label: 'نقدية لدى المصارف (جارية/تحت الطلب)', description: { ar: "الأرصدة المصرفية الجارية.", fr: "Comptes bancaires courants.", en: "Current bank accounts." }, children: [] },
      { name: 'x3', label: 'شيكات مصادق عليها', description: { ar: "الشيكات المعتمدة من البنوك.", fr: "Chèques certifiés.", en: "Certified checks." }, children: [] },
      { name: 'x4', label: 'العملات الأجنبية', description: { ar: "أي عملات غير المحلية.", fr: "Devises étrangères.", en: "Foreign currencies." }, children: [] },
      { name: 'x5', label: 'أصول رقمية/نقود مشفّرة متاحة', description: { ar: "العملات الرقمية المشفرة المتاحة.", fr: "Cryptomonnaies disponibles.", en: "Available cryptocurrencies." }, children: [] },
      { name: 'x6', label: 'ودائع أمانة/حسابات ثابتة يمكن التصرف فيها', description: { ar: "الودائع والقروض القابلة للسحب.", fr: "Dépôts et comptes à disposition.", en: "Deposits and withdrawable accounts." }, children: [] },
      { name: 'x7', label: 'قرض حسن مُقرض (حتى يُقبض)', description: { ar: "القروض الحسنة الممنوحة للآخرين.", fr: "Prêts bienveillants accordés aux autres.", en: "Good loans granted to others." }, children: [] },
      { name: 'x8', label: 'إيرادات مستحقة غير مقبوضة', description: { ar: "الإيرادات المستحقة التي لم تستلم بعد.", fr: "Revenus dus mais non encaissés.", en: "Due but uncollected income." }, children: [] },
      { name: 'x9', label: 'نقود من بيع أصول غير زكوية', description: { ar: "أموال من بيع أصول غير خاضعة للزكاة.", fr: "Argent provenant de la vente d'actifs non zakatables.", en: "Money from the sale of non-zakatable assets." }, children: [] },
    ]
  },

  {
    name: '2',
    label: 'الذمم المدينة (الديون المرجوّة)',
    description: {
      ar: "الديون المستحقة على الآخرين والمتوقعة استردادها.",
      fr: "Dettes à recevoir auprès de tiers.",
      en: "Debts expected to be collected from others."
    },
    children: [
      { name: 'y1', label: 'ديون حالّة مرجوّة على العملاء', description: { ar: "ديون العملاء الحالية.", fr: "Dettes actuelles des clients.", en: "Current customer debts." }, children: [] },
      { name: 'y2', label: 'ديون مؤجّلة مرجوّة', description: { ar: "الديون المؤجلة المتوقعة.", fr: "Dettes différées attendues.", en: "Expected deferred debts." }, children: [] },
      { name: 'y3', label: 'أوراق قبض', description: { ar: "سندات القبض المستحقة.", fr: "Titres de créances à recevoir.", en: "Receivable notes." }, children: [] },
      { name: 'y4', label: 'ديون لي مرجوّة (قرض حسن/بيع احتكاري)', description: { ar: "الديون الحسنة أو الاحتكارية.", fr: "Prêts bienveillants ou ventes exclusives.", en: "Good loans or monopoly sales." }, children: [] },
      { name: 'y5', label: 'ديون عن بيع أصول غير زكوية/غير تجارية', description: { ar: "الديون الناتجة عن بيع أصول غير خاضعة للزكاة.", fr: "Dettes provenant de la vente d'actifs non zakatables/non commerciaux.", en: "Debts from sale of non-zakatable/non-commercial assets." }, children: [] },
      { name: 'y6', label: 'إيرادات إيجار/كراء حل أجلها', description: { ar: "إيرادات الإيجار المؤجلة.", fr: "Revenus locatifs différés.", en: "Deferred rental income." }, children: [] },
      { name: 'y7', label: 'ديون مشكوك فيها/ميؤوس منها', description: { ar: "الديون غير القابلة للتحصيل.", fr: "Dettes douteuses ou irrécouvrables.", en: "Doubtful or uncollectible debts." }, children: [] },
    ]
  },

  {
    name: '3',
    label: 'الاستثمارات الزكوية',
    description: {
      ar: "الاستثمارات الخاضعة للزكاة كالأسهم والسندات.",
      fr: "Investissements soumis à la zakat comme actions et obligations.",
      en: "Zakatable investments such as stocks and bonds."
    },
    children: [
      { name: 'z1', label: 'أسهم/صكوك/حصص للتجارة', description: { ar: "الأسهم والسندات التجارية.", fr: "Actions et obligations commerciales.", en: "Trade stocks and bonds." }, children: [] },
      { name: 'z2', label: 'حصص عقارية للتجارة', description: { ar: "الحصص العقارية التجارية.", fr: "Parts immobilières commerciales.", en: "Commercial real estate shares." }, children: [] },
      { name: 'z3', label: 'استثمارات سندات/أذون خزينة', description: { ar: "الاستثمارات في السندات وأذون الخزانة.", fr: "Investissements en obligations et bons du Trésor.", en: "Investments in bonds and treasury bills." }, children: [] },
      { name: 'z4', label: 'أسهم بنية العائد (احتفاظ)', description: { ar: "الأسهم المخصصة لتحقيق العائد للاحتفاظ.", fr: "Actions destinées à générer un rendement pour conservation.", en: "Yield-generating shares for retention." }, children: [] },
    ]
  },

  {
    name: '4',
    label: 'عروض التجارة والمخزون',
    description: {
      ar: "البضائع والسلع التجارية والخامات المخزنة.",
      fr: "Produits et marchandises commerciales en stock.",
      en: "Commercial goods and inventory in stock."
    },
    children: [
      { name: 'a1', label: 'بضاعة تامة الصنع', description: { ar: "البضائع الجاهزة للبيع.", fr: "Produits finis prêts à la vente.", en: "Finished goods ready for sale." }, children: [] },
      { name: 'a2', label: 'بضاعة تحت التشغيل', description: { ar: "البضائع قيد التصنيع.", fr: "Produits en cours de fabrication.", en: "Goods under production." }, children: [] },
      { name: 'a3', label: 'مواد أولية', description: { ar: "المواد الخام.", fr: "Matières premières.", en: "Raw materials." }, children: [] },
      { name: 'a4', label: 'بضاعة في الطريق', description: { ar: "البضائع أثناء النقل.", fr: "Marchandises en transit.", en: "Goods in transit." }, children: [] },
      { name: 'a5', label: 'بضاعة أمانة لدى الغير', description: { ar: "بضائع مودعة عند الآخرين.", fr: "Produits déposés chez autrui.", en: "Goods held by others in trust." }, children: [] },
      { name: 'a6', label: 'قطع غيار بقصد المتاجرة', description: { ar: "قطع الغيار للتجارة.", fr: "Pièces détachées à vendre.", en: "Spare parts for trade." }, children: [] },
      { name: 'a7', label: 'عروض تجارة بهبة/إرث', description: { ar: "بضائع مكتسبة كهبة أو إرث.", fr: "Produits acquis en donation ou héritage.", en: "Goods acquired as gift or inheritance." }, children: [] },
      { name: 'a8', label: 'عقارات محتكرة للتجارة', description: { ar: "عقارات مخصصة للتجارة.", fr: "Biens immobiliers réservés au commerce.", en: "Properties held for trade." }, children: [] },
      { name: 'a9', label: 'بضاعة كاسدة/غير معدّة للبيع', description: { ar: "بضائع تالفة أو غير صالحة للبيع.", fr: "Produits périmés ou invendables.", en: "Spoiled or unsellable goods." }, children: [] },
    ]
  },

  {
    name: '6',
    label: 'الالتزامات واجبة الخصم',
    description: {
      ar: "الديون والالتزامات التي تخصم من الأصول قبل حساب الزكاة.",
      fr: "Dettes et obligations à déduire des actifs avant calcul de la zakat.",
      en: "Debts and obligations deductible from assets before zakat calculation."
    },
    children: [
      { name: 'c1', label: 'قروض قصيرة الأجل مستحقة خلال الحول', description: { ar: "القروض القصيرة الأجل.", fr: "Prêts à court terme.", en: "Short-term loans." }, children: [] },
      { name: 'c2', label: 'أوراق دفع/دائنون', description: { ar: "المستحقات على الآخرين.", fr: "Dettes envers créanciers.", en: "Payables to creditors." }, children: [] },
      { name: 'c3', label: 'حقوق موظفين (أجور/إجازات)', description: { ar: "الحقوق المستحقة للموظفين.", fr: "Droits des employés (salaires/congés).", en: "Employee rights (salaries/leaves)." }, children: [] },
      { name: 'c4', label: 'ضرائب مستحقة خلال الحول', description: { ar: "الضرائب المستحقة.", fr: "Impôts à payer.", en: "Taxes due." }, children: [] },
      { name: 'c5', label: 'أرباح مضاربة للغير', description: { ar: "أرباح مضاربة للآخرين.", fr: "Profits partagés pour autrui.", en: "Profits for others in partnership." }, children: [] },
      { name: 'c6', label: 'تأمينات العملاء للرد', description: { ar: "تأمينات العملاء.", fr: "Assurances clients.", en: "Client insurances." }, children: [] },
      { name: 'c7', label: 'احتياطيات عامة/مخصصات تقديرية', description: { ar: "مخصصات احتياطية عامة.", fr: "Provisions générales/estimatives.", en: "General reserves/estimated provisions." }, children: [] },
    ]
  },

  {
    name:"malikiAssets",
    label:"الذمات المالية",
    description: {
      ar: "الذمات المالية للشركة أو الشخص حسب نوع الشركة.",
      fr: "Actifs financiers de l'entreprise ou de l'individu selon le type de société.",
      en: "Financial assets of the company or individual depending on company type."
    },
    children:[
      {name:"SPA",label:"ذمة المالية للشركة", description: { ar: "الأصول المالية للشركة.", fr: "Actifs financiers de l'entreprise.", en: "Company financial assets." } },
      {name:"SARL",label:"ذمة المالية للشخص المعني", description: { ar: "الأصول المالية للشخص.", fr: "Actifs financiers de l'individu.", en: "Individual financial assets." } },
      {name:"limit",label:"حد المفلس", description: { ar: "حد الإفلاس.", fr: "Limite de faillite.", en: "Bankruptcy threshold." } }
    ]
  }
];
