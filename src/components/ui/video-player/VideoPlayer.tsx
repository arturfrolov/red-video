'use client';

import { Maximize, Pause, Play, RectangleHorizontal } from 'lucide-react';

import { useVideoPlayer } from '@/ui/video-player/hooks/useVideoPlayer';
import { PlayerProgressBar } from '@/ui/video-player/progress-bar/PlayerProgressBar';
import { SelectQuality } from '@/ui/video-player/quality/SelectQuality';
import { EnumVideoPlayerQuality } from '@/ui/video-player/video-player.types';
import { getVideoTime } from '@/ui/video-player/video-player.util';
import { VolumeControl } from '@/ui/video-player/volume/VolumeControl';

export function VideoPlayer({
  fileName,
  toggleTheaterMode,
}: {
  fileName: string;
  toggleTheaterMode: () => void;
}) {
  const { state, fn, playerRef } = useVideoPlayer({ fileName });

  return (
    <div className='relative mb-5 overflow-hidden rounded-2xl'>
      <video
        ref={playerRef}
        className='aspect-video'
        controls={false}
        src={`/uploads/videos/${EnumVideoPlayerQuality['1080p']}/${fileName}`}
        preload='metadata'
      />

      <div className='absolute right-5 bottom-5 left-5 flex items-center justify-between'>
        <div className='flex items-center gap-4'>
          <button
            onClick={fn.togglePlayPause}
            className='cursor-pointer transition-colors hover:text-primary'
          >
            {state.isPlaying ? <Pause /> : <Play />}
          </button>

          <PlayerProgressBar progress={state.progress} />

          <div>
            <span>{getVideoTime(state.videoTime)}</span>
          </div>
        </div>
        <div className='flex items-center gap-5'>
          <VolumeControl
            changeVolume={fn.changeVolume}
            value={state.volume}
            isMuted={state.isMuted}
            toggleMute={fn.toggleMute}
          />

          <SelectQuality
            currentValue={state.quality}
            onChange={fn.changeQuality}
          />

          <button
            className='cursor-pointer transition-colors hover:text-primary'
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
