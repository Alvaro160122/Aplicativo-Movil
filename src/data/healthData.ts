import { BMICategoryInfo, CalculationRecord, HealthTip } from '../types';

export const APP_LOGO = 'https://lh3.googleusercontent.com/aida/AEtjO1U5kdpG_1ViKi0cbNL6sEXkY0lnBXM0TOf0xLK6tRr2Zy1ObJ_8DVFjLt33dlP9BLjJ1P9M9lZmAdui6_HYi9DxEZxNWf-SbqPMpWhcsdHVF-SEw1IsDMuZEJ06WjEdjmTj9JBqbizbVcHXoYxBrbrGRuSJzm9Lq--xeuXDJwmg_-am7MfLokkzd800uxeQua3f7Wp8_Llvwo5jcDZws7AShMOztbgRom5rs0pXd4-1_o2Oh0mpd5LECt0';
export const USER_AVATAR = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDmxzbjLHaSNa2sNx7gajmZf5CloWHPVbvin8j3PxuJO63N9-Roq_SBxfV9manwvZdTL57dNJzox9tD032E4sIPnyCiNBNhN6pVULIm5n204Kk_F1ZA_jWJTTqvQ1nppbijBi94c_mNGIvqmD9dw3WZq1obaTjOHBkXSBXIwBVU8k6IATvIePtp8DvA5eKLnrPJdSSIaoRClmTiXFxXc1r7be13argkIBPK6ZC_MhbmEytw-TwAIVxg';
export const HYDRATION_IMAGE = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDThdHMnX_Z2BPyuL1bML2bvytebpq75SP5mnfc3QLwJM92uczoZJfXco6-BDQPNU9mwNpf7nbU7rPkJMuaEX-et7dEquZUOktWYlipg3yxFWqLp3tZzDtfIy2R8nEGZqg-bJ89RjjjcXwq5OiV6ta7H3oZQqLwV6_uotTCtet0gteZXSk87CQjWIJHxWJP1scODpoyf5_YN910rDLO0Y2Y9Ls2mOwPokf5c0U_SzN4DxrtuRDbdHFf';
export const MEAL_IMAGE = 'https://lh3.googleusercontent.com/aida-public/AB6AXuA-Oxd2E1sVL7lcYI-xMHijH0qn4WOmU9e00OhKhToCDfaIjRmhF1qpebZtWdSZ30FjPQANYi-Gx3Xoknv_Z8F1HhIzMNNkvJn8CPYEMMHGkY2dfV0x7-qi_KQrzjO_1ZCa1jsbg7sVVK8bj72quG8rFRh-tuW3H5j5QgecB5y_1Q9a5d7dUw5OHj5pq0lmc8hzPWppxeupI34hU_Lt-fljRrc06zAU1_tO4vlUMKaWwjI2Xg0QgGbV';

