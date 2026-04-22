import type { HTMLCustomVideoElement } from '@/ui/video-player/video-player.types';

export function getVideoInfo(video: HTMLCustomVideoElement | null) {
  const currentTime = video?.currentTime || 0;
  const originalTime = video?.duration || 1;

  return {
    currentTime,
    originalTime,
    progress: (currentTime / originalTime) * 100,
  };
}

export function getVideoTime(time: number) {
  return Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2);
}
