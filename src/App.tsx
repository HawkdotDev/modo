import { useState, memo } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { SettingsProvider, useSettings } from './context/SettingsContext';
import { TimerProvider, useTimerContext } from './context/TimerContext';
import { Navbar } from './components/Navbar';
import { FloatingSidebar, FloatingTabType } from './components/FloatingSidebar';
import { TimerDisplay } from './components/TimerDisplay';
import { VideoBackground } from './components/VideoBackground';
import { AmbientGlow } from './components/AmbientGlow';
import { useVideoBackground } from './hooks/useVideoBackground';
import { Trophy, RotateCcw } from 'lucide-react';

import { StorageService } from './services/storageService';

const MainTimerSection = memo(function MainTimerSection({ 
  onOpenPresetForm 
}: { 
  onOpenPresetForm: () => void 
}) {
  const { isComplete, reset } = useTimerContext();
  const { activeSettings } = useSettings();

  if (isComplete) {
    return (
      <div className="text-center p-8 sm:p-12 rounded-3xl glass-panel border border-white/10 shadow-2xl max-w-md w-full animate-scale-in space-y-6 select-none">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500/20 to-amber-500/5 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-400 shadow-lg">
          <Trophy size={32} />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">Focus Session Complete!</h2>
          <p className="text-sm text-neutral-400">
            Outstanding focus! You finished all {activeSettings.iterations} iterations.
          </p>
        </div>
        <button
          onClick={reset}
          className="w-full flex items-center justify-center gap-2 py-3 px-6 bg-white text-black font-semibold text-sm rounded-xl hover:bg-neutral-200 active:scale-95 transition-all shadow-xl"
        >
          <RotateCcw size={16} />
          Start New Session
        </button>
      </div>
    );
  }

  return <TimerDisplay onOpenPresetForm={onOpenPresetForm} />;
});

function AppLayout() {
  const [activeFloatingTab, setActiveFloatingTab] = useState<FloatingTabType | null>(() => 
    StorageService.getActiveSidebarTab<FloatingTabType>()
  );
  const { colors } = useTheme();
  const { isRunning } = useTimerContext();
  const { config: videoConfig } = useVideoBackground();

  const handleSelectTab = (tab: FloatingTabType | null) => {
    setActiveFloatingTab(tab);
    StorageService.setActiveSidebarTab(tab);
  };

  const handleOpenPresetForm = () => {
    handleSelectTab('presets');
  };

  return (
    <div 
      className="min-h-screen h-screen transition-colors duration-500 pb-0 relative overflow-hidden bg-black text-white selection:bg-rose-500/30 flex flex-col justify-between"
      style={{ backgroundColor: colors.background, color: colors.text }}
    >
      {/* Skip to Main Content Link for Keyboard & Screen Reader Users */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-24 z-50 px-4 py-2 bg-white text-black font-bold text-xs rounded-xl shadow-2xl transition-all"
      >
        Skip to timer content
      </a>

      {/* Video Background Layer */}
      <VideoBackground config={videoConfig} isRunning={isRunning} />

      {/* Ambient background glow aura (isolated high-performance component) */}
      <AmbientGlow 
        isVideoEnabled={videoConfig.enabled} 
        isShifted={activeFloatingTab !== null} 
      />

      <Navbar accentColor={colors.accentColor} />

      <main 
        id="main-content"
        className={`flex-1 flex items-center justify-center relative z-10 px-4 transition-all duration-300 ease-in-out ${
          activeFloatingTab !== null ? 'lg:pr-[390px]' : 'pr-0'
        }`}
      >
        <div className="max-w-7xl w-full mx-auto flex items-center justify-center">
          <div className="flex items-center justify-center w-full">
            <MainTimerSection onOpenPresetForm={handleOpenPresetForm} />
          </div>
        </div>
      </main>

      {/* Unified Vertical Floating Sidebar with Icon Tabs */}
      <FloatingSidebar
        activeTab={activeFloatingTab}
        onSelectTab={handleSelectTab}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <SettingsProvider>
        <TimerProvider>
          <AppLayout />
        </TimerProvider>
      </SettingsProvider>
    </ThemeProvider>
  );
}