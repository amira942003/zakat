// languageProvider.js
import { createContext, useContext, useState } from "react";

// -------------------- Translations --------------------
export const translations = {
  ar: {
    forms: {
      "1": {
        label: "النقود وما في حكمها",
        fields: {
          x1: "نقدية بالصندوق",
          x2: "نقدية لدى المصارف (جارية/تحت الطلب)",
          x3: "شيكات مصادق عليها",
          x4: "العملات الأجنبية",
          x5: "أصول رقمية/نقود مشفّرة متاحة",
          x6: "ودائع أمانة/حسابات ثابتة يمكن التصرف فيها",
          x7: "قرض حسن مُقرض (حتى يُقبض)",
          x8: "إيرادات مستحقة غير مقبوضة",
          x9: "نقود من بيع أصول غير زكوية"
        },
        descriptions: {
          x1: "وهي الأوراق النقدية والقطع المعدنية التي تحتفظ بها مباشرة في يدك أو في خزنتك. هذه المبالغ متاحة فوراً وتُعتبر خاضعة للزكاة إذا بلغت النصاب ومضت عليها سنة هجرية كاملة",
          x2: "ويقصد بها الأرصدة المتوفرة في حساباتك البنكية والتي يمكن سحبها أو استخدامها في أي وقت. سواءً أبقيتها في البنك أو استعملتها باستمرار، فهي تعتبر سيولة متاحة، وبالتالي خاضعة للزكاة",
          x3: "هي الشيكات التي صدّقتها أو ضمِنتها البنوك، والتي يمكنك صرفها مباشرة. وتُعتبر مالاً نقدياً متوفراً، ولذلك يجب إدخالها في وعاء الزكاة",
          x4: "إذا كنتَ تملك عملات أجنبية (دولار، يورو، إلخ)، فيجب أخذها بعين الاعتبار. يتم تحويلها إلى العملة المحلية بسعر الصرف في يوم حساب الزكاة، ثم تُضاف إلى الوعاء الزكوي",
          x5: "مثل البيتكوين والإيثيريوم وغيرها من العملات القابلة للبيع أو الاستخدام الفوري. تُقوّم بسعر السوق الحالي وتُضاف لقيمة الأموال الخاضعة للزكاة",
          x6: "وهي الأموال المودَعة في حسابات لأجل أو كضمانات يمكن سحبها حالياً. في هذه الحالة تُعتبر سيولة وتدخل في حساب الزكاة",
          x7: "المال الذي أقرضته لشخص آخر بدون فائدة. ما دام لم يُسترجع فلا يدخل في وعاء الزكاة. عند استرجاعه، يُضم إلى أموالك وتزكيه في نفس السنة",
          x8: "وهي المبالغ التي تستحق لك (مثل أجور أو إيجارات أو خدمات أُنجزت) لكنك لم تستلمها بعد. لا تدفع الزكاة عليها إلا عند قبضها فعلاً",
          x9: "إذا حصلت على أموال نتيجة بيع أصول غير خاضعة للزكاة (مثل بيت سكني أو ميراث أو هبة)، فإنها لا تدخل في وعاء الزكاة إلا إذا استوفت الشروط: بلوغ النصاب ومضي الحول"
        }
      },
      "2": {
        label: "الذمم المدينة",
        fields: {
          y1: "ديون حالّة مرجوّة على العملاء",
          y2: "ديون مؤجّلة مرجوّة",
          y3: "أوراق قبض",
          y4: "ديون لي مرجوّة (قرض حسن/بيع احتكاري)",
          y5: "ديون عن بيع أصول غير زكوية/غير تجارية",
          y6: "إيرادات إيجار/كراء حل أجلها",
          y7: "ديون مشكوك فيها/ميؤوس منها"
        },
        descriptions: {
          y1: "أي أموال استحق أجلها ولم تُدفع بعد، وكان العميل قادراً على السداد. تُعتبر مالاً مؤكداً ويجب إدخالها فوراً في حساب الزكاة",
          y2: "ديون مقررة الدفع في المستقبل (مثال: عقد دفع بعد 6 أشهر) مع ضمان قدرة العميل. تُعتبر مضمونة وتُزكى فوراً",
          y3: "وهي مستندات قانونية تثبت ديناً مؤكداً على الغير يمكن قبضه عند الاستحقاق. تُعتبر ديناً مؤكداً وتُزكى",
          y4: "إذا أقرضت مالاً بدون فائدة أو بعت ببيع خاص مضمون السداد، فهي ديون مؤكدة. تُضم لوعاء الزكاة",
          y5: "مثل: بيع منزل سكني، مهر (صداق) مستحق، أو إرث لم يُقبض بعد. لا تُزكى إلا عند قبضها فعلياً",
          y6: "إذا حان أجلها ولم تُدفع (مثل إيجار مستحق في يناير ولم يُدفع بعد)، فهي داخلة في وعاء الزكاة",
          y7: "مثل: عميل مفلس، شخص مفقود، أو دين قديم منسي. لا تُزكى الآن. عند تحصيلها تُزكى في نفس السنة"
        }
      },
      "3": {
        label: "الاستثمارات الزكوية",
        fields: {
          z1: "أسهم للتجارة",
          z2: "حصص عقارية",
          z3: "استثمارات سندات",
          z4: "أربعون بالمئة من قيمة سوقية للاسهم بنية الاحتفاظ",
          z5:"عائدات الاسهم" 
        },
        descriptions: {
          z1: "إذا اشتريت أسهماً أو صكوكاً بنية بيعها بربح، فهي مثل البضائع التجارية. تُزكى بقيمتها السوقية عند الحول",
          z2: "مثل شراء أرض أو شقة بنية إعادة بيعها. تُزكى على القيمة السوقية الحالية، لا على ثمن الشراء",
          z3: "إذا كانت شرعية (صكوك)، فتُعامل كالبضاعة إذا نويت البيع، أو تزكى أرباحها إذا للاحتفاظ بالعائد",
          z4: "إذا كنت تملك أسهماً للاستفادة من الأرباح لا لإعادة البيع: إما تزكي على نسبة أصول الشركة الزكوية بما يتناسب مع حصتك، أو تزكي فقط على الأرباح المستلمة"
        }
      },
      "4": {
        label: "عروض التجارة والمخزون",
        fields: {
          a1: "بضاعة تامة الصنع",
          a2: "بضاعة تحت التشغيل",
          a3: "مواد أولية",
          a4: "بضاعة في الطريق",
          a5: "بضاعة أمانة لدى الغير",
          a6: "قطع غيار بقصد المتاجرة",
          a7: "عروض تجارة بهبة/إرث",
          a8: "عقارات محتكرة للتجارة",
          a9: "بضاعة كاسدة/غير معدّة للبيع"
        },
        descriptions: {
          a1: "البضائع الجاهزة للبيع دون أي تعديل. تُزكى بقيمتها السوقية",
          a2: "البضائع في مرحلة التصنيع أو التجهيز. تزكى بقيمة ما أُنجز فيها",
          a3: "المواد الخام المستخدمة في الإنتاج. تدخل في الوعاء بقيمتها الحالية",
          a4: "البضائع التي تم شراؤها ولكن لم تصل بعد",
          a5: "البضائع المخزنة أو المعطاة للآخرين تحت الأمانة",
          a6: "قطع الغيار المخصصة للبيع أو التجارة",
          a7: "البضائع المشتراة لإعادة البيع. تزكى بسعر البيع الحالي",
          a8: "العقارات المستخدمة للتجارة. تزكى بقيمتها السوقية",
          a9: "البضائع الفاسدة أو غير المعدة للبيع"
        }
      },
      "5": {
        label: "الأسهم",
        fields: {
          s1: "أسهم للاحتكار",
          s2: "أسهم بنية",
        },
        descriptions: {
          s1: "الأسهم المتداولة في الأسواق المحلية",
          s2: "الأسهم المتداولة في الأسواق الدولية",
        }
      },
      "6": {
        label: "الالتزامات واجبة الخصم",
        fields: {
          c1: "قروض قصيرة الأجل مستحقة خلال الحول",
          c2: "أوراق دفع/دائنون",
          c3: "حقوق موظفين (أجور/إجازات)",
          c4: "ضرائب مستحقة خلال الحول",
          c5: "أرباح مضاربة للغير",
          c6: "تأمينات العملاء للرد",
          c7: "احتياطيات عامة/مخصصات تقديرية"
        },
        descriptions: {
          c1: "الديون والقروض القصيرة الأجل (≤ 12 شهراً) تخصم من الوعاء الزكوي",
          c2: "المبالغ المستحقة للدفع للموردين أو الدائنين. تُخصم من الوعاء",
          c3: "الالتزامات تجاه الموظفين مثل الرواتب والإجازات. تُخصم",
          c4: "الضرائب المستحقة على الشركة خلال السنة. تُخصم",
          c5: "الأرباح التي تخص شركاء أو مستثمرين آخرين. تُخصم",
          c6: "أي تأمينات أو مبالغ مقدمة من العملاء للرد عليها. تُخصم",
          c7: "المخصصات الإلزامية مثل: الضرائب المستحقة، أجور الإجازات، الفواتير المستحقة. المخصصات العامة (احتياطيات احتمالية) لا تُخصم"
        }
      },
      malikiAssets: {
        label: "الذمات المالية",
        fields: {
          SPA: "ذمة المالية للشركة",
          SARL: "ذمة المالية للشخص",
          limit: "حد المفلس"
        },
        descriptions: {
          SPA: "الموارد المالية للشركة المملوكة للشركاء",
          SARL: "الموارد المالية الخاصة بالشخص المعني بالزكاة",
          limit: "الحد الأدنى للمبلغ الذي يعتبر الشخص مفلساً"
        }
      }
    },
    methods: {
      maliki: "معادلة حساب زكاة الشركات المالكي",
      companies: "AAOIFI معادلة حساب الشركات",
      alioua: "معادلة باسم عليوة",
      netWealth: "معادلة صافي الغنى"
    },
    ui: {
      goldPrice: {
        title: "سعر الغرام الواحد من الذهب (24 قيراط) بالدينار الجزائري",
        inputLabel: "أدخل سعر الغرام",
        placeholder: "أدخل سعر الغرام الحالي للذهب عيار 24 قيراط",
        infoText: "يُرجى إدخال سعر الغرام الحالي للذهب عيار 24 قيراط في السوق الجزائرية لحساب النصاب بدقة",
        pricePerGram: "سعر الغرام",
        nissab: "النصاب",
        grams: "غرام"
      },
      title: "المنصة الموثوقة والمخصصة لمساعدة الشركات في حساب زكاتها المستحقة بسهولة ودقة",
      subtitle: "نهدف إلى تسهيل عملية احتساب الزكاة للشركات وفقًا لأحكام الشريعة الإسلامية، وذلك لدعم التكافل الاجتماعي والمساهمة في التنمية المستدامة للمجتمع",
      assetsData: "بيانات الأصول والممتلكات",
      assetsDescription: "يرجى إدخال جميع الأصول والممتلكات الخاضعة للزكاة",
      calculationMethod: "طريقة الحساب",
      companyType: "نوع الشركة",
      calculate: "احسب الزكاة",
      addField: "إضافة حقل آخر",
      removeField: "حذف هذا الحقل",
      additionalField: "حقل إضافي",
      total: "المجموع",
      enterAmount: "أدخل المبلغ",
      enterAdditionalAmount: "أدخل المبلغ الإضافي",
      importantInfo: "معلومة مهمة",
      warningText: "يُرجى التأكد من دقة البيانات المدخلة قبل الحساب...",
      note: "ملاحظة:",
      noteText: "يمكنكم إضافة حقول إضافية لأي عنصر بالنقر على زر الإضافة (+) بجانب كل حقل.",
      show: "إظهار",
      hide: "إخفاء",
      profile: "الملف الشخصي",
      managePersonalInfo: "إدارة معلوماتك الشخصية وإعدادات الحساب",
      accountInfo: "معلومات الحساب",
      password: "كلمة المرور",
      updateAccountInfo: "قم بتحديث معلومات حسابك.",
      username: "اسم المستخدم",
      email: "البريد الإلكتروني",
      firstName: "الاسم الأول",
      lastName: "الاسم الأخير",
      enterUsername: "أدخل اسم المستخدم",
      enterEmail: "أدخل البريد الإلكتروني",
      enterFirstName: "أدخل الاسم الأول",
      enterLastName: "أدخل الاسم الأخير",
      updateInfo: "تحديث المعلومات",
      updating: "جاري التحديث...",
      changePassword: "تغيير كلمة المرور",
      enterOldNewPassword: "قم بإدخال كلمة المرور القديمة والجديدة",
      currentPassword: "كلمة المرور الحالية",
      newPassword: "كلمة المرور الجديدة",
      enterCurrentPassword: "أدخل كلمة المرور الحالية",
      enterNewPassword: "أدخل كلمة المرور الجديدة",
      updatePassword: "تحديث كلمة المرور",
      newPasswordRequired: "كلمة المرور الجديدة مطلوبة!",
      oldPasswordRequired: "كلمة المرور القديمة مطلوبة!",
      pleaseEnterNewPassword: "يرجى إدخال كلمة المرور الجديدة",
      errorOccurred: "حدث خطأ",
      dataUpdatedSuccessfully: "تم تحديث البيانات بنجاح",
      failedToLoadUserInfo: "فشل تحميل معلومات المستخدم.",
      zakatHistory: "تاريخ الزكاة",
      viewZakatHistory: "عرض سجل حساباتك السابقة للزكاة",
      noHistoryFound: "لم يتم العثور على سجل",
      noCalculationsYet: "لم تقم بأي حسابات للزكاة بعد",
      date: "التاريخ",
      method: "الطريقة",
      companyTypeLabel: "نوع الشركة",
      zakatAmount: "مبلغ الزكاة",
      details: "التفاصيل",
      loading: "جاري التحميل...",
      close: "إغلاق",
      calculationDetails: "تفاصيل الحساب",
      section1: {
        title: "الزكاة: التزام ديني ودعم للتكافل الاجتماعي",
        text: `على هذا الموقع، يمكن للشركات حساب قيمة الزكاة الواجبة عليها وفقًا للشريعة الإسلامية. وكما جاء في القرآن الكريم، فإن أداء الزكاة يعتبر من أركان الإسلام الأساسية، إذ يقول الله تعالى: "خُذْ مِنْ أَمْوَالِهِمْ صَدَقَةً تُطَهِّرُهُمْ وَتُزَكِّيهِمْ بِهَا" (سورة التوبة، الآية 103). ويقول تعالى أيضًا: "وَأَقِيمُوا الصَّلَاةَ وَآتُوا الزَّكَاةَ" (سورة البقرة، الآية 43). كل الشركات ملزمة شرعاً بأداء الزكاة المستحقة على أموالها لدعم الفقراء والمحتاجين، وذلك تأكيدًا للتضامن والعدالة الاجتماعية التي يدعو إليها الإسلام. ووفقًا لأحكام الشريعة، يتم حساب نسبة الزكاة على أساس موجودات الشركات وأرباحها السنوية. ستُستخدم أموال الزكاة التي تجمع من هذه الشركات كمساهمة في إنشاء أوقاف (WAKF) للمنافع العامة، وهي عبارة عن مشاريع استثمارية تدرّ عوائد مالية تُستخدم لخدمة المجتمع.`,
        button: "اعرف المزيد"
      },
      section2: {
        title: "نحو مجتمع أكثر تماسكًا: دور الشركات في دعم الفئات الأقل حظًا وتحقيق الأثر الإيجابي",
        text: `تتُعَدُّ هذه المبادرة خطوةً هامة تُحقّق العديد من الفوائد للمجتمع، من خلال تعزيز التضامن الاجتماعي وتلبية احتياجات الفئات الأقل حظًا. بالإضافة إلى ذلك، فإن لها تأثيرًا إيجابيًا مباشرًا على صورة الشركات المشاركة. ومن خلال وضع علامة اعتماد لهذه الشركات، نوفر رمزًا يعكس التزامها بالمسؤولية الاجتماعية. كما نخطط لإنشاء مقاطع فيديو تُظهر التغيرات الإيجابية والمشاريع التي تم تمويلها بفضل هذه التبرعات، مما يُبرز الأثر الواقعي لهذه المساهمات. وبذلك، يمكن للشركات تعزيز سياساتها في مجال المسؤولية الاجتماعية (CSR)، وإظهار اهتمامها الحقيقي بالمجتمع. علاوة على ذلك، يمكن لهذه الشركات الاستفادة من ميزة خصم هذه التبرعات من الضرائب، مما يشجعها أكثر على المشاركة الفعالة في هذا العمل النبيل.`,
        button: "اعرف المزيد",
        imageAlt: "صورة مسجد"
      },
      section3: {
        title: "سهولة ودقة في حساب زكاة الشركات وفق الشريعة الإسلامية",
        text: `ييعمل هذا الموقع بطريقة بسيطة وفعالة لمساعدة الشركات في حساب الزكاة المستحقة عليها وفقاً للمعايير الشرعية. أولاً، يتعين على المستخدم تعريف نوع شركته واختيار القطاع الذي تنتمي إليه. ثم سيُطلب منه الإجابة على بعض الأسئلة المتعلقة بالشركة ووضعها المالي، مثل قيمة الأصول، حجم الإيرادات السنوية، وقيمة رأس المال العامل، وغيرها من المعلومات المالية المهمة. استنادًا إلى هذه المعلومات المدخلة، سيقوم الموقع بتحديد الصيغة المناسبة لحساب الزكاة وفقًا لنوع الشركة ومعايير الشريعة الإسلامية. يقوم الموقع تلقائيًا بحساب المبلغ المستحق من الزكاة بناءً على البيانات المقدمة من المستخدم، ليتمكن المستخدم من معرفة المبلغ الواجب دفعه. هذه العملية تسهل على الشركات الامتثال لأحكام الزكاة وتساعدها على أداء واجباتها الدينية بسهولة ودقة، مع ضمان توجيه الأموال إلى مستحقيها وفقاً لأحكام الشريعة الإسلامية.`,
        button: "ابدأ الآن",
        imageAlt: "صورة حساب الزكاة"
      }
    },
    ma7acil: {
      title: "زكاة المحاصيل الزراعية",
      subtitle: "احسب زكاة محاصيلك الزراعية وفقاً للمعايير الشرعية المعتمدة",
      formHeader: "بيانات المحاصيل الزراعية",
      formDescription: "النصاب: {nissab} كغ • أضف محاصيلك واحسب زكاتها",
      cropLabel: "المحصول {number}",
      addCrop: "إضافة محصول جديد",
      calculate: "احسب الزكاة",
      saveResults: "حفظ النتائج",
      saving: "جاري الحفظ...",
      
      fields: {
        cropType: "نوع المحصول",
        cropTypePlaceholder: "أدخل نوع المحصول (قمح، شعير، تمر...)",
        wateringMethod: "طريقة السقي",
        quantity: "الكمية (كيلوغرام)",
        quantityPlaceholder: "أدخل الكمية",
        ownershipType: "نوع الملكية",
        ownershipShare: "نصيبك من الملكية (%)",
        ownershipSharePlaceholder: "أدخل النسبة المئوية"
      },
      
      wateringMethods: {
        rain: "سقي بالمطر (10%)",
        mixed: "سقي مختلط (7.5%)",
        artificial: "سقي اصطناعي (5%)"
      },
      
      ownershipTypes: {
        individual: "ملكية فردية",
        shared: "ملكية مشتركة"
      },
      
      zakatDue: "الزكاة المستحقة:",
      rateApplied: "المعدل المطبق:",
      yourShare: "نصيبك:",
      kg: "كغ",
      percent: "%",
      
      info: {
        title: "معلومات مهمة",
        nissabText: "النصاب للمحاصيل الزراعية: {nissab} كيلوغرام",
        rainWatering: "السقي بالمطر أو الأنهار: 10% من المحصول",
        mixedWatering: "السقي المختلط: 7.5% من المحصول",
        artificialWatering: "السقي الاصطناعي (بالآلات): 5% من المحصول"
      },
      
      messages: {
        loginRequired: "يجب تسجيل الدخول أولاً للحفظ",
        noZakatToBeSaved: "لا توجد محاصيل مستحقة للزكاة للحفظ",
        saveSuccess: "تم حفظ المحاصيل بنجاح!",
        saveFailed: "فشل حفظ المحاصيل، حاول مرة أخرى"
      },
      
      show: "إظهار",
      hide: "إخفاء"
    },
    mawachi: {
      title: "زكاة المواشي",
      subtitle: "احسب زكاة الإبل والبقر والغنم وفقاً للشريعة الإسلامية",
      formHeader: "بيانات المواشي",
      formDescription: "أضف مواشيك واحسب زكاتها حسب النصاب الشرعي",
      addAnimal: "إضافة ماشية جديدة",
      calculate: "احسب الزكاة",
      saveResults: "حفظ النتائج",
      saving: "جاري الحفظ...",
      
      fields: {
        animalType: "نوع الماشية",
        quantity: "العدد",
        quantityPlaceholder: "أدخل عدد الرؤوس"
      },
      
      animalTypes: {
        camel: "الإبل",
        cow: "البقر",
        sheep: "الغنم"
      },
      
      zakatDue: "الزكاة المستحقة:",
      head: "رأس",
      noZakat: "لا شيء",
      
      camel: {
        sheep1: "شاة واحدة",
        sheep2: "شاتان",
        sheep3: "ثلاث شياه",
        sheep4: "أربع شياه",
        bintMakhad: "بنت مخاض (في السنة الثانية)",
        bintLaboun: "بنت لبون (في السنة الثالثة)",
        hiqqah: "حِقّة (في السنة الرابعة)",
        jadhaah: "جذعة (في السنة الخامسة)",
        bintLaboun2: "بنتا لبون",
        hiqqah2: "حقتان",
        bintLaboun3: "ثلاث بنات لبون",
        hiqqaBintLaboun2: "حقة + بنتا لبون",
        hiqqah2BintLaboun: "حقتان + بنت لبون",
        hiqqah3: "ثلاث حقاق",
        bintLaboun4: "أربع بنات لبون",
        hiqqaBintLaboun3: "حقة + ثلاث بنات لبون",
        hiqqah2BintLaboun2: "حقتان + بنتا لبون",
        hiqqah3BintLaboun: "ثلاث حقاق + بنت لبون",
        hiqqah4OrBintLaboun5: "أربع حقاق أو خمس بنات لبون",
        hiqqaBintLaboun4: "حقة + أربع بنات لبون",
        hiqqah2BintLaboun3: "حقتان + ثلاث بنات لبون",
        hiqqah3BintLaboun2: "ثلاث حقاق + بنتا لبون",
        hiqqah4BintLaboun: "أربع حقاق + بنت لبون",
        above249: "{hiqqah} حقة و {bintLaboun} بنت لبون (عن كل 50 حقة، وعن كل 40 بنت لبون)"
      },
      
      cow: {
        tabee: "تبيع أو تبيعة (في السنة الثانية)",
        musinnah: "مسنة (في السنة الثالثة)",
        tabee2: "تبيعان أو تبيعتان",
        musinnahTabee: "مسنة + تبيع أو تبيعة",
        musinnah2: "مسنتان",
        tabee3: "ثلاثة أتبعة أو ثلاث تبيعات",
        musinnahTabee2: "مسنة + تبيعان أو تبيعتان",
        musinnah2Tabee: "مسنتان + تبيع أو تبيعة",
        musinnah3OrTabee4: "ثلاث مسنات أو أربع تبيعات",
        above129: "{tabee} تبيع و {musinnah} مسنة (عن كل 30 تبيع، وعن كل 40 مسنة)"
      },
      
      sheep: {
        sheep1: "شاة واحدة",
        sheep2: "شاتان",
        sheep3: "ثلاث شياه",
        sheep4: "أربع شياه",
        above499: "{count} شاة (عن كل 100 رأس شاة واحدة)"
      },
      
      info: {
        title: "معلومات مهمة",
        camelTitle: "الإبل:",
        camelNissab: "النصاب من 5 رؤوس",
        cowTitle: "البقر:",
        cowNissab: "النصاب من 30 رأساً",
        sheepTitle: "الغنم:",
        sheepNissab: "النصاب من 40 رأساً"
      },
      
      messages: {
        loginRequired: "يجب تسجيل الدخول أولاً للحفظ",
        noZakatToBeSaved: "لا توجد مواشي مستحقة للزكاة للحفظ",
        saveSuccess: "تم حفظ المواشي بنجاح!",
        saveFailed: "فشل حفظ المواشي، حاول مرة أخرى"
      },
      
      show: "إظهار",
      hide: "إخفاء"
    }
  },
  fr: {
    forms: {
      "1": {
        label: "Argent et équivalents",
        fields: {
          x1: "Liquidités en caisse",
          x2: "Liquidités en banque",
          x3: "Chèques certifiés",
          x4: "Devises étrangères",
          x5: "Actifs numériques disponibles",
          x6: "Dépôts en fiducie",
          x7: "Prêt à bon crédit",
          x8: "Revenus à recevoir",
          x9: "Argent provenant de la vente d'actifs"
        },
        descriptions: {
          x1: "Ce sont les billets et pièces que vous avez directement dans vos mains ou dans votre coffre. Ces montants sont immédiatement disponibles et sont soumis à la zakat s'ils atteignent le nisab et qu'une année lunaire s'est écoulée",
          x2: "Il s'agit des soldes que vous possédez sur vos comptes bancaires, accessibles à tout moment sans délai. Peu importe si vous les laissez dormir à la banque ou si vous les utilisez fréquemment : ce sont des liquidités disponibles, donc zakatables",
          x3: "Ce sont des chèques déjà validés ou certifiés par la banque, que vous détenez et que vous pouvez encaisser immédiatement. Ils sont considérés comme de l'argent liquide disponible et doivent donc être inclus dans le calcul de la zakat",
          x4: "Si vous possédez des devises étrangères (dollars, euros, etc.), elles doivent aussi être prises en compte. On les convertit dans la monnaie locale au taux du jour (au moment du calcul de la zakat), puis on les inclut dans l'assiette zakatable",
          x5: "Les cryptomonnaies (Bitcoin, Ethereum, etc.) détenues et pouvant être utilisées ou revendues immédiatement sont assimilées à des liquidités. Leur valeur au marché (prix actuel de la crypto) est ajoutée au calcul de la zakat",
          x6: "Ce sont des sommes placées en dépôt à terme ou sous forme de dépôts de garantie, mais disponibles actuellement (vous pouvez les retirer ou les utiliser). Dans ce cas, elles sont considérées comme des liquidités et doivent être incluses dans la zakat",
          x7: "C'est l'argent que vous avez prêté à quelqu'un à titre gratuit (sans intérêt). Tant que vous ne l'avez pas récupéré, il n'entre pas dans votre calcul. La zakat ne s'applique qu'au moment où l'argent vous est restitué",
          x8: "Ce sont les revenus qui vous sont dus (par exemple des honoraires, des loyers, des prestations déjà effectuées) mais que vous n'avez pas encore encaissés. La règle est simple : vous ne payez la zakat que lorsque vous recevez effectivement cet argent",
          x9: "Si vous recevez de l'argent suite à la vente d'actifs non zakatables (comme une maison utilisée pour habiter, ou un bien reçu gratuitement – don, héritage, etc.), cet argent ne devient zakatable que lorsqu'il remplit les conditions de la zakat (atteinte du nisab, écoulement d'une année lunaire, etc.)"
        }
      },
      "2": {
        label: "Créances",
        fields: {
          y1: "Dettes à court terme attendues",
          y2: "Dettes différées",
          y3: "Effets à recevoir",
          y4: "Dettes attendues",
          y5: "Dettes provenant de la vente d'actifs",
          y6: "Revenus locatifs",
          y7: "Dettes douteuses"
        },
        descriptions: {
          y1: "C'est l'argent que vos clients vous doivent et dont la date de paiement est déjà arrivée. Ces créances doivent être incluses dans votre calcul de zakat dès maintenant, car elles sont assimilées à de l'argent liquide, simplement en attente d'être encaissé",
          y2: "Il s'agit aussi de dettes de vos clients, mais avec un paiement prévu plus tard, à une date future. Si vous êtes sûr de la solvabilité du client et que cette créance est garantie, vous devez inclure ces montants dans la zakat",
          y3: "Ce sont les billets à ordre, les lettres de change ou tout autre document écrit qui constate une dette certaine d'un tiers envers vous. Comme il s'agit d'une créance solide et garantie, elle doit être intégrée dans l'assiette zakatable",
          y4: "Il s'agit d'argent que vous avez prêté à quelqu'un (sans intérêt), ou d'argent dû à la suite d'une vente spécifique. Si vous êtes confiant que le débiteur vous remboursera, on inclut ces créances dans le calcul de la zakat",
          y5: "Parfois, vous pouvez avoir de l'argent à recevoir, mais qui ne provient pas d'une activité commerciale (vente d'une maison personnelle, dot, héritage). La zakat ne s'applique donc qu'au moment où vous recevez réellement ces sommes",
          y6: "Si vous avez des revenus locatifs qui sont arrivés à échéance mais pas encore encaissés, ils doivent être pris en compte dans le calcul de la zakat. Tout revenu arrivé à échéance et dû fait partie de l'assiette de la zakat",
          y7: "C'est le cas où vous avez une créance, mais vous doutez sérieusement que le débiteur vous paie un jour (client en faillite, personne disparue, dette très ancienne). Vous n'êtes pas tenu de les inclure dans votre zakat immédiatement. Vous attendez de les récupérer réellement"
        }
      },
      "3": {
        label: "Investissements soumis à la Zakat",
        fields: {
          z1: "Actions commerciales",
          z2: "Parts immobilières",
          z3: "Investissements en obligations",
          z4: "Actions avec retour sur investissement"
        },
        descriptions: {
          z1: "Ce sont les actions (parts d'entreprises) et les Sukuk (titres financiers islamiques) que vous achetez dans l'objectif de les revendre avec une plus-value. Ces titres sont traités comme un stock de marchandises : on paie la zakat sur leur valeur actuelle de marché",
          z2: "Cela concerne les biens immobiliers achetés uniquement dans un but de revente avec profit. L'immobilier est assimilé à une marchandise. On calcule la zakat sur la valeur marchande actuelle du bien, pas sur le prix d'achat ni sur les loyers",
          z3: "Il s'agit des placements en obligations ou bons du Trésor. Lorsqu'il s'agit de sukuk conformes, ou de produits autorisés, on paie la zakat sur leur valeur de marché si on les détient pour les revendre, ou sur les revenus générés si on les conserve",
          z4: "Dans ce cas, vous n'achetez pas les actions pour les revendre rapidement, mais pour toucher chaque année une part des bénéfices. Soit vous calculez la zakat sur la partie zakatable des actifs de la société, soit vous appliquez la zakat uniquement sur les dividendes encaissés"
        }
      },
      "4": {
        label: "Marchandises et stocks",
        fields: {
          a1: "Marchandise finie",
          a2: "Marchandise en cours",
          a3: "Matières premières",
          a4: "Marchandise en transit",
          a5: "Marchandise en fiducie",
          a6: "Pièces détachées",
          a7: "Offres commerciales",
          a8: "Immobilier commercial",
          a9: "Marchandise périmée"
        },
        descriptions: {
          a1: "Ce sont les biens que votre entreprise détient pour les vendre directement, prêts à être commercialisés. La zakat se calcule sur la valeur marchande actuelle",
          a2: "Ce sont les biens qui ne sont pas encore terminés mais qui sont déjà en cours de production. La zakat s'applique sur cette valeur intermédiaire",
          a3: "Ce sont les matériaux de base utilisés pour fabriquer vos produits finis. Ces matières premières sont considérées comme marchandises destinées à la vente indirecte, donc elles entrent dans le calcul de la zakat",
          a4: "Marchandises achetées mais non encore reçues",
          a5: "Marchandises entreposées ou confiées à des tiers",
          a6: "Pièces de rechange destinées à la vente ou au commerce",
          a7: "Il s'agit des biens achetés dans le but de les revendre tels quels, sans aucune transformation. La zakat se calcule sur la valeur totale de revente",
          a8: "Biens immobiliers utilisés pour le commerce. La zakat se calcule sur leur valeur marchande",
          a9: "Marchandises avariées ou non destinées à la vente"
        }
      },
      "5": {
        label: "Actions",
        fields: {
          s1: "Actions locales",
          s2: "Actions internationales",
        },
        descriptions: {
          s1: "Actions négociées sur les marchés locaux",
          s2: "Actions négociées sur les marchés internationaux",
        }
      },
      "6": {
        label: "Obligations déductibles",
        fields: {
          c1: "Prêts à court terme",
          c2: "Effets à payer",
          c3: "Droits des employés",
          c4: "Taxes à payer",
          c5: "Profits des tiers",
          c6: "Assurances clients",
          c7: "Réserves générales"
        },
        descriptions: {
          c1: "Toutes les dettes qui doivent être remboursées dans les 12 mois à venir. Ces montants viennent en déduction de l'assiette de la zakat",
          c2: "Toutes les factures et obligations financières vis-à-vis des fournisseurs, arrivant à échéance durant l'année. Cette dette est déductible",
          c3: "Obligations envers les employés (salaires, congés payés). Elles se déduisent",
          c4: "Impôts et taxes dues et exigibles dans l'année. Elles se déduisent",
          c5: "Bénéfices appartenant à des partenaires ou autres investisseurs. Ils sont déduits",
          c6: "Cautions, dépôts reçus des clients, avances qui doivent être restituées. Elles sont déduites car elles ne nous appartiennent pas réellement",
          c7: "Certaines provisions obligatoires doivent être considérées car elles représentent des obligations certaines. Les provisions générales ou estimatives ne sont pas déductibles"
        }
      },
      malikiAssets: {
        label: "Actifs financiers",
        fields: {
          SPA: "Actifs de la société",
          SARL: "Actifs de l'individu",
          limit: "Limite de faillite"
        },
        descriptions: {
          SPA: "Ressources financières de l'entreprise détenues par les associés",
          SARL: "Ressources financières personnelles de la personne concernée par la Zakat",
          limit: "Montant minimum en dessous duquel une personne est considérée insolvable"
        }
      }
    },
    methods: {
      maliki: "Formule de calcul Zakat des entreprises (Maliki)",
      companies: "Formule AAOIFI de calcul des entreprises",
      alioua: "Formule Alioua",
      netWealth: "Formule de richesse nette"
    },
    ui: {
      goldPrice: {
        title: "Prix d'un gramme d'or (24 carats) en DZD",
        inputLabel: "Entrez le prix du gramme",
        placeholder: "Entrez le prix actuel de l'or 24 carats",
        infoText: "Veuillez saisir le prix actuel de l'or 24 carats sur le marché algérien pour calculer le nissab avec précision",
        pricePerGram: "Prix par gramme",
        nissab: "Nissab",
        grams: "grammes"
      },
      title: "La plateforme de confiance dédiée à aider les entreprises à calculer facilement et précisément leur zakat due",
      subtitle: "Notre objectif est de faciliter le processus de calcul de la Zakat pour les entreprises conformément aux dispositions de la charia islamique, afin de soutenir la solidarité sociale et de contribuer au développement durable de la société",
      assetsData: "Données des actifs et propriétés",
      assetsDescription: "Veuillez saisir tous les actifs et propriétés soumis à la Zakat",
      calculationMethod: "Méthode de calcul",
      companyType: "Type de société",
      calculate: "Calculer la Zakat",
      addField: "Ajouter un autre champ",
      removeField: "Supprimer ce champ",
      additionalField: "Champ supplémentaire",
      total: "Total",
      enterAmount: "Entrer le montant",
      enterAdditionalAmount: "Entrer le montant supplémentaire",
      importantInfo: "Information importante",
      warningText: "Veuillez vérifier l'exactitude des données saisies avant le calcul",
      note: "Note:",
      noteText: "Vous pouvez ajouter des champs supplémentaires pour n'importe quel élément",
      show: "Afficher",
      hide: "Masquer",
      profile: "Profil",
      managePersonalInfo: "Gérez vos informations personnelles et paramètres du compte",
      accountInfo: "Infos du compte",
      password: "Mot de passe",
      updateAccountInfo: "Mettez à jour vos informations de compte.",
      username: "Nom d'utilisateur",
      email: "Email",
      firstName: "Prénom",
      lastName: "Nom de famille",
      enterUsername: "Entrez le nom d'utilisateur",
      enterEmail: "Entrez l'email",
      enterFirstName: "Entrez le prénom",
      enterLastName: "Entrez le nom de famille",
      updateInfo: "Mettre à jour",
      updating: "Mise à jour...",
      changePassword: "Changer le mot de passe",
      enterOldNewPassword: "Entrez l'ancien et le nouveau mot de passe",
      currentPassword: "Mot de passe actuel",
      newPassword: "Nouveau mot de passe",
      enterCurrentPassword: "Entrez le mot de passe actuel",
      enterNewPassword: "Entrez le nouveau mot de passe",
      updatePassword: "Mettre à jour le mot de passe",
      newPasswordRequired: "Le nouveau mot de passe est requis!",
      oldPasswordRequired: "L'ancien mot de passe est requis!",
      pleaseEnterNewPassword: "Veuillez entrer un nouveau mot de passe",
      errorOccurred: "Une erreur est survenue",
      dataUpdatedSuccessfully: "Les informations ont été mises à jour avec succès",
      failedToLoadUserInfo: "Échec du chargement des informations utilisateur.",
      zakatHistory: "Historique Zakat",
      viewZakatHistory: "Consultez l'historique de vos calculs Zakat précédents",
      noHistoryFound: "Aucun historique trouvé",
      noCalculationsYet: "Vous n'avez pas encore effectué de calculs Zakat",
      date: "Date",
      method: "Méthode",
      companyTypeLabel: "Type de société",
      zakatAmount: "Montant Zakat",
      details: "Détails",
      loading: "Chargement...",
      close: "Fermer",
      calculationDetails: "Détails du calcul",
      section1: {
        title: "Zakat : Engagement religieux et soutien à la solidarité sociale",
        text: `Sur ce site web, les entreprises peuvent calculer leur obligation de Zakat conformément à la loi islamique. Comme l'indique le Saint Coran, le versement de la Zakat est l'un des piliers fondamentaux de l'Islam. Dieu Tout-Puissant dit : « Prélève de leurs biens une aumône par laquelle tu les purifies et les fais croître en bien » (Sourate At-Tawbah, verset 103). Il dit également : « Accomplis la prière et acquitte-toi de la Zakat » (Sourate Al-Baqarah, verset 43). Toutes les entreprises ont l'obligation religieuse de verser la Zakat sur leurs biens afin de soutenir les pauvres et les nécessiteux, affirmant ainsi la solidarité et la justice sociale prônées par l'Islam. Conformément aux règles de la charia, le taux de la Zakat est calculé en fonction des actifs et des bénéfices annuels de l'entreprise. Les fonds de Zakat collectés auprès de ces entreprises serviront à la constitution de waqfs (fondations waqf) d'utilité publique, c'est-à-dire des projets d'investissement générant des revenus destinés à servir la communauté.`,
        button: "En savoir plus"
      },
      section2: {
        title: "Vers une société plus solidaire : rôle des entreprises dans le soutien aux moins favorisés",
        text: `Cette initiative représente une avancée majeure qui apporte de nombreux bienfaits à la société en renforçant la solidarité et en répondant aux besoins des plus démunis. De plus, elle a un impact direct et positif sur l'image des entreprises participantes. En leur attribuant un label de certification, nous leur offrons un symbole qui témoigne de leur engagement en matière de responsabilité sociale. Nous prévoyons également de réaliser des vidéos illustrant les changements positifs et les projets financés par ces dons, mettant ainsi en lumière l'impact concret de ces contributions. Cela permet aux entreprises d'améliorer leurs politiques RSE et de démontrer leur véritable souci du bien commun. Par ailleurs, ces entreprises peuvent bénéficier de dons déductibles d'impôt, ce qui les encourage davantage à participer activement à cette noble cause.`,
        button: "En savoir plus",
        imageAlt: "Image mosquée"
      },
      section3: {
        title: "Facilité et précision dans le calcul de la Zakat des entreprises selon la charia",
        text: `Ce site web permet aux entreprises de calculer facilement et efficacement leur Zakat (aumône légale islamique) conformément aux principes de la Charia. L'utilisateur doit d'abord définir le type de son entreprise et sélectionner son secteur d'activité. Il lui sera ensuite demandé de répondre à quelques questions concernant l'entreprise et sa situation financière, notamment la valeur de ses actifs, son chiffre d'affaires annuel, son fonds de roulement et d'autres informations financières importantes. À partir de ces informations, le site web déterminera la formule de calcul de la Zakat appropriée, en fonction du type d'entreprise et des principes de la Charia. Le montant de la Zakat due est calculé automatiquement à partir des données fournies par l'utilisateur, qui peut ainsi connaître le montant à payer. Ce processus facilite le respect des obligations liées à la Zakat pour les entreprises et les aide à s'acquitter de leurs obligations religieuses facilement et précisément, tout en garantissant que les fonds soient versés à leurs bénéficiaires légitimes, conformément aux principes de la Charia.`,
        button: "Commencer maintenant",
        imageAlt: "Image calcul Zakat"
      }
    },
    ma7acil: {
      title: "Zakat des Récoltes Agricoles",
      subtitle: "Calculez la Zakat de vos récoltes agricoles selon les normes de la charia",
      formHeader: "Données des Récoltes Agricoles",
      formDescription: "Nissab: {nissab} kg • Ajoutez vos récoltes et calculez leur Zakat",
      cropLabel: "Récolte {number}",
      addCrop: "Ajouter une nouvelle récolte",
      calculate: "Calculer la Zakat",
      saveResults: "Enregistrer les résultats",
      saving: "Enregistrement en cours...",
      
      fields: {
        cropType: "Type de récolte",
        cropTypePlaceholder: "Entrez le type de récolte (blé, orge, dattes...)",
        wateringMethod: "Méthode d'irrigation",
        quantity: "Quantité (kilogrammes)",
        quantityPlaceholder: "Entrez la quantité",
        ownershipType: "Type de propriété",
        ownershipShare: "Votre part de propriété (%)",
        ownershipSharePlaceholder: "Entrez le pourcentage"
      },
      
      wateringMethods: {
        rain: "Irrigation par pluie (10%)",
        mixed: "Irrigation mixte (7,5%)",
        artificial: "Irrigation artificielle (5%)"
      },
      
      ownershipTypes: {
        individual: "Propriété individuelle",
        shared: "Propriété partagée"
      },
      
      zakatDue: "Zakat due:",
      rateApplied: "Taux appliqué:",
      yourShare: "Votre part:",
      kg: "kg",
      percent: "%",
      
      info: {
        title: "Informations importantes",
        nissabText: "Nissab pour les récoltes agricoles: {nissab} kilogrammes",
        rainWatering: "Irrigation par pluie ou rivières: 10% de la récolte",
        mixedWatering: "Irrigation mixte: 7,5% de la récolte",
        artificialWatering: "Irrigation artificielle (par machines): 5% de la récolte"
      },
      
      messages: {
        loginRequired: "Vous devez d'abord vous connecter pour enregistrer",
        noZakatToBeSaved: "Aucune récolte soumise à la Zakat à enregistrer",
        saveSuccess: "Récoltes enregistrées avec succès!",
        saveFailed: "Échec de l'enregistrement des récoltes, réessayez"
      },
      
      show: "Afficher",
      hide: "Masquer"
    },
    mawachi: {
      title: "Zakat du Bétail",
      subtitle: "Calculez la Zakat des chameaux, bovins et ovins selon la charia islamique",
      formHeader: "Données du Bétail",
      formDescription: "Ajoutez votre bétail et calculez sa Zakat selon le Nissab légal",
      addAnimal: "Ajouter un animal",
      calculate: "Calculer la Zakat",
      saveResults: "Enregistrer les résultats",
      saving: "Enregistrement en cours...",
      
      fields: {
        animalType: "Type d'animal",
        quantity: "Nombre",
        quantityPlaceholder: "Entrez le nombre de têtes"
      },
      
      animalTypes: {
        camel: "Chameaux",
        cow: "Bovins",
        sheep: "Ovins"
      },
      
      zakatDue: "Zakat due:",
      head: "tête",
      noZakat: "Aucune",
      
      camel: {
        sheep1: "Un mouton",
        sheep2: "Deux moutons",
        sheep3: "Trois moutons",
        sheep4: "Quatre moutons",
        bintMakhad: "Bint Makhad (2ème année)",
        bintLaboun: "Bint Laboun (3ème année)",
        hiqqah: "Hiqqah (4ème année)",
        jadhaah: "Jadhaah (5ème année)",
        bintLaboun2: "Deux Bint Laboun",
        hiqqah2: "Deux Hiqqah",
        bintLaboun3: "Trois Bint Laboun",
        hiqqaBintLaboun2: "Hiqqah + deux Bint Laboun",
        hiqqah2BintLaboun: "Deux Hiqqah + Bint Laboun",
        hiqqah3: "Trois Hiqqah",
        bintLaboun4: "Quatre Bint Laboun",
        hiqqaBintLaboun3: "Hiqqah + trois Bint Laboun",
        hiqqah2BintLaboun2: "Deux Hiqqah + deux Bint Laboun",
        hiqqah3BintLaboun: "Trois Hiqqah + Bint Laboun",
        hiqqah4OrBintLaboun5: "Quatre Hiqqah ou cinq Bint Laboun",
        hiqqaBintLaboun4: "Hiqqah + quatre Bint Laboun",
        hiqqah2BintLaboun3: "Deux Hiqqah + trois Bint Laboun",
        hiqqah3BintLaboun2: "Trois Hiqqah + deux Bint Laboun",
        hiqqah4BintLaboun: "Quatre Hiqqah + Bint Laboun",
        above249: "{hiqqah} Hiqqah et {bintLaboun} Bint Laboun (pour chaque 50: Hiqqah, pour chaque 40: Bint Laboun)"
      },
      
      cow: {
        tabee: "Tabee ou Tabeea (2ème année)",
        musinnah: "Musinnah (3ème année)",
        tabee2: "Deux Tabee ou Tabeea",
        musinnahTabee: "Musinnah + Tabee ou Tabeea",
        musinnah2: "Deux Musinnah",
        tabee3: "Trois Tabee ou Tabeea",
        musinnahTabee2: "Musinnah + deux Tabee ou Tabeea",
        musinnah2Tabee: "Deux Musinnah + Tabee ou Tabeea",
        musinnah3OrTabee4: "Trois Musinnah ou quatre Tabee",
        above129: "{tabee} Tabee et {musinnah} Musinnah (pour chaque 30: Tabee, pour chaque 40: Musinnah)"
      },
      
      sheep: {
        sheep1: "Un mouton",
        sheep2: "Deux moutons",
        sheep3: "Trois moutons",
        sheep4: "Quatre moutons",
        above499: "{count} moutons (un mouton pour chaque 100 têtes)"
      },
      
      info: {
        title: "Informations importantes",
        camelTitle: "Chameaux:",
        camelNissab: "Nissab à partir de 5 têtes",
        cowTitle: "Bovins:",
        cowNissab: "Nissab à partir de 30 têtes",
        sheepTitle: "Ovins:",
        sheepNissab: "Nissab à partir de 40 têtes"
      },
      
      messages: {
        loginRequired: "Vous devez d'abord vous connecter pour enregistrer",
        noZakatToBeSaved: "Aucun bétail soumis à la Zakat à enregistrer",
        saveSuccess: "Bétail enregistré avec succès!",
        saveFailed: "Échec de l'enregistrement du bétail, réessayez"
      },
      
      show: "Afficher",
      hide: "Masquer"
    }
  },
  en: {
    forms: {
      "1": {
        label: "Cash and equivalents",
        fields: {
          x1: "Cash on hand",
          x2: "Cash at banks",
          x3: "Certified checks",
          x4: "Foreign currencies",
          x5: "Available digital assets",
          x6: "Fiduciary deposits",
          x7: "Good loan granted",
          x8: "Receivable income",
          x9: "Money from sale of assets"
        },
        descriptions: {
          x1: "These are the banknotes and coins you physically have in your hands or stored in a safe. These amounts are immediately available and subject to zakat if they reach the nisab threshold and a lunar year has passed",
          x2: "These are the balances you hold in your bank accounts, accessible at any time without delay. Regardless of whether you keep them idle in the bank or use them frequently, they are considered available liquid assets, and therefore zakatable",
          x3: "These are checks already validated or certified by the bank, which you hold and can cash immediately. They are treated as available liquid money and must be included in zakat calculations",
          x4: "If you hold foreign currencies (dollars, euros, etc.), they must also be included. They should be converted into local currency at the current exchange rate (on the zakat calculation date), and then added to the zakatable base",
          x5: "Cryptocurrencies (Bitcoin, Ethereum, etc.) that are held and can be immediately used or sold are considered liquid assets. Their market value (current crypto price) is added to the zakat calculation",
          x6: "These are sums placed in time deposits, escrow, or as security deposits but which are currently accessible (you can withdraw or use them). In this case, they are considered liquid and must be included in zakat",
          x7: "This refers to money you lent to someone free of charge (without interest). As long as it has not been returned, it is not included in your zakat calculation. Zakat becomes due only once the money is repaid to you",
          x8: "These are amounts owed to you (fees, rent, or services already rendered) but not yet received. The rule is simple: you only pay zakat once you actually collect the money",
          x9: "If you receive money from selling non-zakatable assets (such as a personal house, or a gift/inheritance), that money only becomes zakatable once it meets zakat conditions (reaches nisab, one lunar year passes, etc.)"
        }
      },
      "2": {
        label: "Receivables",
        fields: {
          y1: "Expected short-term debts",
          y2: "Deferred debts",
          y3: "Receivable papers",
          y4: "Expected debts",
          y5: "Debts from sale of assets",
          y6: "Rental income",
          y7: "Doubtful debts"
        },
        descriptions: {
          y1: "This refers to money clients owe you where the payment date has already passed. These amounts must be included in zakat immediately, as they are equivalent to cash simply awaiting collection",
          y2: "This is also money owed by clients but with payment scheduled for a future date. If the client is solvent and repayment is guaranteed, these amounts must be included in zakat since they represent guaranteed wealth",
          y3: "These are promissory notes, bills of exchange, or any written document confirming a certain debt owed to you by a third party. As these are solid, guaranteed receivables, they must be included in zakat",
          y4: "This is money you lent to someone (interest-free, since interest is prohibited in Islam), or money owed from special types of sales. If repayment is assured, these must also be included in zakat",
          y5: "Sometimes money owed to you doesn't come from trade (selling a personal house, a dowry owed, an inheritance). In such cases, zakat only applies once the money is actually collected",
          y6: "If you have rental income, service fees, or farm lease payments that are due but unpaid, they must be included in zakat. Any income already due is part of zakat, even if delayed",
          y7: "This is when you doubt repayment (bankrupt client, missing debtor, old unpaid debt). These are excluded from zakat until actually recovered. If they are ever recovered, they are included in zakat that year"
        }
      },
      "3": {
        label: "Zakat investments",
        fields: {
          z1: "Trade stocks",
          z2: "Real estate shares",
          z3: "Bond investments",
          z4: "Return on investment stocks"
        },
        descriptions: {
          z1: "These are shares (of listed or unlisted companies) or Islamic Sukuk bought with the aim of resale for profit. These are treated as trade goods: zakat is paid on their current market value at year-end",
          z2: "This refers to properties (apartments, houses, land, premises) bought only for resale. Zakat applies to their current market value, not purchase price or rental income",
          z3: "These include bonds, treasury bills, etc. For shariah-compliant Sukuk: if held for trading → zakat on their market value. If held for income → zakat on income generated",
          z4: "Here, shares are held long-term to earn annual dividends. Two approaches apply: Calculate zakat on zakatable assets of the company proportional to your ownership, or pay zakat only on dividends received"
        }
      },
      "4": {
        label: "Goods and inventory",
        fields: {
          a1: "Finished goods",
          a2: "Goods in process",
          a3: "Raw materials",
          a4: "Goods in transit",
          a5: "Goods held in trust",
          a6: "Spare parts",
          a7: "Commercial offers",
          a8: "Commercial real estate",
          a9: "Spoiled goods"
        },
        descriptions: {
          a1: "These are goods held for direct sale. Zakat is based on current market value, not purchase cost",
          a2: "Goods not yet finished but already in production. Zakat applies to their intermediate value",
          a3: "Materials used to make finished goods. These are zakatable at current market value",
          a4: "Goods purchased but not yet received",
          a5: "Goods stored or entrusted to others",
          a6: "Spare parts intended for sale or trade",
          a7: "Goods bought to be resold as is. Zakat applies to their resale value, not cost price",
          a8: "Real estate used for trade and speculation. Zakat based on market value",
          a9: "Spoiled goods or those not intended for sale"
        }
      },
      "5": {
        label: "Stocks",
        fields: {
          s1: "Local stocks",
          s2: "International stocks",
        },
        descriptions: {
          s1: "Stocks traded on local markets",
          s2: "Stocks traded on international markets",
        }
      },
      "6": {
        label: "Deductible liabilities",
        fields: {
          c1: "Short-term loans",
          c2: "Payable papers",
          c3: "Employee rights",
          c4: "Taxes payable",
          c5: "Profits for others",
          c6: "Client insurance",
          c7: "General reserves"
        },
        descriptions: {
          c1: "All debts due within 12 months. Deducted from zakatable assets",
          c2: "All bills/obligations to suppliers or partners due within the year. This debt is deductible",
          c3: "Obligations to employees (salaries, paid leave). They are deducted",
          c4: "Taxes due and payable within the year. They are deducted",
          c5: "Profits belonging to partners or other investors. They are deducted",
          c6: "Deposits or advances from clients to be returned. They are deducted as they don't truly belong to you",
          c7: "Certain mandatory provisions must be considered as they represent certain obligations. General or estimated provisions are not deductible"
        }
      },
      malikiAssets: {
        label: "Financial assets",
        fields: {
          SPA: "Company assets",
          SARL: "Individual assets",
          limit: "Bankruptcy limit"
        },
        descriptions: {
          SPA: "Financial resources of the company owned by partners",
          SARL: "Personal financial resources of the person concerned with Zakat",
          limit: "Minimum amount below which a person is considered insolvent"
        }
      }
    },
    methods: {
      maliki: "Maliki Corporate Zakat Calculation Formula",
      companies: "AAOIFI Corporate Calculation Formula",
      alioua: "Alioua Formula",
      netWealth: "Net Wealth Formula"
    },
    ui: {
      goldPrice: {
        title: "Gold Price per Gram (24 Carats) in DZD",
        inputLabel: "Enter gold price per gram",
        placeholder: "Enter current 24 carat gold price",
        infoText: "Please enter the current 24 carat gold price in Algerian market to calculate Nissab accurately",
        pricePerGram: "Price per gram",
        nissab: "Nissab",
        grams: "grams"
      },
      title: "The trusted platform dedicated to helping companies calculate their due zakat easily and accurately",
      subtitle: "We aim to facilitate the calculation of Zakat for companies in accordance with the provisions of Islamic Sharia, in order to support social solidarity and contribute to the sustainable development of society",
      assetsData: "Assets and Properties Data",
      assetsDescription: "Please enter all assets and properties subject to Zakat",
      calculationMethod: "Calculation Method",
      companyType: "Company Type",
      calculate: "Calculate Zakat",
      addField: "Add Another Field",
      removeField: "Remove This Field",
      additionalField: "Additional Field",
      total: "Total",
      enterAmount: "Enter Amount",
      enterAdditionalAmount: "Enter Additional Amount",
      importantInfo: "Important Information",
      warningText: "Please verify the accuracy of the entered data before calculation...",
      note: "Note:",
      noteText: "You can add additional fields for any item by clicking the add (+) button next to each field.",
      show: "Show",
      hide: "Hide",
      profile: "Profile",
      managePersonalInfo: "Manage your personal info and account settings",
      accountInfo: "Account Info",
      password: "Password",
      updateAccountInfo: "Update your account info.",
      username: "Username",
      email: "Email",
      firstName: "First Name",
      lastName: "Last Name",
      enterUsername: "Enter username",
      enterEmail: "Enter email",
      enterFirstName: "Enter first name",
      enterLastName: "Enter last name",
      updateInfo: "Update Info",
      updating: "Updating...",
      changePassword: "Change Password",
      enterOldNewPassword: "Enter old and new password",
      currentPassword: "Current Password",
      newPassword: "New Password",
      enterCurrentPassword: "Enter current password",
      enterNewPassword: "Enter new password",
      updatePassword: "Update Password",
      newPasswordRequired: "New password is required!",
      oldPasswordRequired: "Old password is required!",
      pleaseEnterNewPassword: "Please enter a new password",
      errorOccurred: "An error occurred",
      dataUpdatedSuccessfully: "Data updated successfully",
      failedToLoadUserInfo: "Failed to load user information.",
      zakatHistory: "Zakat History",
      viewZakatHistory: "View your previous Zakat calculation records",
      noHistoryFound: "No history found",
      noCalculationsYet: "You haven't made any Zakat calculations yet",
      date: "Date",
      method: "Method",
      companyTypeLabel: "Company Type",
      zakatAmount: "Zakat Amount",
      details: "Details",
      loading: "Loading...",
      close: "Close",
      calculationDetails: "Calculation Details",
      section1: {
        title: "Zakat: Religious Obligation and Support for Social Solidarity",
        text: `On this website, companies can calculate their Zakat obligation according to Islamic law. As stated in the Holy Quran, paying Zakat is one of the fundamental pillars of Islam. God Almighty says: "Take from their wealth a charity by which you purify them and cause them to increase [in goodness]" (Surah At-Tawbah, verse 103). He also says: "And establish prayer and give Zakat" (Surah Al-Baqarah, verse 43). All companies are religiously obligated to pay Zakat on their wealth to support the poor and needy, thus affirming the solidarity and social justice that Islam calls for. According to Sharia rulings, the Zakat rate is calculated based on the company's assets and annual profits. The Zakat funds collected from these companies will be used as a contribution to establishing Waqfs (endowments) for public benefit, which are investment projects that generate financial returns used to serve the community`,
        button: "Learn More"
      },
      section2: {
        title: "Towards a More Cohesive Society: Companies Supporting Less Fortunate Groups",
        text: `This initiative is a significant step that yields numerous benefits for society by strengthening social solidarity and addressing the needs of the less fortunate. Furthermore, it has a direct and positive impact on the image of participating companies. By awarding these companies a certification mark, we provide a symbol that reflects their commitment to social responsibility. We also plan to create videos showcasing the positive changes and projects funded by these donations, highlighting the tangible impact of these contributions. This allows companies to enhance their CSR policies and demonstrate their genuine concern for the community. Moreover, these companies can benefit from tax-deductible donations, further encouraging their active participation in this noble endeavor`,
        button: "Learn More",
        imageAlt: "Mosque Image"
      },
      section3: {
        title: "Ease and Accuracy in Calculating Corporate Zakat According to Sharia",
        text: `This website works in a simple and efficient way to help companies calculate their Zakat (Islamic alms) according to Sharia principles. First, the user must define their company type and select the sector it belongs to. They will then be asked to answer some questions about the company and its financial situation, such as the value of assets, annual revenue, working capital, and other important financial information. Based on this entered information, the website will determine the appropriate formula for calculating Zakat according to the company type and Islamic Sharia principles. The website automatically calculates the amount of Zakat due based on the data provided by the user, allowing them to know the amount that must be paid. This process makes it easier for companies to comply with Zakat regulations and helps them fulfill their religious obligations easily and accurately, while ensuring that the funds are directed to their rightful recipients according to Islamic Sharia principles`,
        button: "Start Now",
        imageAlt: "Zakat Calculation Image"
      }
    },
    ma7acil: {
      title: "Agricultural Crops Zakat",
      subtitle: "Calculate your agricultural crops Zakat according to approved Sharia standards",
      formHeader: "Agricultural Crops Data",
      formDescription: "Nissab: {nissab} kg • Add your crops and calculate their Zakat",
      cropLabel: "Crop {number}",
      addCrop: "Add New Crop",
      calculate: "Calculate Zakat",
      saveResults: "Save Results",
      saving: "Saving...",
      
      fields: {
        cropType: "Crop Type",
        cropTypePlaceholder: "Enter crop type (wheat, barley, dates...)",
        wateringMethod: "Watering Method",
        quantity: "Quantity (kilograms)",
        quantityPlaceholder: "Enter quantity",
        ownershipType: "Ownership Type",
        ownershipShare: "Your Ownership Share (%)",
        ownershipSharePlaceholder: "Enter percentage"
      },
      
      wateringMethods: {
        rain: "Rain watering (10%)",
        mixed: "Mixed watering (7.5%)",
        artificial: "Artificial watering (5%)"
      },
      
      ownershipTypes: {
        individual: "Individual ownership",
        shared: "Shared ownership"
      },
      
      zakatDue: "Zakat Due:",
      rateApplied: "Rate applied:",
      yourShare: "Your share:",
      kg: "kg",
      percent: "%",
      
      info: {
        title: "Important Information",
        nissabText: "Nissab for agricultural crops: {nissab} kilograms",
        rainWatering: "Rain or river watering: 10% of the crop",
        mixedWatering: "Mixed watering: 7.5% of the crop",
        artificialWatering: "Artificial watering (by machines): 5% of the crop"
      },
      
      messages: {
        loginRequired: "You must login first to save",
        noZakatToBeSaved: "No crops subject to Zakat to save",
        saveSuccess: "Crops saved successfully!",
        saveFailed: "Failed to save crops, try again"
      },
      
      show: "Show",
      hide: "Hide"
    },
    mawachi: {
      title: "Livestock Zakat",
      subtitle: "Calculate Zakat for camels, cattle and sheep according to Islamic law",
      formHeader: "Livestock Data",
      formDescription: "Add your livestock and calculate its Zakat according to legal Nissab",
      addAnimal: "Add New Animal",
      calculate: "Calculate Zakat",
      saveResults: "Save Results",
      saving: "Saving...",
      
      fields: {
        animalType: "Animal Type",
        quantity: "Number",
        quantityPlaceholder: "Enter number of heads"
      },
      
      animalTypes: {
        camel: "Camels",
        cow: "Cattle",
        sheep: "Sheep"
      },
      
      zakatDue: "Zakat Due:",
      head: "head",
      noZakat: "None",
      
      camel: {
        sheep1: "One sheep",
        sheep2: "Two sheep",
        sheep3: "Three sheep",
        sheep4: "Four sheep",
        bintMakhad: "Bint Makhad (2nd year)",
        bintLaboun: "Bint Laboun (3rd year)",
        hiqqah: "Hiqqah (4th year)",
        jadhaah: "Jadhaah (5th year)",
        bintLaboun2: "Two Bint Laboun",
        hiqqah2: "Two Hiqqah",
        bintLaboun3: "Three Bint Laboun",
        hiqqaBintLaboun2: "Hiqqah + two Bint Laboun",
        hiqqah2BintLaboun: "Two Hiqqah + Bint Laboun",
        hiqqah3: "Three Hiqqah",
        bintLaboun4: "Four Bint Laboun",
        hiqqaBintLaboun3: "Hiqqah + three Bint Laboun",
        hiqqah2BintLaboun2: "Two Hiqqah + two Bint Laboun",
        hiqqah3BintLaboun: "Three Hiqqah + Bint Laboun",
        hiqqah4OrBintLaboun5: "Four Hiqqah or five Bint Laboun",
        hiqqaBintLaboun4: "Hiqqah + four Bint Laboun",
        hiqqah2BintLaboun3: "Two Hiqqah + three Bint Laboun",
        hiqqah3BintLaboun2: "Three Hiqqah + two Bint Laboun",
        hiqqah4BintLaboun: "Four Hiqqah + Bint Laboun",
        above249: "{hiqqah} Hiqqah and {bintLaboun} Bint Laboun (for each 50: Hiqqah, for each 40: Bint Laboun)"
      },
      
      cow: {
        tabee: "Tabee or Tabeea (2nd year)",
        musinnah: "Musinnah (3rd year)",
        tabee2: "Two Tabee or Tabeea",
        musinnahTabee: "Musinnah + Tabee or Tabeea",
        musinnah2: "Two Musinnah",
        tabee3: "Three Tabee or Tabeea",
        musinnahTabee2: "Musinnah + two Tabee or Tabeea",
        musinnah2Tabee: "Two Musinnah + Tabee or Tabeea",
        musinnah3OrTabee4: "Three Musinnah or four Tabee",
        above129: "{tabee} Tabee and {musinnah} Musinnah (for each 30: Tabee, for each 40: Musinnah)"
      },
      
      sheep: {
        sheep1: "One sheep",
        sheep2: "Two sheep",
        sheep3: "Three sheep",
        sheep4: "Four sheep",
        above499: "{count} sheep (one sheep for each 100 heads)"
      },
      
      info: {
        title: "Important Information",
        camelTitle: "Camels:",
        camelNissab: "Nissab from 5 heads",
        cowTitle: "Cattle:",
        cowNissab: "Nissab from 30 heads",
        sheepTitle: "Sheep:",
        sheepNissab: "Nissab from 40 heads"
      },
      
      messages: {
        loginRequired: "You must login first to save",
        noZakatToBeSaved: "No livestock subject to Zakat to save",
        saveSuccess: "Livestock saved successfully!",
        saveFailed: "Failed to save livestock, try again"
      },
      
      show: "Show",
      hide: "Hide"
    }
  }
};

