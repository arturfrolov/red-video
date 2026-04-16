import { useHotkeys } from 'react-hotkeys-hook';

import type { TSkipTime } from '@/ui/video-player/hooks/useSkipTime';
import type { EnumVideoPlayerQuality } from '@/ui/video-player/video-player.types';

interface Props {
  togglePlayPause: () => void;
  changeQuality: (quality: EnumVideoPlayerQuality) => void;
  toggleFullScreen: () => void;
  skipTime: (type?: TSkipTime) => void;
  changeVolume: (value: number) => void;
  toggleMute: () => void;
  volume: number;
  toggleTheaterMode: () => void;
}

export function useVideoHotkeys({ volume, ...fn }: Props) {
  useHotkeys('space', (e) => {
    e.preventDefault();
    fn.togglePlayPause();
  });

  useHotkeys('left', () => {
    fn.skipTime('backward');
  });

  useHotkeys('right', () => {
    fn.skipTime('forward');
  });

  useHotkeys('up', (e) => {
    e.preventDefault();
    fn.changeVolume(Math.min(volume + 0.1, 1));
  });

  useHotkeys('down', (e) => {
    e.preventDefault();
    fn.changeVolume(Math.max(volume - 0.1, 0));
  });

  useHotkeys('f', () => {
    fn.toggleFullScreen();
  });

  useHotkeys('m', () => {
    fn.toggleMute();
  });

  useHotkeys('t', () => {
    fn.toggleTheaterMode();
  });
}
