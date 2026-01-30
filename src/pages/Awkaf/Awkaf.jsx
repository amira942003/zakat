import { useState, useEffect } from "react";
import { Loader } from "../../Components/Loader";
import Project from "../../Components/Project";
import { useApi } from "@/ApiProvider";
import { useLanguage } from "../../Components/LanguageProvider";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/Components/ui/pagination";

import { MessagePopup } from "@/Components/MessagePopup";
import { AlertCircle } from "lucide-react";

// -------------------- Traductions --------------------
const translations = {
  ar: {
    title: "مشاريع الوقف",
    subtitle: "استثمر في الأجر الجاري وساهم في بناء مستقبل أفضل للأجيال القادمة",
    loading: "جارٍ تحميل المشاريع...",
    errorTitle: "حدث خطأ",
    errorRetry: "حاول مجددا",
    emptyTitle: "لا توجد مشاريع متاحة",
    emptyDesc: "عذراً، لم نتمكن من العثور على أي مشاريع وقف في الوقت الحالي",
    refreshButton: "تحديث الصفحة",
    addProject: "إضافة مشروع الوقف",
    projectName: "اسم المشروع",
    save: "حفظ",
    cancel: "إلغاء",
  },
  fr: {
    title: "Projets Awqaf",
    subtitle:
      "Investissez dans les bonnes œuvres continues et contribuez à construire un meilleur avenir pour les générations futures",
    loading: "Chargement des projets...",
    errorTitle: "Une erreur est survenue",
    errorRetry: "Réessayer",
    emptyTitle: "Aucun projet disponible",
    emptyDesc:
      "Désolé, nous n'avons trouvé aucun projet de waqf pour le moment",
    refreshButton: "Actualiser la page",
    addProject: "Ajouter un projet de waqf",
    projectName: "Nom du projet",
    save: "Enregistrer",
    cancel: "Annuler",
  },
  en: {
    title: "Awqaf Projects",
    subtitle:
      "Invest in ongoing charity and help build a better future for the next generations",
    loading: "Loading projects...",
    errorTitle: "An error occurred",
    errorRetry: "Retry",
    emptyTitle: "No projects available",
    emptyDesc:
      "Sorry, we couldn't find any waqf projects at the moment",
    refreshButton: "Refresh Page",
    addProject: "Add Waqf Project",
    projectName: "Project name",
    save: "Save",
    cancel: "Cancel",
  },
};

export default function Awkaf() {
  const api = useApi();
  const { language } = useLanguage();
  const t = translations[language];

  const [projects, setProjects] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(8);
  const [totalPages, setTotalPages] = useState(1);
  const [popup, setPopup] = useState({ message: "", type: "" });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // 🔥 NEW STATES
  const [showForm, setShowForm] = useState(false);
  const [projectName, setProjectName] = useState("");

  useEffect(() => {
    fetchProjects(page, pageSize);
  }, [page]);

  useEffect(() => {
    fetchTotalPages();
  }, []);

  const fetchTotalPages = async () => {
    try {
      const [data, , err] = await api.get("/list/waqf-projects/");
      if (err || !Array.isArray(data)) return;
      setTotalPages(Math.ceil(data.length / pageSize));
    } catch {}
  };

  const fetchProjects = async (pageNumber, pageSize) => {
    try {
      setIsLoading(true);
      const [data, , err] = await api.get("/list/waqf-projects/", {
        page: pageNumber,
        page_size: pageSize,
      });
      if (!err && Array.isArray(data)) setProjects(data);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveProject = () => {
    if (!projectName.trim()) return;

    // Pour l’instant UI seulement
    setPopup({
      message: `${t.projectName} : ${projectName}`,
      type: "success",
    });

    setProjectName("");
    setShowForm(false);
  };

  return (
    <>
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-700 text-white py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">{t.title}</h1>
          <p className="opacity-90">{t.subtitle}</p>
        </div>
      </div>

      <div className="bg-gray-300 py-8">
        <div className="container mx-auto px-4">

          {/* Empty */}
          {!isLoading && projects.length === 0 && (
            <div className="text-center py-12">
              <AlertCircle className="w-16 h-16 mx-auto opacity-40 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{t.emptyTitle}</h3>
              <p className="mb-6">{t.emptyDesc}</p>

              <div className="flex flex-col items-center gap-4">

                {/* Add Project Button */}
                <button
                  onClick={() => setShowForm(true)}
  className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                >
                  {t.addProject}
                </button>

                {/* FORM */}
                {showForm && (
                  <div className="bg-white p-6 rounded shadow w-full max-w-md">
                    <label className="block text-right mb-2 font-semibold">
                      {t.projectName}
                    </label>
                    <input
                      type="text"
                      value={projectName}
                      onChange={(e) => setProjectName(e.target.value)}
                      className="w-full border px-3 py-2 rounded mb-4"
                      placeholder={t.projectName}
                    />

                    <div className="flex justify-end gap-3">
                      <button
                        onClick={() => setShowForm(false)}
                        className="px-4 py-2 bg-gray-400 text-white rounded"
                      >
                        {t.cancel}
                      </button>
                      <button
                        onClick={handleSaveProject}
                        className="px-4 py-2 bg-green-600 text-white rounded"
                      >
                        {t.save}
                      </button>
                    </div>
                  </div>
                )}

                {/* Refresh */}
                <button
                  onClick={() => fetchTotalPages()}
                  className="px-6 py-2 bg-green-600 text-white rounded"
                >
                  {t.refreshButton}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <MessagePopup
        message={popup.message}
        type={popup.type}
        onClose={() => setPopup({ message: "", type: "" })}
      />
    </>
  );
}
