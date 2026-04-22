'use client';

import cn from 'clsx';
import { Lightbulb, LightbulbOff, Maximize, Pause, Play, RectangleHorizontal } from 'lucide-react';

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
  maxResolution: EnumVideoPlayerQuality;
}

export function VideoPlayer({
  mediaClassName,
  fileName,
  isTheaterMode,
  toggleTheaterMode,
  maxResolution,
}: Props) {
  const { state, fn, playerRef, bgRef } = useVideoPlayer({ fileName, toggleTheaterMode });

  const videoSrc = `/uploads/videos/${EnumVideoPlayerQuality['1080p']}/${fileName}`;

  return (
    <div
      className={cn('relative rounded-2xl', {
        'bg-black': isTheaterMode,
      })}
    >
      <div className={cn('relative w-full', mediaClassName)}>
        {state.isLightingMode && (
          <video
            ref={bgRef}
            className='absolute top-0 left-0 h-full w-full scale-[1.02] object-cover
              mix-blend-lighten blur-3xl brightness-90 contrast-125 saturate-150 filter'
            src={`/uploads/videos/${EnumVideoPlayerQuality['720p']}/${fileName}`}
            muted
          />
        )}

        <video
          ref={playerRef}
          className={cn('relative z-1 block aspect-video w-full rounded-2xl', {
            'rounded-none': isTheaterMode,
          })}
          controls={false}
          src={videoSrc}
          preload='metadata'
        />
      </div>

      <div
        className='absolute inset-x-3 bottom-3 z-1 grid grid-cols-[7fr_1fr] gap-7 sm:inset-x-5
          sm:bottom-5'
      >
        <div className='flex items-center gap-3 sm:gap-6'>
          <button
            onClick={fn.togglePlayPause}
            className='cursor-pointer transition-colors hover:text-primary'
          >
            {state.isPlaying ? <Pause /> : <Play />}
          </button>

          <PlayerProgressBar
            currentTime={state.currentTime}
            duration={state.videoTime}
            progress={state.progress}
            onSeek={fn.onSeek}
          />

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
            maxResolution={maxResolution}
          />

          <button
            className='cursor-pointer transition-colors hover:text-primary'
            onClick={fn.toggleLightingMode}
            title={state.isLightingMode ? 'Off lighting' : 'On lighting'}
          >
            {state.isLightingMode ? <Lightbulb /> : <LightbulbOff />}
          </button>

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
  );
}