export const BMI_CATEGORIES: Record<string, BMICategoryInfo> = {
  bajo: {
    key: 'bajo',
    title: 'Bajo peso',
    rangeText: '< 18.5 kg/m²',
    min: 0,
    max: 18.49,
    tag: 'Alerta nutricional',
    colorClass: 'text-[#006398]',
    badgeBg: 'bg-[#cce5ff]',
    badgeText: 'text-[#004b73]',
    borderClass: 'border-[#5bb8fe]',
    summary: 'Riesgo potencial de deficiencias nutricionales e inmunodepresión. Se aconseja supervisión dietética para un superávit calórico controlado.',
    clinicalDetail: 'Un valor inferior a 18.5 indica un peso por debajo del parámetro estándar para tu estatura. Puede relacionarse con ingesta calórica insuficiente, metabolismo acelerado o malabsorción de nutrientes.',
    recommendations: [
      'Incrementa la densidad calórica saludable (frutos secos, aguacate, aceite de oliva virgen extra).',
      'Realiza entrenamiento de fuerza para favorecer el aumento de masa muscular limpia.',
      'Fracciona tus comidas en 4 a 5 ingestas al día acompañadas de fuentes proteicas.'
    ]
  },
  normal: {
    key: 'normal',
    title: 'Peso saludable',
    rangeText: '18.5 – 24.9 kg/m²',
    min: 18.5,
    max: 24.9,
    tag: 'Óptimo',
    colorClass: 'text-[#006948]',
    badgeBg: 'bg-[#85f8c4]',
    badgeText: 'text-[#005137]',
    borderClass: 'border-[#00855d]',
    summary: 'Proporción óptima asociada al menor riesgo de patologías cardiovasculares y metabólicas. Mantén tu régimen activo y alimentación balanceada.',
    clinicalDetail: 'Tu índice se encuentra en el rango óptimo normopeso según la OMS. Este balance anatómico se correlaciona con la mayor expectativa de bienestar y menor incidencia de enfermedades crónicas.',
    recommendations: [
      'Conserva tu rutina de al menos 150 minutos semanales de actividad cardiovascular y de resistencia.',
      'Sostén una hidratación constante de 2 a 2.5 litros de agua al día.',
      'Prioriza el consumo de fibra vegetal, legumbres y cereales de grano entero.'
    ]
  },
  sobrepeso: {
    key: 'sobrepeso',
    title: 'Sobrepeso',
    rangeText: '25.0 – 29.9 kg/m²',
    min: 25.0,
    max: 29.9,
    tag: 'Zona preventiva',
    colorClass: 'text-[#825100]',
    badgeBg: 'bg-[#ffddb8]',
    badgeText: 'text-[#653e00]',
    borderClass: 'border-[#ffb95f]',
    summary: 'Riesgo moderado de hipertensión y resistencia a la insulina. Cambios graduales de actividad física aeróbica proporcionan beneficios inmediatos.',
    clinicalDetail: 'Estar en rango de sobrepeso representa una oportunidad clave para ajustes tempranos. Pequeñas modificaciones nutricionales y caminatas diarias pueden prevenir la progresión a estadios de mayor riesgo.',
    recommendations: [
      'Disminuye bebidas azucaradas, jugos industriales y carbohidratos refinados.',
      'Aumenta el gasto calórico no asociado al ejercicio (NEAT), prefiriendo escaleras y traslados activos.',
      'Llena la mitad de cada plato principal con vegetales coloridos y ensaladas frescas.'
    ]
  },
  obesidad_1: {
    key: 'obesidad_1',
    title: 'Obesidad Grado I',
    rangeText: '30.0 – 34.9 kg/m²',
    min: 30.0,
    max: 34.9,
    tag: 'Moderada',
    colorClass: 'text-[#a36700]',
    badgeBg: 'bg-[#ffdad6]',
    badgeText: 'text-[#93000a]',
    borderClass: 'border-[#ffb95f]',
    summary: 'Aumento clínicamente relevante del riesgo cardiovascular. Es recomendable asesoramiento profesional multidisciplinario.',
    clinicalDetail: 'Se identifica una sobrecarga moderada en articulaciones y aparato circulatorio. Requiere un enfoque amable pero estructurado que combine nutrición adaptada y chequeos periódicos.',
    recommendations: [
      'Consulta con un nutricionista o médico para una evaluación de perfil lipídico y glucosa.',
      'Comienza con ejercicios de bajo impacto articular como natación, bicicleta estática o caminata.',
      'Registra tus hábitos de sueño, reduciendo pantallas antes de acostarte.'
    ]
  },
  obesidad_2: {
    key: 'obesidad_2',
    title: 'Obesidad Grado II',
    rangeText: '35.0 – 39.9 kg/m²',
    min: 35.0,
    max: 39.9,
    tag: 'Severa',
    colorClass: 'text-[#ba1a1a]',
    badgeBg: 'bg-[#ffdad6]',
    badgeText: 'text-[#93000a]',
    borderClass: 'border-[#ba1a1a]',
    summary: 'Alto impacto en articulaciones y metabolismo general. Requiere intervención médica estructurada e individualizada.',
    clinicalDetail: 'Nivel severo que suele coexistir con apnea del sueño, hipertensión o esteatosis hepática. Es indispensable el acompañamiento clínico para proteger la salud metabólica a largo plazo.',
    recommendations: [
      'Establece un plan nutricional supervisado por un profesional colegiado.',
      'Evita dietas milagro o restricciones extremas que desencadenen efecto rebote.',
      'Prioriza chequeos médicos de presión arterial y función cardiometabólica.'
    ]
  },
  obesidad_3: {
    key: 'obesidad_3',
    title: 'Obesidad Grado III',
    rangeText: '≥ 40.0 kg/m²',
    min: 40.0,
    max: 999,
    tag: 'Muy severa',
    colorClass: 'text-[#ba1a1a]',
    badgeBg: 'bg-[#ba1a1a]',
    badgeText: 'text-white',
    borderClass: 'border-[#ba1a1a]',
    summary: 'Obesidad mórbida de atención prioritaria. Es fundamental una evaluación médica exhaustiva para prevenir afecciones secundarias.',
    clinicalDetail: 'Condición clínica que requiere atención médica prioritaria. Existen protocolos multidisciplinarios avanzados diseñados para recuperar de forma segura la calidad de vida.',
    recommendations: [
      'Acude a un centro de salud para evaluación integral con endocrinología y cardiología.',
      'Construye una red de apoyo familiar y emocional para acompañar el proceso de cambio de hábitos.',
      'Realiza cambios progresivos y sostenibles en el tiempo sin autoexigencias desmedidas.'
    ]
  }
};

