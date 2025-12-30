import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApi } from "@/ApiProvider";
import { MessagePopup } from "@/Components/MessagePopup";
import { useLanguage } from "@/Components/LanguageProvider";

export const Register = ({ handleChange, formData }) => {
  const formRef = useRef(null);
  const navigate = useNavigate();
  const api = useApi();
  const { language } = useLanguage();

  const [popup, setPopup] = useState({ message: "", type: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const t = (ar, fr, en) =>
    language === "fr" ? fr : language === "en" ? en : ar;

  /* ================= VALIDATION ================= */
  const validateForm = () => {
    let valid = true;
    let e = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^(0[5-7]\d{8}|(\+213|00213)[5-7]\d{8})$/;

    if (!formData.first_name?.trim()) {
      e.first_name = t("الاسم مطلوب", "Prénom requis", "First name required");
      valid = false;
    }

    if (!formData.last_name?.trim()) {
      e.last_name = t("اللقب مطلوب", "Nom requis", "Last name required");
      valid = false;
    }

    if (!formData.username?.trim()) {
      e.username = t("اسم المستخدم مطلوب", "Nom d'utilisateur requis", "Username required");
      valid = false;
    } else if (formData.username.length < 3) {
      e.username = t("3 أحرف على الأقل", "Au moins 3 caractères", "At least 3 characters");
      valid = false;
    }

    // EMAIL
    if (!formData.email?.trim()) {
      e.email = t("البريد الإلكتروني مطلوب", "Email requis", "Email required");
      valid = false;
    } else if (!emailRegex.test(formData.email)) {
      e.email = t("بريد غير صالح", "Email invalide", "Invalid email");
      setPopup({
        message: t(
          "❌ البريد الإلكتروني غير صالح",
          "❌ Email invalide",
          "❌ Invalid email"
        ),
        type: "error",
      });
      valid = false;
    }

    // PHONE
    if (!formData.phone_number?.trim()) {
      e.phone_number = t("رقم الهاتف مطلوب", "Numéro requis", "Phone required");
      valid = false;
    } else if (
      !phoneRegex.test(formData.phone_number.replace(/\s|-/g, ""))
    ) {
      e.phone_number = t(
        "رقم الهاتف غير صالح",
        "Numéro de téléphone invalide",
        "Invalid phone number"
      );
      setPopup({
        message: t(
          "❌ رقم الهاتف غير صالح (05 / 06 / 07)",
          "❌ Numéro invalide (05 / 06 / 07)",
          "❌ Invalid phone number"
        ),
        type: "error",
      });
      valid = false;
    }

    if (!formData.company_name?.trim()) {
      e.company_name = t(
        "اسم الشركة مطلوب",
        "Nom de l'entreprise requis",
        "Company name required"
      );
      valid = false;
    }

    if (!formData.password) {
      e.password = t("كلمة المرور مطلوبة", "Mot de passe requis", "Password required");
      valid = false;
    }

    if (formData.password !== formData.confirm_password) {
      e.confirm_password = t(
        "كلمتا المرور غير متطابقتين",
        "Mots de passe différents",
        "Passwords do not match"
      );
      valid = false;
    }

    setErrors(e);
    return valid;
  };

  const handleInputChange = (e) => {
    handleChange(e);
    if (errors[e.target.name]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    }
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setPopup({
        message: t(
          "يرجى تصحيح الأخطاء",
          "Veuillez corriger les erreurs",
          "Please fix the errors"
        ),
        type: "error",
      });
      return;
    }

    setLoading(true);

    try {
      const [, status, error] = await api.post("/user/register/", formData);

      if (!error && status >= 200 && status < 300) {
        setPopup({
          message: t(
            "تم التسجيل بنجاح",
            "Inscription réussie",
            "Registration successful"
          ),
          type: "success",
        });
        formRef.current?.reset();
        setTimeout(() => navigate("/"), 2000);
      } else {
        setPopup({
          message: t("فشل التسجيل", "Échec de l'inscription", "Registration failed"),
          type: "error",
        });
      }
    } catch {
      setPopup({
        message: t("خطأ في الخادم", "Erreur serveur", "Server error"),
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */
  return (
    <>
      <div
        dir={language === "ar" ? "rtl" : "ltr"}
        className="min-h-screen flex items-center justify-center bg-gray-200 px-4"
      >
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
          <button
            onClick={() => navigate("/")}
            className="absolute top-4 left-4 text-gray-500"
          >
            ←
          </button>

          <h2 className="text-xl font-bold text-center mb-4">
            {t("تسجيل حساب جديد", "Créer un compte", "Create account")}
          </h2>

          <form ref={formRef} onSubmit={handleSubmit} className="space-y-3">
            <input name="first_name" placeholder={t("الاسم", "Prénom", "First name")} onChange={handleInputChange} className="custom-input w-full" />
            {errors.first_name && <p className="text-red-500 text-xs">{errors.first_name}</p>}

            <input name="last_name" placeholder={t("اللقب", "Nom", "Last name")} onChange={handleInputChange} className="custom-input w-full" />
            {errors.last_name && <p className="text-red-500 text-xs">{errors.last_name}</p>}

            <input name="username" placeholder={t("اسم المستخدم", "Nom d'utilisateur", "Username")} onChange={handleInputChange} className="custom-input w-full" />
            {errors.username && <p className="text-red-500 text-xs">{errors.username}</p>}

            <input type="email" name="email" placeholder={t("البريد الإلكتروني", "Email", "Email")} onChange={handleInputChange} className="custom-input w-full" />
            {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}

            <input name="company_name" placeholder={t("اسم الشركة", "Entreprise", "Company")} onChange={handleInputChange} className="custom-input w-full" />
            {errors.company_name && <p className="text-red-500 text-xs">{errors.company_name}</p>}

            <input name="phone_number" placeholder={t("رقم الهاتف", "Téléphone", "Phone")} onChange={handleInputChange} className="custom-input w-full" />
            {errors.phone_number && <p className="text-red-500 text-xs">{errors.phone_number}</p>}

            <input type="password" name="password" placeholder={t("كلمة المرور", "Mot de passe", "Password")} onChange={handleInputChange} className="custom-input w-full" />
            {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}

            <input type="password" name="confirm_password" placeholder={t("تأكيد كلمة المرور", "Confirmer mot de passe", "Confirm password")} onChange={handleInputChange} className="custom-input w-full" />
            {errors.confirm_password && <p className="text-red-500 text-xs">{errors.confirm_password}</p>}

            <button disabled={loading} className="custom-button w-full">
              {loading
                ? t("جاري التسجيل...", "Chargement...", "Loading...")
                : t("إنشاء حساب", "S'inscrire", "Register")}
            </button>

            <p className="text-center text-sm">
              {t("لديك حساب؟", "Déjà un compte ?", "Already have an account?")}{" "}
              <Link to="/" className="text-green-600 font-semibold">
                {t("تسجيل الدخول", "Connexion", "Login")}
              </Link>
            </p>
          </form>
        </div>
      </div>

      <MessagePopup
        message={popup.message}
        type={popup.type}
        onClose={() => setPopup({ message: "", type: "" })}
      />
    </>
  );
};
