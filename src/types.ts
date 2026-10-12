export type BMICategoryKey =
  | 'bajo'
  | 'normal'
  | 'sobrepeso'
  | 'obesidad_1'
  | 'obesidad_2'
  | 'obesidad_3';

export interface BMICategoryInfo {
  key: BMICategoryKey;
  title: string;
  rangeText: string;
  min: number;
  max: number;
  tag: string;
  colorClass: string;
  badgeBg: string;
  badgeText: string;
  borderClass: string;
  summary: string;
  clinicalDetail: string;
  recommendations: string[];
}

export interface CalculationRecord {
  id: string;
  date: string;
  time: string;
  timestamp: number;
  weightKg: number;
  heightCm: number;
  heightM: number;
  bmi: number;
  categoryKey: BMICategoryKey;
  categoryTitle: string;
  gender: 'F' | 'M';
  notes?: string;
}

export interface HealthTip {
  id: string;
  title: string;
  category: 'Nutrición' | 'Actividad Física' | 'Hidratación' | 'Descanso' | 'Hábitos';
  readingTime: string;
  shortSummary: string;
  fullContent: string[];
  keyAdvice: string;
  iconName: string;
  imageUrl?: string;
}
