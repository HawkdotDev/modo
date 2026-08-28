import { useState, useEffect, useCallback } from 'react';
import { VideoItem, VideoBackgroundConfig } from '../types/video';
import { videoPresets } from '../data/videoPresets';
import { StorageService } from '../services/storageService';

export function useVideoBackground() {
  const [config, setConfig] = useState<VideoBackgroundConfig>(() => StorageService.getVideoBackgroundConfig());

  // Save to StorageService on config changes
  useEffect(() => {
    StorageService.setVideoBackgroundConfig(config);
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
