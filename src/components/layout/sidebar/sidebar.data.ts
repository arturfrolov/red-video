import {
  CircleAlert,
  CirclePlay,
  Compass,
  Flame,
  FolderHeart,
  Gamepad2,
  History,
  Settings,
  TvMinimalPlay,
} from 'lucide-react';

import type { ISidebarItem } from '@/components/layout/sidebar/sidebar.types';

import { PUBLIC_PAGE } from '@/config/public-page.cofig';

export const SIDEBAR_DATA: ISidebarItem[] = [
  {
    icon: Compass,
    label: 'Explore',
    link: PUBLIC_PAGE.HOME,
  },
  {
    icon: Flame,
    label: 'Trending',
    link: PUBLIC_PAGE.TRENDING,
  },
  {
    icon: Gamepad2,
    label: 'Video games',
    link: PUBLIC_PAGE.VIDEO_GAMES,
    isBottomBorder: true,
  },
  {
    icon: TvMinimalPlay,
    label: 'My channel',
    link: PUBLIC_PAGE.MY_CHANNEL,
  },
  {
    icon: CirclePlay,
    label: 'Subscriptions',
    link: PUBLIC_PAGE.SUBSCRIPTIONS,
  },
  {
    icon: History,
    label: 'History',
    link: PUBLIC_PAGE.HISTORY,
  },
  {
    icon: FolderHeart,
    label: 'Linked videos',
    link: PUBLIC_PAGE.LINKED_VIDEOS,
    isBottomBorder: true,
  },
];

export const MORE_SIDEBAR_DATA: ISidebarItem[] = [
  {
    icon: Settings,
    label: 'Settings',
    link: PUBLIC_PAGE.SETTINGS,
  },
  {
    icon: CircleAlert,
    label: 'Send feedback',
    link: PUBLIC_PAGE.FEEDBACK,
  },
];
