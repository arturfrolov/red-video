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

export function getVideoTime(time: number) {
  return Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2);
}