export const INITIAL_CALCULATIONS: CalculationRecord[] = [
  {
    id: 'calc-1',
    date: '12/04/2026',
    time: '09:41',
    timestamp: 1775986860000,
    weightKg: 70.0,
    heightCm: 170,
    heightM: 1.70,
    bmi: 24.2,
    categoryKey: 'normal',
    categoryTitle: 'Peso saludable',
    gender: 'M',
    notes: 'Control matutino en ayunas. Excelente adherencia física.'
  },
  {
    id: 'calc-2',
    date: '05/03/2026',
    time: '18:15',
    timestamp: 1772734500000,
    weightKg: 76.5,
    heightCm: 170,
    heightM: 1.70,
    bmi: 26.5,
    categoryKey: 'sobrepeso',
    categoryTitle: 'Sobrepeso',
    gender: 'M',
    notes: 'Post vacaciones. Iniciando plan de caminatas.'
  },
  {
    id: 'calc-3',
    date: '10/02/2026',
    time: '08:20',
    timestamp: 1770711600000,
    weightKg: 66.0,
    heightCm: 170,
    heightM: 1.70,
    bmi: 22.8,
    categoryKey: 'normal',
    categoryTitle: 'Peso saludable',
    gender: 'M',
    notes: 'Chequeo trimestral regular.'
  }
];

