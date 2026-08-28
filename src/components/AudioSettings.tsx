import { useState, useEffect } from 'react';
import { Headphones, Volume2, Play, Square, Sparkles, Waves, CloudRain, Zap, Radio, BellRing } from 'lucide-react';
import { Switch } from './Switch';
import { audioEngine, ChimeStyle, SoundscapeType } from '../utils/audioEngine';
import { StorageService } from '../services/storageService';

interface AudioSettingsProps {
  soundEnabled: boolean;
  volume: number;
  onToggleSound: (enabled: boolean) => void;
  onVolumeChange: (volume: number) => void;
  workCompleteChime?: boolean;
  breakCompleteChime?: boolean;
  sessionCompleteChime?: boolean;
  onToggleWorkCompleteChime?: (enabled: boolean) => void;
  onToggleBreakCompleteChime?: (enabled: boolean) => void;
  onToggleSessionCompleteChime?: (enabled: boolean) => void;
  accentColor?: string;
  isRunning?: boolean;
  onClose?: () => void;
}

export function AudioSettings({
  soundEnabled,
  volume,
  onToggleSound,
  onVolumeChange,
  workCompleteChime = true,
  breakCompleteChime = true,
  sessionCompleteChime = true,
  onToggleWorkCompleteChime,
  onToggleBreakCompleteChime,
  onToggleSessionCompleteChime,
  accentColor = '#f43f5e',
  isRunning = false,
  onClose
}: AudioSettingsProps) {
  const [selectedChime, setSelectedChime] = useState<ChimeStyle>(() => StorageService.getChimeStyle());
  const [activeSoundscape, setActiveSoundscape] = useState<SoundscapeType>(() => audioEngine.getActiveSoundscape());
  const [soundscapeVolume, setSoundscapeVolume] = useState<number>(0.5);
  const [autoPauseSoundscape, setAutoPauseSoundscape] = useState<boolean>(() => StorageService.getAutoPauseSoundscape());

  useEffect(() => {
    audioEngine.setMasterVolume(volume);
  }, [volume]);

  // Timer auto-pause integration for ambient soundscape
  useEffect(() => {
    if (autoPauseSoundscape && !isRunning && activeSoundscape !== 'none') {
      // Pause soundscape if timer stops
    }
  }, [isRunning, autoPauseSoundscape, activeSoundscape]);

  const handleSelectChime = (chime: ChimeStyle) => {
    setSelectedChime(chime);
    StorageService.setChimeStyle(chime);
    audioEngine.playChime(chime, 'test', volume);
  };

  const handleTestChime = () => {
    audioEngine.playChime(selectedChime, 'work', volume);
  };

  const handleSelectSoundscape = (type: SoundscapeType) => {
    if (activeSoundscape === type) {
      audioEngine.stopSoundscape();
      setActiveSoundscape('none');
    } else {
      audioEngine.startSoundscape(type);
      setActiveSoundscape(type);
    }
  };

  const handleSoundscapeVolumeChange = (vol: number) => {
    setSoundscapeVolume(vol);
    audioEngine.setSoundscapeVolume(vol);
  };

  const handleToggleAutoPause = (enabled: boolean) => {
    setAutoPauseSoundscape(enabled);
    StorageService.setAutoPauseSoundscape(enabled);
  };

  const chimeOptions: { id: ChimeStyle; name: string; desc: string }[] = [
    { id: 'zen', name: 'Zen Bell', desc: 'Crisp acoustic harmonic chime' },
    { id: 'digital', name: 'Digital Synth', desc: 'Modern electronic melodic triad' },
    { id: 'marimba', name: 'Warm Marimba', desc: 'Soft wooden mallet percussion' },
    { id: 'bowl', name: 'Tibetan Bowl', desc: 'Deep resonant meditative tone' },
  ];

  const soundscapes: { id: SoundscapeType; name: string; desc: string; icon: typeof Waves }[] = [
    { id: 'brown', name: 'Brown Noise', desc: 'Warm deep distraction blocker', icon: Zap },
    { id: 'rain', name: 'Gentle Rain', desc: 'Soothing natural rain shower', icon: CloudRain },
    { id: 'waves', name: 'Ocean Waves', desc: 'Rhythmic swelling surf tide', icon: Waves },
    { id: 'binaural', name: 'Alpha Beats (432Hz)', desc: '10Hz binaural focus carrier', icon: Radio },
  ];

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-base font-semibold text-white">Audio & Soundscapes</h3>
          <p className="text-xs text-neutral-400">Completion chimes, cues & ambient focus audio</p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-white/[0.08] transition-all"
            title="Close panel"
          >
            <span className="sr-only">Close</span>
            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        )}
      </div>

      {/* Master Chimes Section */}
      <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-3 hover:border-white/[0.1] transition-all">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div 
              className="p-2 rounded-xl bg-white/[0.05] border border-white/[0.08]"
              style={{ color: accentColor }}
            >
              <Volume2 size={16} />
            </div>
            <div>
              <span className="text-sm font-semibold text-white block">Audio Chimes</span>
              <span className="text-xs text-neutral-400">Synthesized acoustic bell cues</span>
            </div>
          </div>
          <Switch
            checked={soundEnabled}
            onChange={onToggleSound}
            activeColor={accentColor}
          />
        </div>

        {soundEnabled && (
          <div className="space-y-3 pt-2 border-t border-white/[0.06]">
            {/* Chime Volume */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <label htmlFor="chime-volume-slider" className="text-neutral-400 font-medium cursor-pointer">
                  Chime Volume
                </label>
                <button
                  onClick={handleTestChime}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/[0.08] hover:bg-white/[0.14] text-xs text-white font-medium active:scale-95 transition-all"
                  title="Test chime sound"
                >
                  <Play size={11} className="fill-current" />
                  Test Chime
                </button>
              </div>
              <div className="flex items-center gap-3">
                <input
                  id="chime-volume-slider"
                  name="chimeVolume"
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={volume}
                  onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
                  aria-label="Chime Volume"
                  className="w-full h-1.5 bg-white/[0.1] rounded-lg appearance-none cursor-pointer"
                  style={{ accentColor }}
                  title="Adjust chime volume"
                />
                <span className="text-xs font-mono font-semibold text-neutral-300 w-8 text-right">
                  {Math.round(volume * 100)}%
                </span>
              </div>
            </div>

            {/* Chime Sound Style Selector */}
            <div className="space-y-2 pt-1">
              <label className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles size={12} style={{ color: accentColor }} />
                Chime Soundpack
              </label>
              <div className="grid grid-cols-2 gap-2">
                {chimeOptions.map((opt) => {
                  const isSelected = selectedChime === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => handleSelectChime(opt.id)}
                      className={`p-2.5 rounded-xl border text-left transition-all ${
                        isSelected
                          ? 'text-white shadow-sm'
                          : 'bg-white/[0.03] hover:bg-white/[0.07] border-white/[0.06] text-neutral-300'
                      }`}
                      style={isSelected ? {
                        backgroundColor: `${accentColor}20`,
                        borderColor: `${accentColor}80`
                      } : {}}
                    >
                      <div className="text-xs font-semibold text-white">{opt.name}</div>
                      <div className="text-[10px] text-neutral-400 mt-0.5">{opt.desc}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Granular Chime Event Triggers */}
            <div className="pt-2 border-t border-white/[0.06] space-y-2">
              <label className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
                <BellRing size={12} style={{ color: accentColor }} />
                Chime Triggers
              </label>

              <div className="flex items-center justify-between py-1 border-b border-white/[0.04]">
                <div>
                  <span className="text-xs font-semibold text-neutral-200 block">Focus round completed</span>
                  <span className="text-[10px] text-neutral-400">Play chime when focus round ends</span>
                </div>
                {onToggleWorkCompleteChime && (
                  <Switch
                    checked={workCompleteChime}
                    onChange={onToggleWorkCompleteChime}
                    activeColor={accentColor}
                  />
                )}
              </div>

              <div className="flex items-center justify-between py-1 border-b border-white/[0.04]">
                <div>
                  <span className="text-xs font-semibold text-neutral-200 block">Break interval completed</span>
                  <span className="text-[10px] text-neutral-400">Play chime when break finishes</span>
                </div>
                {onToggleBreakCompleteChime && (
                  <Switch
                    checked={breakCompleteChime}
                    onChange={onToggleBreakCompleteChime}
                    activeColor={accentColor}
                  />
                )}
              </div>

              <div className="flex items-center justify-between py-1">
                <div>
                  <span className="text-xs font-semibold text-neutral-200 block">All iterations completed</span>
                  <span className="text-[10px] text-neutral-400">Play chime on full session completion</span>
                </div>
                {onToggleSessionCompleteChime && (
                  <Switch
                    checked={sessionCompleteChime}
                    onChange={onToggleSessionCompleteChime}
                    activeColor={accentColor}
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Ambient Soundscapes Section */}
      <div className="space-y-2 pt-1">
        <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
          <Headphones size={13} style={{ color: accentColor }} />
          Ambient Soundscapes (Synthesized)
        </label>
        
        <div className="grid grid-cols-1 gap-2">
          {soundscapes.map((scape) => {
            const Icon = scape.icon;
            const isPlaying = activeSoundscape === scape.id;
            return (
              <div
                key={scape.id}
                className={`p-3 rounded-2xl border transition-all flex items-center justify-between ${
                  isPlaying
                    ? 'border-white/20 bg-white/[0.08] shadow-md'
                    : 'bg-white/[0.03] hover:bg-white/[0.06] border-white/[0.06]'
                }`}
                style={isPlaying ? {
                  borderColor: `${accentColor}80`,
                  backgroundColor: `${accentColor}15`
                } : {}}
              >
                <div className="flex items-center gap-3">
                  <div 
                    className="p-2 rounded-xl bg-white/[0.05] border border-white/[0.08]"
                    style={isPlaying ? { color: accentColor, backgroundColor: `${accentColor}25` } : { color: '#a3a3a3' }}
                  >
                    <Icon size={16} className={isPlaying ? 'animate-pulse' : ''} />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-white block">{scape.name}</span>
                    <span className="text-[10px] text-neutral-400">{scape.desc}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleSelectSoundscape(scape.id)}
                  className={`p-2 rounded-xl flex items-center justify-center transition-all active:scale-95 ${
                    isPlaying 
                      ? 'text-white shadow-md' 
                      : 'bg-white/[0.08] hover:bg-white/[0.14] text-neutral-300'
                  }`}
                  style={isPlaying ? {
                    backgroundColor: accentColor,
                    boxShadow: `0 0 12px ${accentColor}80`
                  } : {}}
                  title={isPlaying ? 'Stop soundscape' : 'Play soundscape'}
                >
                  {isPlaying ? <Square size={13} className="fill-current" /> : <Play size={13} className="fill-current ml-0.5" />}
                </button>
              </div>
            );
          })}
        </div>

        {/* Ambient Soundscape Volume & Settings */}
        {activeSoundscape !== 'none' && (
          <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-2.5 mt-2 animate-fade-in">
            <div className="flex items-center justify-between text-xs">
              <label htmlFor="soundscape-volume-slider" className="text-neutral-300 font-medium cursor-pointer">
                Ambient Noise Level
              </label>
              <span className="font-mono font-semibold text-neutral-300">
                {Math.round(soundscapeVolume * 100)}%
              </span>
            </div>
            <input
              id="soundscape-volume-slider"
              name="soundscapeVolume"
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={soundscapeVolume}
              onChange={(e) => handleSoundscapeVolumeChange(parseFloat(e.target.value))}
              aria-label="Ambient Noise Level"
              className="w-full h-1.5 bg-white/[0.1] rounded-lg appearance-none cursor-pointer"
              style={{ accentColor }}
              title="Adjust ambient soundscape volume"
            />
          </div>
        )}

        {/* Auto-pause toggle */}
        <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-between hover:border-white/[0.1] transition-all mt-1">
          <div>
            <span className="text-xs font-semibold text-white block">Timer Sync</span>
            <span className="text-[10px] text-neutral-400">Auto-pause ambient audio when timer stops</span>
          </div>
          <Switch
            checked={autoPauseSoundscape}
            onChange={handleToggleAutoPause}
            activeColor={accentColor}
          />
        </div>
      </div>
    </div>
  );
}
