import React from "react";
import { useLanguage } from "@/Components/LanguageProvider";

export const Conditions = () => {
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

  const conditions = [
    {
      title: translate("الإسلام", "Islam", "Islam"),
      desc: translate(
        "أن يكون المزكي مسلماً بالغاً عاقلاً",
        "Le payeur doit être un musulman adulte et sain d'esprit",
        "The payer must be a mature and sane Muslim"
      ),
      colorFrom: "from-blue-50",
      colorTo: "to-indigo-50",
      borderColor: "border-blue-200",
      textColorTitle: "text-blue-800",
      textColorDesc: "text-blue-700",
    },
    {
      title: translate("النصاب", "Nisab", "Nisab"),
      desc: translate(
        "أن يبلغ المال النصاب المحدد شرعاً",
        "Le montant doit atteindre le seuil légal du Nisab",
        "The wealth must reach the legally defined Nisab"
      ),
      colorFrom: "from-amber-50",
      colorTo: "to-orange-50",
      borderColor: "border-amber-200",
      textColorTitle: "text-amber-800",
      textColorDesc: "text-amber-700",
    },
    {
      title: translate("الحول", "Hawl (One lunar year)", "Hawl (One lunar year)"),
      desc: translate(
        "مرور سنة هجرية كاملة على المال",
        "Une année lunaire complète doit s’écouler sur la richesse",
        "A full lunar year must pass over the wealth"
      ),
      colorFrom: "from-teal-50",
      colorTo: "to-cyan-50",
      borderColor: "border-teal-200",
      textColorTitle: "text-teal-800",
      textColorDesc: "text-teal-700",
    },
  ];

  return (
    <section
      className="container mx-auto px-4 sm:px-6 py-12 lg:py-16 text-right"
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-8">
          <div className="w-1 h-12 bg-gradient-to-b from-emerald-600 to-emerald-800 rounded-full ml-4"></div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-emerald-900">
            {translate(
              "شروط وجوب الزكاة",
              "Conditions pour l'obligation de la Zakat",
              "Conditions for Zakat Obligation"
            )}
          </h2>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-emerald-100">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {conditions.map((cond, index) => (
              <div
                key={index}
                className={`bg-gradient-to-br ${cond.colorFrom} ${cond.colorTo} rounded-xl p-4 sm:p-6 border ${cond.borderColor}`}
              >
                <h3 className={`font-bold mb-3 text-center ${cond.textColorTitle}`}>
                  {cond.title}
                </h3>
                <p className={`text-sm text-center ${cond.textColorDesc}`}>{cond.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