export const HEALTH_TIPS: HealthTip[] = [
  {
    id: 'tip-1',
    title: 'Mantén una alimentación equilibrada',
    category: 'Nutrición',
    readingTime: '3 min',
    shortSummary: 'Aplica el método del plato saludable: 50% vegetales y frutas, 25% proteínas magras y 25% carbohidratos integrales.',
    iconName: 'restaurant',
    imageUrl: MEAL_IMAGE,
    keyAdvice: 'Prefiere alimentos en su estado natural y minimiza los productos ultraprocesados con sellos de advertencia.',
    fullContent: [
      'El método del plato saludable creado por la Escuela de Salud Pública de Harvard es la guía más práctica para tus comidas principales.',
      'Divide visualmente tu plato: la mitad debe consistir en verduras variadas (espinacas, brócoli, zanahorias, tomates) y frutas de estación.',
      'Un cuarto corresponde a proteínas de alto valor biológico: legumbres (lentejas, garbanzos), pescado, huevos o carnes blancas.',
      'El cuarto restante debe ser carbohidratos de absorción lenta como arroz integral, quinoa, avena o papa con cáscara.'
    ]
  },
  {
    id: 'tip-2',
    title: 'Realiza actividad física regularmente',
    category: 'Actividad Física',
    readingTime: '2 min',
    shortSummary: 'Acumula al menos 150 minutos semanales de ejercicio cardiovascular moderado más 2 sesiones de fuerza muscular.',
    iconName: 'directions_run',
    keyAdvice: 'Caminar a paso ligero 30 minutos al día reduce significativamente la presión arterial y la resistencia a la insulina.',
    fullContent: [
      'La Organización Mundial de la Salud recomienda a los adultos entre 150 y 300 minutos de actividad aeróbica de intensidad moderada por semana.',
      'Si recién comienzas, divide el tiempo en sesiones de 10 o 15 minutos dos veces al día: subir escaleras, bajar una parada antes en el transporte público o pasear a paso enérgico.',
      'Incluye ejercicios que fortalezcan los principales grupos musculares dos o más días por semana (sentadillas, flexiones o bandas elásticas).'
    ]
  },
  {
    id: 'tip-3',
    title: 'Bebe suficiente agua durante el día',
    category: 'Hidratación',
    readingTime: '2 min',
    shortSummary: 'Ingerir entre 2 y 2.5 litros de agua pura al día favorece la depuración renal y la regulación térmica.',
    iconName: 'water_drop',
    imageUrl: HYDRATION_IMAGE,
    keyAdvice: 'No esperes a tener sed intensa para hidratarte; ten a mano un tomatodo reutilizable durante tu jornada.',
    fullContent: [
      'El agua compone cerca del 60% del peso corporal de un adulto y participa en el transporte de nutrientes y la oxigenación.',
      'Beber suficiente agua previene dolores de cabeza causados por deshidratación subclínica y optimiza el tránsito intestinal.',
      'Si te cuesta beber agua sola, aromatízala con rodajas de limón, hojas de menta o trozos de pepino fresco sin añadir azúcar.'
    ]
  },
  {
    id: 'tip-4',
    title: 'Descansa adecuadamente (7 a 8 horas)',
    category: 'Descanso',
    readingTime: '3 min',
    shortSummary: 'El sueño profundo regula las hormonas del apetito (grelina y leptina) y repara los tejidos celulares.',
    iconName: 'bedtime',
    keyAdvice: 'Mantén un horario regular para dormir y apaga las pantallas azules 45 minutos antes de acostarte.',
    fullContent: [
      'Dormir menos de 6 horas continuas altera la producción de leptina (hormona de la saciedad) y eleva la grelina (hormona del apetito), aumentando la ansiedad por carbohidratos.',
      'Crea un santuario de descanso: mantén tu habitación oscura, fresca y ventilada.',
      'Evita cenas copiosas, cafeína o alcohol en las horas previas a acostarte para garantizar fases de sueño REM reparador.'
    ]
  },
  {
    id: 'tip-5',
    title: 'Reduce el consumo de ultraprocesados',
    category: 'Hábitos',
    readingTime: '3 min',
    shortSummary: 'Los comestibles industriales con exceso de sodio, azúcares añadidos y grasas trans impactan negativamente tu metabolismo.',
    iconName: 'no_food',
    keyAdvice: 'Aprende a leer la lista de ingredientes: si tiene más de 5 componentes que no reconoces en una cocina casera, limítalo.',
    fullContent: [
      'Los alimentos ultraprocesados suelen estar formulados para ser hiperpalatables, lo que dificulta la señal de saciedad cerebral.',
      'Reemplaza las gaseosas y jugos de caja por agua fresca o infusiones sin endulzar.',
      'Prefiere cocinar en casa con especias naturales (orégano, cúrcuma, ajo) en lugar de caldos concentrados con alto contenido de glutamato y sodio.'
    ]
  },
  {
    id: 'tip-6',
    title: 'Gestiona el estrés y cuida tu salud mental',
    category: 'Hábitos',
    readingTime: '2 min',
    shortSummary: 'El cortisol crónico favorece el almacenamiento de grasa visceral alrededor de los órganos abdominales.',
    iconName: 'self_improvement',
    keyAdvice: 'Dedica 10 minutos al día a respiración diafragmática consciente o pausas activas en tu jornada.',
    fullContent: [
      'El estrés crónico mantiene altos los niveles de cortisol, promoviendo la inflamación celular y la retención hídrica.',
      'La respiración 4-7-8 (inhalar en 4s, retener 7s y exhalar en 8s) activa el sistema nervioso parasimpático en momentos de tensión.',
      'Conecta con personas queridas, reserva momentos para hobbies desconectados de dispositivos y busca apoyo profesional cuando lo necesites.'
    ]
  }
];
