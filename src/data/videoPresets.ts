import { VideoItem } from '../types/video';

export const videoPresets: VideoItem[] = [
  {
    id: 'yt-lofigirl',
    title: 'Lofi Girl - beats to relax/study',
    type: 'youtube',
    url: 'jfKfPfyJRdk',
    category: 'Cozy & Rain',
    thumbnail: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=300&q=80',
    author: 'Lofi Girl'
  },
  {
    id: 'yt-rain-window',
    title: 'Rain on Window at Twilight',
    type: 'youtube',
    url: '2Vp2O31QWp8',
    category: 'Cozy & Rain',
    thumbnail: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=300&q=80',
    author: 'Moody Rain'
  },
  {
    id: 'yt-rain-cafe',
    title: 'Cozy Rain Coffee Shop Ambience',
    type: 'youtube',
    url: 'e3L1Ias45JU',
    category: 'Cozy & Rain',
    thumbnail: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=300&q=80',
    author: 'Cafe Ambience'
  },
  {
    id: 'yt-fireplace',
    title: 'Warm Crackling Fireplace & Hearth',
    type: 'youtube',
    url: 'L_LUpnjgPso',
    category: 'Warmth & Fire',
    thumbnail: 'https://images.unsplash.com/photo-1542332213-31f87348057f?w=300&q=80',
    author: 'Fireside Warmth'
  },
  {
    id: 'yt-ocean',
    title: 'Calm Ocean Shoreline Sunset',
    type: 'youtube',
    url: 'V-_O7nl0Ii0',
    category: 'Nature & Zen',
    thumbnail: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&q=80',
    author: 'Zen Shoreline'
  },
  {
    id: 'yt-zen-nature',
    title: 'Japanese Garden Bamboo Water',
    type: 'youtube',
    url: 'DWcJFNfaw9c',
    category: 'Nature & Zen',
    thumbnail: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=300&q=80',
    author: 'Zen Serenity'
  },
  {
    id: 'yt-forest',
    title: 'Autumn Forest River & Sunbeams',
    type: 'youtube',
    url: 'hlWiI4xVXKY',
    category: 'Nature & Zen',
    thumbnail: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=300&q=80',
    author: 'Serene Woods'
  },
  {
    id: 'yt-space',
    title: 'Cosmic Deep Space Nebula',
    type: 'youtube',
    url: 'W0LHTWG-UmQ',
    category: 'Space & Stars',
    thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=300&q=80',
    author: 'Deep Cosmos'
  },
  {
    id: 'yt-cyberpunk',
    title: 'Cyberpunk Ambient Sci-Fi Metropolis',
    type: 'youtube',
    url: 'g6hXWvX9u9o',
    category: 'Cyber & City',
    thumbnail: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=300&q=80',
    author: 'Synthwave Radio'
  },
  {
    id: 'yt-tokyo-night',
    title: 'Tokyo Rainy Night City Walk',
    type: 'youtube',
    url: 'S_dfq94FWAE',
    category: 'Cyber & City',
    thumbnail: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=300&q=80',
    author: 'Neon Street'
  },
  {
    id: 'yt-snow',
    title: 'Quiet Winter Snowfall Twilight',
    type: 'youtube',
    url: 'vz91QpgUjFc',
    category: 'Cozy & Rain',
    thumbnail: 'https://images.unsplash.com/photo-1491002052546-bf38f186af56?w=300&q=80',
    author: 'Winter Chill'
  },
  {
    id: 'open-waves-direct',
    title: 'Direct MP4: Open Coastline Loop',
    type: 'url',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    category: 'Nature & Zen',
    thumbnail: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&q=80',
    author: 'Public Stream'
  }
];

export const videoCategories = [
  'All',
  'Cozy & Rain',
  'Nature & Zen',
  'Space & Stars',
  'Cyber & City',
  'Warmth & Fire'
];

export const defaultVideoConfig = {
  enabled: false,
  selectedVideo: videoPresets[0],
  dimmer: 0.45,
  blur: 0,
  brightness: 0.85,
  soundEnabled: false,
  volume: 0.5,
  playbackRate: 1.0,
  syncWithTimer: false,
  customVideos: []
};
