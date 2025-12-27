import React from "react";
import { useLanguage } from "@/Components/LanguageProvider";

export const Zakat = () => {
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

  return (
    <section
      className="container mx-auto px-4 sm:px-6 py-12 lg:py-16"
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      <div className="max-w-4xl mx-auto text-right">
        {/* Title */}
        <div className="flex items-center mb-8">
          <div className="w-1 h-12 bg-gradient-to-b from-emerald-600 to-emerald-800 rounded-full ml-4"></div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-emerald-900">
            {translate(
              "ما هي الزكاة؟",
              " Qu’est-ce que la Zakat ?",
              "What is Zakat?"
            )}
          </h2>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-emerald-100">
          <p className="text-gray-700 leading-relaxed text-base sm:text-lg mb-6">
            {translate(
              "الزكاة هي الركن الثالث من أركان الإسلام، وهي فريضة مالية واجبة على كل مسلم بالغ عاقل حر، إذا ملك النصاب ومضى عليه الحول. والزكاة لغة تعني النماء والطهارة والبركة، واصطلاحاً هي حق واجب في مال خاص لطائفة مخصوصة في وقت مخصوص.",
              "La Zakat est le troisième pilier de l’Islam. C’est une obligation financière imposée à tout musulman adulte, sain d’esprit et libre, dès lors qu’il possède le seuil requis (Nisab) pendant une année lunaire complète. Linguistiquement, la Zakat signifie croissance, purification et bénédiction. Juridiquement, c’est un droit obligatoire prélevé sur une richesse spécifique, au profit de catégories déterminées, à un moment précis.",
              "Zakat is the third pillar of Islam. It is a mandatory financial obligation upon every adult, sane, and free Muslim who owns the minimum required wealth (Nisab) for a full lunar year. Linguistically, Zakat means growth, purification, and blessing. Technically, it is a compulsory right taken from specific wealth for designated beneficiaries at a specific time."
            )}
          </p>

          {/* Wisdom */}
          <div className="bg-emerald-50 rounded-xl p-4 sm:p-6 border-r-4 border-emerald-500">
            <h3 className="font-bold text-emerald-800 mb-3 text-lg">
              {translate(
                "الحكمة من الزكاة:",
                "La sagesse de la Zakat :",
                "The wisdom behind Zakat:"
              )}
            </h3>

            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-emerald-500 rounded-full mt-2 ml-3 flex-shrink-0"></span>
                {translate(
                  "تطهير النفس من الشح والبخل",
                  "Purifier l’âme de l’avarice et de l’égoïsme",
                  "Purifying the soul from greed and stinginess"
                )}
              </li>

              <li className="flex items-start">
                <span className="w-2 h-2 bg-emerald-500 rounded-full mt-2 ml-3 flex-shrink-0"></span>
                {translate(
                  "تزكية المال وتطهيره وإنماؤه",
                  "Purifier et faire fructifier les biens",
                  "Purifying and increasing wealth"
                )}
              </li>

              <li className="flex items-start">
                <span className="w-2 h-2 bg-emerald-500 rounded-full mt-2 ml-3 flex-shrink-0"></span>
                {translate(
                  "تحقيق التكافل الاجتماعي والعدالة الاقتصادية",
                  "Réaliser la solidarité sociale et la justice économique",
                  "Achieving social solidarity and economic justice"
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
