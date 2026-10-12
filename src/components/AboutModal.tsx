import React from 'react';
import { APP_LOGO } from '../data/healthData';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#131b2e]/50 backdrop-blur-xs p-4">
      <div className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl flex flex-col gap-4 animate-in zoom-in-95 duration-150 max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-[#eaedff]">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#eaedff] flex items-center justify-center p-1.5 border border-[#bccac0]/30">
              <img src={APP_LOGO} alt="Vitalis Logo" className="h-full w-full object-contain" />
            </div>
            <div>
              <h2 className="font-bold text-sm text-[#131b2e]">Acerca de Vitalis IMC</h2>
              <span className="text-[10px] text-[#006948] font-bold uppercase tracking-wider">
                Versión 1.0 (2026)
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Cerrar"
            className="w-8 h-8 rounded-full bg-[#f2f3ff] flex items-center justify-center text-[#3d4a42] hover:bg-[#eaedff]"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Wireframe Reference Card */}
        <div className="p-3.5 rounded-2xl bg-[#eaedff]/60 border border-[#eaedff] flex flex-col gap-1.5 text-xs text-[#3d4a42]">
          <span className="font-bold text-[#131b2e] uppercase text-[10px] tracking-wider text-[#006948]">
            Crédito Institucional
          </span>
          <p className="font-bold text-[#131b2e] leading-snug">
            Instituto Superior Tecnológico Público "Antenor Orrego Espinoza"
          </p>
          <p className="text-[11px] text-[#3d4a42]">
            Proyecto Maqueta / Wireframe: App Calculadora de Índice de Masa Corporal (IMC).
          </p>
        </div>

        {/* Scientific Basis */}
        <div className="flex flex-col gap-1.5 text-xs text-[#3d4a42]">
          <h3 className="font-bold text-[#131b2e]">Fundamento Científico</h3>
          <p className="text-[11px] leading-relaxed">
            El Índice de Masa Corporal (IMC) fue desarrollado por Adolphe Quetelet y adoptado
            por la Organización Mundial de la Salud (OMS) como el estándar de cribado epidemiológico
            para categorizar el peso corporal en relación con la estatura.
          </p>
        </div>

        {/* Medical Notice */}
        <div className="p-3.5 rounded-2xl bg-[#ffddb8]/40 border border-[#ffddb8] flex items-start gap-2 text-[11px] text-[#653e00]">
          <span className="material-symbols-outlined text-[18px] text-[#825100] shrink-0 mt-0.5">
            warning
          </span>
          <div className="flex flex-col">
            <span className="font-bold text-[#2a1700]">Descargo Clínico</span>
            <p className="mt-0.5 leading-relaxed">
              Esta aplicación tiene propósitos educativos y de orientación preventiva. No
              constituye diagnóstico médico definitivo ni evalúa la masa muscular de atletas.
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 rounded-xl bg-[#006948] text-white text-xs font-bold text-center mt-1 cursor-pointer hover:bg-[#00855d]"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};
