import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/Components/LanguageProvider";

import { Hero } from "./Components/Hero";
import { Zakat } from "./Components/Zakat";
import { WealthZakat } from "./Components/WealthZakat";
import { ZakatReceiver } from "./Components/ZakatReceiver";
import { Zvalues } from "./Components/Zvalues";
import { Conditions } from "./Components/Conditions";

export default function About() {
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
    <>
      {/* Hero */}
      <Hero />

      {/* What is Zakat */}
      <Zakat />

      {/* Importance of Zakat */}
      <section
        className="bg-gradient-to-br from-emerald-50 to-teal-50 py-12 lg:py-16 px-4 sm:px-6"
        dir={language === "ar" ? "rtl" : "ltr"}
      >
        <div className="container mx-auto max-w-4xl text-right">
          <div className="flex items-center mb-8">
            <div className="w-1 h-12 bg-gradient-to-b from-emerald-600 to-emerald-800 rounded-full ml-4"></div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-emerald-900">
              {translate(
                "أهمية الزكاة في الإسلام",
                "L’importance de la Zakat en Islam",
                "The Importance of Zakat in Islam"
              )}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {/* Spiritual */}
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-emerald-100">
              <h3 className="text-xl font-bold text-emerald-800 mb-4">
                {translate(
                  "الأهمية الروحية",
                  "L’importance spirituelle",
                  "Spiritual importance"
                )}
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                {translate(
                  "تطهر الزكاة قلب المؤمن من الشح والبخل، وتزكي نفسه وتطهرها من الذنوب والآثام. قال الله تعالى: «خُذْ مِنْ أَمْوَالِهِمْ صَدَقَةً تُطَهِّرُهُمْ وَتُزَكِّيهِم بِهَا».",
                  "La Zakat purifie le cœur du croyant de l’avarice et de l’égoïsme, et purifie l’âme des péchés. Allah dit : « Prélève de leurs biens une aumône par laquelle tu les purifies et les bénis ».",
                  "Zakat purifies the believer’s heart from greed and selfishness and cleanses the soul from sins. Allah says: “Take from their wealth a charity by which you purify them and bless them.”"
                )}
              </p>
              <div className="text-xs text-gray-500 italic">
                {translate(
                  "سورة التوبة: آية 103",
                  "Sourate At-Tawbah : verset 103",
                  "Surah At-Tawbah: verse 103"
                )}
              </div>
            </div>

            {/* Social */}
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-emerald-100">
              <h3 className="text-xl font-bold text-emerald-800 mb-4">
                {translate(
                  "الأهمية الاجتماعية",
                  "L’importance sociale",
                  "Social importance"
                )}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {translate(
                  "تحقق الزكاة التوازن الاجتماعي والاقتصادي، وتقلل من الفجوة بين الأغنياء والفقراء، وتساهم في بناء مجتمع متماسك يسوده العدل والرحمة والتكافل.",
                  "La Zakat assure l’équilibre social et économique, réduit les inégalités entre riches et pauvres, et contribue à bâtir une société solidaire fondée sur la justice et la compassion.",
                  "Zakat ensures social and economic balance, reduces the gap between rich and poor, and helps build a cohesive society based on justice and compassion."
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Conditions */}
      <Conditions />

      {/* Wealth Types */}
      <WealthZakat />

      {/* How to calculate Zakat */}
      <section
        className="container mx-auto px-4 sm:px-6 py-12 lg:py-16"
        dir={language === "ar" ? "rtl" : "ltr"}
      >
        <div className="max-w-4xl mx-auto text-right">
          <div className="flex items-center mb-8">
            <div className="w-1 h-12 bg-gradient-to-b from-emerald-600 to-emerald-800 rounded-full ml-4"></div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-emerald-900">
              {translate(
                "كيفية حساب الزكاة؟",
                "Comment calculer la Zakat ?",
                "How is Zakat calculated?"
              )}
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-emerald-100">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-full mb-4">
                <span className="text-2xl font-bold text-white">2.5%</span>
              </div>
              <h3 className="text-2xl font-bold text-emerald-800 mb-4">
                {translate(
                  "نسبة الزكاة الأساسية",
                  "Taux de base de la Zakat",
                  "Basic Zakat rate"
                )}
              </h3>
            </div>

            <div className="space-y-6">
              <div className="bg-emerald-50 rounded-xl p-4 sm:p-6 border-r-4 border-emerald-500">
                <h4 className="font-bold text-emerald-800 mb-3">
                  {translate(
                    "للأموال النقدية والتجارة:",
                    "Pour l’argent et le commerce :",
                    "For cash and trade:"
                  )}
                </h4>
                <p className="text-gray-700 mb-2">
                  {translate(
                    "النسبة: 2.5% من إجمالي المال",
                    "Taux : 2,5 % du capital total",
                    "Rate: 2.5% of total wealth"
                  )}
                </p>
                <p className="text-sm text-gray-600">
                  {translate(
                    "النصاب: ما يعادل قيمة 85 جراماً من الذهب",
                    "Nisab : équivalent à 85 g d’or",
                    "Nisab: equivalent to 85g of gold"
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Receivers */}
      <ZakatReceiver />

      {/* Values */}
      <Zvalues />

      {/* CTA */}
      <section className="text-center py-12 lg:py-16 bg-gradient-to-b from-emerald-600 to-emerald-800 text-white px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
            {translate(
              "احسب زكاتك الآن بدقة وسهولة",
              "Calculez votre Zakat facilement et avec précision",
              "Calculate your Zakat easily and accurately"
            )}
          </h2>

          <p className="text-base sm:text-lg lg:text-xl opacity-95 mb-8 leading-relaxed">
            {translate(
              "استخدم حاسبة الزكاة المتقدمة لدينا لتحديد مقدار الزكاة المستحق عليك وفقاً للأحكام الشرعية.",
              "Utilisez notre calculateur avancé pour déterminer précisément le montant de votre Zakat.",
              "Use our advanced calculator to accurately determine your Zakat according to Islamic rulings."
            )}
          </p>

          <Link
            to="/ZakatCalculator"
            className="inline-block px-8 py-4 bg-white text-emerald-800 font-bold rounded-xl shadow-lg hover:bg-gray-100 transition"
          >
            {translate(
              "ابدأ الحساب الآن",
              "Commencer le calcul",
              "Start calculation"
            )}
          </Link>
        </div>
      </section>
    </>
  );
}
