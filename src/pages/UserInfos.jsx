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
        const [data, status, err] = await api.get("/me/");
        if (err) throw new Error(t("forms.errors.load_user_info"));
        setFormData({
          username: data.username || "",
          first_name: data.first_name || "",
          last_name: data.last_name || "",
          email: data.email || "",
          old_password: "",
          password: "",
        });
      } catch (err) {
        setPopup({ message: t("forms.errors.fetch_error"), type: "error" });
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
      errors.password = t("forms.errors.new_password_required");
    }
    if (!values.old_password.trim()) {
      errors.old_password = t("forms.errors.old_password_required");
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
      setPopup({ message: t("forms.errors.enter_new_password"), type: "error" });
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
      const [data, status, err] = await api.patch("/user/update/", payload, { withCredentials: true });
      if (err || status !== 200) {
        setPopup({ message: Object.values(data || {})[0] || t("forms.errors.generic_error"), type: "error" });
        setIsLoading(false);
        return;
      }
      setPopup({ message: t("forms.success.data_updated"), type: "success" });
      setFormData((prev) => ({ ...prev, password: "", old_password: "" }));
    } catch (err) {
      setPopup({ message: t("forms.errors.generic_error"), type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen my-8 bg-gradient-to-br from-gray-50 to-emerald-50 py-12">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto" dir={language === "ar" ? "rtl" : "ltr"}>
          <div className="text-center mb-4">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">{t("ui.profile.title")}</h1>
            <p className="text-gray-600 text-lg">{t("ui.profile.subtitle")}</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-green4">
              <div className="flex rounded-xl bg-white/10 p-1">
                <button onClick={() => setActiveTab("account")}
                  className={`flex-1 py-2 px-4 mx-2 rounded-lg text-center text-[0.8em] font-semibold transition-all duration-200 ${activeTab === "account" ? "bg-white text-green3 shadow-lg" : "text-white hover:bg-white/20"}`}>
                  {t("forms.tabs.account_info")}
                </button>
                <button onClick={() => setActiveTab("password")}
                  className={`flex-1 py-2 px-4 rounded-lg text-center text-[0.8em] font-semibold transition-all duration-200 ${activeTab === "password" ? "bg-white text-green3 shadow-lg" : "text-white hover:bg-white/20"}`}>
                  {t("forms.tabs.password")}
                </button>
              </div>
            </div>

            <div className="p-8">
              {activeTab === "account" && (
                <div className="space-y-6">
                  {/* Account form inputs */}
                  {/* ... similaire à ton code existant ... */}
                  <div className="pt-6 border-t text-center border-gray-200">
                    <button onClick={handleSubmit} className="w-1/2 custom-button py-2 rounded-sm">
                      {isLoading ? t("forms.loading.updating") : t("forms.buttons.update_info")}
                    </button>
                  </div>
                </div>
              )}
              {activeTab === "password" && (
                <div className="space-y-6">
                  {/* Password form inputs */}
                  {/* ... similaire à ton code existant ... */}
                  <div className="pt-6 border-t text-center border-gray-200">
                    <button onClick={handleSubmit} className="w-1/2 custom-button py-2 rounded-sm">
                      {isLoading ? t("forms.loading.updating") : t("forms.buttons.update_password")}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <MessagePopup message={popup.message} type={popup.type} onClose={() => setPopup({ message: "", type: "" })} />
    </div>
  );
};
