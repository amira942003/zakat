import React, { useState } from "react";
import { useApi } from "@/ApiProvider";
import { useLanguage } from "../Components/LanguageProvider"; // 

// -------------------- Translations --------------------
const translations = {
  ar: {
    title: "إعادة تعيين كلمة المرور",
    emailLabel: "البريد الإلكتروني",
    submit: "إرسال الرابط",
    success: "تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني.",
    error: "حدث خطأ أثناء إرسال البريد الإلكتروني.",
  },
  fr: {
    title: "Réinitialisation du mot de passe",
    emailLabel: "Adresse e-mail",
    submit: "Envoyer le lien",
    success: "Le lien de réinitialisation a été envoyé à votre adresse e-mail.",
    error: "Une erreur s'est produite lors de l'envoi de l'e-mail.",
  },
  en: {
    title: "Reset Password",
    emailLabel: "Email address",
    submit: "Send link",
    success: "A password reset link has been sent to your email.",
    error: "An error occurred while sending the email.",
  },
};

export const ForgotPassword = () => {
  const { language } = useLanguage(); // <-- langue active
  const api = useApi();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    const [data, status, errorMsg] = await api.post(
      "/user/request-password-reset/",
      { email }
    );

    if (!errorMsg && status >= 200 && status < 300) {
      setMessage(translations[language].success);
    } else {
      setError(data?.error || errorMsg || translations[language].error);
    }
  };

  return (
    <div
      dir={language === "ar" ? "rtl" : "ltr"}
      className="flex items-center justify-center min-h-screen bg-gray-100"
    >
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-[25em]">
        <h2 className="text-[1.2em] font-bold mb-4 text-center text-gray-700">
          {translations[language].title}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[0.7em] text-gray-600 mb-1">
              {translations[language].emailLabel}
            </label>
            <input
              type="email"
              className="w-full px-3 py-1 custom-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="custom-button text-[0.9em] py-1 px-2 w-full rounded-[5px]"
          >
            {translations[language].submit}
          </button>

          {message && (
            <p className="text-green-600 text-[0.7em] mt-2">{message}</p>
          )}
          {error && (
            <p className="text-red-500 text-[0.7em] mt-2">{error}</p>
          )}
        </form>
      </div>
    </div>
  );
};
