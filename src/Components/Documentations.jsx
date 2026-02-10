import React from "react";
import { useLanguage } from "../Components/LanguageProvider";
import { BookOpen, FileText, Calculator, HelpCircle } from "lucide-react";

export const Documentation = () => {
  const { language } = useLanguage();

  const content = {
    ar: {
      title: "التوثيق",
      subtitle: "دليل شامل لاستخدام منصة حساب الزكاة",
      sections: [
        {
          icon: <BookOpen className="w-8 h-8 text-green-600" />,
          title: "ما هي الزكاة؟",
          content: "الزكاة ركن من أركان الإسلام الخمسة، وهي حق معلوم من المال يجب إخراجه للفقراء والمحتاجين."
        },
        {
          icon: <Calculator className="w-8 h-8 text-green-600" />,
          title: "كيفية حساب الزكاة",
          content: "تُحسب الزكاة بنسبة 2.5% من الأموال التي بلغت النصاب وحال عليها الحول (سنة هجرية كاملة)."
        },
        {
          icon: <FileText className="w-8 h-8 text-green-600" />,
          title: "أنواع الأموال الزكوية",
          content: "تشمل النقود، الذهب والفضة، عروض التجارة، الزروع والثمار، والأنعام (الإبل والبقر والغنم)."
        },
        {
          icon: <HelpCircle className="w-8 h-8 text-green-600" />,
          title: "الأسئلة الشائعة",
          content: "للمزيد من المعلومات والإجابة على استفساراتكم، يرجى زيارة قسم التواصل معنا."
        }
      ]
    },
    fr: {
      title: "Documentation",
      subtitle: "Guide complet d'utilisation de la plateforme de calcul de la Zakat",
      sections: [
        {
          icon: <BookOpen className="w-8 h-8 text-green-600" />,
          title: "Qu'est-ce que la Zakat ?",
          content: "La Zakat est l'un des cinq piliers de l'Islam, c'est un droit fixe sur l'argent qui doit être versé aux pauvres et aux nécessiteux."
        },
        {
          icon: <Calculator className="w-8 h-8 text-green-600" />,
          title: "Comment calculer la Zakat",
          content: "La Zakat se calcule à 2,5% des sommes ayant atteint le Nissab et sur lesquelles une année lunaire complète s'est écoulée."
        },
        {
          icon: <FileText className="w-8 h-8 text-green-600" />,
          title: "Types de biens soumis à la Zakat",
          content: "Comprend l'argent, l'or et l'argent, les marchandises commerciales, les récoltes et fruits, et le bétail (chameaux, bovins, ovins)."
        },
        {
          icon: <HelpCircle className="w-8 h-8 text-green-600" />,
          title: "Questions fréquentes",
          content: "Pour plus d'informations et réponses à vos questions, veuillez visiter notre section Contact."
        }
      ]
    },
    en: {
      title: "Documentation",
      subtitle: "Complete guide to using the Zakat calculation platform",
      sections: [
        {
          icon: <BookOpen className="w-8 h-8 text-green-600" />,
          title: "What is Zakat?",
          content: "Zakat is one of the five pillars of Islam, a fixed right on wealth that must be given to the poor and needy."
        },
        {
          icon: <Calculator className="w-8 h-8 text-green-600" />,
          title: "How to Calculate Zakat",
          content: "Zakat is calculated at 2.5% of wealth that has reached Nissab and on which a full lunar year has passed."
        },
        {
          icon: <FileText className="w-8 h-8 text-green-600" />,
          title: "Types of Zakatable Wealth",
          content: "Includes money, gold and silver, trade goods, crops and fruits, and livestock (camels, cattle, sheep)."
        },
        {
          icon: <HelpCircle className="w-8 h-8 text-green-600" />,
          title: "Frequently Asked Questions",
          content: "For more information and answers to your questions, please visit our Contact section."
        }
      ]
    }
  };

  const t = content[language];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-green-800 mb-4">
            {t.title}
          </h1>
          <p className="text-lg text-gray-600">
            {t.subtitle}
          </p>
        </div>

        {/* Sections */}
        <div className="grid md:grid-cols-2 gap-6">
          {t.sections.map((section, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  {section.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-green-800 mb-3">
                    {section.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {section.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
{/* Additional Info */}
        <div className="mt-12 bg-green-100 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-green-800 mb-4">
            {language === "ar" ? "هل تحتاج إلى مساعدة؟" : language === "fr" ? "Besoin d'aide ?" : "Need Help?"}
          </h2>
          <p className="text-gray-700 mb-6">
            {language === "ar" 
              ? "فريقنا جاهز للإجابة على جميع استفساراتكم" 
              : language === "fr" 
              ? "Notre équipe est prête à répondre à toutes vos questions" 
              : "Our team is ready to answer all your questions"}
          </p>
          
           
        
        </div>
      </div>
    </div>
  );
};