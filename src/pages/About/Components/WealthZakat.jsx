import React from "react";
import { useLanguage } from "@/Components/LanguageProvider";

export const WealthZakat = () => {
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

  const wealthTypes = [
    {
      icon: "₹",
      title: translate(
        "النقود والأوراق المالية",
        "Argent et valeurs mobilières",
        "Cash & Securities"
      ),
      desc: translate(
        "الأموال النقدية والودائع البنكية والأسهم والسندات",
        "Argent liquide, dépôts bancaires, actions et obligations",
        "Cash, bank deposits, stocks, and bonds"
      ),
    },
    {
      icon: "/gold.svg",
      title: translate("الذهب والفضة", "Or et argent", "Gold & Silver"),
      desc: translate(
        "المجوهرات والحلي والسبائك الذهبية والفضية",
        "Bijoux, ornements, lingots d'or et d'argent",
        "Jewelry, ornaments, gold and silver bars"
      ),
    },
    {
      icon: "/goods.svg",
      title: translate("عروض التجارة", "Marchandises commerciales", "Trade Goods"),
      desc: translate(
        "البضائع والسلع المعدة للبيع والتجارة",
        "Marchandises et biens destinés à la vente et au commerce",
        "Goods and commodities prepared for sale and trade"
      ),
    },
    {
      icon: "/crops.svg",
      title: translate("الزروع والثمار", "Céréales et fruits", "Crops & Fruits"),
      desc: translate(
        "المحاصيل الزراعية والثمار إذا بلغت النصاب",
        "Récoltes agricoles et fruits si elles atteignent le seuil requis",
        "Agricultural crops and fruits if they reach the nisab"
      ),
    },
    {
      icon: "/camle.svg",
      title: translate("الأنعام", "Bétail", "Livestock"),
      desc: translate(
        "الإبل والبقر والغنم السائمة (الراعية)",
        "Chameaux, bovins et moutons en pâturage",
        "Camels, cows, and grazing sheep"
      ),
    },
  ];

  return (
    <section
      className="bg-gradient-to-br from-gray-50 to-emerald-50 py-12 lg:py-16 px-4 sm:px-6"
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      <div className="container mx-auto text-right max-w-4xl">
        <div className="flex items-center mb-8">
          <div className="w-1 h-12 bg-gradient-to-b from-emerald-600 to-emerald-800 rounded-full ml-4"></div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green4">
            {translate(
              "أنواع الأموال التي تجب فيها الزكاة",
              "Types de richesse soumises à la Zakat",
              "Types of Wealth Subject to Zakat"
            )}
          </h2>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-emerald-100">
            <div className="grid md:grid-cols-3 gap-6">
              {wealthTypes.slice(0, 3).map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">{item.icon}</span>
                  </div>
                  <h3 className="font-bold text-gray-800 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-emerald-100">
            <div className="grid md:grid-cols-2 gap-6">
              {wealthTypes.slice(3).map((item, index) => (
                <div key={index} className="text-center">
                  <div
                    className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                    style={
                      index === 1
                        ? { background: "linear-gradient(to bottom right, #92400e, #78350f)" }
                        : { background: "linear-gradient(to bottom right, #22c55e, #16a34a)" }
                    }
                  >
                    <span className="text-2xl font-bold text-white">
                      <img src={item.icon} alt="" />
                    </span>
                  </div>
                  <h3 className="font-bold text-gray-800 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
