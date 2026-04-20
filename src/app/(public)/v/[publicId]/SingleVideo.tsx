'use client';

import cn from 'clsx';
import { useState } from 'react';

import { Heading } from '@/ui/heading/Heading';
import { VideoPlayer } from '@/ui/video-player/VideoPlayer';

import { SimilarVideos } from '@/app/(public)/v/[publicId]/SimilarVideos';
import { Comments } from '@/app/(public)/v/[publicId]/comments/Comments';
import { VideoDescription } from '@/app/(public)/v/[publicId]/description/VideoDescription';
import { VideoActions } from '@/app/(public)/v/[publicId]/video-actions/VideoActions';
import { VideoChannel } from '@/app/(public)/v/[publicId]/video-channel/VideoChannel';
import type { ISingleVideoResponse } from '@/types/video.types';

interface Props {
  video: ISingleVideoResponse;
}

export function SingleVideo({ video }: Props) {
  const [isTheaterMode, setIsTheaterMode] = useState(false);
  const hasSimilarVideos = video.similarVideos.length > 0;

  const toggleTheaterMode = () => setIsTheaterMode((prev) => !prev);
  const isTheaterWithSidebar = isTheaterMode && hasSimilarVideos;

  return (
    <section
      className={cn('flex flex-col gap-5 xl:gap-16', {
        'xl:flex-row xl:items-start': hasSimilarVideos && !isTheaterMode,
        'xl:flex-row xl:flex-wrap xl:items-start': isTheaterWithSidebar,
      })}
    >
      <div
        className={cn('flex min-w-0 flex-col gap-3 sm:gap-4', {
          'xl:flex-1': !isTheaterWithSidebar,
          'xl:contents': isTheaterWithSidebar,
        })}
      >
        <div
          className={cn('min-w-0', {
            'xl:basis-full': isTheaterWithSidebar,
          })}
        >
          <VideoPlayer
            mediaClassName={cn({
              'mx-auto w-full xl:max-w-[min(100%,calc((100dvh-8rem)*16/9))]': isTheaterMode,
            })}
            fileName={video.videoFileName}
            isTheaterMode={isTheaterMode}
            toggleTheaterMode={toggleTheaterMode}
            maxResolution={video.maxResolution}
          />
        </div>

        <div
          className={cn('min-w-0', {
            'xl:flex-1 xl:basis-0': isTheaterWithSidebar,
          })}
        >
          <VideoDetails video={video} />
        </div>
      </div>

      {hasSimilarVideos && (
        <aside className='w-full xl:w-[clamp(20rem,24vw,26rem)] xl:shrink-0'>
          <div className={cn({ 'xl:sticky xl:top-6': !isTheaterMode })}>
            <SimilarVideos videos={video.similarVideos} />
          </div>
        </aside>
      )}
    </section>
  );
}

function VideoDetails({ video }: Props) {
  return (
    <div>
      <div
        className='mb-6 flex flex-col gap-4 border-b border-border pb-6 md:flex-row md:items-start
          md:justify-between'
      >
        <div className='min-w-0'>
          <Heading
            className='mb-1 leading-tight'
            classNameHeading='text-xl'
          >
            {video.title}
          </Heading>
          <div className='text-gray-400'>{video.viewsCount.toLocaleString('en-US')} views</div>
        </div>

        <VideoActions video={video} />
      </div>

      <VideoChannel video={video} />
      <VideoDescription description={video.description} />
      <Comments video={video} />
    </div>
  );
}
