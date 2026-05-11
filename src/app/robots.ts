import type { MetadataRoute } from 'next';

import { SITE_URL } from '@/constants/constants';

const isProduction = process.env.NODE_ENV === 'production';

export default function robots(): MetadataRoute.Robots {
  if (!isProduction) {
    return {
      rules: {
        userAgent: '*',
        disallow: '/',
      },
    };
  }

  return {
    rules: {
      userAgent: '*',
      disallow: [
        '/auth',
        '/recover',
        '*?',
        '/docs/*',
        '*utm_',
        '*?query=',
        '/media/*?PAGEN_1=',
        '*?keyword=',
        '*?sub',
      ],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
