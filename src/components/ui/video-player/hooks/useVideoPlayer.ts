import { useRef, useState } from 'react';

import { useFullScreen } from '@/ui/video-player/hooks/useFullScreen';
import { useOnSeek } from '@/ui/video-player/hooks/useOnSeek';
import { usePlayPause } from '@/ui/video-player/hooks/usePlayPause';
import { useSkipTime } from '@/ui/video-player/hooks/useSkipTime';
import { useVideoHotkeys } from '@/ui/video-player/hooks/useVideoHotkeys';
import { useVideoProgress } from '@/ui/video-player/hooks/useVideoProgress';
import { useVideoQuality } from '@/ui/video-player/hooks/useVideoQuality';
import { useVideoVolume } from '@/ui/video-player/hooks/useVideoVolume';
import { type HTMLCustomVideoElement } from '@/ui/video-player/video-player.types';

interface Props {
  fileName: string;
  toggleTheaterMode: () => void;
}

export function useVideoPlayer({ fileName, toggleTheaterMode }: Props) {
  const playerRef = useRef<HTMLCustomVideoElement>(null);
  const bgRef = useRef<HTMLCustomVideoElement>(null);

  const [isLightingMode, setIsLightingMode] = useState(false);

  const { isPlaying, togglePlayPause, setIsPlaying } = usePlayPause(playerRef, bgRef);
  const { progress, currentTime, videoTime, setCurrentTime } = useVideoProgress(playerRef);
  const { changeQuality, quality } = useVideoQuality(playerRef, {
    fileName,
    currentTime,
    setIsPlaying,
  });
  const { toggleFullScreen } = useFullScreen(playerRef);
  const { skipTime } = useSkipTime(playerRef);
  const { isMuted, toggleMute, volume, changeVolume } = useVideoVolume(playerRef);
  const { onSeek } = useOnSeek(playerRef, bgRef, setCurrentTime);

  const fn = {
    togglePlayPause,
    changeQuality,
    toggleFullScreen,
    skipTime,
    changeVolume,
    toggleMute,
    onSeek,
    toggleLightingMode: () => setIsLightingMode(!isLightingMode),
  };

  useVideoHotkeys({ volume, toggleTheaterMode, ...fn });

  return {
    state: {
      isPlaying,
      progress,
      currentTime,
      videoTime,
      quality,
      isMuted,
      volume,
      isLightingMode,
    },
    fn,
    playerRef,
    bgRef,
  };
}
