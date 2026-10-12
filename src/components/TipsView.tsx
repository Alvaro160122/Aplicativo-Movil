import React, { useState } from 'react';
import { HEALTH_TIPS } from '../data/healthData';
import { HealthTip } from '../types';

interface TipsViewProps {
  onSelectTip?: (tip: HealthTip) => void;
  initialSelectedTipId?: string | null;
}

export const TipsView: React.FC<TipsViewProps> = ({
  initialSelectedTipId,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [activeTip, setActiveTip] = useState<HealthTip | null>(
    initialSelectedTipId
      ? HEALTH_TIPS.find((t) => t.id === initialSelectedTipId) || null
      : null
  );

  const categories = ['Todos', 'Nutrición', 'Actividad Física', 'Hidratación', 'Descanso', 'Hábitos'];

  const filteredTips =
    selectedCategory === 'Todos'
      ? HEALTH_TIPS
      : HEALTH_TIPS.filter((t) => t.category === selectedCategory);

  return (
    <div className="flex flex-col gap-4 pb-24 px-4 pt-3">
      {/* Header (Wireframe Pantalla 6) */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-black text-[#131b2e] tracking-tight">
          Consejos de Salud
        </h1>
        <p className="text-xs text-[#3d4a42]">
          Recomendaciones basadas en evidencia para acompañar tu meta nutricional y bienestar diario.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 -mx-4 px-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              selectedCategory === cat
                ? 'bg-[#006948] text-white shadow-xs'
                : 'bg-[#eaedff] text-[#3d4a42] hover:bg-[#dae2fd]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Wireframe Screen 6 Tip Rows */}
      <div className="flex flex-col gap-2.5">
        {filteredTips.map((tip) => (
          <div
            key={tip.id}
            onClick={() => setActiveTip(tip)}
            className="p-4 rounded-2xl bg-white shadow-sm border border-[#eaedff] flex items-center justify-between hover:shadow-md hover:border-[#bccac0] transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-3.5 min-w-0 pr-2">
              <div className="w-11 h-11 rounded-2xl bg-[#eaedff] flex items-center justify-center text-[#006948] group-hover:bg-[#006948] group-hover:text-white transition-colors shrink-0">
                <span className="material-symbols-outlined text-[24px]">
                  {tip.iconName}
                </span>
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#006948]">
                    {tip.category}
                  </span>
                  <span className="text-[10px] text-[#3d4a42]">· {tip.readingTime}</span>
                </div>
                <h3 className="text-xs font-bold text-[#131b2e] leading-snug group-hover:text-[#006948] transition-colors">
                  {tip.title}
                </h3>
                <p className="text-[11px] text-[#3d4a42] line-clamp-1 mt-0.5">
                  {tip.shortSummary}
                </p>
              </div>
            </div>

            <span className="material-symbols-outlined text-[#3d4a42] text-[20px] group-hover:translate-x-1 transition-transform shrink-0">
              chevron_right
            </span>
          </div>
        ))}
      </div>

      {/* Detailed Modal / Bottom Sheet for Selected Tip */}
      {activeTip && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-[#131b2e]/50 backdrop-blur-xs p-3">
          <div className="w-full max-w-md bg-white rounded-3xl p-5 shadow-2xl flex flex-col gap-3.5 animate-in slide-in-from-bottom duration-200 max-h-[85vh] overflow-y-auto">
            <div className="w-12 h-1 bg-[#eaedff] rounded-full mx-auto" />

            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#85f8c4] text-[#002114]">
                {activeTip.category}
              </span>
              <button
                onClick={() => setActiveTip(null)}
                aria-label="Cerrar consejo"
                className="w-8 h-8 rounded-full bg-[#f2f3ff] flex items-center justify-center text-[#3d4a42] hover:bg-[#eaedff]"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            {/* Optional Banner Image */}
            {activeTip.imageUrl && (
              <div className="w-full h-36 rounded-2xl overflow-hidden shadow-xs">
                <img
                  src={activeTip.imageUrl}
                  alt={activeTip.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div>
              <h2 className="text-lg font-black text-[#131b2e] leading-snug">
                {activeTip.title}
              </h2>
              <div className="mt-2 p-3 rounded-xl bg-[#85f8c4]/30 border border-[#85f8c4]/50 flex items-start gap-2 text-xs text-[#005137] font-semibold">
                <span className="material-symbols-outlined text-[18px] text-[#006948] shrink-0 mt-0.5">
                  tips_and_updates
                </span>
                <span>{activeTip.keyAdvice}</span>
              </div>
            </div>

            <div className="flex flex-col gap-2 text-xs text-[#3d4a42] leading-relaxed">
              {activeTip.fullContent.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            <button
              onClick={() => setActiveTip(null)}
              className="w-full py-3 rounded-xl bg-[#006948] text-white text-xs font-bold text-center mt-1 cursor-pointer hover:bg-[#00855d]"
            >
              Entendido
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
