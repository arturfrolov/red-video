import Image from 'next/image';
import Link from 'next/link';

import { SubscribeButtonClient } from '@/components/SubscribeButtonClient';

import { Heading } from '@/ui/heading/Heading';
import { VerifiedBadge } from '@/ui/verified-badge/VerifiedBadge';

import { PAGE } from '@/config/public-page.config';

import { transformCount } from '@/utils/transform-count';

import type { ISingleVideoResponse } from '@/types/video.types';

export function VideoChannel({ video }: { video: ISingleVideoResponse }) {
  return (
    <div className='mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
      <div className='flex min-w-0 items-center gap-2.5'>
        <Link href={PAGE.CHANNEL(video.channel.slug)}>
          <Image
            src={video.channel.avatarUrl}
            alt={video.channel.user.name || 'Avatar'}
            width={55}
            height={55}
            priority
            className='shrink-0 rounded shadow-md'
          />
        </Link>
        <div className='min-w-0'>
          <Link href={PAGE.CHANNEL(video.channel.slug)}>
            <Heading
              className='mb-0'
              classNameHeading='text-lg'
            >
              <span className='flex items-center gap-2 truncate'>
                {video.channel.user.name}
                {video.channel.isVerified && <VerifiedBadge size={14} />}
              </span>
            </Heading>
          </Link>
          <div className='flex items-center gap-1 text-sm text-gray-400'>
            {transformCount(video.channel.subscribers.length)} subscribers
          </div>
        </div>
      </div>
      <SubscribeButtonClient slug={video.channel.slug} />
    </div>
  );
}
