import React, { useState } from 'react';
import { 
  Video as VideoIcon, 
  Sparkles, 
  Youtube, 
  Link as LinkIcon, 
  Upload, 
  Bookmark, 
  Check, 
  Trash2, 
  Volume2, 
  VolumeX, 
  Sliders, 
  Sun, 
  Eye, 
  Gauge, 
  Play, 
  X,
  Plus
} from 'lucide-react';
import { Switch } from './Switch';
import { VideoItem, VideoBackgroundConfig } from '../types/video';
import { videoPresets, videoCategories } from '../data/videoPresets';
import { extractYouTubeId, isValidVideoUrl } from '../utils/videoUtils';

interface VideoSettingsProps {
  config: VideoBackgroundConfig;
  onToggleEnabled: (enabled?: boolean) => void;
  onSelectVideo: (video: VideoItem) => void;
  onUpdateConfig: (partial: Partial<VideoBackgroundConfig>) => void;
  onAddCustomVideo: (video: Omit<VideoItem, 'id' | 'isCustom'>) => VideoItem;
  onRemoveCustomVideo: (id: string) => void;
  onSetLocalFileVideo: (file: File) => VideoItem;
  accentColor?: string;
  isRunning?: boolean;
  onClose?: () => void;
}

type SubTab = 'presets' | 'youtube' | 'url' | 'local' | 'saved';

