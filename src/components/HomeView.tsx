import React, { useState } from 'react';
import { HYDRATION_IMAGE } from '../data/healthData';
import { CalculationRecord } from '../types';
import { calculateBMIValue, getBMICategory } from '../utils/bmiCalculator';
import { TabKey } from './BottomNav';

interface HomeViewProps {
  latestRecord?: CalculationRecord;
  onNavigateTab: (tab: TabKey) => void;
  onOpenAbout: () => void;
  onQuickCalculate: (weight: number, heightCm: number) => void;
  onViewTipDetail: (tipId: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  latestRecord,
  onNavigateTab,
  onOpenAbout,
  onQuickCalculate,
  onViewTipDetail,
}) => {
  // Express quick calculator inside Home
  const [expressWeight, setExpressWeight] = useState<string>(
    latestRecord ? latestRecord.weightKg.toString() : '68.2'
  );
  const [expressHeight, setExpressHeight] = useState<string>(
    latestRecord ? (latestRecord.heightCm / 100).toFixed(2) : '1.71'
  );
  const [expressResult, setExpressResult] = useState<{
    bmi: number;
    category: ReturnType<typeof getBMICategory>;
  } | null>(null);

  const handleRunExpressCalc = () => {
    const w = parseFloat(expressWeight);
    const h = parseFloat(expressHeight);
    if (!w || !h || h <= 0) return;
    const bmiVal = calculateBMIValue(w, h);
    const cat = getBMICategory(bmiVal);
    setExpressResult({ bmi: bmiVal, category: cat });
  };

  const handleOpenFullReportFromExpress = () => {
    const w = parseFloat(expressWeight);
    const h = parseFloat(expressHeight);
    if (!w || !h || h <= 0) return;
    onQuickCalculate(w, Math.round(h * 100));
  };

  const currentBMI = latestRecord ? latestRecord.bmi : 23.4;
  const currentCategory = latestRecord
    ? getBMICategory(latestRecord.bmi)
    : getBMICategory(23.4);
  const currentWeight = latestRecord ? latestRecord.weightKg : 68.2;
  const currentHeight = latestRecord ? (latestRecord.heightCm / 100).toFixed(2) : '1.71';

  return (
    <div className="flex flex-col gap-4 pb-20 px-4 pt-3">
      {/* Saludo Personalizado & Estado */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <h1 className="text-xl font-bold text-[#131b2e]">¡Hola, Alex!</h1>
            <span className="text-xl">👋</span>
          </div>
          <span className="text-xs text-[#3d4a42]">Controla tu bienestar hoy con Vitalis</span>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#85f8c4] text-[#002114]">
          <span className="w-2 h-2 rounded-full bg-[#006948] animate-pulse" />
          <span className="text-[10px] font-bold uppercase tracking-wide">Activo</span>
        </div>
      </div>

      {/* Banner Heroico Principal (Wireframe Pantalla 2) */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#006948] via-[#00855d] to-[#006c4a] p-5 text-white shadow-md shadow-[#006948]/20">
        <div className="absolute -right-8 -bottom-10 w-40 h-40 rounded-full bg-white/10 blur-xl pointer-events-none" />
        <div className="absolute right-4 top-4 opacity-15 pointer-events-none">
          <span className="material-symbols-outlined text-[72px]">ecg_heart</span>
        </div>

        <div className="relative z-10 flex flex-col gap-2 max-w-[90%]">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md w-fit text-[11px] font-semibold">
            <span className="material-symbols-outlined text-[14px]">health_and_safety</span>
            <span>Evaluación Biométrica</span>
          </div>

          <div>
            <h2 className="text-xl font-black leading-tight text-white">
              Calcula tu Índice de Masa Corporal
            </h2>
            <p className="text-xs text-white/90 mt-1 leading-relaxed">
              Una herramienta simple para conocer tu estado nutricional y cuidar tu bienestar integral.
            </p>
          </div>

          <div className="pt-2">
            <button
              onClick={() => onNavigateTab('calcular')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white text-[#006948] text-xs font-bold shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              <span>Comenzar Cálculo</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>

      {/* Quick Biometric Snapshot / Último Registro */}
      <div className="flex flex-col rounded-2xl bg-white p-4 shadow-sm border border-[#eaedff]">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#85f8c4] flex items-center justify-center text-[#002114]">
              <span className="material-symbols-outlined text-[18px]">monitor_weight</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-[#131b2e]">Último IMC registrado</span>
              <span className="text-[11px] text-[#3d4a42]">
                {latestRecord ? `${latestRecord.date} • ${latestRecord.time}` : '12 de Abril, 2026'}
              </span>
            </div>
          </div>
          <span
            className={`px-2.5 py-1 rounded-full ${currentCategory.badgeBg} ${currentCategory.badgeText} text-[11px] font-bold`}
          >
            {currentCategory.title}
          </span>
        </div>

        <div className="flex items-end justify-between mt-2 pt-2 border-t border-[#f2f3ff]">
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-black text-[#131b2e] tracking-tight">
              {currentBMI.toFixed(1)}
            </span>
            <span className="text-xs font-bold text-[#3d4a42]">kg/m²</span>
          </div>

          {/* Sparkline & Details */}
          <div className="flex items-center gap-2">
            <div className="flex flex-col items-end">
              <span className="text-xs font-bold text-[#006948] flex items-center gap-0.5">
                <span className="material-symbols-outlined text-[14px]">trending_flat</span>
                {currentCategory.tag}
              </span>
              <span className="text-[11px] text-[#3d4a42]">
                {currentWeight} kg • {currentHeight} m
              </span>
            </div>
            <svg className="w-14 h-7 text-[#006948]" fill="none" viewBox="0 0 64 32">
              <path
                d="M2 24 C 18 20, 32 14, 46 16 C 54 17, 58 8, 62 8"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
              />
              <circle cx="62" cy="8" fill="currentColor" r="3" />
            </svg>
          </div>
        </div>

        {/* Diagnostic Spectrum Strip */}
        <div className="mt-3 flex flex-col gap-1.5">
          <div className="relative w-full h-2 rounded-full bg-[#eaedff] overflow-hidden flex">
            <div className="w-[20%] h-full bg-[#5bb8fe]" title="Bajo peso" />
            <div className="w-[35%] h-full bg-[#006948]" title="Saludable" />
            <div className="w-[25%] h-full bg-[#ffddb8]" title="Sobrepeso" />
            <div className="w-[20%] h-full bg-[#ffdad6]" title="Obesidad" />
          </div>
          <div className="flex justify-between text-[10px] text-[#3d4a42]">
            <span>Bajo &lt;18.5</span>
            <span className="font-bold text-[#006948]">Normal 18.5–24.9</span>
            <span>Sobrepeso &gt;25</span>
            <span>Obesidad &gt;30</span>
          </div>
        </div>
      </div>

      {/* Cuadrícula 2x2 de Accesos Directos (Wireframe Pantalla 2) */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between px-0.5">
          <h3 className="text-sm font-bold text-[#131b2e]">Módulos del Sistema</h3>
          <span className="text-xs text-[#3d4a42]">Accesos directos</span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {/* 1. Calcular IMC */}
          <button
            onClick={() => onNavigateTab('calcular')}
            className="flex flex-col items-start p-4 rounded-2xl bg-white text-left shadow-sm border border-[#eaedff] hover:shadow-md transition-all group cursor-pointer"
          >
            <div className="w-11 h-11 rounded-xl bg-[#85f8c4] flex items-center justify-center text-[#006948] group-hover:bg-[#006948] group-hover:text-white transition-colors mb-3">
              <span className="material-symbols-outlined text-[24px]">calculate</span>
            </div>
            <span className="text-sm font-bold text-[#131b2e]">Calcular IMC</span>
            <span className="text-[11px] text-[#3d4a42] mt-0.5 line-clamp-2">
              Ingresa tu peso y talla en tiempo real.
            </span>
            <div className="mt-3 flex items-center gap-1 text-[11px] font-bold text-[#006948]">
              <span>Abrir formulario</span>
              <span className="material-symbols-outlined text-[14px] group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </div>
          </button>

          {/* 2. Clasificación */}
          <button
            onClick={() => onNavigateTab('clasificacion')}
            className="flex flex-col items-start p-4 rounded-2xl bg-white text-left shadow-sm border border-[#eaedff] hover:shadow-md transition-all group cursor-pointer"
          >
            <div className="w-11 h-11 rounded-xl bg-[#cce5ff] flex items-center justify-center text-[#006398] group-hover:bg-[#006398] group-hover:text-white transition-colors mb-3">
              <span className="material-symbols-outlined text-[24px]">bar_chart</span>
            </div>
            <span className="text-sm font-bold text-[#131b2e]">Clasificación</span>
            <span className="text-[11px] text-[#3d4a42] mt-0.5 line-clamp-2">
              Rangos oficiales de la OMS por estado.
            </span>
            <div className="mt-3 flex items-center gap-1 text-[11px] font-bold text-[#006398]">
              <span>Ver tablas</span>
              <span className="material-symbols-outlined text-[14px] group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </div>
          </button>

          {/* 3. Consejos de Salud */}
          <button
            onClick={() => onNavigateTab('consejos')}
            className="flex flex-col items-start p-4 rounded-2xl bg-white text-left shadow-sm border border-[#eaedff] hover:shadow-md transition-all group cursor-pointer"
          >
            <div className="w-11 h-11 rounded-xl bg-[#ffddb8] flex items-center justify-center text-[#825100] group-hover:bg-[#825100] group-hover:text-white transition-colors mb-3">
              <span className="material-symbols-outlined text-[24px]">favorite</span>
            </div>
            <span className="text-sm font-bold text-[#131b2e]">Consejos</span>
            <span className="text-[11px] text-[#3d4a42] mt-0.5 line-clamp-2">
              Guías de nutrición, sueño e hidratación.
            </span>
            <div className="mt-3 flex items-center gap-1 text-[11px] font-bold text-[#825100]">
              <span>Explorar tips</span>
              <span className="material-symbols-outlined text-[14px] group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </div>
          </button>

          {/* 4. Acerca de */}
          <button
            onClick={onOpenAbout}
            className="flex flex-col items-start p-4 rounded-2xl bg-white text-left shadow-sm border border-[#eaedff] hover:shadow-md transition-all group cursor-pointer"
          >
            <div className="w-11 h-11 rounded-xl bg-[#e2e7ff] flex items-center justify-center text-[#131b2e] group-hover:bg-[#131b2e] group-hover:text-white transition-colors mb-3">
              <span className="material-symbols-outlined text-[24px]">info</span>
            </div>
            <span className="text-sm font-bold text-[#131b2e]">Acerca de</span>
            <span className="text-[11px] text-[#3d4a42] mt-0.5 line-clamp-2">
              Información médica y créditos académicos.
            </span>
            <div className="mt-3 flex items-center gap-1 text-[11px] font-bold text-[#131b2e]">
              <span>Ver detalles</span>
              <span className="material-symbols-outlined text-[14px] group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Mini Formulario Interactivo Express (Cálculo Rápido sin salir) */}
      <div className="flex flex-col rounded-2xl bg-white p-4 shadow-sm border border-[#eaedff] gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#006948] text-[20px]">speed</span>
            <span className="text-xs font-bold text-[#131b2e]">Cálculo Rápido sin salir</span>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#006948] bg-[#eaedff] px-2 py-0.5 rounded-full">
            Express
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-semibold text-[#3d4a42]" htmlFor="express-peso">
              Peso (kg)
            </label>
            <div className="relative flex items-center">
              <span className="material-symbols-outlined text-[#6d7a72] absolute left-2.5 text-[18px]">
                scale
              </span>
              <input
                id="express-peso"
                type="number"
                step="0.1"
                min="30"
                max="250"
                value={expressWeight}
                onChange={(e) => setExpressWeight(e.target.value)}
                className="w-full h-11 pl-8 pr-7 rounded-xl bg-[#f2f3ff] text-xs font-semibold text-[#131b2e] focus:outline-none focus:ring-2 focus:ring-[#006948]/25"
                placeholder="Ej: 70"
              />
              <span className="absolute right-2.5 text-[10px] font-bold text-[#6d7a72]">kg</span>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-semibold text-[#3d4a42]" htmlFor="express-talla">
              Estatura (m)
            </label>
            <div className="relative flex items-center">
              <span className="material-symbols-outlined text-[#6d7a72] absolute left-2.5 text-[18px]">
                straighten
              </span>
              <input
                id="express-talla"
                type="number"
                step="0.01"
                min="1.00"
                max="2.50"
                value={expressHeight}
                onChange={(e) => setExpressHeight(e.target.value)}
                className="w-full h-11 pl-8 pr-7 rounded-xl bg-[#f2f3ff] text-xs font-semibold text-[#131b2e] focus:outline-none focus:ring-2 focus:ring-[#006948]/25"
                placeholder="Ej: 1.70"
              />
              <span className="absolute right-2.5 text-[10px] font-bold text-[#6d7a72]">m</span>
            </div>
          </div>
        </div>

        <button
          onClick={handleRunExpressCalc}
          className="w-full h-11 rounded-xl bg-[#006948] text-white text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-[#00855d] active:scale-[0.99] transition-all cursor-pointer shadow-sm"
        >
          <span className="material-symbols-outlined text-[18px]">bolt</span>
          <span>Actualizar Mi Índice</span>
        </button>

        {/* Live Express Result Box */}
        {expressResult && (
          <div className="p-3 rounded-xl bg-[#f2f3ff] flex flex-col gap-2 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#006948] text-[20px]">
                  check_circle
                </span>
                <span className="text-xs font-bold text-[#131b2e]">
                  IMC: {expressResult.bmi} kg/m²
                </span>
              </div>
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${expressResult.category.badgeBg} ${expressResult.category.badgeText}`}
              >
                {expressResult.category.title}
              </span>
            </div>

            <button
              onClick={handleOpenFullReportFromExpress}
              className="text-center text-xs font-bold text-[#006948] hover:underline pt-1"
            >
              Ver Detalle Completo y Recomendaciones →
            </button>
          </div>
        )}
      </div>

      {/* Consejo del Día Saludable (Con imagen hotlinkeada) */}
      <div className="flex flex-col rounded-2xl bg-white p-4 shadow-sm border border-[#eaedff] gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[#ffddb8] flex items-center justify-center text-[#825100]">
              <span className="material-symbols-outlined text-[15px]">lightbulb</span>
            </div>
            <span className="text-xs font-bold text-[#131b2e]">Consejo del Día</span>
          </div>
          <span className="text-[10px] font-bold text-[#006948] bg-[#eaedff] px-2 py-0.5 rounded-full">
            Nutrición & Agua
          </span>
        </div>

        <div
          onClick={() => onViewTipDetail('tip-3')}
          className="flex gap-3 items-center group cursor-pointer"
        >
          <img
            src={HYDRATION_IMAGE}
            alt="Agua con rodajas de cítricos y menta fresca"
            className="w-20 h-20 rounded-xl object-cover shrink-0 group-hover:scale-105 transition-transform"
          />
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-bold text-[#131b2e] leading-snug group-hover:text-[#006948] transition-colors">
              La hidratación balancea tu composición corporal
            </span>
            <p className="text-[11px] text-[#3d4a42] mt-1 line-clamp-2">
              Beber de 2 a 2.5 litros de agua al día mejora la retención de líquidos y la oxigenación celular.
            </p>
            <span className="text-[10px] font-bold text-[#006948] mt-1.5 flex items-center gap-0.5">
              <span>Leer artículo completo</span>
              <span className="material-symbols-outlined text-[12px]">chevron_right</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
