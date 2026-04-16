import { type Dispatch, type RefObject, type SetStateAction } from 'react';

import type { HTMLCustomVideoElement } from '@/ui/video-player/video-player.types';

export function useOnSeek(
  playerRef: RefObject<HTMLCustomVideoElement | null>,
  setCurrentTime: Dispatch<SetStateAction<number>>
) {
  const onSeek = (time: number) => {
    if (!playerRef.current) return;

    playerRef.current.currentTime = time;
    setCurrentTime(time);
  };

  return {
    onSeek,
  };
}
