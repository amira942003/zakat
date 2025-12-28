import React, { useEffect, useState } from "react";
import { useApi } from "@/ApiProvider";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";
import { Loader } from "@/Components/Loader";
import { MessagePopup } from "@/Components/MessagePopup";
import { ConfirmDialog } from "@/Components/ConfirmDialog";
import { Link } from "react-router-dom";
import { useLanguage } from "@/Components/LanguageProvider";

const UserHistory = () => {
  const api = useApi();
  const { language, t } = useLanguage();

  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [popup, setPopup] = useState({ message: "", type: "" });
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const getUserIdFromToken = async () => {
    try {
      const [data, status, error] = await api.get("/me/");
      if (error) throw new Error(t("forms.errors.load_user_info"));
      return data.id;
    } catch (err) {
      setPopup({ message: t("forms.errors.fetch_error"), type: "error" });
      return null;
    }
  };

  const fetchHistory = async (page = 1) => {
    const userId = await getUserIdFromToken();
    if (!userId) {
      setError(t("forms.errors.user_not_authenticated"));
      return;
    }

    setLoading(true);
    setError(null);

    const [data, status, error] = await api.get(`/get-zakat-history/${userId}/`, { page });

    if (!error && status === 200) {
      setHistory(data.results || []);
      setTotalPages(Math.ceil((data.count || 1) / 10));
    } else {
      setError(error || data?.detail || t("forms.errors.fetch_data"));
      setHistory([]);
    }
    setLoading(false);
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowDeleteDialog(true);
  };

  const handleDelete = async () => {
    try {
      const [data, status, error] = await api.delete(`/delete-zakat-history/${deleteId}/`);
      if (error || !(status >= 200 && status < 300)) {
        setPopup({ message: error || data?.detail || t("forms.errors.delete_record"), type: "error" });
      } else {
        setPopup({ message: t("forms.success.record_deleted"), type: "success" });
        fetchHistory();
      }
    } catch (err) {
      setPopup({ message: t("forms.errors.delete_record"), type: "error" });
    }
  };

  useEffect(() => {
    fetchHistory(currentPage);
  }, [currentPage]);

  return (
    <>
      <div dir={language === "ar" ? "rtl" : "ltr"} className="min-h-screen bg-gray-100">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6 flex justify-between items-center">
            <h1 className="text-2xl font-bold">{t("ui.user_history.title")}</h1>
            <Link to="/zakat-corps-history" className="px-4 py-2 bg-green-600 text-white rounded">{t("ui.user_history.crops_history")}</Link>
          </div>

          {loading ? <Loader /> : error ? <div className="text-center text-red-600">{error}</div> :
            history.length === 0 ? <div className="text-center text-gray-600">{t("ui.user_history.no_history")}</div> :
              <div className="overflow-x-auto">
                <Table className="w-full">
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t("ui.user_history.date")}</TableHead>
                      <TableHead>{t("ui.user_history.zakat_base")}</TableHead>
                      <TableHead>{t("ui.user_history.zakat_amount")}</TableHead>
                      <TableHead>{t("ui.user_history.delete")}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {history.map(item => (
                      <TableRow key={item.id}>
                        <TableCell>{new Date(item.calculation_date).toLocaleDateString("fr-FR")}</TableCell>
                        <TableCell>{item.zakat_base.toLocaleString("fr-FR")} د.ج</TableCell>
                        <TableCell>{item.zakat_result.toLocaleString("fr-FR")} د.ج</TableCell>
                        <TableCell>
                          <button onClick={() => handleDeleteClick(item.id)} className="px-2 py-1 bg-red-600 text-white rounded">{t("forms.buttons.delete")}</button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
          }
        </div>
      </div>

      <ConfirmDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={handleDelete}
        title={t("forms.confirm.delete_title")}
        message={t("forms.confirm.delete_message")}
        confirmText={t("forms.buttons.delete")}
        cancelText={t("forms.buttons.cancel")}
      />

      <MessagePopup message={popup.message} type={popup.type} onClose={() => setPopup({ message: "", type: "" })} />
    </>
  );
};

export default UserHistory;
