import { Heart, ListPlus } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { SubscribeButtonClient } from '@/components/SubscribeButtonClient';

import { Heading } from '@/ui/heading/Heading';
import { VerifiedBadge } from '@/ui/verified-badge/VerifiedBadge';

import { PAGE } from '@/config/public-page.config';

import { stripHtml } from '@/utils/strip-html';
import { transformCount } from '@/utils/transform-count';

import { SimilarVideos } from '@/app/(public)/v/[publicId]/SimilarVideos';
import { VideoDescription } from '@/app/(public)/v/[publicId]/description/VideoDescription';
import { videoService } from '@/services/video.service';
import type { TPagePublicIdProp } from '@/types/page.types';

export const revalidate = 100;

export async function generateMetadata({ params }: TPagePublicIdProp): Promise<Metadata> {
  const { publicId } = await params;
  const data = await videoService.byPublicId(publicId);
  const video = data.data;

  return {
    title: video.title,
    description: stripHtml(video.description).slice(0, 150),
    openGraph: {
      type: 'video.other',
      images: [video.thumbnailUrl],
    },
  };
}

export async function generateStaticParams() {
  const videos = await videoService.getAll();
  return videos.map((video) => ({
    publicId: video.publicId,
  }));
}

export default async function VideoPage({ params }: TPagePublicIdProp) {
  const { publicId } = await params;
  const data = await videoService.byPublicId(publicId);
  const video = data.data;

  return (
    <section className='grid grid-cols-[2.7fr_1fr] gap-10'>
      <div>
        <div className='relative mb-6 h-[249px] w-full overflow-hidden rounded-2xl shadow-md'>
          {/* VIDEO */}
        </div>
        <div className='mb-6 flex items-start justify-between border-b border-border pb-6'>
          <div>
            <Heading
              classNameHeading='text-xl'
              className='mb-1 leading-none'
            >
              {video.title}
            </Heading>
            <div className='text-gray-400'>{video.viewsCount.toLocaleString('en-US')} views</div>
          </div>
          <div className='flex items-center gap-7'>
            <button
              className='flex cursor-pointer items-center gap-1 opacity-80 transition-opacity
                hover:opacity-100'
            >
              <ListPlus size={20} />
              Save
            </button>
            <button
              className='flex cursor-pointer items-center gap-1.5 text-primary opacity-80
                transition-opacity hover:opacity-100'
            >
              <Heart size={20} />
              {transformCount(video.likes.length)}
            </button>
          </div>
        </div>
        <div className='mb-6 flex items-center justify-between'>
          <div className='flex items-center gap-2.5'>
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
            <div>
              <Link href={PAGE.CHANNEL(video.channel.slug)}>
                <Heading
                  className='mb-0'
                  classNameHeading='text-lg'
                >
                  <span className='flex items-center gap-2'>
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
        <VideoDescription description={video.description} />
      </div>
      {!!video.similarVideos.length && <SimilarVideos videos={video.similarVideos} />}
    </section>
  );
}
