'use client';

import cn from 'clsx';
import { Maximize, Pause, Play, RectangleHorizontal } from 'lucide-react';

import { useVideoPlayer } from '@/ui/video-player/hooks/useVideoPlayer';
import { PlayerProgressBar } from '@/ui/video-player/progress-bar/PlayerProgressBar';
import { SelectQuality } from '@/ui/video-player/quality/SelectQuality';
import { EnumVideoPlayerQuality } from '@/ui/video-player/video-player.types';
import { getVideoTime } from '@/ui/video-player/video-player.util';
import { VolumeControl } from '@/ui/video-player/volume/VolumeControl';

interface Props {
  mediaClassName?: string;
  fileName: string;
  isTheaterMode: boolean;
  toggleTheaterMode: () => void;
}

export function VideoPlayer({ mediaClassName, fileName, isTheaterMode, toggleTheaterMode }: Props) {
  const { state, fn, playerRef } = useVideoPlayer({ fileName });

  const videoSrc = `/uploads/videos/${EnumVideoPlayerQuality['1080p']}/${fileName}`;

  return (
    <div
      className={cn('relative overflow-hidden rounded-2xl', {
        'bg-black': isTheaterMode,
      })}
    >
      <div className={cn('w-full', mediaClassName)}>
        <video
          ref={playerRef}
          className='block aspect-video w-full'
          controls={false}
          src={videoSrc}
          preload='metadata'
        />
      </div>

      <div className='absolute inset-x-3 bottom-3 sm:inset-x-5 sm:bottom-5'>
        <PlayerProgressBar progress={state.progress} />

        <div className='mt-3 flex items-center justify-between gap-3 sm:mt-4'>
          <div className='flex min-w-0 items-center gap-3 sm:gap-4'>
            <button
              onClick={fn.togglePlayPause}
              className='cursor-pointer transition-colors hover:text-primary'
            >
              {state.isPlaying ? <Pause /> : <Play />}
            </button>

            <div className='text-sm'>{getVideoTime(state.videoTime)}</div>
          </div>

          <div className='flex items-center gap-3 sm:gap-5'>
            <div className='hidden md:block'>
              <VolumeControl
                changeVolume={fn.changeVolume}
                value={state.volume}
                isMuted={state.isMuted}
                toggleMute={fn.toggleMute}
              />
            </div>

            <SelectQuality
              currentValue={state.quality}
              onChange={fn.changeQuality}
            />

            <button
              className={cn('cursor-pointer transition-colors hover:text-primary', {
                'text-primary': isTheaterMode,
              })}
              onClick={toggleTheaterMode}
            >
              <RectangleHorizontal />
            </button>

            <button
              onClick={fn.toggleFullScreen}
              className='cursor-pointer transition-colors hover:text-primary'
            >
              <Maximize />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
