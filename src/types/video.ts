export type VideoSourceType = 'preset' | 'youtube' | 'url' | 'local';

export interface VideoItem {
  id: string;
  title: string;
  type: VideoSourceType;
  url: string; // Direct video URL, YouTube ID/URL, or Blob URL
  category?: string;
  thumbnail?: string;
  isCustom?: boolean;
  author?: string;
}

export interface VideoBackgroundConfig {
  enabled: boolean;
  selectedVideo: VideoItem;
  dimmer: number; // 0.0 to 0.9 overlay darkness
  blur: number; // 0 to 20px blur
  brightness: number; // 0.3 to 1.3
  soundEnabled: boolean;
  volume: number; // 0.0 to 1.0
  playbackRate: number; // 0.5 to 2.0
  syncWithTimer: boolean; // Pause video when timer is stopped
  customVideos: VideoItem[];
}
