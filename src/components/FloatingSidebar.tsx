import React, { memo, useState, useEffect, lazy, Suspense } from 'react';
import { 
  SlidersHorizontal, 
  Link2, 
  Sparkles, 
  Clock, 
  Palette, 
  Bell, 
  Headphones,
  Layout,
  Video as VideoIcon,
  ChevronLeft,
  Maximize2,
  Minimize2
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { isFullscreenActive, toggleFullscreen } from '../utils/fullscreen';

const QuickSettingsTab = lazy(() => import('./sidebar/QuickSettingsTab').then(m => ({ default: m.QuickSettingsTab })));
const ChainsTab = lazy(() => import('./sidebar/ChainsTab').then(m => ({ default: m.ChainsTab })));
const PresetsTab = lazy(() => import('./sidebar/PresetsTab').then(m => ({ default: m.PresetsTab })));
const SchedulesTab = lazy(() => import('./sidebar/SchedulesTab').then(m => ({ default: m.SchedulesTab })));
const StylesTab = lazy(() => import('./sidebar/StylesTab').then(m => ({ default: m.StylesTab })));
const VideosTab = lazy(() => import('./sidebar/VideosTab').then(m => ({ default: m.VideosTab })));
const ThemeTab = lazy(() => import('./sidebar/ThemeTab').then(m => ({ default: m.ThemeTab })));
const AlertsTab = lazy(() => import('./sidebar/AlertsTab').then(m => ({ default: m.AlertsTab })));
const AudioTab = lazy(() => import('./sidebar/AudioTab').then(m => ({ default: m.AudioTab })));

export type FloatingTabType = 'quick' | 'chains' | 'presets' | 'schedules' | 'styles' | 'videos' | 'theme' | 'alerts' | 'audio';

interface SidebarTabItem {
  id: FloatingTabType;
  label: string;
  icon: typeof SlidersHorizontal;
  component: React.ComponentType<{ onClose: () => void }>;
}

const SIDEBAR_TABS: SidebarTabItem[] = [
  { id: 'quick', label: 'Quick Adjust', icon: SlidersHorizontal, component: QuickSettingsTab },
  { id: 'chains', label: 'Preset Chains', icon: Link2, component: ChainsTab },
  { id: 'presets', label: 'Focus Presets', icon: Sparkles, component: PresetsTab },
  { id: 'schedules', label: 'Schedules', icon: Clock, component: SchedulesTab },
  { id: 'styles', label: 'Clock Styles', icon: Layout, component: StylesTab },
  { id: 'videos', label: 'Video Backgrounds', icon: VideoIcon, component: VideosTab },
  { id: 'theme', label: 'Aesthetics', icon: Palette, component: ThemeTab },
  { id: 'alerts', label: 'Notifications', icon: Bell, component: AlertsTab },
  { id: 'audio', label: 'Audio & Soundscapes', icon: Headphones, component: AudioTab },
];

interface FloatingSidebarProps {
  activeTab: FloatingTabType | null;
  onSelectTab: (tab: FloatingTabType | null) => void;
}

export const FloatingSidebar = memo(function FloatingSidebar({
  activeTab,
  onSelectTab
}: FloatingSidebarProps) {
  const { colors } = useTheme();
  const isExpanded = activeTab !== null;
  const currentAccent = colors.accentColor || '#f43f5e';

  const [isFullscreen, setIsFullscreen] = useState<boolean>(() => isFullscreenActive());

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(isFullscreenActive());
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
    };
  }, []);

  const handleToggleFullscreen = async () => {
    const active = await toggleFullscreen();
    setIsFullscreen(active);
  };

  const handleTabClick = (tabId: FloatingTabType) => {
    onSelectTab(activeTab === tabId ? null : tabId);
  };

  const handleClose = () => {
    onSelectTab(null);
  };

  const ActiveComponent = SIDEBAR_TABS.find(t => t.id === activeTab)?.component;

  return (
    <div className="fixed right-4 sm:right-6 top-4 bottom-4 sm:top-5 sm:bottom-5 z-30 flex items-stretch transition-all duration-300">
      {/* Floating Main Content Glass Panel (Left of Tab Strip) */}
      <aside
        aria-label="Floating Settings Panel"
        className={`h-full flex flex-col glass-panel rounded-2xl sm:rounded-3xl border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.85)] backdrop-blur-3xl transition-all duration-300 ease-in-out overflow-hidden ${
          isExpanded
            ? 'w-[340px] sm:w-[360px] opacity-100 p-5 border pointer-events-auto mr-3'
            : 'w-0 opacity-0 p-0 border-0 pointer-events-none mr-0'
        }`}
      >
        <div className="w-[300px] sm:w-[320px] h-full flex flex-col">
          <div className="flex-1 overflow-y-auto custom-scrollbar pr-1.5 space-y-4">
            <Suspense fallback={
              <div className="flex items-center justify-center h-48 opacity-60">
                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              </div>
            }>
              {ActiveComponent && <ActiveComponent onClose={handleClose} />}
            </Suspense>
          </div>
        </div>
      </aside>

      {/* Vertical Floating Tab Strip (Right Edge) */}
      <div 
        role="toolbar" 
        aria-label="Studio Controls & Navigation"
        className="flex flex-col items-center justify-center gap-2 z-40 my-auto py-1"
      >
        <div className="flex flex-col items-center gap-2" role="group" aria-label="Sidebar Sections">
          {SIDEBAR_TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                aria-label={tab.label}
                aria-pressed={isActive}
                onClick={() => handleTabClick(tab.id)}
                className={`p-2.5 rounded-2xl transition-all duration-200 relative group flex items-center justify-center active:scale-90 ${
                  isActive
                    ? 'scale-110 shadow-lg'
                    : 'text-neutral-400 hover:text-white hover:scale-105 bg-white/[0.04] hover:bg-white/[0.12] border border-white/[0.08] hover:border-white/20 backdrop-blur-xl shadow-md'
                }`}
                style={isActive ? {
                  backgroundColor: currentAccent,
                  boxShadow: `0 0 18px ${currentAccent}90`,
                  borderColor: `${currentAccent}cc`,
                  color: '#ffffff'
                } : {}}
                title={tab.label}
              >
                <Icon size={16} aria-hidden="true" className={`transition-transform duration-200 ${isActive ? 'rotate-0 scale-105' : 'group-hover:scale-110 group-hover:rotate-6'}`} />
                
                {/* Tooltip on hover with spring slide-in */}
                <span className="absolute right-full mr-3 px-2.5 py-1 rounded-lg bg-black/90 border border-white/10 text-xs font-semibold text-white whitespace-nowrap opacity-0 group-hover:opacity-100 translate-x-1 group-hover:translate-x-0 pointer-events-none transition-all duration-200 ease-out shadow-xl z-50">
                  {tab.label}
                </span>
              </button>
            );
          })}

          {/* Fullscreen Action Button right after Music/Audio */}
          <button
            type="button"
            onClick={handleToggleFullscreen}
            aria-pressed={isFullscreen}
            className={`p-2.5 rounded-2xl transition-all duration-200 relative group flex items-center justify-center active:scale-90 ${
              isFullscreen
                ? 'scale-105 shadow-md text-white border-white/30 hover:scale-110'
                : 'text-neutral-400 hover:text-white hover:scale-105 bg-white/[0.04] hover:bg-white/[0.12] border border-white/[0.08] hover:border-white/20 backdrop-blur-xl shadow-md'
            }`}
            style={isFullscreen ? {
              backgroundColor: `${currentAccent}25`,
              borderColor: `${currentAccent}80`,
              color: currentAccent
            } : {}}
            title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
            aria-label={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
          >
            {isFullscreen ? (
              <Minimize2 size={16} aria-hidden="true" className="group-hover:scale-110 transition-transform duration-200" />
            ) : (
              <Maximize2 size={16} aria-hidden="true" className="group-hover:scale-110 transition-transform duration-200" />
            )}

            {/* Tooltip on hover */}
            <span className="absolute right-full mr-3 px-2.5 py-1 rounded-lg bg-black/90 border border-white/10 text-xs font-semibold text-white whitespace-nowrap opacity-0 group-hover:opacity-100 translate-x-1 group-hover:translate-x-0 pointer-events-none transition-all duration-200 ease-out shadow-xl z-50">
              {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            </span>
          </button>
        </div>

        {/* Quick Collapse Tab toggle */}
        <button
          type="button"
          aria-label={isExpanded ? "Collapse Sidebar Panel" : "Expand Sidebar Panel"}
          aria-expanded={isExpanded}
          onClick={() => onSelectTab(isExpanded ? null : 'quick')}
          className="mt-1 p-2 rounded-xl text-neutral-400 hover:text-white hover:scale-110 active:scale-90 transition-all duration-200 flex items-center justify-center bg-white/[0.03] hover:bg-white/[0.1] border border-white/[0.06] backdrop-blur-md shadow-sm group"
          title={isExpanded ? "Collapse Panel" : "Expand Panel"}
        >
          <ChevronLeft 
            size={15} 
            aria-hidden="true"
            className={`transition-transform duration-300 ease-out group-hover:scale-110 ${isExpanded ? 'rotate-180' : 'rotate-0 text-neutral-400'}`} 
            style={isExpanded ? { color: currentAccent } : {}}
          />
        </button>
      </div>
    </div>
  );
});
