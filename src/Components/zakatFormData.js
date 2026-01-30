// Ce fichier contient la structure du formulaire Zakat avec support multilingue
export const getZakatForm = (t) => [
  {
    name: "1",
    label: t('forms.1.label'),
    children: [
      { name: 'x1', label: t('forms.1.fields.x1'), children: [] },
      { name: 'x2', label: t('forms.1.fields.x2'), children: [] },
      { name: 'x3', label: t('forms.1.fields.x3'), children: [] },
      { name: 'x4', label: t('forms.1.fields.x4'), children: [] },
      { name: 'x5', label: t('forms.1.fields.x5'), children: [] },
      { name: 'x6', label: t('forms.1.fields.x6'), children: [] },
      { name: 'x7', label: t('forms.1.fields.x7'), children: [] },
      { name: 'x8', label: t('forms.1.fields.x8'), children: [] },
      { name: 'x9', label: t('forms.1.fields.x9'), children: [] },
    ]
  },
  {
    name: '2',
    label: t('forms.2.label'),
    children: [
      { name: 'y1', label: t('forms.2.fields.y1'), children: [] },
      { name: 'y2', label: t('forms.2.fields.y2'), children: [] },
      { name: 'y3', label: t('forms.2.fields.y3'), children: [] },
      { name: 'y4', label: t('forms.2.fields.y4'), children: [] },
      { name: 'y5', label: t('forms.2.fields.y5'), children: [] },
      { name: 'y6', label: t('forms.2.fields.y6'), children: [] },
      { name: 'y7', label: t('forms.2.fields.y7'), children: [] },
    ]
  },
  {
    name: '3',
    label: t('forms.3.label'),
    children: [
      { name: 'z1', label: t('forms.3.fields.z1'), children: [] },
      { name: 'z2', label: t('forms.3.fields.z2'), children: [] },
      { name: 'z3', label: t('forms.3.fields.z3'), children: [] },
      { name: 'z4', label: t('forms.3.fields.z4'), children: [] },
    ]
  },
  {
    name: '4',
    label: t('forms.4.label'),
    children: [
      { name: 'a1', label: t('forms.4.fields.a1'), children: [] },
      { name: 'a2', label: t('forms.4.fields.a2'), children: [] },
      { name: 'a3', label: t('forms.4.fields.a3'), children: [] },
      { name: 'a4', label: t('forms.4.fields.a4'), children: [] },
      { name: 'a5', label: t('forms.4.fields.a5'), children: [] },
      { name: 'a6', label: t('forms.4.fields.a6'), children: [] },
      { name: 'a7', label: t('forms.4.fields.a7'), children: [] },
      { name: 'a8', label: t('forms.4.fields.a8'), children: [] },
      { name: 'a9', label: t('forms.4.fields.a9'), children: [] },
    ]
  },
  // ⭐⭐⭐ NOUVELLE FORME "الأسهم" AJOUTÉE ICI ⭐⭐⭐
  {
    name: '5',
    label: t('forms.5.label'),
    children: [
      { name: 's1', label: t('forms.5.fields.s1'), children: [] },
      { name: 's2', label: t('forms.5.fields.s2'), children: [] },
      { name: 's3', label: t('forms.5.fields.s3'), children: [] },
      { name: 's4', label: t('forms.5.fields.s4'), children: [] },
    ]
  },
  // ⭐⭐⭐ FIN DE LA NOUVELLE FORME ⭐⭐⭐
  {
    name: '6',
    label: t('forms.6.label'),
    children: [
      { name: 'c1', label: t('forms.6.fields.c1'), children: [] },
      { name: 'c2', label: t('forms.6.fields.c2'), children: [] },
      { name: 'c3', label: t('forms.6.fields.c3'), children: [] },
      { name: 'c4', label: t('forms.6.fields.c4'), children: [] },
      { name: 'c5', label: t('forms.6.fields.c5'), children: [] },
      { name: 'c6', label: t('forms.6.fields.c6'), children: [] },
      { name: 'c7', label: t('forms.6.fields.c7'), children: [] },
    ]
  },
  {
    name: "malikiAssets",
    label: t('forms.malikiAssets.label'),
    children: [
      { name: "SPA", label: t('forms.malikiAssets.fields.SPA'), children: [] },
      { name: "SARL", label: t('forms.malikiAssets.fields.SARL'), children: [] },
   
    ]
  }
];