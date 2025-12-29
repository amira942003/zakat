import React, { useEffect, useState } from "react";
import { useApi } from "@/ApiProvider";
import { useLanguage } from "@/Components/LanguageProvider";
import { Calendar, FileText, TrendingUp } from "lucide-react";

const UserHistory = () => {
  const api = useApi();
  const { language, t } = useLanguage();
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const [data, status, error] = await api.get("/zakat/history/");
        if (!error && status === 200) {
          setHistory(data);
        }
      } catch (err) {
        console.error("Error fetching history:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchHistory();
  }, [api]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === "ar" ? "ar-DZ" : language === "fr" ? "fr-FR" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat(language === "ar" ? "ar-DZ" : language === "fr" ? "fr-FR" : "en-US", {
      style: "currency",
      currency: "DZD",
    }).format(amount);
  };

  return (
    <div className="min-h-screen my-8 bg-gradient-to-br from-gray-50 to-emerald-50 py-12">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto" dir={language === "ar" ? "rtl" : "ltr"}>
          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">{t("ui.zakatHistory")}</h1>
            <p className="text-gray-600 text-lg">{t("ui.viewZakatHistory")}</p>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-600"></div>
              <p className="ml-4 text-gray-600 text-lg">{t("ui.loading")}</p>
            </div>
          )}

          {/* Empty State */}
          {!isLoading && history.length === 0 && (
            <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileText className="w-12 h-12 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">{t("ui.noHistoryFound")}</h2>
              <p className="text-gray-600 text-lg">{t("ui.noCalculationsYet")}</p>
            </div>
          )}

          {/* History List */}
          {!isLoading && history.length > 0 && (
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-green4 text-white">
                    <tr>
                      <th className="px-6 py-4 text-right text-sm font-semibold">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-5 h-5" />
                          {t("ui.date")}
                        </div>
                      </th>
                      <th className="px-6 py-4 text-right text-sm font-semibold">{t("ui.method")}</th>
                      <th className="px-6 py-4 text-right text-sm font-semibold">{t("ui.companyTypeLabel")}</th>
                      <th className="px-6 py-4 text-right text-sm font-semibold">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="w-5 h-5" />
                          {t("ui.zakatAmount")}
                        </div>
                      </th>
                      <th className="px-6 py-4 text-right text-sm font-semibold">{t("ui.details")}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {history.map((item, index) => (
                      <tr key={index} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 text-gray-800">{formatDate(item.date)}</td>
                        <td className="px-6 py-4 text-gray-800">{item.method}</td>
                        <td className="px-6 py-4 text-gray-800">{item.company_type}</td>
                        <td className="px-6 py-4">
                          <span className="font-bold text-green-600">{formatAmount(item.zakat_amount)}</span>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => setSelectedItem(item)}
                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                          >
                            {t("ui.details")}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Details Modal */}
          {selectedItem && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="bg-green4 text-white px-6 py-4 flex justify-between items-center sticky top-0">
                  <h3 className="text-xl font-bold">{t("ui.calculationDetails")}</h3>
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="text-white hover:text-gray-200 transition-colors text-2xl"
                  >
                    ×
                  </button>
                </div>
                
                <div className="p-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-600 text-sm mb-1">{t("ui.date")}</p>
                      <p className="font-semibold text-gray-800">{formatDate(selectedItem.date)}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-600 text-sm mb-1">{t("ui.method")}</p>
                      <p className="font-semibold text-gray-800">{selectedItem.method}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-600 text-sm mb-1">{t("ui.companyTypeLabel")}</p>
                      <p className="font-semibold text-gray-800">{selectedItem.company_type}</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="text-gray-600 text-sm mb-1">{t("ui.zakatAmount")}</p>
                      <p className="font-bold text-green-600 text-lg">{formatAmount(selectedItem.zakat_amount)}</p>
                    </div>
                  </div>

                  {selectedItem.details && (
                    <div className="bg-gray-50 p-4 rounded-lg mt-4">
                      <p className="text-gray-600 text-sm mb-2 font-semibold">{t("ui.additionalField")}:</p>
                      <pre className="text-sm text-gray-800 whitespace-pre-wrap">
                        {JSON.stringify(selectedItem.details, null, 2)}
                      </pre>
                    </div>
                  )}
                </div>

                <div className="px-6 py-4 bg-gray-50 sticky bottom-0">
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                  >
                    {t("ui.close")}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserHistory;
