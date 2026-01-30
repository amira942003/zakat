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

  useEffect(() => {
    fetchProjects(page, pageSize);
  }, [page]);

  useEffect(() => {
    fetchTotalPages();
  }, []);

  const fetchTotalPages = async () => {
    try {
      const [data, status, err] = await api.get("/list/waqf-projects/");

      if (err || !Array.isArray(data)) {
        setError(t.errorTitle);
        setTotalPages(1);
        return;
      }

      setTotalPages(Math.ceil(data.length / pageSize));
      setError(null);
    } catch (e) {
      console.error(e);
      setError(t.errorTitle);
      setTotalPages(1);
    }
  };

  const fetchProjects = async (pageNumber, pageSize) => {
    try {
      setIsLoading(true);
      const [data, status, err] = await api.get("/list/waqf-projects/", {
        page: pageNumber,
        page_size: pageSize,
      });

      if (err || !Array.isArray(data)) {
        setError(t.errorTitle);
        setProjects([]);
        return;
      }

      setProjects(data);
      setError(null);
    } catch (e) {
      console.error(e);
      setError(t.errorTitle);
      setProjects([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-700 text-white py-16 mt-15 max-sm:py-8">
        <div className="mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 max-sm:text-2xl">
            {t.title}
          </h1>
          <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto max-sm:text-sm">
            {t.subtitle}
          </p>
        </div>
      </div>

      <div className="bg-gray-300 py-6">
        <div className="container mx-auto px-4">

          {/* Error */}
          {error && (
            <div className="mb-8 p-6 bg-red-50 border border-red-200 rounded-lg flex items-start gap-4">
              <AlertCircle className="w-6 h-6 text-red-600 mt-0.5" />
              <div>
                <h3 className="text-red-800 font-semibold mb-1">
                  {t.errorTitle}
                </h3>
                <p className="text-red-700">{error}</p>
                <button
                  onClick={() => {
                    setError(null);
                    setPage(1);
                    fetchTotalPages();
                  }}
                  className="mt-3 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                >
                  {t.errorRetry}
                </button>
              </div>
            </div>
          )}

          {/* Loading */}
          {isLoading && !error && (
            <div className="flex justify-center py-12">
              <Loader />
            </div>
          )}

          {/* Empty */}
          {!isLoading && !error && projects.length === 0 && (
            <div className="text-center py-12">
              <AlertCircle className="w-16 h-16 mx-auto opacity-40 text-gray-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                {t.emptyTitle}
              </h3>
              <p className="text-gray-600 mb-6">{t.emptyDesc}</p>

              <div className="flex flex-col items-center gap-3">
                {/* Add Project */}
                <button
                  onClick={() => {
                    // لاحقاً: navigation vers la page d'ajout
                  }}
                  className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                  {t.addProject}
                </button>

                {/* Refresh */}
                <button
                  onClick={() => {
                    setPage(1);
                    fetchTotalPages();
                  }}
                  className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                >
                  {t.refreshButton}
                </button>
              </div>
            </div>
          )}

          {/* Projects */}
          {!isLoading && !error && projects.length > 0 && (
            <>
              <div className="grid max-md:grid-cols-2 max-lg:grid-cols-3 max-sm:grid-cols-1 grid-cols-4 gap-4">
                {projects.map((project, id) => (
                  <Project key={id} project={project} />
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center mt-6">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (page > 1) setPage(page - 1);
                        }}
                      />
                    </PaginationItem>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (p) => (
                        <PaginationItem key={p}>
                          <PaginationLink
                            isActive={p === page}
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              setPage(p);
                            }}
                          >
                            {p}
                          </PaginationLink>
                        </PaginationItem>
                      )
                    )}

                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (page < totalPages) setPage(page + 1);
                        }}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="flex justify-center my-8">
        <div className="w-24 h-1 bg-green-500"></div>
      </div>

      <MessagePopup
        message={popup.message}
        type={popup.type}
        onClose={() => setPopup({ message: "", type: "" })}
      />
    </>
  );
}
