import React, { useState } from 'react';
import { BMI_CATEGORIES } from '../data/healthData';
import { BMICategoryInfo } from '../types';

interface ClassificationViewProps {
  onNavigateCalculate: () => void;
}

export const ClassificationView: React.FC<ClassificationViewProps> = ({
  onNavigateCalculate,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<BMICategoryInfo | null>(null);

  const categoriesList = Object.values(BMI_CATEGORIES);

  return (
    <div className="flex flex-col gap-4 pb-24 px-4 pt-3">
      {/* Top Banner (Wireframe Pantalla 5) */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-1.5">
          <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#cce5ff] text-[#006398]">
            <span className="material-symbols-outlined text-[14px]">verified</span>
          </span>
          <span className="text-[10px] font-bold text-[#006398] uppercase tracking-wider">
            Normativa OMS
          </span>
        </div>
        <h1 className="text-2xl font-black text-[#131b2e] tracking-tight">
          Clasificación del IMC
        </h1>
        <p className="text-xs text-[#3d4a42] leading-relaxed">
          Estándares oficiales de salud según la Organización Mundial de la Salud (OMS) para la
          evaluación antropométrica.
        </p>
      </div>

      {/* Quick Formula Card & Visual Gauge */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#eaedff] flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[#006948]">
            <span className="material-symbols-outlined text-[20px]">functions</span>
            <span className="text-xs font-bold text-[#006948]">Fórmula estándar</span>
          </div>
          <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-[#f2f3ff] text-[#3d4a42]">
            Quetelet
          </span>
        </div>

        <div className="flex items-center justify-between bg-[#f2f3ff] p-3 rounded-xl">
          <div className="flex items-baseline gap-2">
            <span className="text-sm font-black text-[#131b2e]">IMC</span>
            <span className="text-xs text-[#3d4a42]">=</span>
            <div className="inline-flex flex-col items-center">
              <span className="text-xs font-bold text-[#131b2e] border-b border-[#bccac0] px-1.5 pb-0.5">
                Peso (kg)
              </span>
              <span className="text-xs font-bold text-[#131b2e] pt-0.5">
                Altura² (m²)
              </span>
            </div>
          </div>
          <span className="text-xs text-[#3d4a42]">
            Unidad: <strong className="text-[#131b2e]">kg/m²</strong>
          </span>
        </div>

        {/* Micro Spectrum */}
        <div className="flex flex-col gap-1 pt-1">
          <div className="flex justify-between items-center text-[10px] text-[#3d4a42] font-semibold">
            <span>&lt; 18.5</span>
            <span>18.5 – 24.9</span>
            <span>25 – 29.9</span>
            <span>≥ 30.0</span>
          </div>
          <div className="h-2 w-full rounded-full flex overflow-hidden gap-0.5">
            <div className="h-full w-[20%] bg-[#5bb8fe] rounded-l-full" />
            <div className="h-full w-[35%] bg-[#006948]" />
            <div className="h-full w-[20%] bg-[#ffb95f]" />
            <div className="h-full w-[25%] bg-[#ba1a1a] rounded-r-full" />
          </div>
        </div>
      </div>

      {/* Official Wireframe Table & Category Cards */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between px-0.5">
          <span className="text-xs font-bold uppercase tracking-wider text-[#131b2e]">
            Rangos y Diagnóstico
          </span>
          <span className="text-[11px] text-[#3d4a42]">6 categorías OMS</span>
        </div>

        <div className="flex flex-col gap-2.5">
          {categoriesList.map((cat) => {
            const isNormal = cat.key === 'normal';
            return (
              <div
                key={cat.key}
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-2xl p-4 transition-all cursor-pointer border ${
                  isNormal
                    ? 'bg-white shadow-md border-[#006948]/30 ring-1 ring-[#006948]/20'
                    : 'bg-white shadow-sm border-[#eaedff] hover:border-[#bccac0]'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${cat.badgeBg} ${cat.badgeText}`}
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        {cat.key === 'bajo'
                          ? 'north_west'
                          : cat.key === 'normal'
                          ? 'check_circle'
                          : cat.key === 'sobrepeso'
                          ? 'trending_up'
                          : cat.key === 'obesidad_1'
                          ? 'warning'
                          : cat.key === 'obesidad_2'
                          ? 'priority_high'
                          : 'health_and_safety'}
                      </span>
                    </div>

                    <div className="flex flex-col">
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-bold text-[#131b2e]">{cat.title}</span>
                        {isNormal && (
                          <span className="text-[10px] font-bold text-[#006948] bg-[#85f8c4]/60 px-1.5 py-0.5 rounded-md">
                            ★ Saludable
                          </span>
                        )}
                      </div>
                      <span className={`text-xs font-bold ${cat.colorClass}`}>
                        {cat.rangeText}
                      </span>
                    </div>
                  </div>

                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${cat.badgeBg} ${cat.badgeText}`}
                  >
                    {cat.tag}
                  </span>
                </div>

                <p className="text-[11px] text-[#3d4a42] mt-2.5 leading-relaxed">
                  {cat.summary}
                </p>

                <div className="mt-2 pt-2 border-t border-[#f2f3ff] flex items-center justify-between text-[10px] font-bold text-[#006948]">
                  <span>Ver recomendaciones clínicas</span>
                  <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Wireframe Official Table View (Quick Tabular Summary) */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#eaedff]">
        <h3 className="text-xs font-bold text-[#131b2e] mb-2">
          Tabla Sintética (Maqueta Antenor Orrego)
        </h3>
        <div className="overflow-hidden rounded-xl border border-[#eaedff]">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#f2f3ff] text-[#131b2e] font-bold">
              <tr>
                <th className="py-2.5 px-3">Rango de IMC</th>
                <th className="py-2.5 px-3">Estado nutricional</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eaedff] text-[11px]">
              <tr className="hover:bg-[#faf8ff]">
                <td className="py-2 px-3">Menor a 18.5</td>
                <td className="py-2 px-3 text-[#006398] font-semibold">Bajo peso</td>
              </tr>
              <tr className="bg-[#85f8c4]/20 font-bold text-[#006948]">
                <td className="py-2 px-3">18.5 – 24.9</td>
                <td className="py-2 px-3">Peso saludable</td>
              </tr>
              <tr className="hover:bg-[#faf8ff]">
                <td className="py-2 px-3">25.0 – 29.9</td>
                <td className="py-2 px-3 text-[#825100] font-semibold">Sobrepeso</td>
              </tr>
              <tr className="hover:bg-[#faf8ff]">
                <td className="py-2 px-3">30.0 – 34.9</td>
                <td className="py-2 px-3 text-[#a36700] font-semibold">Obesidad grado I</td>
              </tr>
              <tr className="hover:bg-[#faf8ff]">
                <td className="py-2 px-3">35.0 – 39.9</td>
                <td className="py-2 px-3 text-[#ba1a1a] font-semibold">Obesidad grado II</td>
              </tr>
              <tr className="hover:bg-[#faf8ff]">
                <td className="py-2 px-3">40.0 o más</td>
                <td className="py-2 px-3 text-[#ba1a1a] font-bold">Obesidad grado III</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Medical Disclaimer Card (Wireframe Screen 5) */}
      <div className="bg-[#eaedff]/60 rounded-2xl p-3.5 flex gap-2.5 items-start border border-[#eaedff]">
        <span className="material-symbols-outlined text-[#006398] text-[20px] shrink-0 mt-0.5">
          info
        </span>
        <div className="flex flex-col gap-0.5">
          <span className="text-xs font-bold text-[#131b2e]">Aviso médico y descargo</span>
          <p className="text-[11px] text-[#3d4a42] leading-relaxed">
            Clasificación según la Organización Mundial de la Salud (OMS). El IMC es un indicador
            poblacional y orientativo. Factores como masa muscular, densidad ósea y edad deben ser
            evaluados por un profesional de la salud.
          </p>
        </div>
      </div>

      {/* Primary Action Button */}
      <button
        onClick={onNavigateCalculate}
        className="w-full h-13 rounded-2xl bg-[#006948] text-white text-xs font-extrabold shadow-md shadow-[#006948]/25 flex items-center justify-center gap-2 hover:bg-[#00855d] active:scale-[0.98] transition-all cursor-pointer"
      >
        <span className="material-symbols-outlined text-[20px]">calculate</span>
        <span>Calcular mi IMC ahora</span>
      </button>

      {/* Category Detail Modal */}
      {selectedCategory && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-[#131b2e]/50 backdrop-blur-xs p-3">
          <div className="w-full max-w-md bg-white rounded-3xl p-5 shadow-2xl flex flex-col gap-3 animate-in slide-in-from-bottom duration-200 max-h-[85vh] overflow-y-auto">
            <div className="w-12 h-1 bg-[#eaedff] rounded-full mx-auto" />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${selectedCategory.badgeBg} ${selectedCategory.badgeText}`}
                >
                  {selectedCategory.title}
                </span>
                <span className="text-xs font-bold text-[#3d4a42]">
                  {selectedCategory.rangeText}
                </span>
              </div>
              <button
                onClick={() => setSelectedCategory(null)}
                aria-label="Cerrar detalle"
                className="w-8 h-8 rounded-full bg-[#f2f3ff] flex items-center justify-center text-[#3d4a42] hover:bg-[#eaedff]"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div>
              <h3 className="text-base font-extrabold text-[#131b2e]">Recomendaciones Oficiales</h3>
              <p className="text-xs text-[#3d4a42] mt-1 leading-relaxed">
                {selectedCategory.clinicalDetail}
              </p>
            </div>

            <div className="p-3 bg-[#f2f3ff] rounded-2xl flex flex-col gap-2">
              <span className="text-xs font-bold text-[#006948]">Pautas clave de salud:</span>
              <ul className="flex flex-col gap-1.5 text-[11px] text-[#3d4a42]">
                {selectedCategory.recommendations.map((rec, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-[#006948] text-[16px] shrink-0 mt-0.5">
                      check
                    </span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => {
                setSelectedCategory(null);
                onNavigateCalculate();
              }}
              className="w-full py-3 rounded-xl bg-[#006948] text-white text-xs font-bold text-center mt-1 cursor-pointer hover:bg-[#00855d]"
            >
              Calcular con mis medidas
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
