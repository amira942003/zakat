import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from "../Components/LanguageProvider";

const translations = {
  ar: {
    platformTitle: "منصة حساب زكاة الشركات وتوجيهها للوقف والتنمية",
    platformDesc: "منصة إسلامية متخصصة في حساب وتوجيه الزكاة لخدمة المجتمع وتحقيق التنمية المستدامة",
    followUs: "تابعونا",
    contactUs: "للتواصل معنا",
    phoneLabel: "رقم الهاتف",
    phoneNumber: "0772348980",
    emailLabel: "البريد الإلكتروني",
    email: "solrusentreprises@gmail.com",
    addressLabel: "العنوان",
    address: "الجزائر العاصمة",
    services: "خدماتنا",
    navLinks: [
      { to: "/", label: "الرئيسية" },
      { to: "/About", label: "عن الزكاة" },
      { to: "/ZakatCalculator", label: "حاسبة الزكاة" },
      { to: "/Awkaf", label: "مشاريع الوقف" },
      { to: "/Contact", label: "اتصل بنا" }
    ],
    privacy: "سياسة الخصوصية",
    terms: "الشروط والأحكام",
    copyright: "© 2024 منصة الزكاة. جميع الحقوق محفوظة"
  },
  fr: {
    platformTitle: "Plateforme de calcul de Zakat des entreprises et orientation vers les Awqaf et le développement",
    platformDesc: "Plateforme islamique spécialisée dans le calcul et l’orientation de la Zakat au service de la communauté et pour un développement durable",
    followUs: "Suivez-nous",
    contactUs: "Contactez-nous",
    phoneLabel: "Téléphone",
    phoneNumber: "0772348980",
    emailLabel: "Email",
    email: "solrusentreprises@gmail.com",
    addressLabel: "Adresse",
    address: "Alger, Algérie",
    services: "Nos services",
    navLinks: [
      { to: "/", label: "Accueil" },
      { to: "/About", label: "À propos de la Zakat" },
      { to: "/ZakatCalculator", label: "Calculatrice Zakat" },
      { to: "/Awkaf", label: "Projets Awqaf" },
      { to: "/Contact", label: "Contactez-nous" }
    ],
    privacy: "Politique de confidentialité",
    terms: "Termes et conditions",
    copyright: "© 2024 Plateforme Zakat. Tous droits réservés"
  },
  en: {
    platformTitle: "Corporate Zakat Calculation Platform and Awqaf/Development Guidance",
    platformDesc: "Islamic platform specialized in calculating and directing Zakat to serve the community and achieve sustainable development",
    followUs: "Follow us",
    contactUs: "Contact us",
    phoneLabel: "Phone",
    phoneNumber: "0772348980",
    emailLabel: "Email",
    email: "solrusentreprises@gmail.com",
    addressLabel: "Address",
    address: "Algiers, Algeria",
    services: "Our Services",
    navLinks: [
      { to: "/", label: "Home" },
      { to: "/About", label: "About Zakat" },
      { to: "/ZakatCalculator", label: "Zakat Calculator" },
      { to: "/Awkaf", label: "Awqaf Projects" },
      { to: "/Contact", label: "Contact Us" }
    ],
    privacy: "Privacy Policy",
    terms: "Terms & Conditions",
    copyright: "© 2024 Zakat Platform. All rights reserved"
  }
};

export default function Footer() {
  const { language } = useLanguage();

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-green-900 to-green-900 text-white relative overflow-hidden">

      {/* Main Footer Content */}
      <div className="relative">
        <div className="container mx-auto px-6 py-16" dir={language === "ar" ? "rtl" : "ltr"}>
          <div className="grid lg:grid-cols-3 gap-12">
            
            {/* Platform Info */}
            <div className="lg:col-span-1 mb-8">
              <h1 className="text-2xl font-bold text-white leading-tight mb-6">
                {translations[language].platformTitle}
              </h1>
              <p className="text-gray-300 leading-relaxed text-lg">
                {translations[language].platformDesc}
              </p>

              {/* Social Media */}
              <div className="mt-6">
                <h3 className="text-xl font-semibold text-white mb-4">{translations[language].followUs}</h3>
                <div className="flex space-x-4">
                  <a href="#" className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors duration-300 group">
                    {/* SVG YouTube */}
                  </a>
                  <a href="#" className="w-12 h-12 bg-blue-800 rounded-full flex items-center justify-center hover:bg-blue-900 transition-colors duration-300 group">
                    {/* SVG Facebook */}
                  </a>
                  <a href="#" className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors duration-300 group">
                    {/* SVG Instagram */}
                  </a>
                </div>
              </div>
            </div>

            {/* Contact & Links */}
            <div className="lg:col-span-2">
              <div className="grid md:grid-cols-2 gap-8">

                {/* Contact Information */}
                <div>
                  <h3 className="text-xl font-bold text-white mb-6">{translations[language].contactUs}</h3>
                  <div className="space-y-4">
                    <div className="flex flex-col">
                      <span className="text-gray-300 text-sm">{translations[language].phoneLabel}</span>
                      <span className="text-white font-semibold text-lg">{translations[language].phoneNumber}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-300 text-sm">{translations[language].emailLabel}</span>
                      <span className="text-white font-semibold text-lg">{translations[language].email}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-300 text-sm">{translations[language].addressLabel}</span>
                      <span className="text-white font-semibold text-lg">{translations[language].address}</span>
                    </div>
                  </div>
                </div>

                {/* Navigation Links */}
                <div>
                  <h3 className="text-xl font-bold text-white mb-6">{translations[language].services}</h3>
                  <nav>
                    <ul className="space-y-3">
                      {translations[language].navLinks.map((link, index) => (
                        <li key={index}>
                          <Link
                            to={link.to}
                            className="flex items-center text-gray-300 hover:text-white transition-colors duration-300 group py-2"
                          >
                            <span className="font-medium group-hover:translate-x-2 transition-transform">
                              {link.label}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-700/50 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-right" dir={language === "ar" ? "rtl" : "ltr"}>
            <p className="text-gray-400">{translations[language].copyright}</p>
            <div className="flex items-center space-x-6">
              <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors text-sm">
                {translations[language].privacy}
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-white transition-colors text-sm">
                {translations[language].terms}
              </Link>
            </div>
          </div>
        </div>
      </div>

    </footer>
  );
}