// -------------------- Form Generator --------------------
export const getZakatForm = (t) => [
  {
    name: "1",
    label: t('forms.1.label'),
    children: [
      { name: 'x1', label: t('forms.1.fields.x1'), description: t('forms.1.descriptions.x1'), children: [] },
      { name: 'x2', label: t('forms.1.fields.x2'), description: t('forms.1.descriptions.x2'), children: [] },
      { name: 'x3', label: t('forms.1.fields.x3'), description: t('forms.1.descriptions.x3'), children: [] },
      { name: 'x4', label: t('forms.1.fields.x4'), description: t('forms.1.descriptions.x4'), children: [] },
      { name: 'x5', label: t('forms.1.fields.x5'), description: t('forms.1.descriptions.x5'), children: [] },
      { name: 'x6', label: t('forms.1.fields.x6'), description: t('forms.1.descriptions.x6'), children: [] },
      { name: 'x7', label: t('forms.1.fields.x7'), description: t('forms.1.descriptions.x7'), children: [] },
      { name: 'x8', label: t('forms.1.fields.x8'), description: t('forms.1.descriptions.x8'), children: [] },
      { name: 'x9', label: t('forms.1.fields.x9'), description: t('forms.1.descriptions.x9'), children: [] },
    ]
  },
  {
    name: '2',
    label: t('forms.2.label'),
    children: [
      { name: 'y1', label: t('forms.2.fields.y1'), description: t('forms.2.descriptions.y1'), children: [] },
      { name: 'y2', label: t('forms.2.fields.y2'), description: t('forms.2.descriptions.y2'), children: [] },
      { name: 'y3', label: t('forms.2.fields.y3'), description: t('forms.2.descriptions.y3'), children: [] },
      { name: 'y4', label: t('forms.2.fields.y4'), description: t('forms.2.descriptions.y4'), children: [] },
      { name: 'y5', label: t('forms.2.fields.y5'), description: t('forms.2.descriptions.y5'), children: [] },
      { name: 'y6', label: t('forms.2.fields.y6'), description: t('forms.2.descriptions.y6'), children: [] },
      { name: 'y7', label: t('forms.2.fields.y7'), description: t('forms.2.descriptions.y7'), children: [] },
    ]
  },
  {
    name: '3',
    label: t('forms.3.label'),
    children: [
      { name: 'z1', label: t('forms.3.fields.z1'), description: t('forms.3.descriptions.z1'), children: [] },
      { name: 'z2', label: t('forms.3.fields.z2'), description: t('forms.3.descriptions.z2'), children: [] },
      { name: 'z3', label: t('forms.3.fields.z3'), description: t('forms.3.descriptions.z3'), children: [] },
      { name: 'z4', label: t('forms.3.fields.z4'), description: t('forms.3.descriptions.z4'), children: [] },
    ]
  },
  {
    name: '4',
    label: t('forms.4.label'),
    children: [
      { name: 'a1', label: t('forms.4.fields.a1'), description: t('forms.4.descriptions.a1'), children: [] },
      { name: 'a2', label: t('forms.4.fields.a2'), description: t('forms.4.descriptions.a2'), children: [] },
      { name: 'a3', label: t('forms.4.fields.a3'), description: t('forms.4.descriptions.a3'), children: [] },
      { name: 'a4', label: t('forms.4.fields.a4'), description: t('forms.4.descriptions.a4'), children: [] },
      { name: 'a5', label: t('forms.4.fields.a5'), description: t('forms.4.descriptions.a5'), children: [] },
      { name: 'a6', label: t('forms.4.fields.a6'), description: t('forms.4.descriptions.a6'), children: [] },
      { name: 'a7', label: t('forms.4.fields.a7'), description: t('forms.4.descriptions.a7'), children: [] },
      { name: 'a8', label: t('forms.4.fields.a8'), description: t('forms.4.descriptions.a8'), children: [] },
      { name: 'a9', label: t('forms.4.fields.a9'), description: t('forms.4.descriptions.a9'), children: [] },
    ]
  },
  {
    name: '5',
    label: t('forms.5.label'),
    children: [
      { name: 's1', label: t('forms.5.fields.s1'), description: t('forms.5.descriptions.s1'), children: [] },
      { name: 's2', label: t('forms.5.fields.s2'), description: t('forms.5.descriptions.s2'), children: [] },
    ]
  },
  {
    name: '6',
    label: t('forms.6.label'),
    children: [
      { name: 'c1', label: t('forms.6.fields.c1'), description: t('forms.6.descriptions.c1'), children: [] },
      { name: 'c2', label: t('forms.6.fields.c2'), description: t('forms.6.descriptions.c2'), children: [] },
      { name: 'c3', label: t('forms.6.fields.c3'), description: t('forms.6.descriptions.c3'), children: [] },
      { name: 'c4', label: t('forms.6.fields.c4'), description: t('forms.6.descriptions.c4'), children: [] },
      { name: 'c5', label: t('forms.6.fields.c5'), description: t('forms.6.descriptions.c5'), children: [] },
      { name: 'c6', label: t('forms.6.fields.c6'), description: t('forms.6.descriptions.c6'), children: [] },
      { name: 'c7', label: t('forms.6.fields.c7'), description: t('forms.6.descriptions.c7'), children: [] },
    ]
  },
  {
    name: "malikiAssets",
    label: t('forms.malikiAssets.label'),
    children: [
      { name: "SPA", label: t('forms.malikiAssets.fields.SPA'), description: t('forms.malikiAssets.descriptions.SPA'), children: [] },
      { name: "SARL", label: t('forms.malikiAssets.fields.SARL'), description: t('forms.malikiAssets.descriptions.SARL'), children: [] },
      { name: "limit", label: t('forms.malikiAssets.fields.limit'), description: t('forms.malikiAssets.descriptions.limit'), children: [] }
    ]
  }
];

// -------------------- Language Context --------------------
const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("ar");

  const t = (key) => {
    const keys = key.split(".");
    let value = translations[language];
    for (const k of keys) value = value?.[k];
    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);