import { useRef } from 'react';

import { useFullScreen } from '@/ui/video-player/hooks/useFullScreen';
import { usePlayPause } from '@/ui/video-player/hooks/usePlayPause';
import { useSkipTime } from '@/ui/video-player/hooks/useSkipTime';
import { useVideoProgress } from '@/ui/video-player/hooks/useVideoProgress';
import { useVideoQuality } from '@/ui/video-player/hooks/useVideoQuality';
import { useVideoVolume } from '@/ui/video-player/hooks/useVideoVolume';
import { type HTMLCustomVideoElement } from '@/ui/video-player/video-player.types';

interface Props {
  fileName: string;
}

export function useVideoPlayer({ fileName }: Props) {
  const playerRef = useRef<HTMLCustomVideoElement>(null);

  const { isPlaying, togglePlayPause, setIsPlaying } = usePlayPause(playerRef);
  const { progress, currentTime, videoTime } = useVideoProgress(playerRef);
  const { changeQuality, quality } = useVideoQuality(playerRef, {
    fileName,
    currentTime,
    setIsPlaying,
  });
  const { toggleFullScreen } = useFullScreen(playerRef);
  const { skipTime } = useSkipTime(playerRef);
  const { isMuted, toggleMute, volume, changeVolume } = useVideoVolume(playerRef);

  return {
    state: {
      isPlaying,
      progress,
      currentTime,
      videoTime,
      quality,
      isMuted,
      volume,
    },
    fn: {
      togglePlayPause,
      changeQuality,
      toggleFullScreen,
      skipTime,
      changeVolume,
      toggleMute,
    },
    playerRef,
  };
}
