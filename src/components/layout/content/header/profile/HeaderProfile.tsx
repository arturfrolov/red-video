import { LogIn } from 'lucide-react';

import { HeaderAvatar } from '@/components/layout/content/header/profile/HeaderAvatar';

import { LinkButton } from '@/ui/button/LinkButton';

import { PAGE } from '@/config/public-page.config';

import { useTypedSelector } from '@/store';

export function HeaderProfile() {
  const { isLoggedIn } = useTypedSelector((state) => state.auth);

  return isLoggedIn ? (
    <HeaderAvatar />
  ) : (
    <LinkButton href={PAGE.AUTH}>
      <LogIn size={20} />
      Auth
    </LinkButton>
  );
}
