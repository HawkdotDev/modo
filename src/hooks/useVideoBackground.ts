import { useState, useEffect, useCallback } from 'react';
import { VideoItem, VideoBackgroundConfig } from '../types/video';
import { videoPresets, defaultVideoConfig } from '../data/videoPresets';

const STORAGE_KEY = 'modo_video_bg_config';

export function useVideoBackground() {
  const [config, setConfig] = useState<VideoBackgroundConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Ensure default properties exist
        return {
          ...defaultVideoConfig,
          ...parsed,
          selectedVideo: parsed.selectedVideo || videoPresets[0],
          customVideos: parsed.customVideos || []
        };
      }
    } catch (e) {
      console.warn('Failed to load video background config from localStorage:', e);
    }
    return defaultVideoConfig;
  });

  // Save to localStorage on config changes
  useEffect(() => {
    try {
      // Avoid saving blob URLs directly to localStorage as they become invalid on reload
      const configToSave = {
        ...config,
        selectedVideo: config.selectedVideo?.url?.startsWith('blob:')
          ? videoPresets[0]
          : config.selectedVideo,
        customVideos: config.customVideos.filter(v => !v.url.startsWith('blob:'))
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(configToSave));
    } catch (e) {
      console.warn('Failed to save video background config:', e);
    }
  }, [config]);

  const updateConfig = useCallback((partial: Partial<VideoBackgroundConfig>) => {
    setConfig(prev => ({
      ...prev,
      ...partial
    }));
  }, []);

  const toggleEnabled = useCallback((enabled?: boolean) => {
    setConfig(prev => ({
      ...prev,
      enabled: enabled !== undefined ? enabled : !prev.enabled
    }));
  }, []);

  const selectVideo = useCallback((video: VideoItem) => {
    setConfig(prev => ({
      ...prev,
      selectedVideo: video,
      enabled: true // Auto-enable when a video is selected
    }));
  }, []);

  const addCustomVideo = useCallback((newVideo: Omit<VideoItem, 'id' | 'isCustom'>): VideoItem => {
    const videoItem: VideoItem = {
      ...newVideo,
      id: `custom_${Date.now()}`,
      isCustom: true
    };
    setConfig(prev => ({
      ...prev,
      customVideos: [videoItem, ...prev.customVideos],
      selectedVideo: videoItem,
      enabled: true
    }));
    return videoItem;
  }, []);

  const removeCustomVideo = useCallback((id: string) => {
    setConfig(prev => {
      const filtered = prev.customVideos.filter(v => v.id !== id);
      const isCurrentlySelected = prev.selectedVideo.id === id;
      return {
        ...prev,
        customVideos: filtered,
        selectedVideo: isCurrentlySelected ? (filtered[0] || videoPresets[0]) : prev.selectedVideo
      };
    });
  }, []);

  const setLocalFileVideo = useCallback((file: File) => {
    const blobUrl = URL.createObjectURL(file);
    const videoItem: VideoItem = {
      id: `local_${Date.now()}`,
      title: file.name.replace(/\.[^/.]+$/, ''),
      type: 'local',
      url: blobUrl,
      category: 'Local Files',
      isCustom: true,
      author: 'My Computer'
    };

    setConfig(prev => ({
      ...prev,
      customVideos: [videoItem, ...prev.customVideos.filter(v => !v.url.startsWith('blob:'))],
      selectedVideo: videoItem,
      enabled: true
    }));
    return videoItem;
  }, []);

  return {
    config,
    updateConfig,
    toggleEnabled,
    selectVideo,
    addCustomVideo,
    removeCustomVideo,
    setLocalFileVideo
  };
}
