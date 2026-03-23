import type { NextRequest } from 'next/server';

import { PAGE } from '@/config/public-page.config';

import { nextRedirect } from '@/server-actions/proxies/utils/next-redirect';

export const redirectToLogin = (request: NextRequest) => {
  return nextRedirect(PAGE.AUTH, request.url);
};
