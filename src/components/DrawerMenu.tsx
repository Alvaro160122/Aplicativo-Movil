import React from 'react';
import { APP_LOGO } from '../data/healthData';
import { TabKey } from './BottomNav';

interface DrawerMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTab: (tab: TabKey) => void;
  onOpenAbout: () => void;
  onOpenSettings: () => void;
  onReplaySplash: () => void;
}

export const DrawerMenu: React.FC<DrawerMenuProps> = ({
  isOpen,
  onClose,
  onSelectTab,
  onOpenAbout,
  onOpenSettings,
  onReplaySplash,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#131b2e]/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Container (Wireframe Screen 8) */}
      <div className="relative w-80 max-w-[85vw] bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-left duration-250">
        {/* Drawer Header */}
        <div className="p-5 border-b border-[#eaedff] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#eaedff] flex items-center justify-center p-2 border border-[#bccac0]/30 shadow-xs">
              <img src={APP_LOGO} alt="Vitalis Logo" className="h-full w-full object-contain" />
            </div>
            <div>
              <h2 className="font-bold text-base text-[#131b2e] leading-tight">MI IMC</h2>
              <span className="text-xs text-[#006948] font-medium">Cuida tu salud</span>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Cerrar menú"
            className="w-9 h-9 rounded-full bg-[#f2f3ff] flex items-center justify-center text-[#3d4a42] hover:bg-[#eaedff] transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Navigation Items (Screen 8 Menu Links) */}
        <div className="flex-1 overflow-y-auto py-3 px-3 flex flex-col gap-1">
          <button
            onClick={() => {
              onSelectTab('inicio');
              onClose();
            }}
            className="flex items-center gap-3.5 px-4 py-3 rounded-xl text-left text-sm font-semibold text-[#131b2e] hover:bg-[#eaedff] transition-colors group"
          >
            <span className="material-symbols-outlined text-[22px] text-[#006948] group-hover:scale-110 transition-transform">
              home
            </span>
            <span>Inicio</span>
          </button>

          <button
            onClick={() => {
              onSelectTab('calcular');
              onClose();
            }}
            className="flex items-center gap-3.5 px-4 py-3 rounded-xl text-left text-sm font-semibold text-[#131b2e] hover:bg-[#eaedff] transition-colors group"
          >
            <span className="material-symbols-outlined text-[22px] text-[#006948] group-hover:scale-110 transition-transform">
              calculate
            </span>
            <span>Calcular IMC</span>
          </button>

          <button
            onClick={() => {
              onSelectTab('clasificacion');
              onClose();
            }}
            className="flex items-center gap-3.5 px-4 py-3 rounded-xl text-left text-sm font-semibold text-[#131b2e] hover:bg-[#eaedff] transition-colors group"
          >
            <span className="material-symbols-outlined text-[22px] text-[#006398] group-hover:scale-110 transition-transform">
              bar_chart
            </span>
            <span>Clasificación OMS</span>
          </button>

          <button
            onClick={() => {
              onSelectTab('consejos');
              onClose();
            }}
            className="flex items-center gap-3.5 px-4 py-3 rounded-xl text-left text-sm font-semibold text-[#131b2e] hover:bg-[#eaedff] transition-colors group"
          >
            <span className="material-symbols-outlined text-[22px] text-[#825100] group-hover:scale-110 transition-transform">
              favorite
            </span>
            <span>Consejos de Salud</span>
          </button>

          <button
            onClick={() => {
              onSelectTab('historial');
              onClose();
            }}
            className="flex items-center gap-3.5 px-4 py-3 rounded-xl text-left text-sm font-semibold text-[#131b2e] hover:bg-[#eaedff] transition-colors group"
          >
            <span className="material-symbols-outlined text-[22px] text-[#006948] group-hover:scale-110 transition-transform">
              history
            </span>
            <span>Historial</span>
          </button>

          <div className="my-2 border-t border-[#eaedff]" />

          <button
            onClick={() => {
              onClose();
              onOpenSettings();
            }}
            className="flex items-center gap-3.5 px-4 py-3 rounded-xl text-left text-sm font-semibold text-[#131b2e] hover:bg-[#eaedff] transition-colors group"
          >
            <span className="material-symbols-outlined text-[22px] text-[#3d4a42] group-hover:scale-110 transition-transform">
              settings
            </span>
            <span>Configuración</span>
          </button>

          <button
            onClick={() => {
              onClose();
              onOpenAbout();
            }}
            className="flex items-center gap-3.5 px-4 py-3 rounded-xl text-left text-sm font-semibold text-[#131b2e] hover:bg-[#eaedff] transition-colors group"
          >
            <span className="material-symbols-outlined text-[22px] text-[#3d4a42] group-hover:scale-110 transition-transform">
              info
            </span>
            <span>Acerca de</span>
          </button>

          <button
            onClick={() => {
              onClose();
              onReplaySplash();
            }}
            className="flex items-center gap-3.5 px-4 py-3 rounded-xl text-left text-sm font-semibold text-[#131b2e] hover:bg-[#eaedff] transition-colors group"
          >
            <span className="material-symbols-outlined text-[22px] text-[#006948] group-hover:scale-110 transition-transform">
              restart_alt
            </span>
            <span>Ver Pantalla Splash</span>
          </button>
        </div>

        {/* Academic Accreditation Box at bottom of Drawer */}
        <div className="p-4 bg-[#f2f3ff] border-t border-[#eaedff] flex flex-col gap-1 text-[11px] text-[#3d4a42]">
          <span className="font-bold text-[#131b2e]">
            I.S.T.P. Antenor Orrego Espinoza
          </span>
          <span>Maqueta IMC v1.0 • Fecha: 2026</span>
          <span className="text-[10px] text-[#6d7a72] mt-1">
            Basado en las normativas antropométricas de la OMS.
          </span>
        </div>
      </div>
    </div>
  );
};
