// languageProvider.js
import { createContext, useContext, useState } from "react";

// -------------------- Translations --------------------
export const translations = {
  ar: {
    forms: { /* ton ancien contenu forms ici */ },
    ui: {
      /* ancien contenu ui ici */
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
      section1: {
        title: "الزكاة: التزام ديني ودعم للتكافل الاجتماعي",
        text: `على هذا الموقع، يمكن للشركات حساب قيمة الزكاة الواجبة عليها وفقًا للشريعة الإسلامية. وكما جاء في القرآن الكريم، فإن أداء الزكاة يعتبر من أركان الإسلام الأساسية، إذ يقول الله تعالى: "خُذْ مِنْ أَمْوَالِهِمْ صَدَقَةً تُطَهِّرُهُمْ وَتُزَكِّيهِمْ بِهَا" (سورة التوبة، الآية 103). ويقول تعالى أيضًا: "وَأَقِيمُوا الصَّلَاةَ وَآتُوا الزَّكَاةَ" (سورة البقرة، الآية 43). كل الشركات ملزمة شرعاً بأداء الزكاة المستحقة على أموالها لدعم الفقراء والمحتاجين، وذلك تأكيدًا للتضامن والعدالة الاجتماعية التي يدعو إليها الإسلام. ووفقًا لأحكام الشريعة، يتم حساب نسبة الزكاة على أساس موجودات الشركات وأرباحها السنوية. ستُستخدم أموال الزكاة التي تجمع من هذه الشركات كمساهمة في إنشاء أوقاف (WAKF) للمنافع العامة، وهي عبارة عن مشاريع استثمارية تدرّ عوائد مالية تُستخدم لخدمة المجتمع.

`,
        button: "اعرف المزيد"
      },
      section2: {
        title: "نحو مجتمع أكثر تماسكًا: دور الشركات في دعم الفئات الأقل حظًا وتحقيق الأثر الإيجابي",
        text:`تتُعَدُّ هذه المبادرة خطوةً هامة تُحقّق العديد من الفوائد للمجتمع، من خلال تعزيز التضامن الاجتماعي وتلبية احتياجات الفئات الأقل حظًا. بالإضافة إلى ذلك، فإن لها تأثيرًا إيجابيًا مباشرًا على صورة الشركات المشاركة. ومن خلال وضع علامة اعتماد لهذه الشركات، نوفر رمزًا يعكس التزامها بالمسؤولية الاجتماعية. كما نخطط لإنشاء مقاطع فيديو تُظهر التغيرات الإيجابية والمشاريع التي تم تمويلها بفضل هذه التبرعات، مما يُبرز الأثر الواقعي لهذه المساهمات. وبذلك، يمكن للشركات تعزيز سياساتها في مجال المسؤولية الاجتماعية (CSR)، وإظهار اهتمامها الحقيقي بالمجتمع. علاوة على ذلك، يمكن لهذه الشركات الاستفادة من ميزة خصم هذه التبرعات من الضرائب، مما يشجعها أكثر على المشاركة الفعالة في هذا العمل النبيل.

`,
        button: "اعرف المزيد",
        imageAlt: "صورة مسجد"
      },
      section3: {
        title: "سهولة ودقة في حساب زكاة الشركات وفق الشريعة الإسلامية",
        text: `ييعمل هذا الموقع بطريقة بسيطة وفعالة لمساعدة الشركات في حساب الزكاة المستحقة عليها وفقاً للمعايير الشرعية. أولاً، يتعين على المستخدم تعريف نوع شركته واختيار القطاع الذي تنتمي إليه. ثم سيُطلب منه الإجابة على بعض الأسئلة المتعلقة بالشركة ووضعها المالي، مثل قيمة الأصول، حجم الإيرادات السنوية، وقيمة رأس المال العامل، وغيرها من المعلومات المالية المهمة. استنادًا إلى هذه المعلومات المدخلة، سيقوم الموقع بتحديد الصيغة المناسبة لحساب الزكاة وفقًا لنوع الشركة ومعايير الشريعة الإسلامية. يقوم الموقع تلقائيًا بحساب المبلغ المستحق من الزكاة بناءً على البيانات المقدمة من المستخدم، ليتمكن المستخدم من معرفة المبلغ الواجب دفعه. هذه العملية تسهل على الشركات الامتثال لأحكام الزكاة وتساعدها على أداء واجباتها الدينية بسهولة ودقة، مع ضمان توجيه الأموال إلى مستحقيها وفقاً لأحكام الشريعة الإسلامية.

`,
        button: "ابدأ الآن",
        imageAlt: "صورة حساب الزكاة"
      }
    },
    methods: { /* ton ancien contenu methods ici */ }
  },
  fr: {
    forms: { /* copier le contenu forms fr ici */ },
    ui: {
      title: "La plateforme de confiance dédiée à aider les entreprises à calculer facilement et précisément leur zakat due",
      subtitle: "Notre objectif est de faciliter le processus de calcul de la Zakat pour les entreprises conformément aux dispositions de la charia islamique, afin de soutenir la solidarité sociale et de contribuer au développement durable de la société",
      calculationMethod: "Méthode de calcul",
      companyType: "Type de société",
      calculate: "Calculer la Zakat",
      addField: "Ajouter un autre champ",
      removeField: "Supprimer ce champ",
      additionalField: "Champ supplémentaire",
      total: "Total",
      enterAmount: "Entrer le montant",
      enterAdditionalAmount: "Entrer le montant supplémentaire",
      assetsData: "Données des actifs et propriétés",
      assetsDescription: "Veuillez saisir tous les actifs et propriétés soumis à la Zakat",
      importantInfo: "Information importante",
      warningText: "Veuillez vérifier l'exactitude des données saisies avant le calcul",
      note: "Note:",
      noteText: "Vous pouvez ajouter des champs supplémentaires pour n'importe quel élément",
      show: "Afficher",
      hide: "Masquer",
      section1: {
        title: "Zakat : Engagement religieux et soutien à la solidarité sociale",
        text: `Sur ce site web, les entreprises peuvent calculer leur obligation de Zakat conformément à la loi islamique. Comme l'indique le Saint Coran, le versement de la Zakat est l'un des piliers fondamentaux de l'Islam. Dieu Tout-Puissant dit : « Prélève de leurs biens une aumône par laquelle tu les purifies et les fais croître en bien » (Sourate At-Tawbah, verset 103). Il dit également : « Accomplis la prière et acquitte-toi de la Zakat » (Sourate Al-Baqarah, verset 43). Toutes les entreprises ont l'obligation religieuse de verser la Zakat sur leurs biens afin de soutenir les pauvres et les nécessiteux, affirmant ainsi la solidarité et la justice sociale prônées par l'Islam. Conformément aux règles de la charia, le taux de la Zakat est calculé en fonction des actifs et des bénéfices annuels de l'entreprise. Les fonds de Zakat collectés auprès de ces entreprises serviront à la constitution de waqfs (fondations waqf) d'utilité publique, c'est-à-dire des projets d'investissement générant des revenus destinés à servir la communauté.`,
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
    },
    methods: { /* copier le contenu methods fr ici */ }
  },
  en: {
    forms: { /* copier le contenu forms en ici */ },
    ui: {
      title: "The trusted platform dedicated to helping companies calculate their due zakat easily and accurately",
      subtitle: "We aim to facilitate the calculation of Zakat for companies in accordance with the provisions of Islamic Sharia, in order to support social solidarity and contribute to the sustainable development of society",
      calculationMethod: "Calculation Method",
      companyType: "Company Type",
      calculate: "Calculate Zakat",
      addField: "Add Another Field",
      removeField: "Remove This Field",
      additionalField: "Additional Field",
      total: "Total",
      enterAmount: "Enter Amount",
      enterAdditionalAmount: "Enter Additional Amount",
      assetsData: "Assets and Properties Data",
      assetsDescription: "Please enter all assets and properties subject to Zakat",
      importantInfo: "Important Information",
      warningText: "Please verify the accuracy of the entered data before calculation...",
      note: "Note:",
      noteText: "You can add additional fields for any item by clicking the add (+) button next to each field.",
      show: "Show",
      hide: "Hide",
      section1: {
        title: "Zakat: Religious Obligation and Support for Social Solidarity",
        text: `On this website, companies can calculate their Zakat obligation according to Islamic law. As stated in the Holy Quran, paying Zakat is one of the fundamental pillars of Islam. God Almighty says: “Take from their wealth a charity by which you purify them and cause them to increase [in goodness]” (Surah At-Tawbah, verse 103). He also says: “And establish prayer and give Zakat” (Surah Al-Baqarah, verse 43). All companies are religiously obligated to pay Zakat on their wealth to support the poor and needy, thus affirming the solidarity and social justice that Islam calls for. According to Sharia rulings, the Zakat rate is calculated based on the company's assets and annual profits. The Zakat funds collected from these companies will be used as a contribution to establishing Waqfs (endowments) for public benefit, which are investment projects that generate financial returns used to serve the community`,
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
    },
    methods: { /* copier le contenu methods en ici */ }
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
