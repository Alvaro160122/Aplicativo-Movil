import React, { useEffect, useState } from 'react';
import { APP_LOGO } from '../data/healthData';

interface SplashViewProps {
  onDismiss: () => void;
}

export const SplashView: React.FC<SplashViewProps> = ({ onDismiss }) => {
  const [progress, setProgress] = useState(15);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onDismiss, 350);
          return 100;
        }
        return prev + 12;
      });
    }, 120);

    return () => clearInterval(interval);
  }, [onDismiss]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-[#faf8ff] p-8 text-center animate-in fade-in duration-300">
      {/* Top Academic Note */}
      <div className="pt-8 flex flex-col items-center">
        <span className="text-[11px] font-bold uppercase tracking-wider text-[#006948]/80">
          I.S.T.P. Antenor Orrego Espinoza
        </span>
        <span className="text-[10px] text-[#3d4a42]/70 mt-0.5">
          Proyección en Salud Digital • 2026
        </span>
      </div>

      {/* Main Logo & Title Center (Wireframe Screen 1) */}
      <div className="flex flex-col items-center max-w-xs">
        <div className="relative mb-6 flex h-28 w-28 items-center justify-center rounded-3xl bg-[#eaedff] p-4 shadow-sm border border-[#bccac0]/30">
          <img
            src={APP_LOGO}
            alt="Logo IMC Vitalis"
            className="h-20 w-20 object-contain drop-shadow-sm"
          />
        </div>

        <h1 className="text-2xl font-extrabold text-[#131b2e] leading-snug tracking-tight">
          Calculadora de <br />
          <span className="text-[#006948]">Índice de Masa Corporal</span>
        </h1>

        <p className="mt-3 text-sm text-[#3d4a42] leading-relaxed">
          Conoce tu estado nutricional y cuida tu salud con estándares de la OMS.
        </p>
      </div>

      {/* Bottom Loading Bar */}
      <div className="w-full max-w-xs pb-10 flex flex-col items-center gap-3">
        <div className="w-full bg-[#eaedff] h-2.5 rounded-full overflow-hidden p-0.5">
          <div
            className="h-full bg-[#006948] rounded-full transition-all duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex items-center justify-between w-full text-xs text-[#3d4a42]">
          <span className="font-medium animate-pulse">Cargando módulos...</span>
          <button
            onClick={onDismiss}
            className="text-xs text-[#006948] font-bold hover:underline py-1 px-2"
          >
            Omitir
          </button>
        </div>
      </div>
    </div>
  );
};
