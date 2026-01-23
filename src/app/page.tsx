import { Flame } from 'lucide-react';

import { VideoItem } from '@/ui/video-item/VideoItem';

import { Explore } from '@/app/explore/Explore';
import { videoService } from '@/services/video.service';

export const revalidate = 100;

export default async function Home() {
  const data = await videoService.getTrendingVideos();

  return (
    <section>
      <section>
        <h2>Trending</h2>
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
