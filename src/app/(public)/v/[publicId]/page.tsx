import parse from 'html-react-parser';
import { Heart, ListPlus } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';

import { SubscribeButtonClient } from '@/components/SubscribeButtonClient';

import { Heading } from '@/ui/heading/Heading';
import { VerifiedBadge } from '@/ui/verified-badge/VerifiedBadge';

import { transformCount } from '@/utils/transform-count';

import { SimilarVideos } from '@/app/(public)/v/[publicId]/SimilarVideos';
import { videoService } from '@/services/video.service';
import type { TPagePublicIdProp } from '@/types/page.types';

export const revalidate = 100;

export async function generateMetadata({ params }: TPagePublicIdProp): Promise<Metadata> {
  const { publicId } = await params;
  const data = await videoService.byPublicId(publicId);
  const video = data.data;

  return {
    title: video.title,
    description: parse(video.description.slice(0, 150)).toString(),
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
        <div className='relative h-[249px] w-full overflow-hidden rounded-2xl shadow-md'>
          {/* VIDEO */}
        </div>
        <div className='flex items-start justify-between'>
          <div>
            <Heading
              isPageHeading
              className='mb-1 leading-none'
            >
              {video.title}
            </Heading>
            <div className='text-gray-400'>{video.viewsCount.toLocaleString('en-US')} views</div>
          </div>
          <div>
            <button>
              <ListPlus />
              Save
            </button>
            <button className='text-primary'>
              <Heart />
              {transformCount(video.likes.length)}
            </button>
          </div>
        </div>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-1.5'>
            <Image
              src={video.channel.avatarUrl}
              alt={video.channel.user.name || 'Avatar'}
              width={40}
              height={40}
              priority
              className='shrink-0 rounded shadow-md'
            />
            <div>
              <Heading isPageHeading>
                <span className='flex items-center gap-2'>
                  {video.channel.user.name}
                  {video.channel.isVerified && <VerifiedBadge size={18} />}
                </span>
              </Heading>
              <div className='mb-2 flex items-center gap-1 text-[0.9rem] text-gray-400'>
                {transformCount(video.channel.subscribers.length)} subscribers
              </div>
            </div>
          </div>
          <SubscribeButtonClient slug={video.channel.slug} />
        </div>
        <article className='mb-4 w-3/4 text-sm leading-snug text-gray-400'>
          {parse(video.description)}
        </article>
      </div>
      {!!video.similarVideos.length && <SimilarVideos videos={video.similarVideos} />}
    </section>
  );
}
