import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MessagePopup } from "../../Components/MessagePopup";
import { useApi } from "@/ApiProvider";
import { useLanguage } from "@/Components/LanguageProvider";

export const Login = ({ handleChange, formData }) => {
  const [loginError, setLoginError] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [popup, setPopup] = useState({ message: "", type: "" });

  const navigate = useNavigate();
  const api = useApi();
  const { language } = useLanguage();

  /* 🔤 Traduction */
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

  /* ✅ Validation */
  const validate = (values) => {
    const errors = {};
    if (!values.username.trim()) {
      errors.username = translate(
        "اسم المستخدم مطلوب!",
        "Le nom d'utilisateur est requis",
        "Username is required"
      );
    }
    if (!values.password.trim()) {
      errors.password = translate(
        "كلمة المرور مطلوبة!",
        "Le mot de passe est requis",
        "Password is required"
      );
    }
    return errors;
  };

  /* 🚀 Submit */
  const handleSubmit = async (event) => {
    event.preventDefault();

    const errors = validate(formData);
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setIsLoading(true);
    setLoginError("");

    try {
      const [result, status, error] = await api.post("/token/", formData);

      if (!error && status >= 200 && status < 300) {
        if (result.access) {
          localStorage.setItem("access_token", result.access);
        }
        if (result.refresh) {
          localStorage.setItem("refresh_token", result.refresh);
        }

        setPopup({
          message: translate(
            "تم تسجيل الدخول بنجاح!",
            "Connexion réussie !",
            "Login successful!"
          ),
          type: "success",
        });

        setTimeout(() => navigate("/"), 1000);
      } else {
        let errorMessage = translate(
          "إسم المستخدم أو كلمة المرور غير صحيحة",
          "Nom d'utilisateur ou mot de passe incorrect",
          "Invalid username or password"
        );

        if (result?.error) {
          if (result.error.includes("inactive")) {
            errorMessage = translate(
              "الحساب غير مفعل",
              "Compte non activé",
              "Account is inactive"
            );
          }
        }

        setLoginError(errorMessage);
      }
    } catch (err) {
      setLoginError(
        translate(
          "حدث خطأ في الاتصال بالخادم",
          "Erreur de connexion au serveur",
          "Server connection error"
        )
      );
    }

    setIsLoading(false);
  };

  return (
    <div
      dir={language === "ar" ? "rtl" : "ltr"}
      className="flex items-center justify-center min-h-screen w-full bg-gray-200 px-4 py-6"
    >
      <div className="bg-white shadow-lg rounded-lg py-6 px-6 sm:px-8 w-full max-w-[22em] relative">
        {/* ⬅ Back */}
        <button
          onClick={() => navigate("/")}
          className="absolute top-4 left-4 text-gray-600 hover:text-gray-800"
          aria-label={translate("العودة للرئيسية", "Retour à l'accueil", "Back to home")}
          type="button"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
            viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round"
              strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>

        <h2 className="text-lg sm:text-xl font-bold text-center text-gray-700 mb-6 mt-2">
          {translate("تسجيل الدخول", "Connexion", "Login")}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              {translate("إسم المستخدم", "Nom d'utilisateur", "Username")}
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="custom-input w-full"
              disabled={isLoading}
            />
            {formErrors.username && (
              <p className="text-red-500 text-xs mt-1">{formErrors.username}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              {translate("كلمة المرور", "Mot de passe", "Password")}
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="custom-input w-full"
              disabled={isLoading}
            />

            <Link
              to="/forgot-password"
              className="text-xs text-green-600 hover:underline block mt-2"
            >
              {translate("نسيت كلمة المرور؟", "Mot de passe oublié ?", "Forgot password?")}
            </Link>

            {loginError && (
              <p className="text-red-500 text-xs mt-2">{loginError}</p>
            )}
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="custom-button w-full py-3 rounded-md"
          >
            {isLoading
              ? translate("جاري تسجيل الدخول...", "Connexion...", "Logging in...")
              : translate("تسجيل الدخول", "Se connecter", "Login")}
          </button>
        </form>

        {/* Register */}
        <p className="mt-4 text-center text-sm text-gray-600">
          {translate("لا تملك حساب؟", "Pas de compte ?", "No account?")}{" "}
          <Link to="/Register" className="text-green-600 hover:underline font-medium">
            {translate("إنشاء حساب", "Créer un compte", "Create account")}
          </Link>
        </p>
      </div>

      <MessagePopup
        message={popup.message}
        type={popup.type}
        onClose={() => setPopup({ message: "", type: "" })}
      />
    </div>
  );
};
