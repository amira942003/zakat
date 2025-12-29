import React, { useEffect, useState } from "react";
import { MessagePopup } from "@/Components/MessagePopup";
import { useApi } from "@/ApiProvider";
import { useLanguage } from "@/Components/LanguageProvider";

export const UserInfos = () => {
  const api = useApi();
  const { language, t } = useLanguage();
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

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const [data, status, error] = await api.get("/me/");
        if (error) throw new Error(t("ui.failedToLoadUserInfo"));
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
        setPopup({ message: t("ui.errorOccurred"), type: "error" });
      }
    };
    fetchUserInfo();
  }, [api, t]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = (values) => {
    const errors = {};
    if (!values.password.trim()) {
      errors.password = t("ui.newPasswordRequired");
    }
    if (!values.old_password.trim()) {
      errors.old_password = t("ui.oldPasswordRequired");
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
      setPopup({ message: t("ui.pleaseEnterNewPassword"), type: "error" });
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
          setPopup({ message: data || t("ui.errorOccurred"), type: "error" });
        }
        setIsLoading(false);
        return;
      }
      setPopup({ message: t("ui.dataUpdatedSuccessfully"), type: "success" });
      setFormData((prev) => ({ ...prev, password: "", old_password: "" }));
    } catch (err) {
      console.error("Error updating user:", err);
      setPopup({ message: t("ui.errorOccurred"), type: "error" });
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
            <h1 className="text-2xl font-bold text-gray-800 mb-4">{t("ui.profile")}</h1>
            <p className="text-gray-600 text-lg">{t("ui.managePersonalInfo")}</p>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Tab Headers */}
            <div className="bg-green4">
              <div className="flex rounded-xl bg-white/10 p-1">
                <button onClick={() => setActiveTab("account")}
                  className={`flex-1 py-2 px-4 mx-2 rounded-lg text-center text-[0.8em] font-semibold transition-all duration-200 ${activeTab === "account" ? "bg-white text-green3 shadow-lg" : "text-white hover:bg-white/20"}`}>
                  {t("ui.accountInfo")}
                </button>
                <button onClick={() => setActiveTab("password")}
                  className={`flex-1 py-2 px-4 rounded-lg text-center text-[0.8em] font-semibold transition-all duration-200 ${activeTab === "password" ? "bg-white text-green3 shadow-lg" : "text-white hover:bg-white/20"}`}>
                  {t("ui.password")}
                </button>
              </div>
            </div>

            {/* Tab Content */}
            <div className="p-8">
              {/* Account Tab */}
              {activeTab === "account" && (
                <div className="space-y-6">
                  <div className="mb-4">
                    <h2 className="text-xl font-bold text-gray-800 mb-2">{t("ui.accountInfo")}</h2>
                    <p className="text-gray-600">{t("ui.updateAccountInfo")}</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="custom-form-label mb-2">{t("ui.username")}</label>
                      <input type="text" name="username" value={formData.username} onChange={handleChange} className="w-full px-4 py-3 custom-input" placeholder={t("ui.enterUsername")} />
                    </div>

                    <div>
                      <label className="custom-form-label mb-2">{t("ui.email")}</label>
                      <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 custom-input" placeholder={t("ui.enterEmail")} />
                    </div>

                    <div>
                      <label className="custom-form-label mb-2">{t("ui.firstName")}</label>
                      <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} className="w-full px-4 py-3 custom-input" placeholder={t("ui.enterFirstName")} />
                    </div>

                    <div>
                      <label className="custom-form-label mb-2">{t("ui.lastName")}</label>
                      <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} className="w-full px-4 py-3 custom-input" placeholder={t("ui.enterLastName")} />
                    </div>
                  </div>

                  <div className="pt-6 border-t text-center border-gray-200">
                    <button onClick={handleSubmit} className="w-1/2 custom-button py-2 rounded-sm">
                      {isLoading ? t("ui.updating") : t("ui.updateInfo")}
                    </button>
                  </div>
                </div>
              )}

              {/* Password Tab */}
              {activeTab === "password" && (
                <div className="space-y-6">
                  <div className="mb-4">
                    <h2 className="text-xl font-bold text-gray-800 mb-2">{t("ui.changePassword")}</h2>
                    <p className="text-gray-600">{t("ui.enterOldNewPassword")}</p>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="custom-form-label mb-2">{t("ui.currentPassword")}</label>
                      <input required type="password" name="old_password" value={formData.old_password} onChange={handleChange} className="w-full px-4 py-3 custom-input" placeholder={t("ui.enterCurrentPassword")} />
                      {error.old_password && <p className="text-red-500 text-sm mt-2">{error.old_password}</p>}
                    </div>

                    <div>
                      <label className="custom-form-label mb-2">{t("ui.newPassword")}</label>
                      <input required type="password" name="password" value={formData.password} onChange={handleChange} className="w-full px-4 py-3 custom-input" placeholder={t("ui.enterNewPassword")} />
                      {error.password && <p className="text-red-500 text-sm mt-2">{error.password}</p>}
                    </div>
                  </div>

                  <div className="pt-6 border-t text-center border-gray-200">
                    <button onClick={handleSubmit} className="w-1/2 custom-button py-2 rounded-sm">
                      {isLoading ? t("ui.updating") : t("ui.updatePassword")}
                    </button>
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
