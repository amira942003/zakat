import { Alert, AlertDescription } from "@/Components/ui/alert";
import { CheckCircle2Icon, AlertCircleIcon } from "lucide-react";
import { useLanguage } from "@/Components/LanguageProvider";

export const MessagePopup = ({ message, type, onClose }) => {
  const { language } = useLanguage();

  if (!message) return null;

  const t = (ar, fr, en) =>
    language === "fr" ? fr : language === "en" ? en : ar;

  let icon, bgClass;

  switch (type) {
    case "success":
      icon = <CheckCircle2Icon className="h-5 w-5 mr-2 text-green-600" />;
      bgClass = "bg-green-100";
      break;

    case "error":
      icon = <AlertCircleIcon className="h-5 w-5 mr-2 text-red-600" />;
      bgClass = "bg-red-100";
      break;

    default:
      icon = <AlertCircleIcon className="h-5 w-5 mr-2 text-gray-500" />;
      bgClass = "bg-gray-100";
  }

  return (
    <div
      dir={language === "ar" ? "rtl" : "ltr"}
      className="fixed top-4 right-4 z-50 w-[90%] max-w-sm"
    >
      <Alert variant="default" className={`relative ${bgClass} animate-scale-in`}>
        <div className="flex items-center">
          {icon}
          <AlertDescription className="ml-2">
            {type === "error" ? t("خطأ", "Erreur", "Error") + ": " : ""}
            {message}
          </AlertDescription>
        </div>

        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-sm text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>
      </Alert>

      <style>{`
        @keyframes scale-in {
          from {
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-scale-in {
          animation: scale-in 0.2s ease-out;
        }
      `}</style>
    </div>
  );
};
