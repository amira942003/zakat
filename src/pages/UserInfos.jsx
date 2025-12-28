import React, { useState, useEffect, useContext } from "react";
import { ZakatContext } from "@/Components/ZakatProvider";
import { useApi } from "@/ApiProvider";
import { MessagePopup } from "@/Components/MessagePopup";

export const UserInfos = () => {
  const api = useApi();
  const { language } = useContext(ZakatContext);

  const [formData, setFormData] = useState({ username: "", first_name: "", last_name: "", email: "", old_password: "", password: "" });
  const [error, setError] = useState({});
  const [popup, setPopup] = useState({ message: "", type: "" });
  const [activeTab, setActiveTab] = useState("account");
  const [isLoading, setIsLoading] = useState(false);

  const translate = (ar, fr, en) => {
    switch (language) {
      case "fr": return fr;
      case "en": return en;
      default: return ar;
    }
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const [data, status, error] = await api.get("/me/");
        if (error) throw new Error(translate("فشل تحميل معلومات المستخدم.", "Échec du chargement des informations utilisateur.", "Failed to load user information."));
        setFormData({ username: data.username, first_name: data.first_name, last_name: data.last_name, email: data.email, old_password: "", password: "" });
      } catch (err) {
        setPopup({ message: translate("حدث خطأ", "Une erreur est survenue", "An error occurred"), type: "error" });
      }
    };
    fetchUserInfo();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const payload = { ...formData };
    if (activeTab !== "password") {
      delete payload.password;
      delete payload.old_password;
    }

    try {
      const [data, status, error] = await api.patch("/user/update/", payload, { withCredentials: true });
      if (error) throw new Error(translate("حدث خطأ", "Une erreur est survenue", "An error occurred"));
      setPopup({ message: translate("تم تحديث البيانات بنجاح", "Les informations ont été mises à jour avec succès", "Data updated successfully"), type: "success" });
      setFormData(prev => ({ ...prev, password: "", old_password: "" }));
    } catch (err) {
      setPopup({ message: err.message, type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div dir={language === "ar" ? "rtl" : "ltr"} className="min-h-screen py-12 bg-gray-50">
      <div className="container mx-auto max-w-2xl">
        <h1 className="text-2xl font-bold mb-4">{translate("الملف الشخصي","Profil","Profile")}</h1>
        <div className="bg-white p-6 rounded shadow">
          <div className="flex gap-2 mb-6">
            <button onClick={() => setActiveTab("account")} className={`flex-1 py-2 rounded ${activeTab==="account" ? "bg-green-600 text-white" : "bg-gray-200"}`}>{translate("معلومات الحساب","Infos du compte","Account Info")}</button>
            <button onClick={() => setActiveTab("password")} className={`flex-1 py-2 rounded ${activeTab==="password" ? "bg-green-600 text-white" : "bg-gray-200"}`}>{translate("كلمة المرور","Mot de passe","Password")}</button>
          </div>

          <form onSubmit={handleSubmit}>
            {activeTab === "account" && (
              <>
                <div className="mb-4">
                  <label>{translate("اسم المستخدم","Nom d'utilisateur","Username")}</label>
                  <input name="username" value={formData.username} onChange={handleChange} className="w-full p-2 border rounded"/>
                </div>
                <div className="mb-4">
                  <label>{translate("البريد الإلكتروني","Email","Email")}</label>
                  <input name="email" value={formData.email} onChange={handleChange} className="w-full p-2 border rounded"/>
                </div>
              </>
            )}

            {activeTab === "password" && (
              <>
                <div className="mb-4">
                  <label>{translate("كلمة المرور القديمة","Ancien mot de passe","Old Password")}</label>
                  <input type="password" name="old_password" value={formData.old_password} onChange={handleChange} className="w-full p-2 border rounded"/>
                </div>
                <div className="mb-4">
                  <label>{translate("كلمة المرور الجديدة","Nouveau mot de passe","New Password")}</label>
                  <input type="password" name="password" value={formData.password} onChange={handleChange} className="w-full p-2 border rounded"/>
                </div>
              </>
            )}

            <button type="submit" className="w-full py-2 bg-green-600 text-white rounded">{isLoading ? translate("جاري التحديث...","Mise à jour...","Updating...") : translate("تحديث","Mettre à jour","Update")}</button>
          </form>
        </div>
      </div>

      <MessagePopup message={popup.message} type={popup.type} onClose={() => setPopup({ message: "", type: "" })}/>
    </div>
  );
};
