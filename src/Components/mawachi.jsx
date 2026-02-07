import { useState } from 'react';
import { ChevronDown, Trash } from "lucide-react";
import { WarninIcon } from '@/assets/Svg/WarninIcon';
import { MessagePopup } from './MessagePopup';
import { useApi } from "@/ApiProvider";
import { useLanguage } from "./LanguageProvider";

export const Mawachi = () => {
  const api = useApi();
  const { t } = useLanguage();
  const [animals, setAnimals] = useState([]);
  const [collapsedAnimals, setCollapsedAnimals] = useState({});
  const [popup, setPopup] = useState({ message: '', type: '' });
  const [isLoading, setIsLoading] = useState(false);

  // Formules de calcul de Zakat
  const calculateCamelZakat = (count) => {
    if (count < 5) return { amount: 0, description: t('mawachi.noZakat') };
    if (count <= 9) return { amount: 1, description: t('mawachi.camel.sheep1') };
    if (count <= 14) return { amount: 2, description: t('mawachi.camel.sheep2') };
    if (count <= 19) return { amount: 3, description: t('mawachi.camel.sheep3') };
    if (count <= 24) return { amount: 4, description: t('mawachi.camel.sheep4') };
    if (count <= 35) return { amount: 1, description: t('mawachi.camel.bintMakhad') };
    if (count <= 45) return { amount: 1, description: t('mawachi.camel.bintLaboun') };
    if (count <= 60) return { amount: 1, description: t('mawachi.camel.hiqqah') };
    if (count <= 75) return { amount: 1, description: t('mawachi.camel.jadhaah') };
    if (count <= 90) return { amount: 2, description: t('mawachi.camel.bintLaboun2') };
    if (count <= 120) return { amount: 2, description: t('mawachi.camel.hiqqah2') };
    if (count <= 129) return { amount: 3, description: t('mawachi.camel.bintLaboun3') };
    if (count <= 139) return { amount: 1, description: t('mawachi.camel.hiqqaBintLaboun2') };
    if (count <= 149) return { amount: 1, description: t('mawachi.camel.hiqqah2BintLaboun') };
    if (count <= 159) return { amount: 3, description: t('mawachi.camel.hiqqah3') };
    if (count <= 169) return { amount: 4, description: t('mawachi.camel.bintLaboun4') };
    if (count <= 179) return { amount: 1, description: t('mawachi.camel.hiqqaBintLaboun3') };
    if (count <= 189) return { amount: 1, description: t('mawachi.camel.hiqqah2BintLaboun2') };
    if (count <= 199) return { amount: 1, description: t('mawachi.camel.hiqqah3BintLaboun') };
    if (count <= 209) return { amount: 1, description: t('mawachi.camel.hiqqah4OrBintLaboun5') };
    if (count <= 219) return { amount: 1, description: t('mawachi.camel.hiqqaBintLaboun4') };
    if (count <= 229) return { amount: 1, description: t('mawachi.camel.hiqqah2BintLaboun3') };
    if (count <= 239) return { amount: 1, description: t('mawachi.camel.hiqqah3BintLaboun2') };
    if (count <= 249) return { amount: 1, description: t('mawachi.camel.hiqqah4BintLaboun') };
    
    // Pour plus de 249
    const hiqqah = Math.floor(count / 50);
    const bintLaboun = Math.floor((count % 50) / 40);
    return { 
      amount: hiqqah + bintLaboun, 
      description: t('mawachi.camel.above249')
        .replace('{hiqqah}', hiqqah)
        .replace('{bintLaboun}', bintLaboun)
    };
  };

  const calculateCowZakat = (count) => {
    if (count < 30) return { amount: 0, description: t('mawachi.noZakat') };
    if (count <= 39) return { amount: 1, description: t('mawachi.cow.tabee') };
    if (count <= 59) return { amount: 1, description: t('mawachi.cow.musinnah') };
    if (count <= 69) return { amount: 2, description: t('mawachi.cow.tabee2') };
    if (count <= 79) return { amount: 1, description: t('mawachi.cow.musinnahTabee') };
    if (count <= 89) return { amount: 2, description: t('mawachi.cow.musinnah2') };
    if (count <= 99) return { amount: 3, description: t('mawachi.cow.tabee3') };
    if (count <= 109) return { amount: 1, description: t('mawachi.cow.musinnahTabee2') };
    if (count <= 119) return { amount: 1, description: t('mawachi.cow.musinnah2Tabee') };
    if (count <= 129) return { amount: 1, description: t('mawachi.cow.musinnah3OrTabee4') };
    
    // Pour plus de 129
    const tabee = Math.floor(count / 30);
    const musinnah = Math.floor((count % 30) / 40);
    return { 
      amount: tabee + musinnah, 
      description: t('mawachi.cow.above129')
        .replace('{tabee}', tabee)
        .replace('{musinnah}', musinnah)
    };
  };

  const calculateSheepZakat = (count) => {
    if (count < 40) return { amount: 0, description: t('mawachi.noZakat') };
    if (count <= 120) return { amount: 1, description: t('mawachi.sheep.sheep1') };
    if (count <= 200) return { amount: 2, description: t('mawachi.sheep.sheep2') };
    if (count <= 399) return { amount: 3, description: t('mawachi.sheep.sheep3') };
    if (count <= 499) return { amount: 4, description: t('mawachi.sheep.sheep4') };
    
    // Pour plus de 499
    const sheep = Math.floor(count / 100);
    return { 
      amount: sheep, 
      description: t('mawachi.sheep.above499').replace('{count}', sheep)
    };
  };

  const saveZakatHistory = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setPopup({ message: t('mawachi.messages.loginRequired'), type: "error" });
      return;
    }

    const animalsWithZakat = animals.filter((animal) => animal.zakatDue.amount > 0);

    if (animalsWithZakat.length === 0) {
      setPopup({ message: t('mawachi.messages.noZakatToBeSaved'), type: "error" });
      return;
    }

    setIsLoading(true);
    let successCount = 0;

    for (const animal of animalsWithZakat) {
      const zakatData = {
        zakat_amount: animal.zakatDue.amount,
        total_amount: parseFloat(animal.quantity) || 0,
        animal_type: animal.animalType || "غير محدد",
        zakat_description: animal.zakatDue.description
      };

      const [data, status, error] = await api.post("/create-mawachi/", zakatData);

      if (!error && status >= 200 && status < 300) {
        successCount++;
      } else {
        console.error("Save failed:", error || data);
      }
    }

    setIsLoading(false);

    if (successCount > 0) {
      setPopup({ message: t('mawachi.messages.saveSuccess'), type: "success" });
      setAnimals([]);
      setCollapsedAnimals({});
    } else {
      setPopup({ message: t('mawachi.messages.saveFailed'), type: "error" });
    }

    setTimeout(() => {
      setPopup({ message: "", type: "" });
    }, 3000);
  };

  const toggleAnimal = (index) => {
    setCollapsedAnimals(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const addAnimal = () => {
    setAnimals(prev => [
      ...prev,
      {
        animalType: 'camel',
        quantity: '',
        zakatDue: { amount: 0, description: '' },
      },
    ]);
  };

  const updateAnimal = (index, field, value) => {
    const updated = [...animals];
    updated[index][field] = value;
    setAnimals(updated);
  };

  const removeAnimal = (index) => {
    const updated = animals.filter((_, i) => i !== index);
    setAnimals(updated);
    const newCollapsed = { ...collapsedAnimals };
    delete newCollapsed[index];
    setCollapsedAnimals(newCollapsed);
  };

  const calculateZakat = () => {
    const updated = animals.map(animal => {
      const qty = parseFloat(animal.quantity) || 0;
      let zakatDue = { amount: 0, description: '' };

      if (animal.animalType === 'camel') {
        zakatDue = calculateCamelZakat(qty);
      } else if (animal.animalType === 'cow') {
        zakatDue = calculateCowZakat(qty);
      } else if (animal.animalType === 'sheep') {
        zakatDue = calculateSheepZakat(qty);
      }

      return { ...animal, zakatDue };
    });

    setAnimals(updated);
  };

  const formatNumber = (num) =>
    !num ? "" : num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  const getAnimalTypeLabel = (type) => {
    return t(`mawachi.animalTypes.${type}`);
  };

  return (
    <>
      <div dir="rtl" className="w-full mx-auto min-h-screen bg-gradient-to-br from-gray-50 to-emerald-50">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-700 text-white py-12 md:py-16 mt-12 md:mt-15 mb-2">
          <div className="container text-center mx-auto px-4 md:px-6">
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 md:mb-4">
              {t('mawachi.title')}
            </h1>
            <p className="text-sm sm:text-base md:text-lg opacity-90 max-w-2xl mx-auto">
              {t('mawachi.subtitle')}
            </p>
          </div>
        </div>

        {/* Main Form Container */}
        <div className="px-3 sm:px-4 md:px-6 mx-auto pb-8 md:pb-12">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg md:rounded-2xl shadow-lg md:shadow-xl border border-gray-200 overflow-hidden">
              
              {/* Form Header */}
              <div className="form-header bg-gradient-to-r from-gray-50 to-emerald-50 border-b border-gray-200 p-4 md:p-6">
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="w-3 h-6 md:h-8 bg-emerald-600 rounded-full flex-shrink-0"></div>
                  <div className="min-w-0">
                    <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-1">
                      {t('mawachi.formHeader')}
                    </h2>
                    <p className="text-gray-600 text-xs md:text-sm break-words">
                      {t('mawachi.formDescription')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Form Content */}
              <div className="p-4 md:p-8 form-container">
                <div className="space-y-4 md:space-y-6">
                  {animals.map((animal, index) => (
                    <div key={index} className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-lg overflow-hidden">
                      {/* Animal Header */}
                      <div 
                        className="flex items-center justify-between p-3 md:p-4 cursor-pointer hover:bg-emerald-100/50 transition-colors duration-200 gap-2"
                        onClick={() => toggleAnimal(index)}
                      >
                        <div className="flex items-center min-w-0 gap-2 md:gap-3">
                          <div className="w-1 h-5 md:h-6 bg-emerald-600 rounded-full flex-shrink-0"></div>
                          <h3 className="text-sm md:text-lg font-bold text-emerald-800 select-none truncate">
                            {getAnimalTypeLabel(animal.animalType)} {index + 1}
                          </h3>
                          {animal.zakatDue.amount > 0 && (
                            <span className="px-2 md:px-3 py-1 bg-emerald-600 text-white text-xs md:text-sm rounded-full whitespace-nowrap">
                              {animal.zakatDue.amount} {t('mawachi.head')}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              removeAnimal(index);
                            }}
                            className="p-1.5 md:p-2 text-red-500 hover:bg-red-100 rounded-full transition-colors"
                          >
                            <Trash className="w-4 h-4 md:w-5 md:h-5" stroke='#036116'></Trash>
                          </button>
                          <span className="text-xs md:text-sm text-emerald-600 font-medium hidden sm:inline">
                            {collapsedAnimals[index] ? t('mawachi.show') : t('mawachi.hide')}
                          </span>
                          <div className={`transform transition-transform duration-300 ${collapsedAnimals[index] ? "rotate-180" : ""}`}>
                            <ChevronDown className="w-4 h-4 md:w-5 md:h-5 text-emerald-600" />
                          </div>
                        </div>
                      </div>

                      {/* Animal Content */}
                      <div 
                        className={`p-0 m-0 transition-all duration-300 ease-in-out overflow-hidden ${
                          collapsedAnimals[index] 
                            ? "max-h-0 opacity-0" 
                            : "max-h-[3000px] opacity-100"
                        }`}
                      >
                        <div className="p-3 md:p-4 space-y-3 md:space-y-4">
                          {/* Animal Type */}
                          <div className="cal-input-bg">
                            <label className="font-semibold text-gray-700 text-xs md:text-sm block mb-2">
                              {t('mawachi.fields.animalType')}
                            </label>
                            <div className="relative">
                              <select
                                className="select-form text-sm md:text-base"
                                value={animal.animalType}
                                onChange={e => updateAnimal(index, 'animalType', e.target.value)}
                              >
                                <option value="camel">{t('mawachi.animalTypes.camel')}</option>
                                <option value="cow">{t('mawachi.animalTypes.cow')}</option>
                                <option value="sheep">{t('mawachi.animalTypes.sheep')}</option>
                              </select>
                              <div className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                                <ChevronDown className="w-4 h-4 md:w-5 md:h-5 text-emerald-600" />
                              </div>
                            </div>
                          </div>

                          {/* Quantity */}
                          <div className="cal-input-bg">
                            <label className="font-semibold text-gray-700 text-xs md:text-sm block mb-2">
                              {t('mawachi.fields.quantity')}
                            </label>
                            <div className="relative">
                              <input
                                type="text"
                                className="cal-input pr-10 md:pr-12 text-sm md:text-base"
                                value={formatNumber(animal.quantity)}
                                onChange={e => {
                                  const rawValue = e.target.value.replace(/,/g, "");
                                  if (!isNaN(rawValue) && rawValue >= 0) {
                                    updateAnimal(index, 'quantity', rawValue);
                                  }
                                }}
                                placeholder={t('mawachi.fields.quantityPlaceholder')}
                              />
                              <span className="DA absolute right-2 md:right-3 top-1/2 text-xs md:text-sm">
                                {t('mawachi.head')}
                              </span>
                              <div className="absolute left-2 md:left-3 top-1/2 transform -translate-y-1/2">
                                <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                              </div>
                            </div>
                          </div>

                          {/* Zakat Result */}
                          {animal.zakatDue.amount >= 0 && (
                            <div className="bg-gradient-to-r from-green-100 to-emerald-100 border border-green-300 rounded-lg p-3 md:p-4">
                              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                <span className="font-bold text-green-800 text-sm md:text-base">
                                  {t('mawachi.zakatDue')}
                                </span>
                                <span className="text-xl md:text-2xl font-bold text-green-700">
                                  {animal.zakatDue.amount} {t('mawachi.head')}
                                </span>
                              </div>
                              {animal.zakatDue.description && (
                                <div className="text-xs md:text-sm text-green-600 mt-2 break-words">
                                  {animal.zakatDue.description}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Add Animal Button */}
                  <div className="text-center">
                    <button
                      onClick={addAnimal}
                      className="custom-button py-3 md:py-4 rounded-sm w-full sm:w-1/2 font-bold text-sm md:text-base"
                    >
                      {t('mawachi.addAnimal')}
                    </button>
                  </div>

                  {/* Calculate and Save Buttons */}
                  {animals.length > 0 && (
                    <div className="text-center mt-6 md:mt-10 pt-4 md:pt-6 border-t border-gray-200 space-y-3">
                      <button 
                        className="custom-button py-3 md:py-4 rounded-sm w-full sm:w-1/2 font-bold text-sm md:text-base"
                        onClick={calculateZakat}
                      >
                        {t('mawachi.calculate')}
                      </button>
                      
                      {animals.some(a => a.zakatDue.amount > 0) && (
                        <button 
                          className="custom-button py-3 md:py-4 rounded-sm w-full sm:w-1/2 font-bold text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                          onClick={saveZakatHistory}
                          disabled={isLoading}
                        >
                          {isLoading ? t('mawachi.saving') : t('mawachi.saveResults')}
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Information Card */}
            <div className="mt-6 md:mt-8 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg p-4 md:p-6">
              <div className="flex gap-3 md:gap-4">
                <div className="bg-amber-100 p-2 md:p-3 rounded-full flex-shrink-0">
                  <span className="text-xl md:text-2xl"><WarninIcon></WarninIcon></span>
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-amber-800 mb-1 text-sm md:text-base">
                    {t('mawachi.info.title')}
                  </h3>
                  <div className="text-amber-700 text-xs md:text-sm break-words space-y-2">
                    <p><strong>{t('mawachi.info.camelTitle')}</strong> {t('mawachi.info.camelNissab')}</p>
                    <p><strong>{t('mawachi.info.cowTitle')}</strong> {t('mawachi.info.cowNissab')}</p>
                    <p><strong>{t('mawachi.info.sheepTitle')}</strong> {t('mawachi.info.sheepNissab')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <MessagePopup
          message={popup.message}
          type={popup.type}
          onClose={() => setPopup({ message: "", type: "" })}
        />
      </div>
    </>
  );
};