import { type RefObject, useEffect, useState } from 'react';

import { type HTMLCustomVideoElement } from '@/ui/video-player/video-player.types';
import { getVideoInfo } from '@/ui/video-player/video-player.util';

export function useVideoProgress(playerRef: RefObject<HTMLCustomVideoElement | null>) {
  const [currentTime, setCurrentTime] = useState(0);
  const [videoTime, setVideoTime] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const player = playerRef?.current;
    if (!player) return;

    const handleLoadedMetadata = () => {
      const { currentTime, progress, originalTime } = getVideoInfo(player);

      setVideoTime(originalTime);
      setCurrentTime(currentTime);
      setProgress(progress);
    };

    player.addEventListener('loadedmetadata', handleLoadedMetadata);

    // If metadata is already loaded, call the handler immediately.
    if (player.readyState >= 1) {
      handleLoadedMetadata();
    }

    return () => {
      player.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, [playerRef]);

  useEffect(() => {
    const player = playerRef?.current;
    if (!player) return;

    const updateProgress = () => {
      const { currentTime, progress } = getVideoInfo(player);

      setCurrentTime(currentTime);
      setProgress(progress);
    };

    player.addEventListener('timeupdate', updateProgress);

    return () => {
      player.removeEventListener('timeupdate', updateProgress);
    };
  }, [playerRef]);

  return {
    currentTime,
    progress,
    videoTime,
    setCurrentTime,
  };
}
