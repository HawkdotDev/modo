import { useState, useEffect } from 'react';
import { Music2, Link as LinkIcon, Check, ArrowUpRight, ChevronDown, ChevronUp } from 'lucide-react';
import { Switch } from './Switch';

interface MusicPlayerProps {
  accentColor?: string;
  isRunning?: boolean;
}

interface CuratedTrack {
  id: string;
  name: string;
  desc: string;
  uriOrUrl: string;
}

const spotifyPresets: CuratedTrack[] = [
  { id: 'lofi', name: 'Lofi Beats', desc: 'Chill beats to focus & study', uriOrUrl: 'playlist/37i9dQZF1DX8Uebhn9wzrS' },
  { id: 'deep', name: 'Deep Focus', desc: 'Ambient atmospheric synths', uriOrUrl: 'playlist/37i9dQZF1DWZeKCadgRdKQ' },
  { id: 'piano', name: 'Peaceful Piano', desc: 'Relaxing modern classical', uriOrUrl: 'playlist/37i9dQZF1DX4sWSpwq3LiO' },
  { id: 'citypop', name: 'City Pop', desc: '80s Japanese retro groove', uriOrUrl: 'playlist/37i9dQZF1DXarRysDw0Lfd' },
  { id: 'blues', name: 'Blues Focus', desc: 'Soulful mellow blues guitar', uriOrUrl: 'playlist/37i9dQZF1DX1lVhptIYRda' },
  { id: 'instrumental', name: 'Instrumental', desc: 'Calm melodic study acoustic', uriOrUrl: 'playlist/37i9dQZF1DX91Zrllv0q7D' },
  { id: 'synth', name: 'Synthwave Chill', desc: 'Retro electronic drive', uriOrUrl: 'playlist/37i9dQZF1DXdLEN7aqioXM' },
  { id: 'jazz', name: 'Coffeehouse Jazz', desc: 'Warm acoustic cafe vibes', uriOrUrl: 'playlist/37i9dQZF1DXbITWG1ZJKYt' },
];

