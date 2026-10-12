import React, { useState } from 'react';
import { calculateBMIValue, getBMICategory } from '../utils/bmiCalculator';

interface CalculatorViewProps {
  onCalculate: (data: {
    weightKg: number;
    heightCm: number;
    gender: 'F' | 'M';
  }) => void;
  initialWeight?: number;
  initialHeightCm?: number;
  initialGender?: 'F' | 'M';
}

export const CalculatorView: React.FC<CalculatorViewProps> = ({
  onCalculate,
  initialWeight = 70.0,
  initialHeightCm = 170,
  initialGender = 'M',
}) => {
  const [gender, setGender] = useState<'F' | 'M'>(initialGender);
  const [weightKg, setWeightKg] = useState<number>(initialWeight);
  const [heightCm, setHeightCm] = useState<number>(initialHeightCm);
  const [heightUnit, setHeightUnit] = useState<'m' | 'cm'>('m');

  // Real-time live estimation calculation
  const heightM = heightCm / 100;
  const liveBmi = calculateBMIValue(weightKg, heightM);
  const liveCategory = getBMICategory(liveBmi);

  const handleAdjustWeight = (delta: number) => {
    setWeightKg((prev) => {
      const next = Math.max(30, Math.min(200, Number((prev + delta).toFixed(1))));
      return next;
    });
  };

  const handleAdjustHeight = (deltaCm: number) => {
    setHeightCm((prev) => {
      const next = Math.max(120, Math.min(220, prev + deltaCm));
      return next;
    });
  };

  const handleReset = () => {
    setWeightKg(70.0);
    setHeightCm(170);
    setGender('M');
    setHeightUnit('m');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCalculate({
      weightKg,
      heightCm,
      gender,
    });
  };

  return (
    <div className="flex flex-col gap-4 pb-24 px-4 pt-3">
      {/* Friendly Header with Visual Accent */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#006948]">
            Paso 1 de 2
          </span>
          <h1 className="text-2xl font-black text-[#131b2e] tracking-tight">
            Calcular IMC
          </h1>
          <p className="text-xs text-[#3d4a42] mt-0.5">
            Ingresa tus medidas corporales actuales
          </p>
        </div>
        <div className="w-11 h-11 rounded-2xl bg-[#eaedff] flex items-center justify-center text-[#006948] shadow-xs">
          <span className="material-symbols-outlined text-[24px]">vital_signs</span>
        </div>
      </div>

      {/* Gender Selector Pill Bar */}
      <div className="p-1 bg-[#eaedff] rounded-2xl flex items-center justify-between shadow-inner">
        <button
          type="button"
          onClick={() => setGender('F')}
          className={`flex-1 min-h-[44px] py-2 rounded-xl flex items-center justify-center gap-1.5 text-xs font-bold transition-all duration-200 cursor-pointer ${
            gender === 'F'
              ? 'bg-white text-[#006948] shadow-sm'
              : 'text-[#3d4a42] hover:text-[#131b2e]'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">female</span>
          <span>Femenino</span>
        </button>

        <button
          type="button"
          onClick={() => setGender('M')}
          className={`flex-1 min-h-[44px] py-2 rounded-xl flex items-center justify-center gap-1.5 text-xs font-bold transition-all duration-200 cursor-pointer ${
            gender === 'M'
              ? 'bg-white text-[#006948] shadow-sm'
              : 'text-[#3d4a42] hover:text-[#131b2e]'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">male</span>
          <span>Masculino</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Weight Interactive Card */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#eaedff] flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#eaedff] flex items-center justify-center text-[#006948]">
                <span className="material-symbols-outlined text-[20px]">scale</span>
              </div>
              <div>
                <h2 className="text-sm font-bold text-[#131b2e]">Peso corporal</h2>
                <span className="text-[11px] text-[#3d4a42]">Medición recomendada en ayunas</span>
              </div>
            </div>
            <span className="px-2.5 py-0.5 bg-[#f2f3ff] text-[#006948] text-[10px] font-bold rounded-full">
              KG
            </span>
          </div>

          {/* Steppers & Value Input */}
          <div className="flex items-center justify-between my-2">
            <button
              type="button"
              onClick={() => handleAdjustWeight(-0.5)}
              aria-label="Disminuir peso"
              className="w-12 h-12 rounded-full bg-[#f2f3ff] hover:bg-[#eaedff] active:scale-95 text-[#131b2e] flex items-center justify-center transition-all cursor-pointer shadow-xs"
            >
              <span className="material-symbols-outlined text-[20px]">remove</span>
            </button>

            <div className="flex items-baseline justify-center">
              <input
                type="number"
                step="0.1"
                min="30"
                max="250"
                value={weightKg.toFixed(1)}
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  if (!isNaN(val) && val > 0) setWeightKg(val);
                }}
                className="w-28 text-center text-4xl font-extrabold text-[#131b2e] bg-transparent border-none focus:outline-none p-0 cursor-text select-all"
              />
              <span className="text-base font-bold text-[#3d4a42] ml-1">kg</span>
            </div>

            <button
              type="button"
              onClick={() => handleAdjustWeight(0.5)}
              aria-label="Aumentar peso"
              className="w-12 h-12 rounded-full bg-[#f2f3ff] hover:bg-[#eaedff] active:scale-95 text-[#131b2e] flex items-center justify-center transition-all cursor-pointer shadow-xs"
            >
              <span className="material-symbols-outlined text-[20px]">add</span>
            </button>
          </div>

          {/* Slider */}
          <div className="pt-2">
            <input
              type="range"
              min="30"
              max="150"
              step="0.5"
              value={weightKg}
              onChange={(e) => setWeightKg(parseFloat(e.target.value))}
              className="w-full accent-[#006948] h-2 bg-[#eaedff] rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[#3d4a42] mt-1.5 px-1 font-semibold">
              <span>30 kg</span>
              <span>70 kg</span>
              <span>110 kg</span>
              <span>150 kg</span>
            </div>
          </div>
        </div>

        {/* Height Interactive Card */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#eaedff] flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#cce5ff] flex items-center justify-center text-[#006398]">
                <span className="material-symbols-outlined text-[20px]">straighten</span>
              </div>
              <div>
                <h2 className="text-sm font-bold text-[#131b2e]">Estatura</h2>
                <span className="text-[11px] text-[#3d4a42]">Sin calzado ni accesorios</span>
              </div>
            </div>

            {/* Switch Unit m / cm */}
            <div className="flex bg-[#f2f3ff] rounded-full p-0.5 text-xs">
              <button
                type="button"
                onClick={() => setHeightUnit('m')}
                className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                  heightUnit === 'm'
                    ? 'bg-white text-[#006398] shadow-xs'
                    : 'text-[#3d4a42] hover:text-[#131b2e]'
                }`}
              >
                m
              </button>
              <button
                type="button"
                onClick={() => setHeightUnit('cm')}
                className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                  heightUnit === 'cm'
                    ? 'bg-white text-[#006398] shadow-xs'
                    : 'text-[#3d4a42] hover:text-[#131b2e]'
                }`}
              >
                cm
              </button>
            </div>
          </div>

          {/* Steppers & Value Input */}
          <div className="flex items-center justify-between my-2">
            <button
              type="button"
              onClick={() => handleAdjustHeight(-1)}
              aria-label="Disminuir estatura"
              className="w-12 h-12 rounded-full bg-[#f2f3ff] hover:bg-[#eaedff] active:scale-95 text-[#131b2e] flex items-center justify-center transition-all cursor-pointer shadow-xs"
            >
              <span className="material-symbols-outlined text-[20px]">remove</span>
            </button>

            <div className="flex items-baseline justify-center">
              <input
                type="text"
                value={heightUnit === 'm' ? (heightCm / 100).toFixed(2) : heightCm.toString()}
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  if (!isNaN(val) && val > 0) {
                    if (heightUnit === 'm') setHeightCm(Math.round(val * 100));
                    else setHeightCm(Math.round(val));
                  }
                }}
                className="w-28 text-center text-4xl font-extrabold text-[#131b2e] bg-transparent border-none focus:outline-none p-0 cursor-text select-all"
              />
              <span className="text-base font-bold text-[#3d4a42] ml-1">{heightUnit}</span>
            </div>

            <button
              type="button"
              onClick={() => handleAdjustHeight(1)}
              aria-label="Aumentar estatura"
              className="w-12 h-12 rounded-full bg-[#f2f3ff] hover:bg-[#eaedff] active:scale-95 text-[#131b2e] flex items-center justify-center transition-all cursor-pointer shadow-xs"
            >
              <span className="material-symbols-outlined text-[20px]">add</span>
            </button>
          </div>

          {/* Slider */}
          <div className="pt-2">
            <input
              type="range"
              min="120"
              max="215"
              step="1"
              value={heightCm}
              onChange={(e) => setHeightCm(parseInt(e.target.value, 10))}
              className="w-full accent-[#006398] h-2 bg-[#eaedff] rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[#3d4a42] mt-1.5 px-1 font-semibold">
              <span>1.20 m</span>
              <span>1.50 m</span>
              <span>1.80 m</span>
              <span>2.15 m</span>
            </div>
          </div>
        </div>

        {/* Motivational / Clinical Context Note (Wireframe Screen 3) */}
        <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-[#eaedff]/60 text-[#3d4a42] border border-[#eaedff]">
          <span className="material-symbols-outlined text-[#006398] text-[20px] shrink-0 mt-0.5">
            info
          </span>
          <div className="flex flex-col text-xs leading-relaxed">
            <span className="font-bold text-[#131b2e]">Ecuación Estándar OMS</span>
            <p className="mt-0.5 text-[11px] text-[#3d4a42]">
              El IMC se obtiene dividiendo el peso en kilogramos entre la estatura en metros al
              cuadrado (<strong className="text-[#131b2e]">kg/m²</strong>).
            </p>
          </div>
        </div>

        {/* Real-time Live Preview Feedback Loop */}
        <div className="p-3.5 rounded-2xl bg-white flex items-center justify-between shadow-sm border border-[#eaedff]">
          <div className="flex items-center gap-2.5">
            <div
              className={`w-3.5 h-3.5 rounded-full animate-pulse ${
                liveCategory.key === 'normal'
                  ? 'bg-[#006948]'
                  : liveCategory.key === 'bajo'
                  ? 'bg-[#006398]'
                  : liveCategory.key === 'sobrepeso'
                  ? 'bg-[#825100]'
                  : 'bg-[#ba1a1a]'
              }`}
            />
            <div className="flex flex-col">
              <span className="text-[10px] text-[#3d4a42] font-semibold">
                Estimación en tiempo real
              </span>
              <span className={`text-xs font-bold ${liveCategory.colorClass}`}>
                {liveCategory.title}
              </span>
            </div>
          </div>

          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-black text-[#131b2e] tracking-tight">
              {liveBmi.toFixed(1)}
            </span>
            <span className="text-xs font-bold text-[#3d4a42]">IMC</span>
          </div>
        </div>

        {/* Action Buttons (Wireframe Screen 3) */}
        <div className="flex flex-col gap-2 mt-1">
          <button
            type="submit"
            className="w-full h-13 rounded-2xl bg-[#006948] text-white text-sm font-extrabold flex items-center justify-center gap-2 shadow-md shadow-[#006948]/25 hover:bg-[#00855d] active:scale-[0.98] transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[22px]">calculate</span>
            <span>CALCULAR IMC</span>
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="w-full py-2.5 rounded-xl text-[#3d4a42] text-xs font-bold hover:bg-[#eaedff] transition-colors flex items-center justify-center gap-1 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">restart_alt</span>
            <span>Restablecer valores</span>
          </button>
        </div>
      </form>
    </div>
  );
};
