import React from 'react';
import { USER_AVATAR } from '../data/healthData';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onResetSampleData: () => void;
  onClearHistory: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  onResetSampleData,
  onClearHistory,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#131b2e]/50 backdrop-blur-xs p-4">
      <div className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl flex flex-col gap-4 animate-in zoom-in-95 duration-150 max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-[#eaedff]">
          <h2 className="font-bold text-base text-[#131b2e]">Configuración & Perfil</h2>
          <button
            onClick={onClose}
            aria-label="Cerrar"
            className="w-8 h-8 rounded-full bg-[#f2f3ff] flex items-center justify-center text-[#3d4a42] hover:bg-[#eaedff]"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Profile Card */}
        <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-[#f2f3ff] border border-[#eaedff]">
          <img
            src={USER_AVATAR}
            alt="Alex"
            className="w-12 h-12 rounded-full object-cover ring-2 ring-[#006948]/30"
          />
          <div className="flex flex-col">
            <span className="text-sm font-bold text-[#131b2e]">Alex Ramos</span>
            <span className="text-[11px] text-[#3d4a42]">alex.salud@vitalis.pe</span>
            <span className="text-[10px] text-[#006948] font-bold mt-0.5">● Perfil Activo</span>
          </div>
        </div>

        {/* Preferences */}
        <div className="flex flex-col gap-2">
          <span className="text-xs font-bold text-[#131b2e]">Unidades de Medida</span>
          <div className="p-3 rounded-2xl bg-[#eaedff]/40 border border-[#eaedff] flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-[#131b2e]">Sistema Métrico</span>
              <span className="text-[10px] text-[#3d4a42]">Kilogramos (kg) y Metros (m)</span>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-[#85f8c4] text-[#005137] text-[10px] font-bold">
              Predeterminado
            </span>
          </div>
        </div>

        {/* Data Management */}
        <div className="flex flex-col gap-2 pt-1 border-t border-[#eaedff]">
          <span className="text-xs font-bold text-[#131b2e]">Gestión de Registros</span>
          <div className="flex flex-col gap-2">
            <button
              onClick={() => {
                onResetSampleData();
                onClose();
              }}
              className="py-2.5 px-3 rounded-xl bg-[#f2f3ff] text-left text-xs font-semibold text-[#006948] hover:bg-[#eaedff] flex items-center justify-between transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">restore</span>
                <span>Restaurar datos de prueba</span>
              </div>
              <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            </button>

            <button
              onClick={() => {
                onClearHistory();
                onClose();
              }}
              className="py-2.5 px-3 rounded-xl bg-[#ffdad6]/40 text-left text-xs font-semibold text-[#ba1a1a] hover:bg-[#ffdad6] flex items-center justify-between transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">delete</span>
                <span>Vaciar historial actual</span>
              </div>
              <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            </button>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 rounded-xl bg-[#006948] text-white text-xs font-bold text-center mt-2 cursor-pointer hover:bg-[#00855d]"
        >
          Guardar y Cerrar
        </button>
      </div>
    </div>
  );
};
