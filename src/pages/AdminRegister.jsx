import React, { useState } from "react";

export const AdminRegister = () => {
    const initialAdminData = {
        username: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
    };

    const [adminForm, setAdminForm] = useState(initialAdminData);
    const [formErrors, setFormErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [notification, setNotification] = useState(null);

    // Fonction pour afficher les notifications
    const showNotification = (message, type = "error") => {
        setNotification({ message, type });
        setTimeout(() => {
            setNotification(null);
        }, 4000);
    };

    const handleAdmin = (e) => {
        const { name, value } = e.target;
        setAdminForm((prevState) => ({ ...prevState, [name]: value }));
        setFormErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    };

    const validateForm = () => {
        const errors = {};
        
        // Validation du username
        if (!adminForm.username.trim()) {
            errors.username = "إسم المستخدم مطلوب.";
            showNotification("إسم المستخدم مطلوب.", "error");
        }
        
        // Validation de l'email (format uniquement)
        if (!adminForm.email.trim()) {
            errors.email = "البريد الإلكتروني مطلوب.";
            showNotification("البريد الإلكتروني مطلوب.", "error");
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(adminForm.email)) {
            errors.email = "البريد الإلكتروني غير صالح.";
            showNotification("❌ البريد الإلكتروني غير صالح. يرجى التحقق من الصيغة.", "error");
        }
        
        // Validation du numéro de téléphone algérien
        if (!adminForm.phone.trim()) {
            errors.phone = "رقم الهاتف مطلوب.";
            showNotification("رقم الهاتف مطلوب.", "error");
        } else {
            // Enlever les espaces et les tirets
            const cleanPhone = adminForm.phone.replace(/[\s-]/g, "");
            
            // Vérifier le format algérien: 0X XX XX XX XX (10 chiffres) ou +213 X XX XX XX XX
            const algerianPhoneRegex = /^(0[5-7]\d{8}|(\+213|00213)[5-7]\d{8})$/;
            
            if (!algerianPhoneRegex.test(cleanPhone)) {
                errors.phone = "رقم الهاتف غير صالح.";
                showNotification("❌ رقم الهاتف غير صالح. يجب أن يبدأ بـ 05، 06 أو 07", "error");
            }
        }
        
        // Validation du password
        if (!adminForm.password) {
            errors.password = "كلمة المرور مطلوبة.";
            showNotification("كلمة المرور مطلوبة.", "error");
        } else if (adminForm.password.length < 6) {
            errors.password = "كلمة المرور يجب أن تكون 6 أحرف على الأقل.";
            showNotification("❌ كلمة المرور يجب أن تكون 6 أحرف على الأقل.", "error");
        }
        
        // Validation de la confirmation
        if (!adminForm.confirmPassword) {
            errors.confirmPassword = "تأكيد كلمة المرور مطلوب.";
            showNotification("تأكيد كلمة المرور مطلوب.", "error");
        } else if (adminForm.password !== adminForm.confirmPassword) {
            errors.confirmPassword = "كلمتا المرور غير متطابقتين.";
            showNotification("❌ كلمتا المرور غير متطابقتين.", "error");
        }
        
        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validation côté client
        const errors = validateForm();
        setFormErrors(errors);

        if (Object.keys(errors).length > 0) return;

        setIsLoading(true);

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
                showNotification("✅ تم تسجيل المشرف بنجاح!", "success");
                setAdminForm(initialAdminData);
                setFormErrors({});
            } else {
                showNotification("❌ حدث خطأ في التسجيل: " + (data.message || "خطأ غير معروف"), "error");
            }
        } catch (error) {
            console.error("خطأ أثناء الإرسال:", error);
            showNotification("❌ فشل الاتصال بالخادم.", "error");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div dir="rtl" className="flex items-center justify-center min-h-screen bg-gray-100">
            {/* Toast Notification */}
            {notification && (
                <div
                    className={`fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-lg transform transition-all duration-300 ease-in-out ${
                        notification.type === "success"
                            ? "bg-green-500 text-white"
                            : "bg-red-500 text-white"
                    }`}
                    style={{
                        animation: "slideIn 0.3s ease-out",
                    }}
                >
                    <div className="flex items-center gap-3">
                        {notification.type === "success" ? (
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                        ) : (
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        )}
                        <p className="font-medium">{notification.message}</p>
                    </div>
                </div>
            )}

            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">تسجيل المشرف</h2>
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
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
                            disabled={isLoading}
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                                formErrors.username
                                    ? "border-red-500 focus:ring-red-500"
                                    : "border-gray-300 focus:ring-green-500"
                            } disabled:bg-gray-100`}
                        />
                        {formErrors.username && (
                            <p className="text-red-500 text-sm mt-1">{formErrors.username}</p>
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
                            disabled={isLoading}
                            placeholder="example@email.com"
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                                formErrors.email
                                    ? "border-red-500 focus:ring-red-500"
                                    : "border-gray-300 focus:ring-green-500"
                            } disabled:bg-gray-100`}
                        />
                        {formErrors.email && (
                            <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
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
                            disabled={isLoading}
                            placeholder="0555123456"
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                                formErrors.phone
                                    ? "border-red-500 focus:ring-red-500"
                                    : "border-gray-300 focus:ring-green-500"
                            } disabled:bg-gray-100`}
                        />
                        {formErrors.phone && (
                            <p className="text-red-500 text-sm mt-1">{formErrors.phone}</p>
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
                            disabled={isLoading}
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                                formErrors.password
                                    ? "border-red-500 focus:ring-red-500"
                                    : "border-gray-300 focus:ring-green-500"
                            } disabled:bg-gray-100`}
                        />
                        {formErrors.password && (
                            <p className="text-red-500 text-sm mt-1">{formErrors.password}</p>
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
                            disabled={isLoading}
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                                formErrors.confirmPassword
                                    ? "border-red-500 focus:ring-red-500"
                                    : "border-gray-300 focus:ring-green-500"
                            } disabled:bg-gray-100`}
                        />
                        {formErrors.confirmPassword && (
                            <p className="text-red-500 text-sm mt-1">{formErrors.confirmPassword}</p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full py-2 rounded-md transition font-medium ${
                            isLoading
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-green-600 hover:bg-green-700 text-white"
                        }`}
                    >
                        {isLoading ? "جاري التسجيل..." : "تسجيل"}
                    </button>
                </form>
            </div>

            {/* CSS Animation pour le toast */}
            <style jsx>{`
                @keyframes slideIn {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
            `}</style>
        </div>
    );
};
