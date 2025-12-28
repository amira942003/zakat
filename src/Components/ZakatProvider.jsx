import React, { createContext, useState, useEffect } from "react";
import { useApi } from "@/ApiProvider";

export const ZakatContext = createContext();

export const ZakatProvider = ({ children }) => {
    const api = useApi();

    // ⚡️ Ajout du language
    const [language, setLanguage] = useState("ar"); // "ar" par défaut

    const [nissab, setNissab] = useState(null);
    const [zakatFormInfos, setZakatFormInfos] = useState({});
    const [isUnnaire, setIsUnnaire] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const [totalAmount, setTotalAmount] = useState(0);
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [popup, setPopup] = useState({ message: "", type: "" });

    // Met à jour les champs dynamiques selon la société sélectionnée
    useEffect(() => {
        if (selectedCompany && Array.isArray(selectedCompany.fields)) {
            const extractLeafFields = (nodes) =>
                nodes.flatMap(field =>
                    field.children && field.children.length > 0
                        ? extractLeafFields(field.children)
                        : [field]
                );

            const leafFields = extractLeafFields(selectedCompany.fields);
            const initialValues = Object.fromEntries(leafFields.map(field => [field.name, ""]));
            setZakatFormInfos(initialValues);
        }
    }, [selectedCompany]);

    const saveZakatHistory = async () => {
        const zakatData = {
            zakat_result: zakatFormInfos.zakatAmount,
            zakat_base: zakatFormInfos.totalAmount,
            calculation_date: zakatFormInfos.calculationDate,
            nissab: nissab
        };
        const [data, status, error] = await api.post("/save-zakat-history/", zakatData);

        if (error) {
            console.error("Error:", error);
            setPopup({ message: language === "ar" ? "حدث خطأ أثناء الحفظ" : "Error saving Zakat", type: "error" });
        } else {
            setPopup({ message: language === "ar" ? "تم حفظ الزكاة بنجاح!" : "Zakat saved successfully!", type: "success" });
            setZakatFormInfos({});
            setShowResult(false);
        }
    };

    return (
        <ZakatContext.Provider value={{
            zakatFormInfos, setZakatFormInfos,
            isUnnaire, setIsUnnaire,
            showResult, setShowResult,
            saveZakatHistory,
            isLoading, setIsLoading,
            totalAmount, setTotalAmount,
            selectedCompany, setSelectedCompany,
            nissab, setNissab,
            popup, setPopup,
            language, setLanguage // ⚡️ ici
        }}>
            {children}
        </ZakatContext.Provider>
    );
};
