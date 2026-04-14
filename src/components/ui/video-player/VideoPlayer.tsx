'use client';

import { Maximize, Pause, Play } from 'lucide-react';

import { PlayerProgressBar } from '@/ui/video-player/progress-bar/PlayerProgressBar';
import { SelectQuality } from '@/ui/video-player/quality/SelectQuality';
import { useVideoPlayer } from '@/ui/video-player/useVideoPlayer';
import { EnumVideoPlayerQuality } from '@/ui/video-player/video-player.types';

export function VideoPlayer({ fileName }: { fileName: string }) {
  const { state, fn, playerRef } = useVideoPlayer({ fileName });

  return (
    <div className='relative overflow-hidden rounded-lg'>
      <video
        ref={playerRef}
        className='aspect-video h-full w-full'
        controls={false}
        src={`/uploads/videos/${EnumVideoPlayerQuality['1080p']}/${fileName}`}
        preload='metadata'
      />

      <div className='relative flex items-center justify-between p-3'>
        <div className='flex items-center gap-4'>
          <button
            onClick={fn.togglePlayPause}
            className='cursor-pointer transition-colors hover:text-primary'
          >
            {state.isPlaying ? <Pause /> : <Play />}
          </button>

          <PlayerProgressBar progress={state.progress} />

          <div>
            <span>
              {Math.floor(state.videoTime / 60) +
                ':' +
                ('0' + Math.floor(state.videoTime % 60)).slice(-2)}
            </span>
          </div>
        </div>
        <div className='flex items-center gap-5'>
          <SelectQuality
            currentValue={state.quality}
            onChange={fn.changeQuality}
          />

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
