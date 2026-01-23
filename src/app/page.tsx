import { Flame } from 'lucide-react';
import type { Metadata } from 'next';

import { Heading } from '@/ui/heading/Heading';
import { VideoItem } from '@/ui/video-item/VideoItem';

import { PAGE } from '@/config/public-page.cofig';

import { Explore } from '@/app/explore/Explore';
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

  return (
    <section>
      <section>
        <Heading Icon={Flame}>Trending</Heading>
        <div className='grid grid-cols-6 gap-6'>
          {data?.length &&
            data.map((video) => (
              <VideoItem
                key={video.id}
                video={video}
                Icon={Flame}
              />
            ))}
        </div>
      </section>
      <Explore />
    </section>
  );
}
