import type { HTMLCustomVideoElement } from '@/ui/video-player/video-player.types';

export function getVideoInfo(video: HTMLCustomVideoElement) {
  const currentTime = video.currentTime;
  const originalTime = video.duration;

  return {
    currentTime,
    originalTime,
    progress: (currentTime / originalTime) * 100,
  };
}
