/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { AboutModal } from './components/AboutModal';
import { BottomNav, TabKey } from './components/BottomNav';
import { CalculatorView } from './components/CalculatorView';
import { ClassificationView } from './components/ClassificationView';
import { DrawerMenu } from './components/DrawerMenu';
import { HistoryView } from './components/HistoryView';
import { HomeView } from './components/HomeView';
import { ResultView } from './components/ResultView';
import { SettingsModal } from './components/SettingsModal';
import { SplashView } from './components/SplashView';
import { TipsView } from './components/TipsView';
import { TopHeader } from './components/TopHeader';
import { INITIAL_CALCULATIONS } from './data/healthData';
import { CalculationRecord } from './types';
import { createRecord } from './utils/bmiCalculator';

const STORAGE_KEY = 'vitalis_imc_calculations_v1';

export default function App() {
  const [showSplash, setShowSplash] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<TabKey>('inicio');
  const [currentResult, setCurrentResult] = useState<CalculationRecord | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isAboutOpen, setIsAboutOpen] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [isPhoneFrame, setIsPhoneFrame] = useState<boolean>(true);
  const [highlightedTipId, setHighlightedTipId] = useState<string | null>(null);

  // Stored calculation records
  const [records, setRecords] = useState<CalculationRecord[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // ignore
    }
    return INITIAL_CALCULATIONS;
  });

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
    } catch {
      // ignore
    }
  }, [records]);

  // Handle calculation from CalculatorView or Express form
  const handlePerformCalculation = (data: {
    weightKg: number;
    heightCm: number;
    gender: 'F' | 'M';
  }) => {
    const newRecord = createRecord(data);
    setCurrentResult(newRecord);
  };

  const handleSaveToHistory = (newRec: CalculationRecord) => {
    setRecords((prev) => {
      // Prevent duplicate exact record
      const filtered = prev.filter((r) => r.id !== newRec.id);
      return [newRec, ...filtered];
    });
  };

  const handleClearHistory = () => {
    setRecords([]);
  };

  const handleResetSampleData = () => {
    setRecords(INITIAL_CALCULATIONS);
  };

  const handleBack = () => {
    if (currentResult) {
      setCurrentResult(null);
    } else if (activeTab !== 'inicio') {
      setActiveTab('inicio');
    }
  };

  const handleSelectTab = (tab: TabKey) => {
    setCurrentResult(null);
    setActiveTab(tab);
    setHighlightedTipId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewTipDetail = (tipId: string) => {
    setCurrentResult(null);
    setActiveTab('consejos');
    setHighlightedTipId(tipId);
  };

  const latestRecord = records[0] || INITIAL_CALCULATIONS[0];

  // Dynamic Header Titles
  let headerSubtitle = 'Inicio';
  if (currentResult) headerSubtitle = 'Detalle Del Registro';
  else if (activeTab === 'calcular') headerSubtitle = 'Calcular';
  else if (activeTab === 'clasificacion') headerSubtitle = 'Clasificación';
  else if (activeTab === 'consejos') headerSubtitle = 'Consejos';
  else if (activeTab === 'historial') headerSubtitle = 'Historial';

  return (
    <div className="min-h-screen bg-[#faf8ff] text-[#131b2e] flex flex-col items-center justify-start antialiased selection:bg-[#85f8c4] selection:text-[#002114]">
      {/* Splash Screen */}
      {showSplash && <SplashView onDismiss={() => setShowSplash(false)} />}

      {/* Main Application Container */}
      <div
        className={`w-full transition-all duration-300 min-h-screen flex flex-col ${
          isPhoneFrame
            ? 'max-w-md my-0 md:my-6 md:rounded-[40px] md:shadow-2xl md:ring-8 md:ring-[#eaedff] md:border md:border-[#bccac0]/40 overflow-hidden bg-[#faf8ff]'
            : 'max-w-3xl bg-[#faf8ff]'
        }`}
      >
        {/* Top Header */}
        <TopHeader
          title="Vitalis IMC"
          subtitle={headerSubtitle}
          canGoBack={!!currentResult || activeTab !== 'inicio'}
          onBack={handleBack}
          onOpenDrawer={() => setIsDrawerOpen(true)}
          onOpenProfile={() => setIsSettingsOpen(true)}
          isPhoneFrame={isPhoneFrame}
          onTogglePhoneFrame={() => setIsPhoneFrame(!isPhoneFrame)}
        />

        {/* Content Body */}
        <main className="flex-1 w-full">
          {currentResult ? (
            <ResultView
              record={currentResult}
              onRecalculate={() => {
                setCurrentResult(null);
                setActiveTab('calcular');
              }}
              onSaveToHistory={handleSaveToHistory}
              onNavigateToClassification={() => {
                setCurrentResult(null);
                setActiveTab('clasificacion');
              }}
              onNavigateToTips={() => {
                setCurrentResult(null);
                setActiveTab('consejos');
              }}
            />
          ) : (
            <>
              {activeTab === 'inicio' && (
                <HomeView
                  latestRecord={latestRecord}
                  onNavigateTab={handleSelectTab}
                  onOpenAbout={() => setIsAboutOpen(true)}
                  onQuickCalculate={(w, hCm) => {
                    handlePerformCalculation({ weightKg: w, heightCm: hCm, gender: 'M' });
                  }}
                  onViewTipDetail={handleViewTipDetail}
                />
              )}

              {activeTab === 'calcular' && (
                <CalculatorView
                  onCalculate={handlePerformCalculation}
                  initialWeight={latestRecord ? latestRecord.weightKg : 70}
                  initialHeightCm={latestRecord ? latestRecord.heightCm : 170}
                  initialGender={latestRecord ? latestRecord.gender : 'M'}
                />
              )}

              {activeTab === 'clasificacion' && (
                <ClassificationView
                  onNavigateCalculate={() => handleSelectTab('calcular')}
                />
              )}

              {activeTab === 'consejos' && (
                <TipsView initialSelectedTipId={highlightedTipId} />
              )}

              {activeTab === 'historial' && (
                <HistoryView
                  records={records}
                  onSelectRecord={(rec) => setCurrentResult(rec)}
                  onClearHistory={handleClearHistory}
                  onNavigateCalculate={() => handleSelectTab('calcular')}
                />
              )}
            </>
          )}
        </main>

        {/* Bottom Tab Navigation Bar */}
        <BottomNav activeTab={activeTab} onSelectTab={handleSelectTab} />
      </div>

      {/* Lateral Menu Drawer (Wireframe Screen 8) */}
      <DrawerMenu
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onSelectTab={handleSelectTab}
        onOpenAbout={() => setIsAboutOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onReplaySplash={() => setShowSplash(true)}
      />

      {/* About Modal (Wireframe institutional details) */}
      <AboutModal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onResetSampleData={handleResetSampleData}
        onClearHistory={handleClearHistory}
      />
    </div>
  );
}
