export const zakatForm = [
  {
    name: "1",
    label: { ar: "النقود وما في حكمها", fr: "Argent et équivalents", en: "Cash and equivalents" },
    description: { ar: "جميع الأموال السائلة المتاحة والتي تُحسب ضمن الزكاة", fr: "Toutes les liquidités disponibles à prendre en compte pour la zakât", en: "All liquid funds available for zakat calculation" },
    children: [
      { name: 'x1', label: { ar: 'نقدية بالصندوق', fr: 'Argent en caisse', en: 'Cash in hand' }, description: { ar:"النقود المتوفرة في الصندوق", fr:"Argent disponible dans la caisse", en:"Cash available in the box" }, children: [] },
      { name: 'x2', label: { ar: 'نقدية لدى المصارف (جارية/تحت الطلب)', fr: 'Argent en banque (courant/demande)', en: 'Cash at banks (current/on-demand)' }, description:{ ar:"الأموال الموجودة في الحسابات الجارية أو تحت الطلب", fr:"Fonds dans les comptes courants ou à vue", en:"Funds in current/on-demand bank accounts" }, children: [] },
      { name: 'x3', label: { ar: 'شيكات مصادق عليها', fr: 'Chèques certifiés', en: 'Certified checks' }, description:{ ar:"الشيكات المصدّقة الجاهزة للإيداع", fr:"Chèques certifiés prêts à déposer", en:"Certified checks ready for deposit" }, children: [] },
      { name: 'x4', label: { ar: 'العملات الأجنبية', fr: 'Devises étrangères', en: 'Foreign currencies' }, description:{ ar:"النقود بالعملات الأجنبية القابلة للتحويل", fr:"Devises étrangères convertibles", en:"Foreign currencies convertible" }, children: [] },
      { name: 'x5', label: { ar: 'أصول رقمية/نقود مشفّرة متاحة', fr: 'Actifs numériques/crypto', en: 'Digital assets/cryptocurrency' }, description:{ ar:"الأصول الرقمية مثل العملات المشفرة المتاحة", fr:"Actifs numériques comme les crypto-monnaies disponibles", en:"Digital assets like available cryptocurrencies" }, children: [] },
      { name: 'x6', label: { ar: 'ودائع أمانة/حسابات ثابتة يمكن التصرف فيها', fr: 'Dépôts fixes/encaisses disponibles', en: 'Fixed deposits/accessible funds' }, description:{ ar:"الودائع البنكية الثابتة أو أمانات يمكن سحبها", fr:"Dépôts fixes ou fonds en dépôt disponibles", en:"Fixed bank deposits or entrusted funds accessible" }, children: [] },
      { name: 'x7', label: { ar: 'قرض حسن مُقرض (حتى يُقبض)', fr: 'Prêt sans intérêt (non encaissé)', en: 'Interest-free loan (pending)' }, description:{ ar:"القروض الحسنة التي لم يتم استلامها بعد", fr:"Prêts sans intérêt non encore perçus", en:"Interest-free loans not yet received" }, children: [] },
      { name: 'x8', label: { ar: 'إيرادات مستحقة غير مقبوضة', fr: 'Revenus dus non encaissés', en: 'Due income not yet received' }, description:{ ar:"الإيرادات المستحقة التي لم تُستلم بعد", fr:"Revenus dus non encore encaissés", en:"Due income not yet received" }, children: [] },
      { name: 'x9', label: { ar: 'نقود من بيع أصول غير زكوية', fr: 'Argent d’actifs non zakatables', en: 'Money from non-zakatable assets' }, description:{ ar:"الأموال الناتجة عن بيع أصول غير خاضعة للزكاة", fr:"Argent provenant de la vente d'actifs non zakatables", en:"Money from selling non-zakatable assets" }, children: [] },
    ]
  },

  {
    name: '2',
    label: { ar: 'الذمم المدينة (الديون المرجوّة)', fr: 'Créances attendues', en: 'Receivables expected' },
    description:{ ar:"الديون التي يتوقع استلامها من العملاء أو الغير", fr:"Créances attendues des clients ou autres", en:"Receivables expected from clients or others" },
    children:[
      { name: 'y1', label: { ar: 'ديون حالّة مرجوّة على العملاء', fr: 'Créances immédiates', en: 'Immediate receivables' }, description:{ ar:"الديون المستحقة الآن على العملاء", fr:"Créances immédiates des clients", en:"Immediate receivables from clients" }, children: [] },
      { name: 'y2', label: { ar: 'ديون مؤجّلة مرجوّة', fr: 'Créances différées', en: 'Deferred receivables' }, description:{ ar:"الديون المؤجلة التي سيتم تحصيلها لاحقاً", fr:"Créances différées à percevoir ultérieurement", en:"Deferred receivables to be collected later" }, children: [] },
      { name: 'y3', label: { ar: 'أوراق قبض', fr: 'Effets à recevoir', en: 'Receivable bills' }, description:{ ar:"أوراق مالية قابلة للتحصيل", fr:"Effets à recevoir", en:"Receivable bills" }, children: [] },
      { name: 'y4', label: { ar: 'ديون لي مرجوّة (قرض حسن/بيع احتكاري)', fr: 'Prêts honorables/monopole', en: 'Good loans/monopoly sales' }, description:{ ar:"ديون حسنة أو ناتجة عن بيع احتكاري", fr:"Créances honorables ou issues de ventes monopolistiques", en:"Good loans or from monopoly sales" }, children: [] },
      { name: 'y5', label: { ar: 'ديون عن بيع أصول غير زكوية/غير تجارية', fr: 'Dettes non zakatables/non commerciales', en: 'Debts from non-zakatable/non-commercial assets' }, description:{ ar:"الديون الناتجة عن بيع أصول غير خاضعة للزكاة", fr:"Créances issues de la vente d'actifs non zakatables/non commerciaux", en:"Debts from selling non-zakatable/non-commercial assets" }, children: [] },
      { name: 'y6', label: { ar: 'إيرادات إيجار/كراء حل أجلها', fr: 'Revenus locatifs à percevoir', en: 'Rental income to be received' }, description:{ ar:"إيرادات إيجار لم تُستلم بعد", fr:"Revenus locatifs à percevoir", en:"Rental income to be received" }, children: [] },
      { name: 'y7', label: { ar: 'ديون مشكوك فيها/ميؤوس منها', fr: 'Créances douteuses', en: 'Doubtful debts' }, description:{ ar:"ديون يحتمل عدم تحصيلها", fr:"Créances douteuses ou irrécouvrables", en:"Doubtful or irrecoverable debts" }, children: [] },
    ]
  },

  {
    name: '3',
    label: { ar: 'الاستثمارات الزكوية', fr: 'Investissements zakat', en: 'Zakat investments' },
    description:{ ar:"الاستثمارات التي تدخل ضمن حساب الزكاة", fr:"Investissements soumis au calcul de la zakât", en:"Investments subject to zakat calculation" },
    children:[
      { name: 'z1', label: { ar: 'أسهم/صكوك/حصص للتجارة', fr: 'Actions/obligations commerciales', en: 'Shares/bonds for trade' }, description:{ ar:"الأسهم والسندات التجارية", fr:"Actions/obligations pour le commerce", en:"Shares/bonds for trade" }, children: [] },
      { name: 'z2', label: { ar: 'حصص عقارية للتجارة', fr: 'Parts immobilières commerciales', en: 'Real estate shares for trade' }, description:{ ar:"الحصص العقارية المخصصة للتجارة", fr:"Parts immobilières pour le commerce", en:"Real estate shares for trade" }, children: [] },
      { name: 'z3', label: { ar: 'استثمارات سندات/أذون خزينة', fr: 'Investissements obligations/trésor', en: 'Investments in bonds/treasury bills' }, description:{ ar:"الاستثمارات في السندات أو أذون الخزينة", fr:"Investissements en obligations ou bons du Trésor", en:"Investments in bonds or treasury bills" }, children: [] },
      { name: 'z4', label: { ar: 'أسهم بنية العائد (احتفاظ)', fr: 'Actions à rendement futur', en: 'Shares held for future yield' }, description:{ ar:"أسهم محفوظة للعائد المستقبلي", fr:"Actions détenues pour le rendement", en:"Shares held for future yield" }, children: [] },
    ]
  },

  {
    name: '4',
    label: { ar: 'عروض التجارة والمخزون', fr: 'Commerce et stocks', en: 'Trade goods and inventory' },
    description:{ ar:"جميع البضائع والمخزون الخاضع للزكاة", fr:"Toutes les marchandises et stocks soumis à la zakât", en:"All goods and inventory subject to zakat" },
    children:[
      { name: 'a1', label: { ar: 'بضاعة تامة الصنع', fr: 'Produits finis', en: 'Finished goods' }, description:{ ar:"المنتجات الجاهزة للبيع", fr:"Produits finis", en:"Finished goods" }, children: [] },
      { name: 'a2', label: { ar: 'بضاعة تحت التشغيل', fr: 'Produits en cours', en: 'Goods under production' }, description:{ ar:"المنتجات قيد التصنيع", fr:"Produits en cours de fabrication", en:"Goods under production" }, children: [] },
      { name: 'a3', label: { ar: 'مواد أولية', fr: 'Matières premières', en: 'Raw materials' }, description:{ ar:"المواد الخام", fr:"Matières premières", en:"Raw materials" }, children: [] },
      { name: 'a4', label: { ar: 'بضاعة في الطريق', fr: 'Marchandises en transit', en: 'Goods in transit' }, description:{ ar:"بضائع في النقل أو الشحن", fr:"Marchandises en transit", en:"Goods in transit" }, children: [] },
      { name: 'a5', label: { ar: 'بضاعة أمانة لدى الغير', fr: 'Marchandises déposées chez autrui', en: 'Goods entrusted to others' }, description:{ ar:"البضائع المودعة لدى الغير", fr:"Marchandises déposées chez autrui", en:"Goods entrusted to others" }, children: [] },
      { name: 'a6', label: { ar: 'قطع غيار بقصد المتاجرة', fr: 'Pièces détachées pour vente', en: 'Spare parts for sale' }, description:{ ar:"قطع الغيار المعدة للبيع", fr:"Pièces détachées pour la vente", en:"Spare parts for sale" }, children: [] },
      { name: 'a7', label: { ar: 'عروض تجارة بهبة/إرث', fr: 'Biens acquis par donation/héritage', en: 'Goods acquired by gift/inheritance' }, description:{ ar:"البضائع المكتسبة كهدية أو إرث", fr:"Biens acquis par donation ou héritage", en:"Goods acquired by gift or inheritance" }, children: [] },
      { name: 'a8', label: { ar: 'عقارات محتكرة للتجارة', fr: 'Immobilier pour commerce', en: 'Real estate reserved for trade' }, description:{ ar:"العقارات المخصصة للتجارة", fr:"Immobilier réservé au commerce", en:"Real estate reserved for trade" }, children: [] },
      { name: 'a9', label: { ar: 'بضاعة كاسدة/غير معدّة للبيع', fr: 'Marchandises détériorées/non vendables', en: 'Spoiled/unsellable goods' }, description:{ ar:"البضائع التالفة أو غير القابلة للبيع", fr:"Marchandises détériorées/non destinées à la vente", en:"Spoiled/unsellable goods" }, children: [] },
    ]
  },

  {
    name: '6',
    label: { ar: 'الالتزامات واجبة الخصم', fr: 'Dettes à déduire', en: 'Liabilities to be deducted' },
    description:{ ar:"المستحقات والديون التي تُخصم من الزكاة", fr:"Dettes et obligations à déduire", en:"Liabilities to be deducted" },
    children:[
      { name: 'c1', label: { ar: 'قروض قصيرة الأجل مستحقة خلال الحول', fr: 'Prêts court terme cette année', en: 'Short-term loans due this year' }, description:{ ar:"القروض القصيرة الأجل الواجب دفعها خلال السنة", fr:"Prêts à court terme dus cette année", en:"Short-term loans due this year" }, children: [] },
      { name: 'c2', label: { ar: 'أوراق دفع/دائنون', fr: 'Dettes envers créanciers', en: 'Debts to creditors' }, description:{ ar:"المستحقات على الدائنين", fr:"Dettes envers les créanciers", en:"Debts to creditors" }, children: [] },
      { name: 'c3', label: { ar: 'حقوق موظفين (أجور/إجازات)', fr: 'Droits employés (salaires/congés)', en: 'Employee rights (salaries/vacation)' }, description:{ ar:"المستحقات للموظفين مثل الرواتب والإجازات", fr:"Droits des employés (salaires/congés)", en:"Employee rights (salaries/vacation)" }, children: [] },
      { name: 'c4', label: { ar: 'ضرائب مستحقة خلال الحول', fr: 'Taxes dues cette année', en: 'Taxes due this year' }, description:{ ar:"الضرائب المستحقة خلال السنة", fr:"Taxes dues cette année", en:"Taxes due this year" }, children: [] },
      { name: 'c5', label: { ar: 'أرباح مضاربة للغير', fr: 'Profits dus aux autres', en: 'Profits due to others' }, description:{ ar:"الأرباح المستحقة للغير", fr:"Profits dus aux autres", en:"Profits due to others" }, children: [] },
      { name: 'c6', label: { ar: 'تأمينات العملاء للرد', fr: 'Assurances clients à rembourser', en: 'Customer deposits to return' }, description:{ ar:"تأمينات العملاء الواجب ردها", fr:"Assurances clients à rembourser", en:"Customer deposits to return" }, children: [] },
      { name: 'c7', label: { ar: 'احتياطيات عامة/مخصصات تقديرية', fr: 'Réserves et provisions', en: 'General reserves/estimated provisions' }, description:{ ar:"الاحتياطيات والمخصصات التقديرية", fr:"Réserves et provisions estimatives", en:"General reserves/estimated provisions" }, children: [] },
    ]
  },

  {
    name:"malikiAssets",
    label: { ar:"الذمات المالية", fr:"Actifs financiers", en:"Financial assets" },
    description:{ ar:"الذمم المالية الخاصة بالشركة أو الشخص", fr:"Actifs financiers de l'entreprise ou de la personne", en:"Financial assets of the company or individual" },
    children:[
      {name:"SPA",label:{ ar:"ذمة المالية للشركة", fr:"Actifs financiers société", en:"Company financial assets" }, description:{ ar:"الأصول المالية للشركة", fr:"Actifs financiers de la société", en:"Company financial assets" } },
      {name:"SARL",label:{ ar:"ذمة المالية للشخص المعني", fr:"Actifs financiers individu", en:"Individual financial assets" }, description:{ ar:"الأصول المالية للفرد", fr:"Actifs financiers de l'individu", en:"Individual financial assets" } },
      {name:"limit",label:{ ar:"حد المفلس", fr:"Seuil de faillite", en:"Bankruptcy limit" }, description:{ ar:"حد التفليسة لتطبيق الزكاة", fr:"Seuil de faillite pour la zakât", en:"Bankruptcy limit for zakat" } }
    ]
  }
];
