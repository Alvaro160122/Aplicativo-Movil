import React, { useState } from 'react';
import { MEAL_IMAGE } from '../data/healthData';
import { CalculationRecord } from '../types';
import {
  calculateIdealWeightRange,
  calculateWeightDifference,
  getBMICategory,
  getBMIGaugePercentage,
} from '../utils/bmiCalculator';

interface ResultViewProps {
  record: CalculationRecord;
  onRecalculate: () => void;
  onSaveToHistory: (record: CalculationRecord) => void;
  onNavigateToClassification: () => void;
  onNavigateToTips: () => void;
}

export const ResultView: React.FC<ResultViewProps> = ({
  record,
  onRecalculate,
  onSaveToHistory,
  onNavigateToClassification,
  onNavigateToTips,
}) => {
  const [isSaved, setIsSaved] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const category = getBMICategory(record.bmi);
  const gaugePercent = getBMIGaugePercentage(record.bmi);
  const idealRange = calculateIdealWeightRange(record.heightM);
  const weightDiff = calculateWeightDifference(record.weightKg, record.heightM, record.bmi);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const handleSave = () => {
    onSaveToHistory(record);
    setIsSaved(true);
    showToast('¡Registro guardado en tu Historial exitosamente!');
  };

  const handleShare = async () => {
    const textToShare = `Mi resultado de IMC en Vitalis es ${record.bmi} kg/m² (${category.title}) para ${record.weightKg}kg y ${(record.heightM).toFixed(2)}m.`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Resultado de IMC - Vitalis',
          text: textToShare,
          url: window.location.href,
        });
      } catch {
        // Ignored or cancelled
      }
    } else {
      await navigator.clipboard.writeText(textToShare);
      showToast('Copiado al portapapeles para compartir');
    }
  };

  return (
    <div className="flex flex-col gap-4 pb-28 px-4 pt-3 relative">
      {/* Tarjeta Hero de Resultado Principal (Wireframe Pantalla 4) */}
      <div className="relative bg-white rounded-2xl p-5 shadow-sm border border-[#eaedff] flex flex-col items-center text-center overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute -top-12 -right-12 w-36 h-36 bg-[#85f8c4]/30 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-[#cce5ff]/40 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center w-full">
          {/* Micro-chip de fecha */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f2f3ff] text-[#3d4a42] text-[11px] font-semibold mb-2">
            <span className="material-symbols-outlined text-[14px] text-[#006948]">
              check_circle
            </span>
            <span>Evaluación completada hoy ({record.date})</span>
          </div>

          <p className="text-xs text-[#3d4a42] mb-1 font-medium">
            Tu Índice de Masa Corporal es:
          </p>

          {/* Valor Numérico Principal */}
          <div className="flex items-baseline justify-center gap-1.5 my-1">
            <span className="text-5xl font-black text-[#131b2e] tracking-tight">
              {record.bmi.toFixed(1)}
            </span>
            <span className="text-sm font-bold text-[#3d4a42]">kg/m²</span>
          </div>

          {/* Badge Diagnóstico Nutricional */}
          <div
            className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold shadow-xs mt-1 mb-4 ${category.badgeBg} ${category.badgeText}`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-current opacity-80 animate-pulse" />
            <span>{category.title}</span>
          </div>

          {/* Visual Spectrum Bar & Dynamic Pointer */}
          <div className="w-full mt-1 mb-2">
            {/* Pointer / Needle with 'Tú' label */}
            <div className="relative w-full h-6 mb-1">
              <div
                className="absolute -translate-x-1/2 flex flex-col items-center transition-all duration-700 ease-out"
                style={{ left: `${gaugePercent}%` }}
              >
                <span className="text-[10px] font-extrabold text-[#006948] leading-none">Tú</span>
                <span className="material-symbols-outlined text-[#006948] text-[18px] -mt-1 leading-none">
                  arrow_drop_down
                </span>
              </div>
            </div>

            {/* Segmented spectrum track */}
            <div className="grid grid-cols-4 gap-1.5 h-3 w-full rounded-full overflow-hidden p-0.5 bg-[#eaedff]">
              {/* Bajo Peso: < 18.5 */}
              <div
                className={`h-full rounded-full bg-[#5bb8fe] ${
                  category.key === 'bajo' ? 'ring-2 ring-[#006398]' : 'opacity-70'
                }`}
                title="Bajo peso (< 18.5)"
              />
              {/* Normal: 18.5 - 24.9 */}
              <div
                className={`h-full rounded-full bg-[#006948] ${
                  category.key === 'normal' ? 'ring-2 ring-[#85f8c4]' : 'opacity-70'
                }`}
                title="Normal (18.5 - 24.9)"
              />
              {/* Sobrepeso: 25 - 29.9 */}
              <div
                className={`h-full rounded-full bg-[#ffb95f] ${
                  category.key === 'sobrepeso' ? 'ring-2 ring-[#825100]' : 'opacity-70'
                }`}
                title="Sobrepeso (25 - 29.9)"
              />
              {/* Obesidad: >= 30 */}
              <div
                className={`h-full rounded-full bg-[#ba1a1a] ${
                  category.key.startsWith('obesidad') ? 'ring-2 ring-red-400' : 'opacity-70'
                }`}
                title="Obesidad (>= 30)"
              />
            </div>

            {/* Labels */}
            <div className="grid grid-cols-4 gap-1 mt-2 text-center text-[#3d4a42] text-[10px] leading-tight">
              <div>
                &lt; 18.5<br />
                <span className="opacity-75">Bajo</span>
              </div>
              <div className="text-[#006948] font-bold">
                18.5 - 24.9<br />
                <span>Normal</span>
              </div>
              <div>
                25 - 29.9<br />
                <span className="opacity-75">Sobrepeso</span>
              </div>
              <div>
                ≥ 30<br />
                <span className="opacity-75">Obesidad</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tarjeta de Interpretación Clínica */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#eaedff] flex items-start gap-3">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${category.badgeBg} ${category.badgeText}`}
        >
          <span className="material-symbols-outlined text-[22px]">
            {category.key === 'normal'
              ? 'sentiment_very_satisfied'
              : category.key === 'bajo'
              ? 'sentiment_neutral'
              : 'health_and_safety'}
          </span>
        </div>
        <div className="flex flex-col min-w-0">
          <h2 className="text-xs font-bold text-[#131b2e] mb-1">
            {category.key === 'normal'
              ? '¡Excelente estado físico!'
              : category.key === 'bajo'
              ? 'Atención a tu aporte calórico'
              : category.key === 'sobrepeso'
              ? 'Rango de prevención activa'
              : 'Atención y cuidado integral'}
          </h2>
          <p className="text-xs text-[#3d4a42] leading-relaxed">{category.clinicalDetail}</p>
        </div>
      </div>

      {/* Tarjetas de Métricas Complementarias (Grid) */}
      <div className="grid grid-cols-2 gap-3">
        {/* Rango de peso ideal */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#eaedff] flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#3d4a42] mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider">Peso Ideal</span>
            <span className="material-symbols-outlined text-[18px] text-[#006398]">
              straighten
            </span>
          </div>
          <div>
            <span className="text-base font-extrabold text-[#131b2e] block">
              {idealRange.minKg} - {idealRange.maxKg}{' '}
              <span className="text-xs font-normal text-[#3d4a42]">kg</span>
            </span>
            <span className="text-[10px] text-[#3d4a42]">
              Para {(record.heightM).toFixed(2)} m de estatura
            </span>
          </div>
        </div>

        {/* Variación al límite */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#eaedff] flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#3d4a42] mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider">Zona de Confort</span>
            <span className="material-symbols-outlined text-[18px] text-[#006948]">
              verified
            </span>
          </div>
          <div>
            <span className={`text-base font-extrabold block ${category.colorClass}`}>
              {category.tag}
            </span>
            <span className="text-[10px] text-[#3d4a42]">{weightDiff.label}</span>
          </div>
        </div>
      </div>

      {/* Foto-enriquecimiento: Hábito Saludable Recomendado */}
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#eaedff] flex flex-col">
        <div className="relative w-full h-32 overflow-hidden">
          <img
            src={MEAL_IMAGE}
            alt="Plato mediterráneo con vegetales y grasas saludables"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white">
            <span className="text-[10px] font-bold uppercase tracking-wider bg-white/90 text-[#006948] px-2 py-0.5 rounded-full">
              Pauta Nutricional
            </span>
            <span className="text-[10px] text-white/90">3 min de lectura</span>
          </div>
        </div>

        <div className="p-4 flex flex-col">
          <h3 className="text-xs font-bold text-[#131b2e] mb-1">
            Hábitos clave para mantener tu bienestar
          </h3>
          <p className="text-[11px] text-[#3d4a42] mb-2 leading-relaxed">
            Consumir agua suficiente, priorizar descanso profundo y 150 minutos de actividad
            física aeróbica por semana.
          </p>
          <button
            onClick={onNavigateToTips}
            className="inline-flex items-center gap-1 text-xs font-bold text-[#006948] hover:underline self-start cursor-pointer"
          >
            <span>Ver consejos para tu rango</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          </button>
        </div>
      </div>

      {/* Enlace Rápido: Clasificación OMS */}
      <div
        onClick={onNavigateToClassification}
        className="bg-[#f2f3ff] rounded-2xl p-3.5 flex items-center justify-between cursor-pointer hover:bg-[#eaedff] transition-colors"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#cce5ff] flex items-center justify-center text-[#006398]">
            <span className="material-symbols-outlined text-[20px]">table_chart</span>
          </div>
          <div>
            <p className="text-xs font-bold text-[#131b2e]">Tabla Oficial de Clasificación</p>
            <p className="text-[10px] text-[#3d4a42]">Criterios de la OMS (2026)</p>
          </div>
        </div>
        <span className="material-symbols-outlined text-[#3d4a42] text-[18px]">
          arrow_forward
        </span>
      </div>

      {/* Botones de Acción Principales (Wireframe Pantalla 4) */}
      <div className="flex flex-col gap-2 pt-1">
        {/* Botón Primario: Nuevo Cálculo */}
        <button
          onClick={onRecalculate}
          className="w-full h-13 rounded-2xl bg-[#006948] text-white text-xs font-extrabold flex items-center justify-center gap-2 shadow-md shadow-[#006948]/25 hover:bg-[#00855d] active:scale-[0.98] transition-all cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px]">refresh</span>
          <span>NUEVO CÁLCULO</span>
        </button>

        {/* Botones Secundarios */}
        <div className="grid grid-cols-2 gap-2.5">
          <button
            onClick={handleSave}
            className={`h-11 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              isSaved
                ? 'bg-[#85f8c4] text-[#002114]'
                : 'bg-[#eaedff] text-[#131b2e] hover:bg-[#dae2fd]'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">
              {isSaved ? 'check' : 'bookmark_add'}
            </span>
            <span>{isSaved ? 'Guardado' : 'Guardar Registro'}</span>
          </button>

          <button
            onClick={handleShare}
            className="h-11 rounded-xl bg-[#eaedff] text-[#131b2e] text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-[#dae2fd] transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px] text-[#006398]">share</span>
            <span>Compartir</span>
          </button>
        </div>
      </div>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 px-4 py-2.5 rounded-full bg-[#131b2e] text-white text-xs font-medium shadow-2xl flex items-center gap-2 z-50 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <span className="material-symbols-outlined text-[16px] text-[#85f8c4]">
            check_circle
          </span>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};
