import React, { useState } from 'react';
import { CalculationRecord } from '../types';
import { getBMICategory } from '../utils/bmiCalculator';

interface HistoryViewProps {
  records: CalculationRecord[];
  onSelectRecord: (record: CalculationRecord) => void;
  onClearHistory: () => void;
  onNavigateCalculate: () => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({
  records,
  onSelectRecord,
  onClearHistory,
  onNavigateCalculate,
}) => {
  const [showConfirmClear, setShowConfirmClear] = useState(false);

  return (
    <div className="flex flex-col gap-4 pb-24 px-4 pt-3">
      {/* Header (Wireframe Pantalla 7) */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h1 className="text-2xl font-black text-[#131b2e] tracking-tight">
            Historial de Cálculos
          </h1>
          <p className="text-xs text-[#3d4a42]">
            Seguimiento longitudinal de tus mediciones corporales
          </p>
        </div>
        <span className="px-2.5 py-1 rounded-full bg-[#eaedff] text-xs font-bold text-[#006948]">
          {records.length} {records.length === 1 ? 'registro' : 'registros'}
        </span>
      </div>

      {/* History List Rows */}
      {records.length > 0 ? (
        <div className="flex flex-col gap-2.5">
          {records.map((item) => {
            const cat = getBMICategory(item.bmi);
            return (
              <div
                key={item.id}
                onClick={() => onSelectRecord(item)}
                className="p-4 rounded-2xl bg-white shadow-sm border border-[#eaedff] flex items-center justify-between hover:shadow-md hover:border-[#bccac0] transition-all cursor-pointer group"
              >
                <div className="flex flex-col">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-lg font-black text-[#131b2e] tracking-tight">
                      {item.bmi.toFixed(1)}
                    </span>
                    <span className="text-xs font-bold text-[#3d4a42]">kg/m²</span>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5 text-[11px] text-[#3d4a42]">
                    <span>{item.date}</span>
                    <span>•</span>
                    <span>{item.weightKg} kg</span>
                    <span>•</span>
                    <span>{(item.heightM).toFixed(2)} m</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-bold ${cat.badgeBg} ${cat.badgeText}`}
                  >
                    {item.categoryTitle}
                  </span>
                  <span className="material-symbols-outlined text-[#3d4a42] text-[18px] group-hover:translate-x-1 transition-transform">
                    chevron_right
                  </span>
                </div>
              </div>
            );
          })}

          {/* Delete History Button (Wireframe Screen 7) */}
          <div className="pt-2">
            <button
              onClick={() => setShowConfirmClear(true)}
              className="w-full h-12 rounded-2xl bg-[#eaedff] text-[#ba1a1a] text-xs font-bold flex items-center justify-center gap-2 hover:bg-[#ffdad6] active:scale-[0.99] transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">delete</span>
              <span>ELIMINAR HISTORIAL</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-8 border border-[#eaedff] flex flex-col items-center text-center gap-3">
          <div className="w-14 h-14 rounded-full bg-[#eaedff] flex items-center justify-center text-[#3d4a42]">
            <span className="material-symbols-outlined text-[28px]">history_toggle_off</span>
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#131b2e]">Sin registros en el historial</h3>
            <p className="text-xs text-[#3d4a42] mt-1 max-w-xs">
              Aún no has guardado mediciones. Realiza tu primer cálculo para comenzar el seguimiento.
            </p>
          </div>
          <button
            onClick={onNavigateCalculate}
            className="mt-2 px-5 py-2.5 rounded-full bg-[#006948] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm hover:bg-[#00855d] cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">calculate</span>
            <span>Realizar cálculo ahora</span>
          </button>
        </div>
      )}

      {/* Confirmation Modal to Clear History */}
      {showConfirmClear && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#131b2e]/50 backdrop-blur-xs p-4">
          <div className="w-full max-w-xs bg-white rounded-3xl p-5 shadow-2xl flex flex-col gap-3 animate-in zoom-in-95 duration-150 text-center">
            <div className="w-12 h-12 rounded-full bg-[#ffdad6] text-[#ba1a1a] flex items-center justify-center mx-auto">
              <span className="material-symbols-outlined text-[24px]">warning</span>
            </div>
            <h3 className="text-base font-bold text-[#131b2e]">¿Eliminar todo el historial?</h3>
            <p className="text-xs text-[#3d4a42]">
              Esta acción borrará permanentemente todas tus mediciones guardadas.
            </p>

            <div className="grid grid-cols-2 gap-2 mt-2">
              <button
                onClick={() => setShowConfirmClear(false)}
                className="py-2.5 rounded-xl bg-[#eaedff] text-[#131b2e] text-xs font-bold hover:bg-[#dae2fd] cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  onClearHistory();
                  setShowConfirmClear(false);
                }}
                className="py-2.5 rounded-xl bg-[#ba1a1a] text-white text-xs font-bold hover:bg-red-700 cursor-pointer"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
