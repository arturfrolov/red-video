import * as m from 'motion/react-m';
import Image from 'next/image';
import Link from 'next/link';

import { VideoChannelName } from '@/ui/video-item/VideoChannelName';
import { VideoItemTitle } from '@/ui/video-item/VideoItemTitle';

import { PAGE } from '@/config/public-page.config';

import { transformCount } from '@/utils/transform-count';
import { transformDate } from '@/utils/transform-date';

import type { IVideo } from '@/types/video.types';

interface Props {
  video: IVideo;
}

export function HorizontalVideoItem({ video }: Props) {
  return (
    <m.div
      style={{ willChange: 'transform' }}
      whileHover={{
        y: -5,
      }}
      transition={{
        type: 'spring',
        stiffness: 500,
        damping: 30,
      }}
    >
      <div className='mb-6 flex items-stretch gap-4'>
        <Link
          href={PAGE.VIDEO(video.publicId)}
          className='relative block aspect-video shrink-0 overflow-hidden rounded-md'
        >
          <Image
            src={video.thumbnailUrl}
            width={206}
            height={116}
            alt={video.title}
            className='object-cover'
          />
        </Link>

        <div className='flex flex-col justify-between'>
          <div>
            <div className='mb-1 text-lg'>
              <VideoItemTitle video={video} />
            </div>

            <div className='mb-1'>
              <VideoChannelName
                channel={video.channel}
                spanClassName='text-base mr-0.5'
              />
            </div>
          </div>

          <div className='flex items-center gap-2 pb-1'>
            <span className='text-lg text-gray-400'>{transformCount(video.viewsCount)} views</span>
            <span>•</span>
            <span className='text-gray-400'>{transformDate(video.createdAt)}</span>
          </div>
        </div>
      </div>
    </m.div>
  );
}
