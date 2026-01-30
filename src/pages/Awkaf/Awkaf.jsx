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
    addedSuccess: "تمت إضافة المشروع بنجاح",
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
    addedSuccess: "Projet ajouté avec succès",
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
    addedSuccess: "Project added successfully",
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
  const [isLoading, setIsLoading] = useState(false);

  // Form
  const [showForm, setShowForm] = useState(false);
  const [projectName, setProjectName] = useState("");

  useEffect(() => {
    fetchProjects(page, pageSize);
  }, [page]);

  const fetchProjects = async () => {
    try {
      setIsLoading(true);
      const [data] = await api.get("/list/waqf-projects/");
      if (Array.isArray(data)) {
        setProjects(data);
        setTotalPages(Math.ceil(data.length / pageSize));
      }
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ SAVE PROJECT (LOCAL)
  const handleSaveProject = () => {
    if (!projectName.trim()) return;

    const newProject = {
      id: Date.now(), // ID temporaire
      title: projectName,
      name: projectName,
    };

    setProjects((prev) => [newProject, ...prev]);
    setTotalPages((prev) => Math.ceil((projects.length + 1) / pageSize));

    setPopup({
      message: t.addedSuccess,
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

          {/* Add Project */}
          <div className="text-center mb-6">
            <button
              onClick={() => setShowForm(true)}
              className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              {t.addProject}
            </button>
          </div>

          {/* FORM */}
          {showForm && (
            <div className="bg-white p-6 rounded shadow max-w-md mx-auto mb-6">
              <label className="block text-right mb-2 font-semibold">
                {t.projectName}
              </label>
              <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className="w-full border px-3 py-2 rounded mb-4"
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

          {/* Projects */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {projects.map((project) => (
              <Project key={project.id} project={project} />
            ))}
          </div>
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
