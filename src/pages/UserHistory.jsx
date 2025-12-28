import React, { useState, useEffect, useContext } from "react";
import { useApi } from "@/ApiProvider";
import { ZakatContext } from "@/Components/ZakatProvider";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";
import { Loader } from "@/Components/Loader";
import { MessagePopup } from "@/Components/MessagePopup";
import { ConfirmDialog } from "@/Components/ConfirmDialog";
import { Link } from "react-router-dom";

const UserHistory = () => {
  const api = useApi();
  const { popup, setPopup, language } = useContext(ZakatContext);

  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const translate = (ar, fr, en) => {
    switch (language) {
      case "fr": return fr;
      case "en": return en;
      default: return ar;
    }
  };

  const getUserIdFromToken = async () => {
    try {
      const [data, status, error] = await api.get("/me/");
      if (error) throw new Error(translate("فشل تحميل معلومات المستخدم.", "Échec du chargement des informations utilisateur.", "Failed to load user information."));
      return data.id;
    } catch (err) {
      setPopup({ message: translate("حدث خطأ أثناء جلب بيانات المستخدم", "Une erreur est survenue lors de la récupération des informations utilisateur", "Error fetching user data"), type: "error" });
      return null;
    }
  };

  const fetchHistory = async (page = 1) => {
    const userId = await getUserIdFromToken();
    if (!userId) {
      setError(translate("المستخدم غير مصادق عليه", "Utilisateur non authentifié", "User not authenticated"));
      return;
    }

    setLoading(true);
    setError(null);

    const [data, status, error] = await api.get(`/get-zakat-history/${userId}/`, { page });

    if (!error && status === 200) {
      setHistory(data.results || []);
      setTotalPages(Math.ceil((data.count || 1) / 10));
    } else {
      setError(error || data?.detail || translate("فشل في جلب البيانات", "Échec de récupération des données", "Failed to fetch data"));
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
        setPopup({ message: error || data?.detail || translate("فشل في حذف السجل", "Échec de la suppression du record", "Failed to delete record"), type: "error" });
      } else {
        setPopup({ message: translate("تم حذف السجل بنجاح", "Record supprimé avec succès", "Record deleted successfully"), type: "success" });
        fetchHistory();
      }
    } catch (err) {
      setPopup({ message: translate("خطأ في حذف السجل", "Erreur lors de la suppression du record", "Error deleting record"), type: "error" });
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
            <h1 className="text-2xl font-bold">{translate("تاريخ الزكاة", "Historique de la Zakat", "Zakat History")}</h1>
            <Link to="/zakat-corps-history" className="px-4 py-2 bg-green-600 text-white rounded">{translate("سجل المحاصيل", "Historique des cultures", "Crops history")}</Link>
          </div>

          {loading ? (
            <Loader />
          ) : error ? (
            <div className="text-center text-red-600">{error}</div>
          ) : history.length === 0 ? (
            <div className="text-center text-gray-600">{translate("لا يوجد سجل للزكاة", "Aucun historique de Zakat", "No Zakat history")}</div>
          ) : (
            <div className="overflow-x-auto">
              <Table className="w-full">
                <TableHeader>
                  <TableRow>
                    <TableHead>{translate("التاريخ","Date","Date")}</TableHead>
                    <TableHead>{translate("الوعاء الزكوي","Base Zakat","Zakat Base")}</TableHead>
                    <TableHead>{translate("قيمة الزكاة","Montant Zakat","Zakat Amount")}</TableHead>
                    <TableHead>{translate("حذف","Supprimer","Delete")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {history.map(item => (
                    <TableRow key={item.id}>
                      <TableCell>{new Date(item.calculation_date).toLocaleDateString("fr-FR")}</TableCell>
                      <TableCell>{item.zakat_base.toLocaleString("fr-FR")} د.ج</TableCell>
                      <TableCell>{item.zakat_result.toLocaleString("fr-FR")} د.ج</TableCell>
                      <TableCell>
                        <button onClick={() => handleDeleteClick(item.id)} className="px-2 py-1 bg-red-600 text-white rounded">{translate("حذف","Supprimer","Delete")}</button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </div>

      <ConfirmDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={handleDelete}
        title={translate("تأكيد الحذف","Confirmation de suppression","Confirm Deletion")}
        message={translate("هل أنت متأكد أنك تريد حذف هذا السجل؟ لا يمكن التراجع عن هذا الإجراء.","Êtes-vous sûr de vouloir supprimer cet enregistrement ? Cette action est irréversible.","Are you sure you want to delete this record? This action cannot be undone.")}
        confirmText={translate("حذف","Supprimer","Delete")}
        cancelText={translate("إلغاء","Annuler","Cancel")}
      />

      <MessagePopup message={popup.message} type={popup.type} onClose={() => setPopup({ message: "", type: "" })} />
    </>
  );
};

export default UserHistory;
