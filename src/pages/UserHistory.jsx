import React, { useState, useEffect, useContext } from "react";
import { useApi } from "@/ApiProvider";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";
import { Loader } from "../Components/Loader";
import { MessagePopup } from "@/Components/MessagePopup";
import { ConfirmDialog } from "@/Components/ConfirmDialog";
import { ZakatContext } from "@/Components/ZakatProvider";
import { Link } from "react-router-dom";

const UserHistory = () => {
  const api = useApi();
  const { setPopup, popup, language } = useContext(ZakatContext);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

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

  const getUserIdFromToken = async () => {
    try {
      const [data, status, error] = await api.get("/me/");
      if (error) throw new Error(
        translate(
          "فشل تحميل معلومات المستخدم.",
          "Échec du chargement des informations utilisateur.",
          "Failed to load user information."
        )
      );

      const userData = await data;
      return userData.id;
    } catch (err) {
      setPopup({
        message: translate(
          "حدث خطأ أثناء جلب بيانات المستخدم",
          "Une erreur est survenue lors de la récupération des informations utilisateur",
          "Error fetching user data"
        ),
        type: "error",
      });
      return null;
    }
  };

  const fetchHistory = async (page = 1) => {
    const userId = await getUserIdFromToken();
    if (!userId) {
      setError(
        translate(
          "المستخدم غير مصادق عليه",
          "Utilisateur non authentifié",
          "User not authenticated"
        )
      );
      return;
    }

    setLoading(true);
    setError(null);

    const [data, status, error] = await api.get(
      `/get-zakat-history/${userId}/`,
      { page }
    );

    if (!error && status === 200) {
      if (data.message && !data.results) {
        setHistory([]);
        setError(null);
        setTotalPages(1);
      } else {
        setHistory(data.results || []);
        setTotalPages(Math.ceil((data.count || 1) / 10));
        setError(null);
      }
    } else {
      setError(
        error ||
          data?.detail ||
          translate(
            "فشل في جلب البيانات",
            "Échec de récupération des données",
            "Failed to fetch data"
          )
      );
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
      const [data, status, error] = await api.delete(
        `/delete-zakat-history/${deleteId}/`
      );
      if (error || !(status >= 200 && status < 300)) {
        setPopup({
          message:
            error ||
            data?.detail ||
            translate(
              "فشل في حذف السجل",
              "Échec de la suppression du record",
              "Failed to delete record"
            ),
          type: "error",
        });
      } else {
        setPopup({
          message: translate(
            "تم حذف السجل بنجاح",
            "Record supprimé avec succès",
            "Record deleted successfully"
          ),
          type: "success",
        });
        fetchHistory();
      }
    } catch (err) {
      setPopup({
        message:
          err.message ||
          translate(
            "خطأ في حذف السجل",
            "Erreur lors de la suppression du record",
            "Error deleting record"
          ),
        type: "error",
      });
    }
  };

  useEffect(() => {
    fetchHistory(currentPage);
  }, [currentPage]);

  const EmptyState = () => (
    <div className="text-center py-8 md:py-12 px-4">
      <div className="w-16 h-16 md:w-24 md:h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
        <svg
          className="w-8 h-8 md:w-12 md:h-12 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      </div>
      <h3 className="text-base md:text-lg font-medium text-gray-900 mb-2">
        {translate("لا يوجد سجل للزكاة", "Aucun historique de Zakat", "No Zakat history")}
      </h3>
      <p className="text-sm md:text-base text-gray-500">
        {translate(
          "لم يتم العثور على أي حسابات زكاة سابقة",
          "Aucun calcul de Zakat trouvé",
          "No previous Zakat calculations found"
        )}
      </p>
    </div>
  );

  const ErrorState = () => (
    <div className="text-center py-8 md:py-12 px-4">
      <div className="w-16 h-16 md:w-24 md:h-24 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
        <svg
          className="w-8 h-8 md:w-12 md:h-12 text-red-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <h3 className="text-base md:text-lg font-medium text-red-900 mb-2">
        {translate("حدث خطأ", "Une erreur est survenue", "An error occurred")}
      </h3>
      <p className="text-sm md:text-base text-red-600">{error}</p>
    </div>
  );

  return (
    <>
      <div dir={language === "ar" ? "rtl" : "ltr"} className="min-h-screen bg-gray-100">
        <div className="container mx-auto px-3 sm:px-4 md:px-6 py-6 md:py-8 mt-12 md:mt-15">
          {/* Header */}
          <div className="mb-6 md:mb-8 flex flex-col-reverse sm:flex-row sm:justify-between sm:items-start gap-4">
            <Link
              to="/zakat-corps-history"
              className="text-xs sm:text-sm px-3 sm:px-4 py-2 bg-green4 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-200 hover:scale-105 whitespace-nowrap text-center"
            >
              {translate("سجل المحاصيل", "Historique des cultures", "Crops history")}
            </Link>
            <div className="text-right">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                {translate("تاريخ الزكاة", "Historique de la Zakat", "Zakat History")}
              </h1>
              <p className="text-xs sm:text-sm md:text-base text-gray-600">
                {translate(
                  "عرض سجل جميع حسابات الزكاة السابقة",
                  "Afficher l'historique de tous les calculs de Zakat",
                  "View history of all previous Zakat calculations"
                )}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {loading ? (
              <div className="py-8 md:py-12">
                <Loader />
              </div>
            ) : error ? (
              <EmptyState />
            ) : (
              <>
                {/* Desktop Table */}
                <div className="hidden md:block overflow-x-auto">
                  <Table className="w-full">
                    <TableHeader>
                      <TableRow className="bg-green4 hover:bg-green4">
                        <TableHead className="text-center font-semibold text-white py-3 px-4 text-sm">
                          {translate("التاريخ", "Date", "Date")}
                        </TableHead>
                        <TableHead className="text-center font-semibold text-white py-3 px-4 text-sm">
                          {translate("الوعاء الزكوي", "Base Zakat", "Zakat Base")}
                        </TableHead>
                        <TableHead className="text-center font-semibold text-white py-3 px-4 text-sm">
                          {translate("قيمة الزكاة", "Montant Zakat", "Zakat Amount")}
                        </TableHead>
                        <TableHead className="text-center font-semibold text-white py-3 px-4 text-sm">
                          {translate("حذف", "Supprimer", "Delete")}
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {history.map((item) => (
                        <TableRow
                          key={item.id}
                          className="text-center hover:bg-gray-50 transition-colors border-b border-gray-100"
                        >
                          <TableCell className="font-medium py-4 text-sm">
                            {new Date(item.calculation_date).toLocaleDateString("fr-FR")}
                          </TableCell>
                          <TableCell className="py-4 text-sm">
                            <span className="font-semibold text-green-600">
                              {item.zakat_base.toLocaleString("fr-FR")} د.ج
                            </span>
                          </TableCell>
                          <TableCell className="py-4 text-sm">
                            <span className="font-semibold text-blue-600">
                              {item.zakat_result.toLocaleString("fr-FR")} د.ج
                            </span>
                          </TableCell>
                          <TableCell className="py-4">
                            <button
                              onClick={() => handleDeleteClick(item.id)}
                              className="px-3 py-1 bg-green3 text-white rounded text-sm hover:bg-red-600 transition-colors"
                            >
                              {translate("حذف", "Supprimer", "Delete")}
                            </button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <ConfirmDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={handleDelete}
        title={translate("تأكيد الحذف","Confirmation de suppression","Confirm Deletion")}
        message={translate(
          "هل أنت متأكد أنك تريد حذف هذا السجل؟ لا يمكن التراجع عن هذا الإجراء.",
          "Êtes-vous sûr de vouloir supprimer cet enregistrement ? Cette action est irréversible.",
          "Are you sure you want to delete this record? This action cannot be undone."
        )}
        confirmText={translate("حذف","Supprimer","Delete")}
        cancelText={translate("إلغاء","Annuler","Cancel")}
      />

      <MessagePopup
        message={popup.message}
        type={popup.type}
        onClose={() => setPopup({ message: "", type: "" })}
      />
    </>
  );
};

export default UserHistory;
