import React, { useState } from "react";
import { SendMessage } from "./Components/SendMessage";
import { useLanguage } from "../../Components/LanguageProvider"; // <-- import du context

// -------------------- Translations --------------------
const translations = {
  ar: {
    contactTitle: "تواصل معنا",
    contactDesc:
      "راسلنا عبر البريد الإلكتروني، اتصل، أو املأ النموذج لمعرفة كيف يمكننا حل مشكلة المراسلة لديك.",
  },
  fr: {
    contactTitle: "Contactez-nous",
    contactDesc:
      "Envoyez-nous un e-mail, appelez-nous ou remplissez le formulaire pour savoir comment nous pouvons résoudre votre problème de message.",
  },
  en: {
    contactTitle: "Contact Us",
    contactDesc:
      "Reach out via email, call us, or fill out the form to see how we can address your messaging issue.",
  },
};

export const Contact = () => {
  const { language } = useLanguage(); // Récupère la langue active

  const defaultValue = {
    first_name: "",
    last_name: "",
    sender_email: "",
    phone: "",
    message: "",
  };

  const [userMessage, setUserMessage] = useState(defaultValue);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserMessage((u) => ({ ...u, [name]: value }));
  };

  return (
    <div
      dir={language === "ar" ? "rtl" : "ltr"}
      className="flex flex-col items-center justify-center mx-auto bg-gray-100 p-6"
    >
      <div className="bg-white sendMessage mt-15 shadow-lg rounded-lg px-8 py-2 max-w-[35em] w-full text-center">
        {/* Contact Title */}
        <h1 className="text-[1.8em] font-bold text-green3 mb-4">
          {translations[language].contactTitle}
        </h1>
        <p className="text-gray-400 font-[600] text-[0.8em] mb-6">
          {translations[language].contactDesc}
        </p>

        {/* SendMessage Form Component */}
        <SendMessage
          userMessage={userMessage}
          setUserMessage={setUserMessage}
          handleChange={handleChange}
          defaultValue={defaultValue}
        />
      </div>
    </div>
  );
};
