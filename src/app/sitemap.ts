import type { MetadataRoute } from 'next';

import { SITE_URL } from '@/constants/constants';

import { PAGE } from '@/config/public-page.config';

import { videoService } from '@/services/video.service';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { data } = await videoService.getAll();

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },

    ...data.videos.map((video) => ({
      url: `${SITE_URL}${PAGE.VIDEO(video.publicId)}`,
      lastModified: new Date(video.updatedAt),
      changeFrequency: 'daily' as const,
      priority: 1,
    })),
  ];
}
