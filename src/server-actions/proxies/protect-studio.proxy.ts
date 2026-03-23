import { type NextRequest, NextResponse } from 'next/server';

import { getTokensFromRequest } from '@/server-actions/proxies/utils/get-tokens-from-request';
import { jwtVerifyServer } from '@/server-actions/proxies/utils/jwt-verify';
import { redirectToLogin } from '@/server-actions/proxies/utils/redirect-to-login';

export async function protectStudio(request: NextRequest) {
  const tokens = await getTokensFromRequest(request);
  if (!tokens) return redirectToLogin(request);

  const verifiedData = await jwtVerifyServer(tokens.accessToken);
  if (!verifiedData) return redirectToLogin(request);

  return NextResponse.next();
}
