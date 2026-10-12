import React, { useState } from 'react';
import { APP_LOGO, USER_AVATAR } from '../data/healthData';

interface TopHeaderProps {
  title: string;
  subtitle: string;
  canGoBack: boolean;
  onBack: () => void;
  onOpenDrawer: () => void;
  onOpenProfile: () => void;
  isPhoneFrame: boolean;
  onTogglePhoneFrame: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  title,
  subtitle,
  canGoBack,
  onBack,
  onOpenDrawer,
  onOpenProfile,
  isPhoneFrame,
  onTogglePhoneFrame,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#faf8ff]/90 backdrop-blur-md border-b border-[#bccac0]/20 transition-all">
      {/* Native-style simulated status bar */}
      <div className="flex h-6 items-center justify-between px-6 text-[11px] font-bold text-[#3d4a42] select-none">
        <span>9:41</span>
        <div className="flex items-center gap-1.5 text-xs">
          <span className="material-symbols-outlined text-[13px] leading-none">signal_cellular_alt</span>
          <span className="material-symbols-outlined text-[13px] leading-none">wifi</span>
          <span className="material-symbols-outlined text-[14px] leading-none">battery_full</span>
        </div>
      </div>

      {/* Main Bar */}
      <div className="flex h-14 items-center justify-between px-4">
        {/* Left: Nav action & Branding */}
        <div className="flex items-center gap-2">
          {canGoBack ? (
            <button
              onClick={onBack}
              aria-label="Volver"
              className="flex h-10 w-10 items-center justify-center rounded-full text-[#131b2e] hover:bg-[#eaedff] active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-[22px]">arrow_back_ios_new</span>
            </button>
          ) : (
            <button
              onClick={onOpenDrawer}
              aria-label="Abrir menú"
              className="flex h-10 w-10 items-center justify-center rounded-full text-[#131b2e] hover:bg-[#eaedff] active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-[24px]">menu</span>
            </button>
          )}

          <div className="flex items-center gap-2.5">
            <img
              src={APP_LOGO}
              alt="Logo Vitalis IMC"
              className="h-8 w-auto object-contain cursor-pointer"
              onClick={canGoBack ? onBack : onOpenDrawer}
            />
            <div className="flex flex-col">
              <span className="text-base font-bold text-[#131b2e] leading-tight tracking-tight">
                {title}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#006948]">
                {subtitle}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-1 relative">
          {/* Desktop Frame Toggle (Helper for previewing phone view) */}
          <button
            onClick={onTogglePhoneFrame}
            title={isPhoneFrame ? 'Expandir vista completa' : 'Ver en marco de móvil'}
            aria-label="Cambiar modo de vista"
            className="hidden md:flex h-9 px-2 items-center gap-1 rounded-full text-xs font-semibold text-[#006948] bg-[#eaedff] hover:bg-[#dae2fd] transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">
              {isPhoneFrame ? 'fullscreen' : 'smartphone'}
            </span>
            <span>{isPhoneFrame ? 'Expandir' : 'Móvil'}</span>
          </button>

          {/* Notifications Button */}
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            aria-label="Notificaciones"
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-[#3d4a42] hover:bg-[#eaedff] hover:text-[#006948] transition-colors"
          >
            <span className="material-symbols-outlined text-[22px]">notifications</span>
            <span className="absolute top-2.5 right-2.5 h-2 w-2 rounded-full bg-[#006948]" />
          </button>

          {/* Profile Avatar Button */}
          <button
            onClick={onOpenProfile}
            aria-label="Perfil de usuario"
            className="flex h-10 w-10 items-center justify-center rounded-full overflow-hidden p-0.5 hover:ring-2 hover:ring-[#006948]/30 transition-all focus:outline-none"
          >
            <img
              src={USER_AVATAR}
              alt="Alex - Perfil"
              className="h-8 w-8 rounded-full object-cover"
            />
          </button>

          {/* Notifications Popover Dropdown */}
          {showNotifications && (
            <div className="absolute top-12 right-0 w-72 rounded-2xl bg-white p-3 shadow-xl border border-[#bccac0]/30 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="flex items-center justify-between pb-2 border-b border-[#eaedff]">
                <span className="text-xs font-bold text-[#131b2e]">Notificaciones</span>
                <button
                  onClick={() => setShowNotifications(false)}
                  className="text-xs text-[#006948] font-semibold"
                >
                  Cerrar
                </button>
              </div>
              <div className="mt-2 flex flex-col gap-2">
                <div className="p-2 rounded-xl bg-[#f2f3ff] text-xs text-[#131b2e]">
                  <div className="flex items-center gap-1 font-semibold text-[#006948] mb-0.5">
                    <span className="material-symbols-outlined text-[14px]">water_drop</span>
                    <span>Recordatorio de Hidratación</span>
                  </div>
                  <p className="text-[11px] text-[#3d4a42]">
                    Beber 250ml de agua ahora te mantiene en tu zona óptima.
                  </p>
                </div>
                <div className="p-2 rounded-xl bg-[#f2f3ff] text-xs text-[#131b2e]">
                  <div className="flex items-center gap-1 font-semibold text-[#006398] mb-0.5">
                    <span className="material-symbols-outlined text-[14px]">calendar_today</span>
                    <span>Control Semanal</span>
                  </div>
                  <p className="text-[11px] text-[#3d4a42]">
                    Recuerda registrar tu peso en ayunas para mayor precisión.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
