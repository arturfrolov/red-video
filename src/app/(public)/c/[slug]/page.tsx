import type { Metadata } from 'next';
import Image from 'next/image';

import { Button } from '@/ui/button/Button';
import { Heading } from '@/ui/heading/Heading';
import { VerifiedBadge } from '@/ui/verified-badge/VerifiedBadge';

import { transformCount } from '@/utils/transform-count';

import { ChannelVideos } from '@/app/(public)/c/[slug]/ChannelVideos';
import { channelService } from '@/services/channel.service';
import type { TPageSlugProp } from '@/types/page.types';

export const revalidate = 100;

export async function generateMetadata({ params }: TPageSlugProp): Promise<Metadata> {
  const { slug } = await params;
  const data = await channelService.bySlug(slug);
  const channel = data.data;

  return {
    title: channel.user.name,
    description: channel.description,
    openGraph: {
      type: 'profile',
      images: [channel.bannerUrl],
    },
  };
}

export async function generateStaticParams() {
  const { data } = await channelService.getAll();
  return data.map((channel) => ({
    slug: channel.slug,
  }));
}

export default async function ChannelPage({ params }: TPageSlugProp) {
  const { slug } = await params;
  const data = await channelService.bySlug(slug);
  const channel = data.data;

  return (
    <section>
      <div>
        <Image
          src={channel.bannerUrl}
          alt={channel.user.name || 'Channel'}
          width={1284}
          height={207}
          className='rounded-3xl'
        />
        <div className='mt-7 mb-10 flex w-1/2 items-center gap-5'>
          <Image
            src={channel.avatarUrl}
            alt={channel.slug || 'Avatar'}
            width={168}
            height={168}
            className='shrink-0 rounded-xl'
          />
          <div>
            <Heading
              isPageHeading
              className='mb-3 leading-none'
            >
              <span className='flex items-center gap-2'>
                {channel.user.name}
                {channel.isVerified && <VerifiedBadge size={18} />}
              </span>
            </Heading>
            <div className='mb-2 flex items-center gap-1 text-[0.9rem] text-gray-400'>
              <span>@{channel.slug}</span>
              <span>•</span>
              <span>{transformCount(channel.subscribers.length)} subscribers</span>
              <span>•</span>
              <span>{channel.videos.length} videos</span>
            </div>
            <article className='mb-4 w-3/4 text-sm leading-snug text-gray-400'>
              {channel.description}
            </article>
            <Button>Subscribe</Button>
          </div>
        </div>
      </div>
      {!!channel.videos.length && <ChannelVideos videos={channel.videos} />}
    </section>
  );
}
