import { useState, useEffect } from "react";
import { MessagePopup } from "@/Components/MessagePopup";
import { AlertCircle } from "lucide-react";

// -------------------- Traductions --------------------
const translations = {
  ar: {
    title: "مشاريع الوقف",
    subtitle: "استثمر في الأجر الجاري وساهم في بناء مستقبل أفضل للأجيال القادمة",
    addProject: "إضافة مشروع الوقف",
    projectName: "اسم المشروع",
    ccp: "الحساب البنكي / المقر الاجتماعي",
    socialLink: "رابط الشبكات الاجتماعية",
    save: "حفظ",
    cancel: "إلغاء",
    addedSuccess: "تمت إضافة المشروع بنجاح",
    noProjects: "لا توجد مشاريع متاحة",
    deleteConfirm: "هل أنت متأكد من حذف المشروع؟",
    editProject: "تعديل المشروع",
    viewProject: "عرض المشروع",
    delete: "حذف",
    edit: "تعديل",
  },
  fr: {
    title: "Projets Awqaf",
    subtitle: "Investissez dans les bonnes œuvres continues et contribuez à construire un meilleur avenir",
    addProject: "Ajouter un projet de waqf",
    projectName: "Nom du projet",
    ccp: "Compte CCP / siège social",
    socialLink: "Lien vers les réseaux sociaux",
    save: "Enregistrer",
    cancel: "Annuler",
    addedSuccess: "Projet ajouté avec succès",
    noProjects: "Aucun projet disponible",
    deleteConfirm: "Êtes-vous sûr de vouloir supprimer le projet ?",
    editProject: "Modifier le projet",
    viewProject: "Voir le projet",
    delete: "Supprimer",
    edit: "Modifier",
  },
  en: {
    title: "Awqaf Projects",
    subtitle: "Invest in ongoing charity and help build a better future",
    addProject: "Add Waqf Project",
    projectName: "Project Name",
    ccp: "Bank account / headquarters",
    socialLink: "Social media link",
    save: "Save",
    cancel: "Cancel",
    addedSuccess: "Project added successfully",
    noProjects: "No projects available",
    deleteConfirm: "Are you sure you want to delete this project?",
    editProject: "Edit Project",
    viewProject: "View Project",
    delete: "Delete",
    edit: "Edit",
  },
};

// -------------------- Composant ProjectCard --------------------
function ProjectCard({ project, onEdit, onDelete, onView, language }) {
  const t = translations[language];

  return (
    <div className="bg-white p-4 rounded shadow cursor-pointer hover:shadow-lg transition relative">
      <h3 className="font-bold mb-2" onClick={() => onView(project)}>
        {project.title}
      </h3>
      <p className="text-sm mb-1"><strong>{t.ccp}:</strong> {project.ccp}</p>
      <p className="text-sm mb-2"><strong>{t.socialLink}:</strong> {project.socialLink}</p>

      {/* Actions */}
      <div className="flex justify-end gap-2 mt-2">
        <button
          onClick={() => onEdit(project)}
          className="px-2 py-1 bg-yellow-500 text-white rounded text-sm hover:bg-yellow-600"
        >
          {t.edit}
        </button>
        <button
          onClick={() => onDelete(project)}
          className="px-2 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
        >
          {t.delete}
        </button>
      </div>
    </div>
  );
}

// -------------------- Composant Principal --------------------
export default function Awkaf() {
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editProject, setEditProject] = useState(null); // pour modifier
  const [viewProject, setViewProject] = useState(null); // pour voir les infos
  const [projectName, setProjectName] = useState("");
  const [ccp, setCcp] = useState("");
  const [socialLink, setSocialLink] = useState("");
  const [popup, setPopup] = useState({ message: "", type: "" });

  const { language } = { language: "ar" }; // Remplacer par useLanguage() si besoin
  const t = translations[language];

  // Charger les projets depuis localStorage
  useEffect(() => {
    const savedProjects = JSON.parse(localStorage.getItem("waqfProjects") || "[]");
    setProjects(savedProjects);
  }, []);

  // Sauvegarder un projet (nouveau ou modifié)
  const handleSaveProject = () => {
    if (!projectName.trim()) return;

    if (editProject) {
      // Modifier
      const updatedProjects = projects.map((p) =>
        p.id === editProject.id ? { ...p, title: projectName, ccp, socialLink } : p
      );
      setProjects(updatedProjects);
      localStorage.setItem("waqfProjects", JSON.stringify(updatedProjects));
      setPopup({ message: t.addedSuccess, type: "success" });
      setEditProject(null);
    } else {
      // Nouveau projet
      const newProject = { id: Date.now(), title: projectName, ccp, socialLink };
      const updatedProjects = [newProject, ...projects];
      setProjects(updatedProjects);
      localStorage.setItem("waqfProjects", JSON.stringify(updatedProjects));
      setPopup({ message: t.addedSuccess, type: "success" });
    }

    // Réinitialiser formulaire
    setProjectName("");
    setCcp("");
    setSocialLink("");
    setShowForm(false);
  };

  const handleEdit = (project) => {
    setEditProject(project);
    setProjectName(project.title);
    setCcp(project.ccp);
    setSocialLink(project.socialLink);
    setShowForm(true);
  };

  const handleDelete = (project) => {
    if (!window.confirm(t.deleteConfirm)) return;
    const updatedProjects = projects.filter((p) => p.id !== project.id);
    setProjects(updatedProjects);
    localStorage.setItem("waqfProjects", JSON.stringify(updatedProjects));
  };

  const handleView = (project) => {
    setViewProject(project);
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

          {/* Bouton Ajouter */}
          <div className="text-center mb-6">
            <button
              onClick={() => { setShowForm(true); setEditProject(null); }}
              className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
            >
              {t.addProject}
            </button>
          </div>

          {/* Formulaire */}
          {showForm && (
            <div className="bg-white p-6 rounded shadow max-w-md mx-auto mb-6">
              <h3 className="font-semibold mb-4">{editProject ? t.editProject : t.addProject}</h3>

              <label className="block mb-2 font-semibold">{t.projectName}</label>
              <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className="w-full border px-3 py-2 rounded mb-4"
              />

              <label className="block mb-2 font-semibold">{t.ccp}</label>
              <input
                type="text"
                value={ccp}
                onChange={(e) => setCcp(e.target.value)}
                className="w-full border px-3 py-2 rounded mb-4"
              />

              <label className="block mb-2 font-semibold">{t.socialLink}</label>
              <input
                type="text"
                value={socialLink}
                onChange={(e) => setSocialLink(e.target.value)}
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

          {/* Liste des projets */}
          {projects.length === 0 ? (
            <div className="text-center py-12">
              <AlertCircle className="w-16 h-16 mx-auto opacity-40 mb-4" />
              <p>{t.noProjects}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onView={handleView}
                  language={language}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Popup projet view */}
      {viewProject && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow max-w-md w-full">
            <h3 className="font-bold mb-4">{viewProject.title}</h3>
            <p><strong>{t.ccp}:</strong> {viewProject.ccp}</p>
            <p><strong>{t.socialLink}:</strong> {viewProject.socialLink}</p>

            <div className="flex justify-end mt-4">
              <button
                onClick={() => setViewProject(null)}
                className="px-4 py-2 bg-gray-400 text-white rounded"
              >
                {t.cancel}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Message popup */}
      <MessagePopup
        message={popup.message}
        type={popup.type}
        onClose={() => setPopup({ message: "", type: "" })}
      />
    </>
  );
}
