import React from "react";
import Values from "./Values";
import { useLanguage } from "@/Components/LanguageProvider";

export const Zvalues = () => {
  const { language } = useLanguage();

  const translate = (ar, fr, en) => {
    switch (language) {
      case "fr":
        return fr;
      case "en":
        return en;
      default:
        return ar;
    }
  };

  const valuesList = [
    {
      value: translate("خدمة المجتمع", "Service à la communauté", "Community Service"),
      description: translate(
        "العمل من أجل خدمة المجتمع الإسلامي وتسهيل أداء الفرائض الدينية",
        "Travailler pour servir la communauté islamique et faciliter l’accomplissement des obligations religieuses",
        "Working to serve the Islamic community and facilitate the performance of religious duties"
      )
    },
    {
      value: translate("التكافل الاجتماعي", "Solidarité sociale", "Social Solidarity"),
      description: translate(
        "تحقيق التضامن والتعاون بين أفراد المجتمع لضمان العيش الكريم للجميع",
        "Assurer la solidarité et la coopération entre les membres de la société pour garantir une vie digne à tous",
        "Ensuring solidarity and cooperation among community members to guarantee a dignified life for all"
      )
    },
    {
      value: translate("الرحمة والإحسان", "Miséricorde et bienfaisance", "Mercy and Charity"),
      description: translate(
        "التعامل بالرحمة مع الفقراء والمحتاجين وتقديم المساعدة بكرامة",
        "Traiter les pauvres et les nécessiteux avec compassion et fournir une aide avec dignité",
        "Dealing with the poor and needy with compassion and providing help with dignity"
      )
    },
    {
      value: translate("الأمانة والثقة", "Honnêteté et confiance", "Trustworthiness"),
      description: translate(
        "الحفاظ على أموال المزكين وضمان وصولها لمستحقيها بكل شفافية",
        "Protéger les fonds des contributeurs et garantir leur distribution transparente aux bénéficiaires",
        "Safeguarding donors’ funds and ensuring they reach rightful recipients transparently"
      )
    },
    {
      value: translate("سهولة الاستخدام", "Facilité d’utilisation", "Ease of Use"),
      description: translate(
        "وفير واجهة بسيطة ومفهومة لجميع المستخدمين من مختلف الأعمار",
        "Fournir une interface simple et compréhensible pour tous les utilisateurs de tous âges",
        "Providing a simple and understandable interface for users of all ages"
      )
    },
    {
      value: translate("التنمية المستدامة", "Développement durable", "Sustainable Development"),
      description: translate(
        "دعم التنمية الاقتصادية والاجتماعية المستدامة في المجتمع",
        "Soutenir le développement économique et social durable dans la société",
        "Supporting sustainable economic and social development in the community"
      )
    }
  ];

  const reasonsList = [
    translate("حسابات دقيقة وفق المذاهب المعتمدة", "Calculs précis selon les écoles reconnues", "Accurate calculations according to recognized schools"),
    translate("واجهة سهلة ومناسبة لجميع المستخدمين", "Interface simple adaptée à tous les utilisateurs", "Simple interface suitable for all users"),
    translate("حماية وخصوصية البيانات المالية","Protection et confidentialité des données financières", "Protection and privacy of financial data"),
    translate("إرشادات شرعية واضحة ومفصلة", "Guides religieux clairs et détaillés", "Clear and detailed Sharia guidelines"),
    translate("تحديث مستمر للأسعار والمعادلات", "Mise à jour continue des prix et des formules", "Continuous update of prices and calculations"),
    translate("دعم فني متميز ومساعدة مستمرة", "Support technique de qualité et assistance continue", "Excellent technical support and ongoing assistance")
  ];

  return (
    <section
      className="bg-gradient-to-br from-emerald-100 to-teal-100 py-12 lg:py-16 px-4 sm:px-6"
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      <div className="container mx-auto text-center max-w-4xl">
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-emerald-900 mb-4">
            {translate("رسالتنا وقيمنا", "Notre mission et nos valeurs", "Our Mission & Values")}
          </h2>
          <div className="w-20 h-1 bg-emerald-600 mx-auto rounded-full"></div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-emerald-100 mb-8">
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-6">
            {translate(
              "نسعى إلى تسهيل أداء فريضة الزكاة على المسلمين من خلال توفير منصة دقيقة وموثوقة لحساب الزكاة، مع نشر الوعي بأهميتها الدينية والاجتماعية، وإرشاد المزكين إلى الطرق الصحيحة لإخراجها وتوزيعها.",
              "Nous visons à faciliter l’accomplissement de la Zakat pour les musulmans en fournissant une plateforme précise et fiable, en sensibilisant à son importance religieuse et sociale, et en guidant les payeurs vers les méthodes correctes.",
              "We aim to facilitate the payment of Zakat for Muslims by providing a precise and reliable platform, raising awareness of its religious and social importance, and guiding contributors on the proper ways to calculate and distribute it."
            )}
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {valuesList.map((item, index) => (
              <Values key={index} value={item.value} description={item.description} />
            ))}
          </div>
        </div>

        <div className="bg-emerald-50 rounded-2xl p-6 sm:p-8 border border-emerald-200">
          <h3 className="text-xl font-bold text-emerald-800 mb-4">
            {translate("لماذا تختار منصتنا؟", "Pourquoi choisir notre plateforme ?", "Why choose our platform?")}
          </h3>
          <div className="grid md:grid-cols-2 gap-6 text-right" dir={language === "ar" ? "rtl" : "ltr"}>
            {reasonsList.map((reason, idx) => (
              <div key={idx} className="flex items-start space-y-4">
                <span className="w-2 h-2 bg-emerald-500 rounded-full mt-2 ml-3 flex-shrink-0"></span>
                <span className="text-gray-700">{reason}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
