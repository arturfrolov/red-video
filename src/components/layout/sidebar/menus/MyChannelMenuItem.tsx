'use client';

import { MenuItem } from '@/components/layout/sidebar/menus/MenuItem';
import type { IMenuItemProps } from '@/components/layout/sidebar/menus/menu.types';

import { PAGE } from '@/config/public-page.config';

import { useProfile } from '@/hooks/useProfile';

export function MyChannelMenuItem({ item, ...props }: IMenuItemProps) {
  const { profile } = useProfile();

  const myChannelLink = profile?.channel?.slug ? PAGE.CHANNEL(profile.channel.slug) : null;

  if (!myChannelLink) return null;

  return (
    <MenuItem
      item={{ ...item, link: myChannelLink }}
      {...props}
    />
  );
}
