import { useRef, useEffect, useState } from 'react';
import { VideoBackgroundConfig } from '../types/video';
import { extractYouTubeId } from '../utils/videoUtils';

interface VideoBackgroundProps {
  config: VideoBackgroundConfig;
  isRunning?: boolean;
}

export function VideoBackground({ config, isRunning = false }: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loadError, setLoadError] = useState(false);

  const {
    enabled,
    selectedVideo,
    dimmer = 0.45,
    blur = 0,
    brightness = 0.85,
    soundEnabled = false,
    volume = 0.5,
    playbackRate = 1.0,
    syncWithTimer = false
  } = config;

  // Reset error on video change
  useEffect(() => {
    setLoadError(false);
  }, [selectedVideo?.url]);

  // Sync HTML5 video volume & playback rate
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = soundEnabled ? volume : 0;
      videoRef.current.muted = !soundEnabled;
      videoRef.current.playbackRate = playbackRate;
    }
  }, [soundEnabled, volume, playbackRate]);

  // Sync play/pause with timer when syncWithTimer is enabled
  useEffect(() => {
    if (!videoRef.current) return;

    if (syncWithTimer) {
      if (isRunning) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    } else {
      videoRef.current.play().catch(() => {});
    }
  }, [isRunning, syncWithTimer, selectedVideo]);

  if (!enabled || !selectedVideo) {
    return null;
  }

  const isYouTube = selectedVideo.type === 'youtube' || (!selectedVideo.url.startsWith('blob:') && extractYouTubeId(selectedVideo.url) !== null && !selectedVideo.url.match(/\.(mp4|webm|ogg|mov)$/i));
  const youtubeId = isYouTube ? extractYouTubeId(selectedVideo.url) : null;

  return (
    <div 
      className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden select-none bg-black transition-opacity duration-700 ease-in-out"
      aria-hidden="true"
    >
      {/* Scaled & Filtered Video Canvas Layer */}
      <div 
        className="absolute inset-0 w-full h-full transition-all duration-500 ease-out"
        style={{
          filter: `blur(${blur}px) brightness(${brightness})`,
          transform: blur > 0 ? 'scale(1.06)' : 'scale(1.01)'
        }}
      >
        {isYouTube && youtubeId ? (
          <div className="relative w-full h-full overflow-hidden flex items-center justify-center pointer-events-none">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&mute=${soundEnabled ? 0 : 1}&controls=0&showinfo=0&rel=0&loop=1&playlist=${youtubeId}&modestbranding=1&iv_load_policy=3&disablekb=1&fs=0&enablejsapi=1`}
              className="absolute w-[120vw] h-[120vh] min-w-[177.77vh] min-h-[56.25vw] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none border-0"
              allow="autoplay; encrypted-media; picture-in-picture"
              title="YouTube Background Focus Stage"
            />
          </div>
        ) : (
          <video
            ref={videoRef}
            key={selectedVideo.url}
            src={selectedVideo.url}
            autoPlay
            loop
            muted={!soundEnabled}
            playsInline
            onError={() => setLoadError(true)}
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {/* Customizable Dark Dimmer Scrim for High-Contrast Timer Legibility */}
      <div 
        className="absolute inset-0 transition-colors duration-300 pointer-events-none"
        style={{
          backgroundColor: `rgba(0, 0, 0, ${dimmer})`,
          backdropFilter: blur > 0 ? `blur(${Math.min(blur * 0.3, 4)}px)` : 'none'
        }}
      />

      {/* Subtle Bottom & Top Vignette Gradients for Polished Depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/30 pointer-events-none" />

      {loadError && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 px-4 py-2 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs backdrop-blur-md z-10 animate-fade-in pointer-events-auto">
          Unable to stream video. Please check URL or choose another background.
        </div>
      )}
    </div>
  );
}
