import { Flame } from 'lucide-react';
import type { Metadata } from 'next';

import { Heading } from '@/ui/heading/Heading';
import { VideoItem } from '@/ui/video-item/VideoItem';

import { PAGE } from '@/config/public-page.config';

import { Explore } from '@/app/(public)/explore/Explore';
import { videoService } from '@/services/video.service';

export const revalidate = 100;

export const metadata: Metadata = {
  title: 'Home',
  description: 'Home page',
  alternates: {
    canonical: PAGE.HOME,
  },
  openGraph: {
    type: 'website',
    url: PAGE.HOME,
    title: 'Red Video',
  },
};

export default async function Home() {
  const data = await videoService.getTrendingVideos();
  const trendingVideos = data?.data.slice(0, 6);

  return (
    <section>
      {!!trendingVideos.length && (
        <section className='mb-10'>
          <Heading Icon={Flame}>Trending</Heading>
          <div className='grid-6-cols'>
            {trendingVideos.map((video) => (
              <VideoItem
                key={video.id}
                video={video}
                Icon={Flame}
                isImagePriority
              />
            ))}
          </div>
        </section>
      )}
      <Explore />
    </section>
  );
}