export function VideoSettings({
  config,
  onToggleEnabled,
  onSelectVideo,
  onUpdateConfig,
  onAddCustomVideo,
  onRemoveCustomVideo,
  onSetLocalFileVideo,
  accentColor = '#f43f5e',
  onClose
}: VideoSettingsProps) {
  const [activeSubTab, setActiveSubTab] = useState<SubTab>('presets');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  
  // Custom YouTube input state
  const [ytUrl, setYtUrl] = useState('');
  const [ytTitle, setYtTitle] = useState('');
  const [ytError, setYtError] = useState<string | null>(null);

  // Custom Direct URL input state
  const [directUrl, setDirectUrl] = useState('');
  const [directTitle, setDirectTitle] = useState('');
  const [directError, setDirectError] = useState<string | null>(null);

  // Filter presets by category
  const filteredPresets = selectedCategory === 'All'
    ? videoPresets
    : videoPresets.filter(p => p.category === selectedCategory);

  const handleApplyYouTube = (e: React.FormEvent) => {
    e.preventDefault();
    setYtError(null);
    if (!ytUrl.trim()) return;

    const id = extractYouTubeId(ytUrl);
    if (!id) {
      setYtError('Please enter a valid YouTube URL or Video ID (e.g. youtube.com/watch?v=...)');
      return;
    }

    const title = ytTitle.trim() || `YouTube Stream (${id})`;
    onAddCustomVideo({
      title,
      type: 'youtube',
      url: id,
      category: 'YouTube Custom',
      author: 'YouTube',
      thumbnail: `https://img.youtube.com/vi/${id}/mqdefault.jpg`
    });

    setYtUrl('');
    setYtTitle('');
  };

  const handleApplyDirectUrl = (e: React.FormEvent) => {
    e.preventDefault();
    setDirectError(null);
    if (!directUrl.trim()) return;

    const url = directUrl.trim();
    if (!isValidVideoUrl(url) && !url.startsWith('http')) {
      setDirectError('Please enter a direct video link (MP4, WebM, etc.)');
      return;
    }

    const title = directTitle.trim() || 'Custom Video Stream';
    onAddCustomVideo({
      title,
      type: 'url',
      url,
      category: 'Direct URL',
      author: 'Web Stream'
    });

    setDirectUrl('');
    setDirectTitle('');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onSetLocalFileVideo(file);
    }
  };

  const playbackSpeeds = [0.5, 0.75, 1.0, 1.25, 1.5];

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-base font-semibold text-white">Video Backgrounds</h3>
          <p className="text-xs text-neutral-400">Atmospheric motion backdrops for deep focus</p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-white/[0.08] transition-all"
            title="Close panel"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Master Toggle Banner */}
      <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-between hover:border-white/[0.1] transition-all">
        <div className="flex items-center gap-2.5">
          <div 
            className="p-2 rounded-xl border transition-all"
            style={{ 
              color: accentColor, 
              backgroundColor: `${accentColor}18`,
              borderColor: `${accentColor}35`
            }}
          >
            <VideoIcon size={16} className={config.enabled ? 'animate-pulse' : ''} />
          </div>
          <div>
            <span className="text-sm font-semibold text-white block">Video Background</span>
            <span className="text-xs text-neutral-400">
              {config.enabled ? config.selectedVideo.title : 'Enable dynamic background'}
            </span>
          </div>
        </div>
        <Switch
          checked={config.enabled}
          onChange={(val) => onToggleEnabled(val)}
          activeColor={accentColor}
        />
      </div>

      {config.enabled && (
        <div className="space-y-4 animate-fade-in">
          {/* Sub Navigation Bar for Sources */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-white/[0.04] border border-white/[0.08]">
            <button
              type="button"
              onClick={() => setActiveSubTab('presets')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-medium transition-all ${
                activeSubTab === 'presets'
                  ? 'bg-white/15 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-white hover:bg-white/[0.05]'
              }`}
            >
              <Sparkles size={12} />
              <span>Curated</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveSubTab('youtube')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-medium transition-all ${
                activeSubTab === 'youtube'
                  ? 'bg-white/15 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-white hover:bg-white/[0.05]'
              }`}
            >
              <Youtube size={12} className="text-red-400" />
              <span>YouTube</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveSubTab('url')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-medium transition-all ${
                activeSubTab === 'url'
                  ? 'bg-white/15 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-white hover:bg-white/[0.05]'
              }`}
            >
              <LinkIcon size={12} />
              <span>URL</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveSubTab('local')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-medium transition-all ${
                activeSubTab === 'local'
                  ? 'bg-white/15 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-white hover:bg-white/[0.05]'
              }`}
            >
              <Upload size={12} />
              <span>Local</span>
            </button>
            {config.customVideos.length > 0 && (
              <button
                type="button"
                onClick={() => setActiveSubTab('saved')}
                className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-medium transition-all ${
                  activeSubTab === 'saved'
                    ? 'bg-white/15 text-white shadow-sm'
                    : 'text-neutral-400 hover:text-white hover:bg-white/[0.05]'
                }`}
              >
                <Bookmark size={12} />
                <span>Saved ({config.customVideos.length})</span>
              </button>
            )}
          </div>

          {/* SubTab 1: Curated Presets */}
          {activeSubTab === 'presets' && (
            <div className="space-y-3">
              {/* Category Filter Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 custom-scrollbar">
                {videoCategories.map((cat) => {
                  const isCatSelected = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-medium whitespace-nowrap transition-all ${
                        isCatSelected
                          ? 'bg-white text-black font-semibold shadow-sm'
                          : 'bg-white/[0.05] hover:bg-white/[0.1] text-neutral-300'
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>

              {/* Presets Grid */}
              <div className="grid grid-cols-1 gap-2 max-h-[260px] overflow-y-auto custom-scrollbar pr-1">
                {filteredPresets.map((preset) => {
                  const isSelected = config.selectedVideo.id === preset.id;
                  return (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => onSelectVideo(preset)}
                      className={`p-2.5 rounded-2xl border text-left transition-all flex items-center justify-between group ${
                        isSelected
                          ? 'border-white/30 shadow-md'
                          : 'bg-white/[0.03] hover:bg-white/[0.07] border-white/[0.06]'
                      }`}
                      style={isSelected ? {
                        backgroundColor: `${accentColor}18`,
                        borderColor: `${accentColor}80`
                      } : {}}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        {preset.thumbnail ? (
                          <img
                            src={preset.thumbnail}
                            alt={preset.title}
                            className="w-12 h-10 rounded-xl object-cover border border-white/10 shrink-0 shadow-sm"
                          />
                        ) : (
                          <div className="w-12 h-10 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center shrink-0">
                            <VideoIcon size={16} className="text-neutral-400" />
                          </div>
                        )}
                        <div className="min-w-0">
                          <div className="text-xs font-semibold text-white truncate group-hover:text-white">
                            {preset.title}
                          </div>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[10px] text-neutral-400 font-mono">
                              {preset.category}
                            </span>
                            {preset.author && (
                              <span className="text-[9px] px-1.5 py-0.2 rounded bg-white/[0.06] text-neutral-300">
                                {preset.author}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-all ml-2 ${
                          isSelected ? 'text-white shadow-sm' : 'border border-white/15 bg-white/[0.02]'
                        }`}
                        style={isSelected ? { backgroundColor: accentColor } : {}}
                      >
                        {isSelected && <Check size={12} strokeWidth={3} />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* SubTab 2: YouTube Video / Stream Input */}
          {activeSubTab === 'youtube' && (
            <form onSubmit={handleApplyYouTube} className="space-y-3">
              <div className="p-3 rounded-2xl bg-red-500/[0.06] border border-red-500/20 text-[11px] text-neutral-300 leading-relaxed">
                Paste any YouTube video or 24/7 live stream URL. The video will loop smoothly in the background without YouTube controls.
              </div>

              <div className="space-y-2">
                <div>
                  <label htmlFor="yt-url-input" className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider block mb-1">
                    YouTube URL or Video ID
                  </label>
                  <input
                    id="yt-url-input"
                    name="ytUrl"
                    type="text"
                    value={ytUrl}
                    onChange={(e) => setYtUrl(e.target.value)}
                    placeholder="https://www.youtube.com/watch?v=... or ID"
                    aria-label="YouTube URL or Video ID"
                    className="w-full px-3 py-2 bg-black/40 border border-white/[0.1] rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-red-500/60"
                  />
                </div>

                <div>
                  <label htmlFor="yt-title-input" className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider block mb-1">
                    Custom Title (Optional)
                  </label>
                  <input
                    id="yt-title-input"
                    name="ytTitle"
                    type="text"
                    value={ytTitle}
                    onChange={(e) => setYtTitle(e.target.value)}
                    placeholder="e.g. My Favorite Study Stream"
                    aria-label="Custom Title for YouTube Video"
                    className="w-full px-3 py-2 bg-black/40 border border-white/[0.1] rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-red-500/60"
                  />
                </div>

                {ytError && (
                  <p className="text-[10px] text-rose-400">{ytError}</p>
                )}

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl text-xs font-semibold text-white bg-red-600 hover:bg-red-500 transition-all shadow-md active:scale-95"
                >
                  <Plus size={14} />
                  Set YouTube Background
                </button>
              </div>

              {/* Quick Preset Ideas for YouTube */}
              <div className="pt-2 border-t border-white/[0.06] space-y-1.5">
                <span className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider">
                  Popular Focus Streams
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { name: 'Lofi Girl', id: 'jfKfPfyJRdk' },
                    { name: 'Synthwave Radio', id: 'g6hXWvX9u9o' },
                    { name: 'Rainy Cafe', id: 'e3L1Ias45JU' }
                  ].map((stream) => (
                    <button
                      key={stream.id}
                      type="button"
                      onClick={() => {
                        setYtUrl(`https://www.youtube.com/watch?v=${stream.id}`);
                        setYtTitle(stream.name);
                      }}
                      className="px-2.5 py-1 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-[10px] text-neutral-300 hover:text-white border border-white/[0.06] transition-all"
                    >
                      {stream.name}
                    </button>
                  ))}
                </div>
              </div>
            </form>
          )}

          {/* SubTab 3: Direct Video URL */}
          {activeSubTab === 'url' && (
            <form onSubmit={handleApplyDirectUrl} className="space-y-3">
              <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/[0.06] text-[11px] text-neutral-300 leading-relaxed">
                Paste any direct link to an MP4 or WebM video file on the web.
              </div>

              <div className="space-y-2">
                <div>
                  <label htmlFor="direct-url-input" className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider block mb-1">
                    Direct Video URL (.mp4, .webm)
                  </label>
                  <input
                    id="direct-url-input"
                    name="directUrl"
                    type="text"
                    value={directUrl}
                    onChange={(e) => setDirectUrl(e.target.value)}
                    placeholder="https://example.com/ambient-video.mp4"
                    aria-label="Direct Video URL"
                    className="w-full px-3 py-2 bg-black/40 border border-white/[0.1] rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white/40"
                  />
                </div>

                <div>
                  <label htmlFor="direct-title-input" className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider block mb-1">
                    Custom Title (Optional)
                  </label>
                  <input
                    id="direct-title-input"
                    name="directTitle"
                    type="text"
                    value={directTitle}
                    onChange={(e) => setDirectTitle(e.target.value)}
                    placeholder="e.g. Tokyo Rainy Alley"
                    aria-label="Custom Title for Video"
                    className="w-full px-3 py-2 bg-black/40 border border-white/[0.1] rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white/40"
                  />
                </div>

                {directError && (
                  <p className="text-[10px] text-rose-400">{directError}</p>
                )}

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl text-xs font-semibold text-white bg-white/20 hover:bg-white/30 border border-white/20 transition-all shadow-md active:scale-95"
                >
                  <Plus size={14} />
                  Load Video URL
                </button>
              </div>
            </form>
          )}

          {/* SubTab 4: Local File Upload */}
          {activeSubTab === 'local' && (
            <div className="space-y-3">
              <label htmlFor="local-video-file-input" className="p-6 rounded-2xl bg-white/[0.02] border-2 border-dashed border-white/15 hover:border-white/30 transition-all flex flex-col items-center justify-center text-center cursor-pointer group">
                <div className="p-3 rounded-2xl bg-white/[0.05] border border-white/10 text-neutral-300 group-hover:scale-110 transition-transform mb-2">
                  <Upload size={20} style={{ color: accentColor }} />
                </div>
                <span className="text-xs font-semibold text-white block">
                  Select Video from Computer
                </span>
                <span className="text-[10px] text-neutral-400 mt-0.5">
                  Supports MP4, WebM, MOV files
                </span>
                <input
                  id="local-video-file-input"
                  name="localVideoFile"
                  type="file"
                  accept="video/mp4,video/webm,video/ogg,video/quicktime"
                  onChange={handleFileUpload}
                  aria-label="Upload local video file"
                  className="hidden"
                />
              </label>
              <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-[10px] text-neutral-400 text-center">
                Local videos run completely in your browser and are never uploaded to any server.
              </div>
            </div>
          )}

          {/* SubTab 5: Saved Custom Library */}
          {activeSubTab === 'saved' && (
            <div className="space-y-2">
              <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider block">
                Saved Videos Library
              </span>
              <div className="space-y-1.5 max-h-[220px] overflow-y-auto custom-scrollbar pr-1">
                {config.customVideos.map((video) => {
                  const isSelected = config.selectedVideo.id === video.id;
                  return (
                    <div
                      key={video.id}
                      className={`p-2.5 rounded-2xl border flex items-center justify-between transition-all ${
                        isSelected
                          ? 'border-white/30 shadow-md'
                          : 'bg-white/[0.03] hover:bg-white/[0.07] border-white/[0.06]'
                      }`}
                      style={isSelected ? {
                        backgroundColor: `${accentColor}18`,
                        borderColor: `${accentColor}80`
                      } : {}}
                    >
                      <button
                        type="button"
                        onClick={() => onSelectVideo(video)}
                        className="flex items-center gap-2.5 min-w-0 text-left flex-1"
                      >
                        <div className="p-2 rounded-xl bg-white/[0.05] border border-white/10 text-neutral-300 shrink-0">
                          {video.type === 'youtube' ? (
                            <Youtube size={14} className="text-red-400" />
                          ) : (
                            <VideoIcon size={14} style={{ color: accentColor }} />
                          )}
                        </div>
                        <div className="min-w-0">
                          <span className="text-xs font-semibold text-white block truncate">
                            {video.title}
                          </span>
                          <span className="text-[10px] text-neutral-400 font-mono block">
                            {video.category || video.type}
                          </span>
                        </div>
                      </button>

                      <div className="flex items-center gap-1.5 shrink-0 ml-2">
                        {isSelected && (
                          <span 
                            className="w-5 h-5 rounded-full flex items-center justify-center text-white"
                            style={{ backgroundColor: accentColor }}
                          >
                            <Check size={12} strokeWidth={3} />
                          </span>
                        )}
                        <button
                          type="button"
                          onClick={() => onRemoveCustomVideo(video.id)}
                          className="p-1.5 rounded-lg text-neutral-400 hover:text-rose-400 hover:bg-white/[0.08] transition-all"
                          title="Remove from library"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Section: Visual Adjustments (Dimmer, Blur, Brightness) */}
          <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-3 pt-3 hover:border-white/[0.1] transition-all">
            <label className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sliders size={13} style={{ color: accentColor }} />
              Visual Enhancements
            </label>

            {/* Scrim Dimmer Slider */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <label htmlFor="scrim-dimmer-slider" className="text-neutral-300 font-medium flex items-center gap-1 cursor-pointer">
                  <Eye size={12} className="text-neutral-400" />
                  Clock Scrim Dimmer
                </label>
                <span className="font-mono text-neutral-400">
                  {Math.round(config.dimmer * 100)}%
                </span>
              </div>
              <input
                id="scrim-dimmer-slider"
                name="scrimDimmer"
                type="range"
                min="0.1"
                max="0.85"
                step="0.05"
                value={config.dimmer}
                onChange={(e) => onUpdateConfig({ dimmer: parseFloat(e.target.value) })}
                aria-label="Clock Scrim Dimmer"
                className="w-full h-1.5 bg-white/[0.1] rounded-lg appearance-none cursor-pointer"
                style={{ accentColor }}
                title="Adjust background scrim darkness"
              />
            </div>

            {/* Background Blur Slider */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <label htmlFor="blur-slider" className="text-neutral-300 font-medium flex items-center gap-1 cursor-pointer">
                  <Sparkles size={12} className="text-neutral-400" />
                  Atmospheric Blur
                </label>
                <span className="font-mono text-neutral-400">
                  {config.blur}px
                </span>
              </div>
              <input
                id="blur-slider"
                name="blur"
                type="range"
                min="0"
                max="20"
                step="1"
                value={config.blur}
                onChange={(e) => onUpdateConfig({ blur: parseInt(e.target.value) })}
                aria-label="Atmospheric Blur"
                className="w-full h-1.5 bg-white/[0.1] rounded-lg appearance-none cursor-pointer"
                style={{ accentColor }}
                title="Adjust background softness blur"
              />
            </div>

            {/* Brightness Slider */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <label htmlFor="brightness-slider" className="text-neutral-300 font-medium flex items-center gap-1 cursor-pointer">
                  <Sun size={12} className="text-neutral-400" />
                  Video Brightness
                </label>
                <span className="font-mono text-neutral-400">
                  {Math.round(config.brightness * 100)}%
                </span>
              </div>
              <input
                id="brightness-slider"
                name="brightness"
                type="range"
                min="0.3"
                max="1.3"
                step="0.05"
                value={config.brightness}
                onChange={(e) => onUpdateConfig({ brightness: parseFloat(e.target.value) })}
                aria-label="Video Brightness"
                className="w-full h-1.5 bg-white/[0.1] rounded-lg appearance-none cursor-pointer"
                style={{ accentColor }}
                title="Adjust video brightness"
              />
            </div>
          </div>

          {/* Section: Audio & Playback Controls */}
          <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-3 hover:border-white/[0.1] transition-all">
            <label className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
              <Gauge size={13} style={{ color: accentColor }} />
              Audio & Playback Controls
            </label>

            {/* Video Sound Switch */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {config.soundEnabled ? (
                  <Volume2 size={15} style={{ color: accentColor }} />
                ) : (
                  <VolumeX size={15} className="text-neutral-400" />
                )}
                <div>
                  <span className="text-xs font-semibold text-white block">Video Audio</span>
                  <span className="text-[10px] text-neutral-400">Play ambient sound from video</span>
                </div>
              </div>
              <Switch
                checked={config.soundEnabled}
                onChange={(val) => onUpdateConfig({ soundEnabled: val })}
                activeColor={accentColor}
              />
            </div>

            {/* Video Volume Slider */}
            {config.soundEnabled && (
              <div className="space-y-1 animate-fade-in">
                <div className="flex items-center justify-between text-xs">
                  <label htmlFor="video-volume-slider" className="text-neutral-300 font-medium cursor-pointer">
                    Video Volume
                  </label>
                  <span className="font-mono text-neutral-400">
                    {Math.round(config.volume * 100)}%
                  </span>
                </div>
                <input
                  id="video-volume-slider"
                  name="videoVolume"
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={config.volume}
                  onChange={(e) => onUpdateConfig({ volume: parseFloat(e.target.value) })}
                  aria-label="Video Audio Volume"
                  className="w-full h-1.5 bg-white/[0.1] rounded-lg appearance-none cursor-pointer"
                  style={{ accentColor }}
                  title="Adjust video audio volume"
                />
              </div>
            )}

            {/* Playback Speed for HTML5 videos */}
            {config.selectedVideo.type !== 'youtube' && (
              <div className="space-y-1.5 pt-1">
                <div className="text-xs text-neutral-300 font-medium flex items-center gap-1">
                  <Play size={12} className="text-neutral-400" />
                  <span>Playback Speed</span>
                </div>
                <div className="grid grid-cols-5 gap-1">
                  {playbackSpeeds.map((spd) => {
                    const isSelected = (config.playbackRate || 1.0) === spd;
                    return (
                      <button
                        key={spd}
                        type="button"
                        onClick={() => onUpdateConfig({ playbackRate: spd })}
                        className={`py-1 rounded-lg text-xs font-mono font-medium transition-all ${
                          isSelected
                            ? 'bg-white text-black font-bold shadow-sm'
                            : 'bg-white/[0.05] hover:bg-white/[0.1] text-neutral-300'
                        }`}
                      >
                        {spd}x
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Sync with Timer Toggle */}
            <div className="flex items-center justify-between pt-1 border-t border-white/[0.04]">
              <div>
                <span className="text-xs font-semibold text-white block">Sync with Timer</span>
                <span className="text-[10px] text-neutral-400">Pause video when timer is stopped</span>
              </div>
              <Switch
                checked={config.syncWithTimer}
                onChange={(val) => onUpdateConfig({ syncWithTimer: val })}
                activeColor={accentColor}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
