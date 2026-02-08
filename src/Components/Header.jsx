import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useApi } from "@/ApiProvider";
import { useLanguage } from "../Components/LanguageProvider";

export const Header = () => {
  const api = useApi();
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { setLanguage, language } = useLanguage();

  const translations = {
    ar: {
      home: "الرئيسية",
      about: "عن الزكاة",
      zakatCalculator: "حاسبة الزكاة",
      awqaf: "مشاريع الوقف",
      contact: "تواصل مباشرة معنا",
      userHistory: "تاريخ الزكاة",
      userInfos: "معلومات المستخدم",
      login: "تسجيل الدخول",
      register: "إنشاء حساب",
      logout: "تسجيل الخروج",
    },
    fr: {
      home: "Accueil",
      about: "À propos de la Zakat",
      zakatCalculator: "Calculatrice Zakat",
      awqaf: "Projets Awqaf",
      contact: "Contactez-nous",
      userHistory: "Historique Zakat",
      userInfos: "Infos utilisateur",
      login: "Connexion",
      register: "Créer un compte",
      logout: "Déconnexion",
    },
    en: {
      home: "Home",
      about: "About Zakat",
      zakatCalculator: "Zakat Calculator",
      awqaf: "Awqaf Projects",
      contact: "Contact Us",
      userHistory: "Zakat History",
      userInfos: "User Info",
      login: "Login",
      register: "Register",
      logout: "Logout",
    },
  };

  useEffect(() => {
    const checkAuth = async () => {
      const [, status, error] = await api.get("/me/");
      setIsLoggedIn(!error && status === 200);
    };
    checkAuth();
  }, [api]);

  const handleLogout = async () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    try {
      await api.post("/logout/");
    } catch (e) {
      console.log(e);
    }
    setIsLoggedIn(false);
    setIsOpen(false);
    navigate("/");
  };

  const navLinks = [
    { path: "/", label: translations[language].home },
    { path: "/About", label: translations[language].about },
    { path: "/ZakatCalculator", label: translations[language].zakatCalculator, requiresAuth: true },
    { path: "/Awkaf", label: translations[language].awqaf },
    { path: "/Contact", label: translations[language].contact },
    { path: "/userhistory", label: translations[language].userHistory, requiresAuth: true },
    { path: "/userInfos", label: translations[language].userInfos, requiresAuth: true },
  ];

  return (
    <header
      dir="rtl"
      className="bg-gradient-to-r from-green-600 via-emerald-700 to-teal-800 text-white shadow-md fixed top-0 w-full z-50"
    >
      <nav className="flex items-center justify-between px-3 sm:px-4 md:px-6 py-3">

        {/* Logo */}
        <Link to="/" className="text-xl sm:text-2xl font-bold">
          زكاة
        </Link>

        {/* Nav links desktop */}
        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map(({ path, label, requiresAuth }) => (
            <Link
              key={path}
              to={requiresAuth && !isLoggedIn ? "/login" : path}
              className={`text-sm font-medium hover:text-green-200 ${
                location.pathname === path ? "text-green-200" : ""
              }`}
            >
              {label}
              {requiresAuth && !isLoggedIn && " 🔒"}
            </Link>
          ))}
        </div>

        {/* LANGUAGES – TOUJOURS VISIBLES (PC + MOBILE) */}
        <div className="flex items-center gap-1">
          {["ar", "fr", "en"].map((lng) => (
            <button
              key={lng}
              onClick={() => setLanguage(lng)}
              className={`px-2 py-1 text-xs sm:text-sm rounded-full font-semibold transition
                ${
                  language === lng
                    ? "bg-white text-green-800 shadow"
                    : "bg-green-700/60 text-white hover:bg-green-600"
                }`}
            >
              {lng.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Mobile menu button */}
        <button
          className="lg:hidden p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {isOpen && (
        <div className="lg:hidden bg-green-800/95 px-4 py-3 space-y-2">
          {navLinks.map(({ path, label, requiresAuth }) => (
            <Link
              key={path}
              to={requiresAuth && !isLoggedIn ? "/login" : path}
              onClick={() => setIsOpen(false)}
              className="block text-sm py-2 border-b border-green-600"
            >
              {label}
            </Link>
          ))}

          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="w-full mt-3 bg-green-400 text-black py-2 rounded"
            >
              {translations[language].logout}
            </button>
          ) : (
            <div className="flex gap-2 mt-3">
              <Link to="/login" className="flex-1 bg-green-400 text-black py-2 text-center rounded">
                {translations[language].login}
              </Link>
              <Link to="/Register" className="flex-1 bg-white text-green-700 py-2 text-center rounded">
                {translations[language].register}
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
