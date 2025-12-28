import React, { useEffect, useState, useContext } from "react";
import { MessagePopup } from "@/Components/MessagePopup";
import { useApi } from "@/ApiProvider";
import { ZakatContext } from "@/Components/ZakatProvider";

export const UserInfos = () => {
  const api = useApi();
  const { language } = useContext(ZakatContext);
  const [formData, setFormData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    old_password: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({});
  const [activeTab, setActiveTab] = useState("account");
  const [popup, setPopup] = useState({ message: "", type: "" });

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

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const [data, status, error] = await api.get("/me/");
        if (error) throw new Error(
          translate(
            "فشل تحميل معلومات المستخدم.",
            "Échec du chargement des informations utilisateur.",
            "Failed to load user information."
          )
        );
        setFormData({
          username: data.username || "",
          first_name: data.first_name || "",
          last_name: data.last_name || "",
          email: data.email || "",
          old_password: "",
          password: "",
        });
      } catch (err) {
        console.error(err);
        setPopup({
          message: translate("حدث خطأ", "Une erreur est survenue", "An error occurred"),
          type: "error",
        });
      }
    };
    fetchUserInfo();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = (values) => {
    const errors = {};
    if (!values.password.trim()) {
      errors.password = translate(
        "كلمة المرور الجديدة مطلوبة!",
        "Le nouveau mot de passe est requis!",
        "New password is required!"
      );
    }
    if (!values.old_password.trim()) {
      errors.old_password = translate(
        "كلمة المرور القديمة مطلوبة!",
        "L'ancien mot de passe est requis!",
        "Old password is required!"
      );
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (activeTab === "password") {
      const errors = validate(formData);
      setError(errors);
      if (Object.keys(errors).length > 0) return;
    }

    if (formData.old_password && !formData.password) {
      setPopup({
        message: translate(
          "يرجى إدخال كلمة المرور الجديدة",
          "Veuillez entrer un nouveau mot de passe",
          "Please enter a new password"
        ),
        type: "error",
      });
      return;
    }

    const payload = {};
    for (const key in formData) {
      if (formData[key]) payload[key] = formData[key];
    }

    if (activeTab !== "password") {
      delete payload.password;
      delete payload.old_password;
    }

    setIsLoading(true);
    try {
      const [data, status, error] = await api.patch("/user/update/", payload, { withCredentials: true });
      if (error || status !== 200) {
        if (data?.old_password) {
          setPopup({ message: data.old_password, type: "error" });
        } else if (typeof data === "object" && Object.values(data)[0]) {
          const firstError = Object.values(data)[0];
          setPopup({ message: firstError, type: "error" });
        } else {
          setPopup({ message: data || translate("حدث خطأ", "Une erreur est survenue", "An error occurred"), type: "error" });
        }
        setIsLoading(false);
        return;
      }
      setPopup({ message: translate("تم تحديث البيانات بنجاح", "Les informations ont été mises à jour avec succès", "Data updated successfully"), type: "success" });
      setFormData((prev) => ({ ...prev, password: "", old_password: "" }));
    } catch (err) {
      console.error("Error updating user:", err);
      setPopup({ message: translate("حدث خطأ", "Une erreur est survenue", "An error occurred"), type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen my-8 bg-gradient-to-br from-gray-50 to-emerald-50 py-12">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto" dir={language === "ar" ? "rtl" : "ltr"}>
          {/* Page Header */}
          <div className="text-center mb-4">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">{translate("الملف الشخصي", "Profil", "Profile")}</h1>
            <p className="text-gray-600 text-lg">{translate("إدارة معلوماتك الشخصية وإعدادات الحساب", "Gérez vos informations personnelles et paramètres du compte", "Manage your personal info and account settings")}</p>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Tab Headers */}
            <div className="bg-green4">
              <div className="flex rounded-xl bg-white/10 p-1">
                <button onClick={() => setActiveTab("account")}
                  className={`flex-1 py-2 px-4 mx-2 rounded-lg text-center text-[0.8em] font-semibold transition-all duration-200 ${activeTab === "account" ? "bg-white text-green3 shadow-lg" : "text-white hover:bg-white/20"}`}>
                  {translate("معلومات الحساب","Infos du compte","Account Info")}
                </button>
                <button onClick={() => setActiveTab("password")}
                  className={`flex-1 py-2 px-4 rounded-lg text-center text-[0.8em] font-semibold transition-all duration-200 ${activeTab === "password" ? "bg-white text-green3 shadow-lg" : "text-white hover:bg-white/20"}`}>
                  {translate("كلمة المرور","Mot de passe","Password")}
                </button>
              </div>
            </div>

            {/* Tab Content */}
            <div className="p-8">
              {/* Account Tab */}
              {activeTab === "account" && (
                <div className="space-y-6">
                  <div className="mb-4">
                    <h2 className="text-xl font-bold text-gray-800 mb-2">{translate("معلومات الحساب","Infos du compte","Account Info")}</h2>
                    <p className="text-gray-600">{translate("قم بتحديث معلومات حسابك.","Mettez à jour vos informations de compte.","Update your account info.")}</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="custom-form-label mb-2">{translate("اسم المستخدم","Nom d'utilisateur","Username")}</label>
                      <input type="text" name="username" value={formData.username} onChange={handleChange} className="w-full px-4 py-3 custom-input" placeholder={translate("أدخل اسم المستخدم","Entrez le nom d'utilisateur","Enter username")} />
                    </div>

                    <div>
                      <label className="custom-form-label mb-2">{translate("البريد الإلكتروني","Email","Email")}</label>
                      <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 custom-input" placeholder={translate("أدخل البريد الإلكتروني","Entrez l'email","Enter email")} />
                    </div>

                    <div>
                      <label className="custom-form-label mb-2">{translate("الاسم الأول","Prénom","First Name")}</label>
                      <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} className="w-full px-4 py-3 custom-input" placeholder={translate("أدخل الاسم الأول","Entrez le prénom","Enter first name")} />
                    </div>

                    <div>
                      <label className="custom-form-label mb-2">{translate("الاسم الأخير","Nom de famille","Last Name")}</label>
                      <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} className="w-full px-4 py-3 custom-input" placeholder={translate("أدخل الاسم الأخير","Entrez le nom de famille","Enter last name")} />
                    </div>
                  </div>

                  <div className="pt-6 border-t text-center border-gray-200">
                    <button onClick={handleSubmit} className="w-1/2 custom-button py-2 rounded-sm">{isLoading ? translate("جاري التحديث...","Mise à jour...","Updating...") : translate("تحديث المعلومات","Mettre à jour","Update Info")}</button>
                  </div>
                </div>
              )}

              {/* Password Tab */}
              {activeTab === "password" && (
                <div className="space-y-6">
                  <div className="mb-4">
                    <h2 className="text-xl font-bold text-gray-800 mb-2">{translate("تغيير كلمة المرور","Changer le mot de passe","Change Password")}</h2>
                    <p className="text-gray-600">{translate("قم بإدخال كلمة المرور القديمة والجديدة","Entrez l'ancien et le nouveau mot de passe","Enter old and new password")}</p>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="custom-form-label mb-2">{translate("كلمة المرور الحالية","Mot de passe actuel","Current Password")}</label>
                      <input required type="password" name="old_password" value={formData.old_password} onChange={handleChange} className="w-full px-4 py-3 custom-input" placeholder={translate("أدخل كلمة المرور الحالية","Entrez le mot de passe actuel","Enter current password")} />
                      {error.old_password && <p className="text-red-500 text-sm mt-2">{error.old_password}</p>}
                    </div>

                    <div>
                      <label className="custom-form-label mb-2">{translate("كلمة المرور الجديدة","Nouveau mot de passe","New Password")}</label>
                      <input required type="password" name="password" value={formData.password} onChange={handleChange} className="w-full px-4 py-3 custom-input" placeholder={translate("أدخل كلمة المرور الجديدة","Entrez le nouveau mot de passe","Enter new password")} />
                      {error.password && <p className="text-red-500 text-sm mt-2">{error.password}</p>}
                    </div>
                  </div>

                  <div className="pt-6 border-t text-center border-gray-200">
                    <button onClick={handleSubmit} className="w-1/2 custom-button py-2 rounded-sm">{isLoading ? translate("جاري التحديث...","Mise à jour...","Updating...") : translate("تحديث كلمة المرور","Mettre à jour le mot de passe","Update Password")}</button>
                  </div>
                </div>
              )}

              {/* Messages */}
              <MessagePopup message={popup.message} type={popup.type} onClose={() => setPopup({ message: "", type: "" })} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
