import React from "react";
import { useLanguage } from "@/Components/LanguageProvider";

export const ZakatReceiver = () => {
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

  const receivers = [
    { title: translate("الفقراء","Les pauvres","The poor"), desc: translate("الذين لا يجدون ما يكفي حاجاتهم الأساسية","Ceux qui n'ont pas de quoi satisfaire leurs besoins essentiels","Those who do not have enough for their basic needs"), color: "from-red-400 to-red-600" },
    { title: translate("المساكين","Les nécessiteux","The needy"), desc: translate("الذين يجدون بعض حاجاتهم وليس كلها","Ceux qui peuvent satisfaire une partie de leurs besoins","Those who can meet some of their needs"), color: "from-orange-400 to-orange-600" },
    { title: translate("العاملون عليها","Les collecteurs","The collectors"), desc: translate("جباة الزكاة والقائمون على توزيعها","Ceux qui collectent et distribuent la Zakat","Those who collect and distribute Zakat"), color: "from-yellow-400 to-yellow-600" },
    { title: translate("المؤلفة قلوبهم","Cœurs à apaiser","Hearts to reconcile"), desc: translate("من يُراد تأليف قلوبهم للإسلام","Ceux dont les cœurs doivent être rapprochés de l’Islam","Those whose hearts are to be reconciled to Islam"), color: "from-green-400 to-green-600" },
    { title: translate("في الرقاب","Pour les esclaves","For freeing slaves"), desc: translate("تحرير العبيد والأسرى","Libération des esclaves et prisonniers","Freedom for slaves and captives"), color: "from-blue-400 to-blue-600" },
    { title: translate("الغارمون","Les endettés","The indebted"), desc: translate("المدينون الذين عجزوا عن سداد ديونهم","Ceux incapables de rembourser leurs dettes","Those unable to pay off their debts"), color: "from-indigo-400 to-indigo-600" },
    { title: translate("في سبيل الله","Dans le chemin de Dieu","In the path of Allah"), desc: translate("الجهاد وكل أعمال الخير العامة","Le jihad et toutes les œuvres de bien commun","Jihad and all general acts of charity"), color: "from-purple-400 to-purple-600" },
    { title: translate("ابن السبيل","Le voyageur","The traveler"), desc: translate("المسافر المنقطع عن بلده وماله","Le voyageur éloigné de sa patrie et de ses biens","The traveler cut off from home and wealth"), color: "from-pink-400 to-pink-600" }
  ];

  return (
    <section
      className="bg-gradient-to-br from-indigo-50 to-purple-50 py-12 lg:py-16 px-4 sm:px-6"
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      <div className="container mx-auto text-right max-w-4xl">
        <div className="flex items-center mb-8">
          <div className="w-1 h-12 bg-gradient-to-b bg-green4 rounded-full ml-4"></div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green4">
            {translate(
              "مصارف الزكاة الثمانية",
              "Les huit catégories de bénéficiaires de la Zakat",
              "The eight Zakat recipients"
            )}
          </h2>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-indigo-100 mb-6">
          <p className="text-center text-lg text-green4 font-semibold mb-6 leading-relaxed">
            {translate(
              '"إِنَّمَا الصَّدَقَاتُ لِلْفُقَرَاءِ وَالْمَسَاكِينِ وَالْعَامِلِينَ عَلَيْهَا وَالْمُؤَلَّفَةِ قُلُوبُهُمْ وَفِي الرِّقَابِ وَالْغَارِمِينَ وَفِي سَبِيلِ اللَّهِ وَابْنِ السَّبِيلِ"',
              '"Les aumônes sont destinées aux pauvres, aux nécessiteux, aux collecteurs, à ceux dont les cœurs doivent être rapprochés, à la libération des esclaves, aux endettés, dans le chemin d’Allah et pour le voyageur"',
              '"Charities are for the poor, the needy, the collectors, those whose hearts are to be reconciled, for freeing slaves, the indebted, in the path of Allah, and for the traveler"'
            )}
          </p>
          <div className="text-center text-sm text-gray-500">
            {translate("سورة التوبة: آية 60", "Sourate At-Tawbah : verset 60", "Surah At-Tawbah: verse 60")}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {receivers.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border border-gray-100 hover:shadow-xl transition-all duration-300"
            >
              <div
                className={`w-12 h-12 bg-gradient-to-br ${item.color} rounded-full mx-auto mb-3 flex items-center justify-center`}
              >
                <span className="text-white font-bold text-lg">{index + 1}</span>
              </div>
              <h3 className="font-bold text-gray-800 mb-2 text-center">{item.title}</h3>
              <p className="text-xs sm:text-sm text-gray-600 text-center leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
