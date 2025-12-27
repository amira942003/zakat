import React from "react";
import { useLanguage } from "@/Components/LanguageProvider";

export const Hero = () => {
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
    <div
      dir={language === "ar" ? "rtl" : "ltr"}
      className="relative mt-10 w-full min-h-[24rem] bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-700 flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8 text-white overflow-hidden"
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-10"></div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Title */}
        <h1 className="text-[2.7rem] font-extrabold drop-shadow-2xl mb-7 max-[410px]:text-3xl">
          {translate(
            "الزكاة في الإسلام",
            "La Zakat en Islam",
            "Zakat in Islam"
          )}
        </h1>

        <div className="w-30 h-1 bg-green3 mx-auto mb-6 rounded-full"></div>

        {/* Hadith */}
        <p className="text-sm sm:text-base md:text-lg lg:text-xl opacity-95 leading-relaxed max-w-3xl mx-auto max-[410px]:text-xs">
          {translate(
            "عن ابن عمر رضي الله عنهما، أن النبي صلى الله عليه وسلم قال:",
            "D’après Ibn Omar (qu’Allah l’agrée), le Prophète ﷺ a dit :",
            "According to Ibn Umar (may Allah be pleased with him), the Prophet ﷺ said:"
          )}
          <br />
          <span className="font-semibold text-yellow-200">
            {translate(
              "« بُني الإسلام على خمس: شهادة أن لا إله إلا الله، وأن محمداً رسول الله، وإقام الصلاة، وإيتاء الزكاة، وحج البيت، وصوم رمضان »",
              "“L’Islam est bâti sur cinq piliers : l’attestation qu’il n’y a de divinité qu’Allah et que Muhammad est le Messager d’Allah, l’accomplissement de la prière, l’acquittement de la zakat, le pèlerinage à la Maison et le jeûne du Ramadan.”",
              "“Islam is built upon five pillars: bearing witness that there is no god but Allah and that Muhammad is the Messenger of Allah, establishing prayer, giving zakat, pilgrimage to the House, and fasting Ramadan.”"
            )}
          </span>
        </p>

        {/* Source */}
        <p className="text-xs sm:text-sm opacity-80 mt-3">
          {translate(
            "رواه البخاري ومسلم",
            "Rapporté par Al-Bukhari et Muslim",
            "Narrated by Al-Bukhari and Muslim"
          )}
        </p>
      </div>
    </div>
  );
};
