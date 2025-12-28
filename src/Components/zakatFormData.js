export const zakatForm = [
  {
    name: "1",
    label: "النقود وما في حكمها",
    description: {
      ar: "جميع الأموال السائلة المتاحة والتي تُحسب ضمن الزكاة",
      fr: "Toutes les liquidités disponibles à prendre en compte pour la zakât",
      en: "All liquid funds available for zakat calculation"
    },
    children: [
      { name: 'x1', label: 'نقدية بالصندوق', description: {ar:"النقود المتوفرة في الصندوق",fr:"Argent disponible dans la caisse",en:"Cash available in the box"}, children: [] },
      { name: 'x2', label: 'نقدية لدى المصارف (جارية/تحت الطلب)', description:{ar:"الأموال الموجودة في الحسابات الجارية أو تحت الطلب",fr:"Fonds dans les comptes courants ou à vue",en:"Funds in current/on-demand bank accounts"}, children: [] },
      { name: 'x3', label: 'شيكات مصادق عليها', description:{ar:"الشيكات المصدّقة الجاهزة للإيداع",fr:"Chèques certifiés prêts à déposer",en:"Certified checks ready for deposit"}, children: [] },
      { name: 'x4', label: 'العملات الأجنبية', description:{ar:"النقود بالعملات الأجنبية القابلة للتحويل",fr:"Devises étrangères convertibles",en:"Foreign currencies convertible"}, children: [] },
      { name: 'x5', label: 'أصول رقمية/نقود مشفّرة متاحة', description:{ar:"الأصول الرقمية مثل العملات المشفرة المتاحة",fr:"Actifs numériques comme les crypto-monnaies disponibles",en:"Digital assets like available cryptocurrencies"}, children: [] },
      { name: 'x6', label: 'ودائع أمانة/حسابات ثابتة يمكن التصرف فيها', description:{ar:"الودائع البنكية الثابتة أو أمانات يمكن سحبها",fr:"Dépôts fixes ou fonds en dépôt disponibles",en:"Fixed bank deposits or entrusted funds accessible"}, children: [] },
      { name: 'x7', label: 'قرض حسن مُقرض (حتى يُقبض)', description:{ar:"القروض الحسنة التي لم يتم استلامها بعد",fr:"Prêts sans intérêt non encore perçus",en:"Interest-free loans not yet received"}, children: [] },
      { name: 'x8', label: 'إيرادات مستحقة غير مقبوضة', description:{ar:"الإيرادات المستحقة التي لم تُستلم بعد",fr:"Revenus dus non encore encaissés",en:"Due income not yet received"}, children: [] },
      { name: 'x9', label: 'نقود من بيع أصول غير زكوية', description:{ar:"الأموال الناتجة عن بيع أصول غير خاضعة للزكاة",fr:"Argent provenant de la vente d'actifs non zakatables",en:"Money from selling non-zakatable assets"}, children: [] },
    ]
  },

  {
    name: '2',
    label: 'الذمم المدينة (الديون المرجوّة)',
    description:{ar:"الديون التي يتوقع استلامها من العملاء أو الغير",fr:"Créances attendues des clients ou autres",en:"Receivables expected from clients or others"},
    children:[
      { name: 'y1', label: 'ديون حالّة مرجوّة على العملاء', description:{ar:"الديون المستحقة الآن على العملاء",fr:"Créances immédiates des clients",en:"Immediate receivables from clients"}, children: [] },
      { name: 'y2', label: 'ديون مؤجّلة مرجوّة', description:{ar:"الديون المؤجلة التي سيتم تحصيلها لاحقاً",fr:"Créances différées à percevoir ultérieurement",en:"Deferred receivables to be collected later"}, children: [] },
      { name: 'y3', label: 'أوراق قبض', description:{ar:"أوراق مالية قابلة للتحصيل",fr:"Effets à recevoir",en:"Receivable bills"}, children: [] },
      { name: 'y4', label: 'ديون لي مرجوّة (قرض حسن/بيع احتكاري)', description:{ar:"ديون حسنة أو ناتجة عن بيع احتكاري",fr:"Créances honorables ou issues de ventes monopolistiques",en:"Good loans or from monopoly sales"}, children: [] },
      { name: 'y5', label: 'ديون عن بيع أصول غير زكوية/غير تجارية', description:{ar:"الديون الناتجة عن بيع أصول غير خاضعة للزكاة",fr:"Créances issues de la vente d'actifs non zakatables/non commerciaux",en:"Debts from selling non-zakatable/non-commercial assets"}, children: [] },
      { name: 'y6', label: 'إيرادات إيجار/كراء حل أجلها', description:{ar:"إيرادات إيجار لم تُستلم بعد",fr:"Revenus locatifs à percevoir",en:"Rental income to be received"}, children: [] },
      { name: 'y7', label: 'ديون مشكوك فيها/ميؤوس منها', description:{ar:"ديون يحتمل عدم تحصيلها",fr:"Créances douteuses ou irrécouvrables",en:"Doubtful or irrecoverable debts"}, children: [] },
    ]
  },

  {
    name: '3',
    label: 'الاستثمارات الزكوية',
    description:{ar:"الاستثمارات التي تدخل ضمن حساب الزكاة",fr:"Investissements soumis au calcul de la zakât",en:"Investments subject to zakat calculation"},
    children:[
      { name: 'z1', label: 'أسهم/صكوك/حصص للتجارة', description:{ar:"الأسهم والسندات التجارية",fr:"Actions/obligations pour le commerce",en:"Shares/bonds for trade"}, children: [] },
      { name: 'z2', label: 'حصص عقارية للتجارة', description:{ar:"الحصص العقارية المخصصة للتجارة",fr:"Parts immobilières pour le commerce",en:"Real estate shares for trade"}, children: [] },
      { name: 'z3', label: 'استثمارات سندات/أذون خزينة', description:{ar:"الاستثمارات في السندات أو أذون الخزينة",fr:"Investissements en obligations ou bons du Trésor",en:"Investments in bonds or treasury bills"}, children: [] },
      { name: 'z4', label: 'أسهم بنية العائد (احتفاظ)', description:{ar:"أسهم محفوظة للعائد المستقبلي",fr:"Actions détenues pour le rendement",en:"Shares held for future yield"}, children: [] },
    ]
  },

  {
    name: '4',
    label: 'عروض التجارة والمخزون',
    description:{ar:"جميع البضائع والمخزون الخاضع للزكاة",fr:"Toutes les marchandises et stocks soumis à la zakât",en:"All goods and inventory subject to zakat"},
    children:[
      { name: 'a1', label: 'بضاعة تامة الصنع', description:{ar:"المنتجات الجاهزة للبيع",fr:"Produits finis",en:"Finished goods"}, children: [] },
      { name: 'a2', label: 'بضاعة تحت التشغيل', description:{ar:"المنتجات قيد التصنيع",fr:"Produits en cours de fabrication",en:"Goods under production"}, children: [] },
      { name: 'a3', label: 'مواد أولية', description:{ar:"المواد الخام",fr:"Matières premières",en:"Raw materials"}, children: [] },
      { name: 'a4', label: 'بضاعة في الطريق', description:{ar:"بضائع في النقل أو الشحن",fr:"Marchandises en transit",en:"Goods in transit"}, children: [] },
      { name: 'a5', label: 'بضاعة أمانة لدى الغير', description:{ar:"البضائع المودعة لدى الغير",fr:"Marchandises déposées chez autrui",en:"Goods entrusted to others"}, children: [] },
      { name: 'a6', label: 'قطع غيار بقصد المتاجرة', description:{ar:"قطع الغيار المعدة للبيع",fr:"Pièces détachées pour la vente",en:"Spare parts for sale"}, children: [] },
      { name: 'a7', label: 'عروض تجارة بهبة/إرث', description:{ar:"البضائع المكتسبة كهدية أو إرث",fr:"Biens acquis par donation ou héritage",en:"Goods acquired by gift or inheritance"}, children: [] },
      { name: 'a8', label: 'عقارات محتكرة للتجارة', description:{ar:"العقارات المخصصة للتجارة",fr:"Immobilier réservé au commerce",en:"Real estate reserved for trade"}, children: [] },
      { name: 'a9', label: 'بضاعة كاسدة/غير معدّة للبيع', description:{ar:"البضائع التالفة أو غير القابلة للبيع",fr:"Marchandises détériorées/non destinées à la vente",en:"Spoiled/unsellable goods"}, children: [] },
    ]
  },

  {
    name: '6',
    label: 'الالتزامات واجبة الخصم',
    description:{ar:"المستحقات والديون التي تُخصم من الزكاة",fr:"Dettes et obligations à déduire",en:"Liabilities to be deducted"},
    children:[
      { name: 'c1', label: 'قروض قصيرة الأجل مستحقة خلال الحول', description:{ar:"القروض القصيرة الأجل الواجب دفعها خلال السنة",fr:"Prêts à court terme dus cette année",en:"Short-term loans due this year"}, children: [] },
      { name: 'c2', label: 'أوراق دفع/دائنون', description:{ar:"المستحقات على الدائنين",fr:"Dettes envers les créanciers",en:"Debts to creditors"}, children: [] },
      { name: 'c3', label: 'حقوق موظفين (أجور/إجازات)', description:{ar:"المستحقات للموظفين مثل الرواتب والإجازات",fr:"Droits des employés (salaires/congés)",en:"Employee rights (salaries/vacation)"}, children: [] },
      { name: 'c4', label: 'ضرائب مستحقة خلال الحول', description:{ar:"الضرائب المستحقة خلال السنة",fr:"Taxes dues cette année",en:"Taxes due this year"}, children: [] },
      { name: 'c5', label: 'أرباح مضاربة للغير', description:{ar:"الأرباح المستحقة للغير",fr:"Profits dus aux autres",en:"Profits due to others"}, children: [] },
      { name: 'c6', label: 'تأمينات العملاء للرد', description:{ar:"تأمينات العملاء الواجب ردها",fr:"Assurances clients à rembourser",en:"Customer deposits to return"}, children: [] },
      { name: 'c7', label: 'احتياطيات عامة/مخصصات تقديرية', description:{ar:"الاحتياطيات والمخصصات التقديرية",fr:"Réserves et provisions estimatives",en:"General reserves/estimated provisions"}, children: [] },
    ]
  },

  {
    name:"malikiAssets",
    label:"الذمات المالية",
    description:{ar:"الذمم المالية الخاصة بالشركة أو الشخص",fr:"Actifs financiers de l'entreprise ou de la personne",en:"Financial assets of the company or individual"},
    children:[
      {name:"SPA",label:"ذمة المالية للشركة", description:{ar:"الأصول المالية للشركة",fr:"Actifs financiers de la société",en:"Company financial assets"}},
      {name:"SARL",label:"ذمة المالية للشخص المعني", description:{ar:"الأصول المالية للفرد",fr:"Actifs financiers de l'individu",en:"Individual financial assets"}},
      {name:"limit",label:"حد المفلس", description:{ar:"حد التفليسة لتطبيق الزكاة",fr:"Seuil de faillite pour la zakât",en:"Bankruptcy limit for zakat"}}
    ]
  }
];
