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

  // Traductions directement dans le fichier
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
      logout: "تسجيل الخروج"
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
      logout: "Déconnexion"
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
      logout: "Logout"
    }
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
    try { await api.post("/logout/"); } catch (error) { console.log(error); }
    setIsOpen(false);
    setIsLoggedIn(false);
    navigate("/");
  };

  // Liens de navigation avec traduction
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
    <header dir="rtl" className="bg-gradient-to-r from-green-600 via-emerald-700 to-teal-800 text-white shadow-md fixed top-0 w-full z-50">
      <nav className="flex items-center justify-between px-3 sm:px-4 md:px-6 lg:px-8 py-3 md:py-4">
        
        {/* Logo + Auth Buttons */}
        <div className="flex items-center gap-2">
          <Link to="/" className="text-xl sm:text-2xl md:text-3xl font-bold hover:text-green-200 transition-colors duration-300">
            زكاة
          </Link>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center gap-2">
            {isLoggedIn ? (
              <button onClick={handleLogout} className="px-4 py-2 bg-green-400 hover:bg-green-500 rounded-full font-medium text-xs lg:text-sm">
                {translations[language].logout}
              </button>
            ) : (
              <>
                <Link to="/login" className="px-4 py-2 bg-green-400 hover:bg-green-500 rounded-full font-medium text-xs lg:text-sm">
                  {translations[language].login}
                </Link>
                <Link to="/Register" className="px-4 py-2 bg-white text-green-700 hover:bg-gray-100 rounded-full font-medium text-xs lg:text-sm">
                  {translations[language].register}
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-6 mx-auto">
          {navLinks.map(({ path, label, requiresAuth }) => {
            const handleClick = (e) => {
              if (requiresAuth && !isLoggedIn) {
                e.preventDefault();
                navigate("/login");
              }
            };
            return (
              <Link
                key={path}
                to={path}
                onClick={handleClick}
                className={`relative px-2 lg:px-3 py-2 text-xs lg:text-sm font-medium transition-all duration-300 hover:text-green-200 ${location.pathname === path ? "text-green-200" : ""} ${requiresAuth && !isLoggedIn ? "opacity-75" : ""}`}
              >
                {label}
                {requiresAuth && !isLoggedIn && <span className="text-xs opacity-60 ml-1">🔒</span>}
                {location.pathname === path && <span className="absolute bottom-0 right-0 left-0 h-0.5 bg-green-200 transition-all duration-300" />}
              </Link>
            );
          })}
        </div>

        {/* Desktop Language Buttons */}
        <div className="hidden lg:flex items-center gap-2">
          <button onClick={() => setLanguage("ar")} className={`px-2 py-1 rounded font-semibold ${language==="ar"?"bg-green-700 text-white":"bg-green-200 text-green-800"}`}>AR</button>
          <button onClick={() => setLanguage("fr")} className={`px-2 py-1 rounded font-semibold ${language==="fr"?"bg-green-700 text-white":"bg-green-200 text-green-800"}`}>FR</button>
          <button onClick={() => setLanguage("en")} className={`px-2 py-1 rounded font-semibold ${language==="en"?"bg-green-700 text-white":"bg-green-200 text-green-800"}`}>EN</button>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden p-2 hover:bg-green-700/50 rounded-lg transition-colors duration-300" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24}/> : <Menu size={24}/>}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-full opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="bg-gradient-to-b from-green-700/90 to-teal-800/90 backdrop-blur-md border-t border-green-500/30 px-3 py-3 space-y-2">
          
          {/* Language Buttons - Mobile */}
          <div className="flex gap-2 mb-2">
            <button onClick={() => setLanguage("ar")} className={`flex-1 px-2 py-1 rounded font-semibold ${language==="ar"?"bg-green-700 text-white":"bg-green-200 text-green-800"}`}>AR</button>
            <button onClick={() => setLanguage("fr")} className={`flex-1 px-2 py-1 rounded font-semibold ${language==="fr"?"bg-green-700 text-white":"bg-green-200 text-green-800"}`}>FR</button>
            <button onClick={() => setLanguage("en")} className={`flex-1 px-2 py-1 rounded font-semibold ${language==="en"?"bg-green-700 text-white":"bg-green-200 text-green-800"}`}>EN</button>
          </div>

          {/* Nav Links - Mobile */}
          {navLinks.map(({ path, label, requiresAuth }) => {
            const handleClick = () => {
              setIsOpen(false);
              if (requiresAuth && !isLoggedIn) navigate("/login");
            };
            return (
              <Link
                key={path}
                to={requiresAuth && !isLoggedIn ? "/login" : path}
                onClick={handleClick}
                className={`block w-full text-right px-4 py-2.5 text-sm rounded-lg transition-all duration-200 ${location.pathname===path?"bg-green-400/30 text-green-200 font-semibold":"text-white hover:bg-green-600/50"} ${requiresAuth && !isLoggedIn ? "opacity-75" : ""}`}
              >
                {label}
                {requiresAuth && !isLoggedIn && <span className="text-xs opacity-60 mr-1">🔒</span>}
              </Link>
            );
          })}

          {/* Mobile Auth Buttons */}
          {isLoggedIn ? (
            <button onClick={handleLogout} className="w-full text-sm px-4 py-2.5 mt-3 bg-green-400 hover:bg-green-500 text-gray-900 font-semibold rounded-lg transition-all duration-200 hover:shadow-lg">
              {translations[language].logout}
            </button>
          ) : (
            <div className="flex gap-2 mt-3">
              <Link to="/login" onClick={() => setIsOpen(false)} className="flex-1 text-center text-sm px-4 py-2.5 bg-green-400 hover:bg-green-500 text-gray-900 font-semibold rounded-lg transition-all duration-200">
                {translations[language].login}
              </Link>
              <Link to="/Register" onClick={() => setIsOpen(false)} className="flex-1 text-center text-sm px-4 py-2.5 bg-white hover:bg-gray-100 text-green-700 font-semibold transition-all duration-200">
                {translations[language].register}
              </Link>
            </div>
          )}

        </div>
      </div>
    </header>
  );
};
