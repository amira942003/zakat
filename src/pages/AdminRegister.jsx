import React, { useRef, useState } from "react";
import { MessagePopup } from "@/Components/MessagePopup";

export const AdminRegister = () => {
    const formRef = useRef(null);

    const initialAdminData = {
        username: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
    };

    const [adminForm, setAdminForm] = useState(initialAdminData);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [popup, setPopup] = useState({ message: "", type: "" });

    const handleAdmin = (e) => {
        const { name, value } = e.target;
        setAdminForm((prevState) => ({ ...prevState, [name]: value }));
        
        // Effacer l'erreur du champ modifié
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const validateForm = () => {
        let valid = true;
        const e = {};

        // Validation du username
        if (!adminForm.username.trim()) {
            e.username = "إسم المستخدم مطلوب.";
            valid = false;
        }

        // Validation de l'email (format uniquement)
        if (!adminForm.email.trim()) {
            e.email = "البريد الإلكتروني مطلوب.";
            valid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(adminForm.email)) {
            e.email = "البريد الإلكتروني غير صالح.";
            setPopup({
                message: "❌ البريد الإلكتروني غير صالح. يرجى التحقق من الصيغة.",
                type: "error",
            });
            valid = false;
        }

        // Validation du numéro de téléphone algérien
        if (!adminForm.phone.trim()) {
            e.phone = "رقم الهاتف مطلوب.";
            valid = false;
        } else {
            const cleanPhone = adminForm.phone.replace(/[\s-]/g, "");
            const algerianPhoneRegex = /^(0[5-7]\d{8}|(\+213|00213)[5-7]\d{8})$/;

            if (!algerianPhoneRegex.test(cleanPhone)) {
                e.phone = "رقم الهاتف غير صالح.";
                setPopup({
                    message: "❌ رقم الهاتف غير صالح. يجب أن يبدأ بـ 05، 06 أو 07",
                    type: "error",
                });
                valid = false;
            }
        }

        // Validation du password
        if (!adminForm.password) {
            e.password = "كلمة المرور مطلوبة.";
            valid = false;
        } else if (adminForm.password.length < 6) {
            e.password = "كلمة المرور يجب أن تكون 6 أحرف على الأقل.";
            setPopup({
                message: "❌ كلمة المرور يجب أن تكون 6 أحرف على الأقل.",
                type: "error",
            });
            valid = false;
        }

        // Validation de la confirmation
        if (!adminForm.confirmPassword) {
            e.confirmPassword = "تأكيد كلمة المرور مطلوب.";
            valid = false;
        } else if (adminForm.password !== adminForm.confirmPassword) {
            e.confirmPassword = "كلمتا المرور غير متطابقتين.";
            setPopup({
                message: "❌ كلمتا المرور غير متطابقتين.",
                type: "error",
            });
            valid = false;
        }

        setErrors(e);

        // Si des erreurs générales existent
        if (!valid && !popup.message) {
            setPopup({
                message: "يرجى تصحيح الأخطاء في النموذج.",
                type: "error",
            });
        }

        return valid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation côté client
        if (!validateForm()) return;

        setLoading(true);

        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/admin/register/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: adminForm.username.trim(),
                    email: adminForm.email.trim().toLowerCase(),
                    phone: adminForm.phone.replace(/[\s-]/g, ""),
                    password: adminForm.password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setPopup({
                    message: "✅ تم تسجيل المشرف بنجاح!",
                    type: "success",
                });
                setAdminForm(initialAdminData);
                setErrors({});
                formRef.current?.reset();
            } else {
                // Gestion détaillée des erreurs du backend
                let errorMessage = "";
                const newErrors = {};

                // Vérifier chaque champ pour les erreurs spécifiques
                if (data.username) {
                    const usernameError = Array.isArray(data.username) ? data.username[0] : data.username;
                    newErrors.username = usernameError;
                    errorMessage = "❌ إسم المستخدم موجود بالفعل";
                }

                if (data.email) {
                    const emailError = Array.isArray(data.email) ? data.email[0] : data.email;
                    newErrors.email = emailError;
                    errorMessage = "❌ البريد الإلكتروني موجود بالفعل أو غير صالح";
                }

                if (data.phone || data.phone_number) {
                    const phoneError = Array.isArray(data.phone) 
                        ? data.phone[0] 
                        : (data.phone || data.phone_number);
                    newErrors.phone = phoneError;
                    errorMessage = "❌ رقم الهاتف غير صالح أو موجود بالفعل";
                }

                if (data.password) {
                    const passwordError = Array.isArray(data.password) ? data.password[0] : data.password;
                    newErrors.password = passwordError;
                    errorMessage = "❌ كلمة المرور غير صالحة";
                }

                // Si aucune erreur spécifique, utiliser le message général
                if (!errorMessage) {
                    if (data.detail) {
                        errorMessage = "❌ " + data.detail;
                    } else if (data.message) {
                        errorMessage = "❌ " + data.message;
                    } else if (data.error) {
                        errorMessage = "❌ " + data.error;
                    } else {
                        errorMessage = "❌ فشل التسجيل. يرجى التحقق من البيانات";
                    }
                }

                // Mettre à jour les erreurs des champs
                setErrors(newErrors);

                // Afficher le popup avec le message d'erreur
                setPopup({
                    message: errorMessage,
                    type: "error",
                });
            }
        } catch (error) {
            console.error("خطأ أثناء الإرسال:", error);
            setPopup({
                message: "❌ فشل الاتصال بالخادم. يرجى التحقق من الاتصال بالإنترنت.",
                type: "error",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div dir="rtl" className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
                <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                    <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
                        تسجيل المشرف
                    </h2>
                    <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-4">
                        {/* Username */}
                        <div>
                            <label htmlFor="username" className="block text-gray-600 mb-1">
                                إسم المستخدم
                            </label>
                            <input
                                id="username"
                                type="text"
                                name="username"
                                value={adminForm.username}
                                onChange={handleAdmin}
                                disabled={loading}
                                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                                    errors.username
                                        ? "border-red-500 focus:ring-red-500"
                                        : "border-gray-300 focus:ring-green-500"
                                } disabled:bg-gray-100`}
                            />
                            {errors.username && (
                                <p className="text-red-500 text-sm mt-1">{errors.username}</p>
                            )}
                        </div>

                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-gray-600 mb-1">
                                البريد الإلكتروني
                            </label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={adminForm.email}
                                onChange={handleAdmin}
                                disabled={loading}
                                placeholder="example@email.com"
                                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                                    errors.email
                                        ? "border-red-500 focus:ring-red-500"
                                        : "border-gray-300 focus:ring-green-500"
                                } disabled:bg-gray-100`}
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                            )}
                        </div>

                        {/* Phone */}
                        <div>
                            <label htmlFor="phone" className="block text-gray-600 mb-1">
                                رقم الهاتف
                            </label>
                            <input
                                id="phone"
                                type="tel"
                                name="phone"
                                value={adminForm.phone}
                                onChange={handleAdmin}
                                disabled={loading}
                                placeholder="0555123456"
                                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                                    errors.phone
                                        ? "border-red-500 focus:ring-red-500"
                                        : "border-gray-300 focus:ring-green-500"
                                } disabled:bg-gray-100`}
                            />
                            {errors.phone && (
                                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                            )}
                            <p className="text-gray-500 text-xs mt-1">
                                مثال: 0555123456 أو 0661234567 أو 0771234567
                            </p>
                        </div>

                        {/* Password */}
                        <div>
                            <label htmlFor="password" className="block text-gray-600 mb-1">
                                كلمة المرور
                            </label>
                            <input
                                id="password"
                                type="password"
                                name="password"
                                value={adminForm.password}
                                onChange={handleAdmin}
                                disabled={loading}
                                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                                    errors.password
                                        ? "border-red-500 focus:ring-red-500"
                                        : "border-gray-300 focus:ring-green-500"
                                } disabled:bg-gray-100`}
                            />
                            {errors.password && (
                                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                            )}
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label htmlFor="confirmPassword" className="block text-gray-600 mb-1">
                                تأكيد كلمة المرور
                            </label>
                            <input
                                id="confirmPassword"
                                type="password"
                                name="confirmPassword"
                                value={adminForm.confirmPassword}
                                onChange={handleAdmin}
                                disabled={loading}
                                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                                    errors.confirmPassword
                                        ? "border-red-500 focus:ring-red-500"
                                        : "border-gray-300 focus:ring-green-500"
                                } disabled:bg-gray-100`}
                            />
                            {errors.confirmPassword && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.confirmPassword}
                                </p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-2 rounded-md transition font-medium ${
                                loading
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-green-600 hover:bg-green-700 text-white"
                            }`}
                        >
                            {loading ? "جاري التسجيل..." : "تسجيل"}
                        </button>
                    </form>
                </div>
            </div>

            {/* MessagePopup Component */}
            <MessagePopup
                message={popup.message}
                type={popup.type}
                onClose={() => setPopup({ message: "", type: "" })}
            />
        </>
    );
};
