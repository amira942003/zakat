import { Link } from "react-router-dom";
import "./Aurora.css";
import { useLanguage } from "../Components/LanguageProvider";

function BacEffect() {
  const { t } = useLanguage(); // Hook pour accéder à la langue actuelle et aux traductions

  return (
    <>
      <div
        dir={t("ui.dir") || "rtl"}
        className="relative min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-teal-900 overflow-hidden"
      >
        {/* Unique Aurora Effect */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-1/4 w-80 h-80 bg-emerald-400 rounded-full mix-blend-screen filter blur-2xl animate-pulse"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-teal-300 rounded-full mix-blend-screen filter blur-3xl animate-pulse animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-cyan-400 rounded-full mix-blend-screen filter blur-2xl animate-pulse animation-delay-4000"></div>
          <div className="absolute top-2/3 right-1/3 w-64 h-64 bg-emerald-300 rounded-full mix-blend-screen filter blur-xl animate-pulse animation-delay-6000"></div>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col gap-16 lg:gap-28">
            {/* Section 1 */}
            <div className="bg-black/40 backdrop-blur-md rounded-3xl p-6 lg:p-8 border border-emerald-500/20">
              <div className="text-center max-w-4xl mx-auto">
                <h1 className="font-bold text-green3 text-sm sm:text-3xl lg:text-4xl mb-8">
                  {t("ui.section1.title")}
                </h1>
                <p className="text-white/90 text-center text-xs sm:text-base lg:text-lg leading-[2.1em] mb-8">
                  {t("ui.section1.text")}
                </p>
                <Link
                  to="/About"
                  className="inline-block bg-emerald-500/30 hover:bg-emerald-400/40 backdrop-blur-sm text-white py-3 px-6 lg:py-4 lg:px-8 text-sm lg:text-base rounded-full transition-all duration-300 border border-emerald-400/50 shadow-lg shadow-emerald-500/25"
                >
                  {t("ui.section1.button")}
                </Link>
              </div>
            </div>

            {/* Section 2 */}
            <div className="flex flex-col gap-8 lg:gap-16">
              <div className="flex flex-col lg:flex-row-reverse bg-black/40 backdrop-blur-md rounded-3xl overflow-hidden p-4 lg:p-6 gap-6 lg:gap-10 border border-emerald-500/20">
                <div className="flex-1">
                  <h2 className="text-sm lg:text-2xl font-bold mb-4 text-green3 text-right leading-[2.1em]">
                    {t("ui.section2.title")}
                  </h2>
                  <p className="text-white/90 text-sm lg:text-base text-right leading-[2.1em] mb-6 lg:mb-10">
                    {t("ui.section2.text")}
                  </p>
                  <Link
                    to="/Awkaf"
                    className="inline-block bg-emerald-500/30 hover:bg-emerald-400/40 backdrop-blur-sm text-white py-3 px-6 lg:py-4 lg:px-8 text-sm lg:text-base rounded-full transition-all duration-300 border border-emerald-400/50 shadow-lg shadow-emerald-500/25"
                  >
                    {t("ui.section2.button")}
                  </Link>
                </div>

                <div className="w-full lg:w-2/5 h-48 lg:h-auto">
                  <img
                    src="/images/mosque3.jpg"
                    alt={t("ui.section2.imageAlt")}
                    className="h-full w-full object-cover rounded-xl"
                  />
                </div>
              </div>

              {/* Section 3 */}
              <div className="flex flex-col lg:flex-row bg-black/40 backdrop-blur-md rounded-3xl overflow-hidden p-4 lg:p-6 gap-6 lg:gap-10 border border-emerald-500/20">
                <div className="flex-1 order-2 lg:order-1">
                  <h2 className="text-lg lg:text-2xl font-bold mb-4 text-green3 text-right">
                    {t("ui.section3.title")}
                  </h2>
                  <p className="text-white/90 text-sm lg:text-base text-right leading-[2.1em] mb-6 lg:mb-10">
                    {t("ui.section3.text")}
                  </p>
                  <Link
                    to="/ZakatCalculator"
                    className="inline-block bg-emerald-500/30 hover:bg-emerald-400/40 backdrop-blur-sm text-white py-3 px-6 lg:py-4 lg:px-8 text-sm lg:text-base rounded-full transition-all duration-300 border border-emerald-400/50 shadow-lg shadow-emerald-500/25"
                  >
                    {t("ui.section3.button")}
                  </Link>
                </div>

                <div className="w-full lg:w-2/5 h-48 lg:h-auto order-1 lg:order-2">
                  <img
                    src="/images/koba2.jpg"
                    alt={t("ui.section3.imageAlt")}
                    className="h-full rounded-xl w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BacEffect;
