import { useState, useEffect } from "react";
import Project from "../../Components/Project";
import { useApi } from "@/ApiProvider";
import { useLanguage } from "../../Components/LanguageProvider";

import { MessagePopup } from "@/Components/MessagePopup";
import { AlertCircle } from "lucide-react";

// -------------------- Traductions --------------------
const translations = {
  ar: {
    title: "مشاريع الوقف",
    subtitle: "استثمر في الأجر الجاري وساهم في بناء مستقبل أفضل للأجيال القادمة",
    addProject: "إضافة مشروع الوقف",
    projectName: "اسم المشروع",
    save: "حفظ",
    cancel: "إلغاء",
    addedSuccess: "تمت إضافة المشروع بنجاح",
    noProjects: "لا توجد مشاريع متاحة",
  },
  fr: {
    title: "Projets Awqaf",
    subtitle:
      "Investissez dans les bonnes œuvres continues et contribuez à construire un meilleur avenir pour les générations futures",
    addProject: "Ajouter un projet de waqf",
    projectName: "Nom du projet",
    save: "Enregistrer",
    cancel: "Annuler",
    addedSuccess: "Projet ajouté avec succès",
    noProjects: "Aucun projet disponible",
  },
  en: {
    title: "Awqaf Projects",
    subtitle:
      "Invest in ongoing charity and help build a better future for the next generations",
    addProject: "Add Waqf Project",
    projectName: "Project name",
    save: "Save",
    cancel: "Cancel",
    addedSuccess: "Project added successfully",
    noProjects: "No projects available",
  },
};

export default function Awkaf() {
  const { language } = useLanguage();
  const t = translations[language];

  // ---------------- STATES ----------------
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [popup, setPopup] = useState({ message: "", type: "" });

  // ---------------- Load from localStorage ----------------
  useEffect(() => {
    const savedProjects = JSON.parse(localStorage.getItem("waqfProjects") || "[]");
    setProjects(savedProjects);
  }, []);

  // ---------------- SAVE PROJECT ----------------
  const handleSaveProject = () => {
    if (!projectName.trim()) return;

    const newProject = {
      id: Date.now(),
      title: projectName,
      name: projectName,
    };

    const updatedProjects = [newProject, ...projects];
    setProjects(updatedProjects);
    localStorage.setItem("waqfProjects", JSON.stringify(updatedProjects));

    setPopup({ message: t.addedSuccess, type: "success" });
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

          {/* Add Project Button */}
          <div className="text-center mb-6">
            <button
              onClick={() => setShowForm(true)}
              className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
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

          {/* Projects */}
          {projects.length === 0 ? (
            <div className="text-center py-12">
              <AlertCircle className="w-16 h-16 mx-auto opacity-40 mb-4" />
              <p>{t.noProjects}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {projects.map((project) => (
                <Project key={project.id} project={project} />
              ))}
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
