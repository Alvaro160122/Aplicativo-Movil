import { BMI_CATEGORIES } from '../data/healthData';
import { BMICategoryInfo, BMICategoryKey, CalculationRecord } from '../types';

export function calculateBMIValue(weightKg: number, heightM: number): number {
  if (heightM <= 0 || weightKg <= 0) return 0;
  const val = weightKg / (heightM * heightM);
  return Number(val.toFixed(1));
}

export function getBMICategoryKey(bmi: number): BMICategoryKey {
  if (bmi < 18.5) return 'bajo';
  if (bmi <= 24.9) return 'normal';
  if (bmi <= 29.9) return 'sobrepeso';
  if (bmi <= 34.9) return 'obesidad_1';
  if (bmi <= 39.9) return 'obesidad_2';
  return 'obesidad_3';
}

export function getBMICategory(bmi: number): BMICategoryInfo {
  const key = getBMICategoryKey(bmi);
  return BMI_CATEGORIES[key] || BMI_CATEGORIES.normal;
}

export function calculateIdealWeightRange(heightM: number): { minKg: number; maxKg: number } {
  if (heightM <= 0) return { minKg: 50, maxKg: 70 };
  const minKg = Number((18.5 * heightM * heightM).toFixed(1));
  const maxKg = Number((24.9 * heightM * heightM).toFixed(1));
  return { minKg, maxKg };
}

export function calculateWeightDifference(weightKg: number, heightM: number, bmi: number): {
  label: string;
  diffKg: number;
  status: 'optimal' | 'over' | 'under';
} {
  const { minKg, maxKg } = calculateIdealWeightRange(heightM);
  if (bmi < 18.5) {
    const diff = Number((minKg - weightKg).toFixed(1));
    return {
      label: `-${diff} kg bajo rango`,
      diffKg: diff,
      status: 'under'
    };
  } else if (bmi > 24.9) {
    const diff = Number((weightKg - maxKg).toFixed(1));
    return {
      label: `+${diff} kg sobre rango normal`,
      diffKg: diff,
      status: 'over'
    };
  } else {
    return {
      label: 'En rango óptimo',
      diffKg: 0,
      status: 'optimal'
    };
  }
}

/**
 * Maps a BMI value (14 to 40+) into a percentage (0% to 100%) for visual gauge needle alignment
 */
export function getBMIGaugePercentage(bmi: number): number {
  const minScale = 14;
  const maxScale = 40;
  if (bmi <= minScale) return 4;
  if (bmi >= maxScale) return 96;
  const pct = ((bmi - minScale) / (maxScale - minScale)) * 100;
  return Math.min(96, Math.max(4, Math.round(pct)));
}

export function createRecord(params: {
  weightKg: number;
  heightCm: number;
  gender: 'F' | 'M';
  notes?: string;
}): CalculationRecord {
  const heightM = params.heightCm / 100;
  const bmi = calculateBMIValue(params.weightKg, heightM);
  const categoryKey = getBMICategoryKey(bmi);
  const category = BMI_CATEGORIES[categoryKey];

  const now = new Date();
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const year = now.getFullYear();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');

  return {
    id: `calc-${Date.now()}`,
    date: `${day}/${month}/${year}`,
    time: `${hours}:${minutes}`,
    timestamp: now.getTime(),
    weightKg: Number(params.weightKg.toFixed(1)),
    heightCm: Math.round(params.heightCm),
    heightM: Number(heightM.toFixed(2)),
    bmi,
    categoryKey,
    categoryTitle: category.title,
    gender: params.gender,
    notes: params.notes
  };
}
