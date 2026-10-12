import React from 'react';

export type TabKey = 'inicio' | 'calcular' | 'clasificacion' | 'consejos' | 'historial';

interface BottomNavProps {
  activeTab: TabKey;
  onSelectTab: (tab: TabKey) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onSelectTab }) => {
  return (
    <nav
      aria-label="Navegación principal"
      className="fixed bottom-0 left-0 right-0 z-40 bg-[#faf8ff]/95 backdrop-blur-xl border-t border-[#bccac0]/25 shadow-[0_-4px_20px_rgba(19,27,46,0.05)] pb-safe transition-all"
    >
      <div className="max-w-md mx-auto h-16 px-2 flex items-center justify-around">
        {/* Tab 1: Inicio */}
        <button
          onClick={() => onSelectTab('inicio')}
          aria-current={activeTab === 'inicio' ? 'page' : undefined}
          className={`flex flex-col items-center justify-center min-w-[56px] min-h-[48px] py-1 transition-all group ${
            activeTab === 'inicio' ? 'text-[#006948] font-bold' : 'text-[#3d4a42] hover:text-[#006948]'
          }`}
        >
          <span className="material-symbols-outlined text-[24px] group-hover:scale-110 transition-transform">
            home
          </span>
          <span className="text-[11px] font-medium tracking-tight mt-0.5">Inicio</span>
        </button>

        {/* Tab 2: Clasificación */}
        <button
          onClick={() => onSelectTab('clasificacion')}
          aria-current={activeTab === 'clasificacion' ? 'page' : undefined}
          className={`flex flex-col items-center justify-center min-w-[56px] min-h-[48px] py-1 transition-all group ${
            activeTab === 'clasificacion' ? 'text-[#006948] font-bold' : 'text-[#3d4a42] hover:text-[#006948]'
          }`}
        >
          <span className="material-symbols-outlined text-[24px] group-hover:scale-110 transition-transform">
            bar_chart
          </span>
          <span className="text-[11px] font-medium tracking-tight mt-0.5">Clasificación</span>
        </button>

        {/* Center Floating Tab: Calcular IMC (Focal Action) */}
        <button
          onClick={() => onSelectTab('calcular')}
          aria-label="Calcular IMC"
          aria-current={activeTab === 'calcular' ? 'page' : undefined}
          className="flex flex-col items-center justify-center -mt-5 group"
        >
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg transition-all ${
              activeTab === 'calcular'
                ? 'bg-[#00855d] scale-105 shadow-[#006948]/40 ring-4 ring-[#85f8c4]/50'
                : 'bg-[#006948] shadow-[#006948]/25 group-hover:scale-105 group-hover:bg-[#00855d]'
            }`}
          >
            <span className="material-symbols-outlined text-[26px]">calculate</span>
          </div>
          <span
            className={`text-[10px] font-bold mt-1 tracking-tight ${
              activeTab === 'calcular' ? 'text-[#006948]' : 'text-[#3d4a42]'
            }`}
          >
            Calcular
          </span>
        </button>

        {/* Tab 3: Consejos */}
        <button
          onClick={() => onSelectTab('consejos')}
          aria-current={activeTab === 'consejos' ? 'page' : undefined}
          className={`flex flex-col items-center justify-center min-w-[56px] min-h-[48px] py-1 transition-all group ${
            activeTab === 'consejos' ? 'text-[#006948] font-bold' : 'text-[#3d4a42] hover:text-[#006948]'
          }`}
        >
          <span className="material-symbols-outlined text-[24px] group-hover:scale-110 transition-transform">
            favorite
          </span>
          <span className="text-[11px] font-medium tracking-tight mt-0.5">Consejos</span>
        </button>

        {/* Tab 4: Historial */}
        <button
          onClick={() => onSelectTab('historial')}
          aria-current={activeTab === 'historial' ? 'page' : undefined}
          className={`flex flex-col items-center justify-center min-w-[56px] min-h-[48px] py-1 transition-all group ${
            activeTab === 'historial' ? 'text-[#006948] font-bold' : 'text-[#3d4a42] hover:text-[#006948]'
          }`}
        >
          <span className="material-symbols-outlined text-[24px] group-hover:scale-110 transition-transform">
            history
          </span>
          <span className="text-[11px] font-medium tracking-tight mt-0.5">Historial</span>
        </button>
      </div>
    </nav>
  );
};
