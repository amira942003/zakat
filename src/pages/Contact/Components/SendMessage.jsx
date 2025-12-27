import React, { useState } from 'react';
import { MessagePopup } from '../../../Components/MessagePopup';
import { useApi } from "@/ApiProvider";
import { Link } from "react-router-dom";
import { useLanguage } from "../../../Components/LanguageProvider"; // chemin à ajuster

export const SendMessage = ({ userMessage, handleChange, defaultValue, setUserMessage }) => {
    const api = useApi();
    const { language } = useLanguage();
    const [loading, setLoading] = useState(false);
    const [popup, setPopup] = useState({ message: "", type: "" });

    const sendMessage = async (event) => {
        event.preventDefault();
        setLoading(true);

        const [data, status, error] = await api.post("/send-email/", userMessage);

        if (!error && status === 200) {
            setPopup({ message: language === "ar" ? "تم إرسال الرسالة بنجاح!" : language === "fr" ? "Message envoyé avec succès !" : "Message sent successfully!", type: "success" });
            setUserMessage(defaultValue);
        } else {
            console.error("Error sending message:", error);
            setPopup({ message: language === "ar" ? "حدث خطأ" : language === "fr" ? "Une erreur est survenue" : "An error occurred", type: "error" });
        }

        setLoading(false);
    };

    return (
        <div dir={language === "ar" ? "rtl" : "ltr"} className="w-full p-4 sm:p-6 form">
            <div className="space-y-4 sm:space-y-6">
                {/* Name Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                        type="text"
                        placeholder={language === "ar" ? "الاسم الأول" : language === "fr" ? "Prénom" : "First Name"}
                        name="first_name"
                        value={userMessage.first_name}
                        onChange={handleChange}
                        className="w-full sm:p-2 custom-input sm:text-base"
                        disabled={loading}
                        required
                    />
                    <input
                        type="text"
                        placeholder={language === "ar" ? "اسم العائلة" : language === "fr" ? "Nom de famille" : "Last Name"}
                        name="last_name"
                        value={userMessage.last_name}
                        onChange={handleChange}
                        className="w-full sm:p-2 custom-input sm:text-base"
                        disabled={loading}
                        required
                    />
                </div>

                {/* Email Field */}
                <input
                    type="email"
                    placeholder={language === "ar" ? "البريد الإلكتروني" : language === "fr" ? "Email" : "Email"}
                    name="sender_email"
                    value={userMessage.sender_email}
                    onChange={handleChange}
                    className="w-full sm:p-2 custom-input sm:text-base"
                    disabled={loading}
                    required
                />

                {/* Phone Field */}
                <input
                    min={0}
                    type="number"
                    placeholder={language === "ar" ? "رقم الهاتف" : language === "fr" ? "Téléphone" : "Phone"}
                    name="phone"
                    value={userMessage.phone}
                    onChange={handleChange}
                    className="w-full sm:p-2 custom-input sm:text-base"
                    disabled={loading}
                    title={language === "ar" ? "الرجاء إدخال رقم هاتف جزائري صالح" : language === "fr" ? "Veuillez entrer un numéro de téléphone valide" : "Please enter a valid phone number"}
                    required
                />

                {/* Message Field */}
                <textarea
                    placeholder={language === "ar" ? "كيف يمكننا مساعدتك؟" : language === "fr" ? "Comment pouvons-nous vous aider ?" : "How can we help you?"}
                    name="message"
                    value={userMessage.message}
                    onChange={handleChange}
                    rows="5"
                    className="w-full sm:p-2 custom-input resize-none text-sm sm:text-base min-h-[120px]"
                    disabled={loading}
                    required
                />

                {/* Submit Button */}
                <button
                    onClick={sendMessage}
                    className={`custom-button w-full max-sm:w-3/4 text-sm sm:text-base py-2 rounded-sm ${
                        loading
                            ? 'opacity-60 cursor-not-allowed'
                            : 'hover:bg-green-700 active:bg-green-800'
                    }`}
                    disabled={loading}
                >
                    {loading
                        ? language === "ar" ? "جاري الإرسال..." : language === "fr" ? "Envoi..." : "Sending..."
                        : language === "ar" ? "إرسال" : language === "fr" ? "Envoyer" : "Send"}
                </button>

                {/* Terms Text with Links */}
                <p className="text-gray-600 text-xs sm:text-sm text-center leading-relaxed px-2">
                    {language === "ar" && (
                        <>بالاتصال بنا، فإنك توافق على{' '}
                            <Link to="/terms" className="text-green-600 font-semibold hover:text-green-700">شروط الخدمة</Link>{' '}
                            و{' '}
                            <Link to="/privacy" className="text-green-600 font-semibold hover:text-green-700">سياسة الخصوصية</Link> الخاصة بنا.
                        </>
                    )}
                    {language === "fr" && (
                        <>En nous contactant, vous acceptez nos{' '}
                            <Link to="/terms" className="text-green-600 font-semibold hover:text-green-700">Conditions d'utilisation</Link>{' '}
                            et{' '}
                            <Link to="/privacy" className="text-green-600 font-semibold hover:text-green-700">Politique de confidentialité</Link>.
                        </>
                    )}
                    {language === "en" && (
                        <>By contacting us, you agree to our{' '}
                            <Link to="/terms" className="text-green-600 font-semibold hover:text-green-700">Terms of Service</Link>{' '}
                            and{' '}
                            <Link to="/privacy" className="text-green-600 font-semibold hover:text-green-700">Privacy Policy</Link>.
                        </>
                    )}
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