export function MusicPlayer({ accentColor = '#f43f5e', isRunning = false }: MusicPlayerProps) {
  const [enabled, setEnabled] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('modo_spotify_enabled');
      return saved !== null ? saved === 'true' : true;
    } catch {
      return true;
    }
  });

  const [spotifyUri, setSpotifyUri] = useState<string>(() => {
    try {
      return localStorage.getItem('modo_spotify_uri') || spotifyPresets[0].uriOrUrl;
    } catch {
      return spotifyPresets[0].uriOrUrl;
    }
  });

  const [isExpandedNav, setIsExpandedNav] = useState<boolean>(false);
  const [customInput, setCustomInput] = useState<string>('');
  const [inputError, setInputError] = useState<string | null>(null);
  const [isDucking, setIsDucking] = useState<boolean>(false);

  // Audio Ducking Listener: Displays ducking status when notification chimes play
  useEffect(() => {
    const handleDucking = (e: Event) => {
      const customEvent = e as CustomEvent<{ durationMs: number }>;
      const durationMs = customEvent.detail?.durationMs || 2500;

      setIsDucking(true);
      setTimeout(() => {
        setIsDucking(false);
      }, durationMs);
    };

    window.addEventListener('modo-audio-duck', handleDucking);
    return () => {
      window.removeEventListener('modo-audio-duck', handleDucking);
    };
  }, []);

  const handleToggleEnabled = (val: boolean) => {
    setEnabled(val);
    try {
      localStorage.setItem('modo_spotify_enabled', String(val));
    } catch (err) {
      console.warn('Failed to save Spotify enabled state:', err);
    }
  };

  const handleSelectPreset = (preset: CuratedTrack) => {
    setSpotifyUri(preset.uriOrUrl);
    try {
      localStorage.setItem('modo_spotify_uri', preset.uriOrUrl);
    } catch (err) {
      console.warn('Failed to save Spotify URI:', err);
    }
  };

  const handleApplyCustomUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInput.trim()) return;
    setInputError(null);

    const input = customInput.trim();

    // Parse Spotify URL or URI
    if (input.includes('spotify.com') || input.startsWith('spotify:')) {
      let path = input;
      if (input.includes('open.spotify.com/')) {
        const parts = input.split('open.spotify.com/')[1].split('?')[0].split('/');
        if (parts.length >= 2) {
          path = `${parts[0]}/${parts[1]}`;
        }
      } else if (input.startsWith('spotify:')) {
        const parts = input.split(':');
        if (parts.length >= 3) {
          path = `${parts[1]}/${parts[2]}`;
        }
      }
      setSpotifyUri(path);
      try {
        localStorage.setItem('modo_spotify_uri', path);
      } catch (err) {
        console.warn('Failed to save custom Spotify URI:', err);
      }
      setCustomInput('');
      return;
    }

    setInputError('Please enter a valid Spotify URL or URI (e.g. open.spotify.com/playlist/...)');
  };

  // Open detached companion window for navigating Spotify
  const handleOpenSpotifyWindow = () => {
    const webUrl = `https://open.spotify.com/${spotifyUri}`;
    window.open(
      webUrl,
      'SpotifyNavigationWindow',
      'width=1080,height=720,menubar=no,toolbar=no,location=no,status=no'
    );
  };

  // Build Spotify Embed URL
  const spotifyEmbedSrc = `https://open.spotify.com/embed/${spotifyUri}?utm_source=generator&theme=0`;

  return (
    <div className="space-y-3 pt-1">
      {/* Header with Master Toggle */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div 
            className="p-1.5 rounded-lg border"
            style={{
              color: accentColor,
              backgroundColor: `${accentColor}15`,
              borderColor: `${accentColor}30`
            }}
          >
            <Music2 size={14} className={isRunning && enabled ? 'animate-pulse' : ''} />
          </div>
          <div>
            <span className="text-xs font-semibold text-white block">Spotify Focus Stream</span>
            <span className="text-[10px] text-neutral-400">Background music & ambient audio</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isDucking && (
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 animate-pulse">
              Ducking for Chime
            </span>
          )}
          <Switch
            checked={enabled}
            onChange={handleToggleEnabled}
            activeColor={accentColor}
          />
        </div>
      </div>

      {enabled && (
        <div className="space-y-3 animate-fade-in">
          {/* Action Toolbar with Navigation Arrows */}
          <div className="flex items-center justify-between p-2 rounded-xl bg-white/[0.03] border border-white/[0.06]">
            {/* Arrow 1: Expand In-App Navigation View */}
            <button
              type="button"
              onClick={() => setIsExpandedNav(!isExpandedNav)}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] text-xs font-medium text-neutral-300 hover:text-white transition-all active:scale-95"
              title={isExpandedNav ? 'Compact view' : 'Expand in-app tracklist navigation'}
            >
              {isExpandedNav ? (
                <>
                  <ChevronUp size={13} className="text-[#1ed760]" />
                  <span>Compact View</span>
                </>
              ) : (
                <>
                  <ChevronDown size={13} className="text-[#1ed760]" />
                  <span>Expand Tracklist</span>
                </>
              )}
            </button>

            {/* Arrow 2: Open Dedicated Navigation Window */}
            <button
              type="button"
              onClick={handleOpenSpotifyWindow}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#1DB954]/20 hover:bg-[#1DB954]/30 border border-[#1DB954]/40 text-xs font-medium text-[#1ed760] transition-all active:scale-95 shadow-sm"
              title="Open full Spotify player in companion window for full continuous playback"
            >
              <span>Play Full Songs</span>
              <ArrowUpRight size={13} />
            </button>
          </div>

          <div className="px-2.5 py-1.5 rounded-xl bg-[#1DB954]/10 border border-[#1DB954]/20 text-[10px] text-neutral-300 flex items-center justify-between">
            <span>Spotify embeds play 30s clips if not logged in.</span>
            <button
              type="button"
              onClick={handleOpenSpotifyWindow}
              className="text-[#1ed760] font-semibold hover:underline ml-1"
            >
              Login / Full Tracks ↗
            </button>
          </div>

          {/* Spotify IFrame Player */}
          <div
            className={`rounded-2xl overflow-hidden border border-white/[0.08] bg-black/40 shadow-lg relative transition-all duration-300 ${
              isExpandedNav ? 'min-h-[380px]' : 'min-h-[152px]'
            }`}
          >
            <iframe
              src={spotifyEmbedSrc}
              width="100%"
              height={isExpandedNav ? '380' : '152'}
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              title="Spotify Focus Player"
              className="rounded-2xl w-full"
            />
          </div>

          {/* Curated Spotify Focus Presets */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider block">
              Curated Spotify Playlists
            </span>
            <div className="grid grid-cols-2 gap-1.5">
              {spotifyPresets.map((preset) => {
                const isSelected = spotifyUri === preset.uriOrUrl;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => handleSelectPreset(preset)}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'bg-[#1DB954]/15 border-[#1DB954]/60 text-white shadow-sm'
                        : 'bg-white/[0.03] hover:bg-white/[0.07] border-white/[0.06] text-neutral-300'
                    }`}
                  >
                    <div className="text-xs font-semibold flex items-center justify-between">
                      <span className="truncate">{preset.name}</span>
                      {isSelected && <Check size={12} className="text-[#1ed760] shrink-0" />}
                    </div>
                    <div className="text-[10px] text-neutral-400 truncate mt-0.5">{preset.desc}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Custom Spotify URL Input */}
          <form onSubmit={handleApplyCustomUrl} className="space-y-1.5 pt-1">
            <label htmlFor="spotify-custom-url" className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider flex items-center gap-1 cursor-pointer">
              <LinkIcon size={11} />
              Paste Custom Spotify Link
            </label>
            <div className="flex gap-1.5">
              <input
                id="spotify-custom-url"
                name="spotifyCustomUrl"
                type="text"
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                placeholder="open.spotify.com/playlist/... or track/..."
                aria-label="Paste Custom Spotify Link"
                className="flex-1 px-3 py-2 bg-black/40 border border-white/[0.1] rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#1DB954]/60"
              />
              <button
                type="submit"
                className="px-3 py-2 rounded-xl text-xs font-semibold text-white transition-all active:scale-95 shadow-sm bg-[#1DB954] hover:bg-[#1ed760]"
                style={{
                  boxShadow: '0 0 10px rgba(29, 185, 84, 0.4)'
                }}
              >
                Load
              </button>
            </div>
            {inputError && (
              <p className="text-[10px] text-rose-400">{inputError}</p>
            )}
          </form>
        </div>
      )}
    </div>
  );
}
