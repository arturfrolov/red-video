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

import { PAGE } from '@/config/public-page.cofig';

export const SIDEBAR_DATA: ISidebarItem[] = [
  {
    icon: Compass,
    label: 'Explore',
    link: PAGE.HOME,
  },
  {
    icon: Flame,
    label: 'Trending',
    link: PAGE.TRENDING,
  },
  {
    icon: Gamepad2,
    label: 'Video games',
    link: PAGE.VIDEO_GAMES,
    isBottomBorder: true,
  },
  {
    icon: TvMinimalPlay,
    label: 'My channel',
    link: PAGE.MY_CHANNEL,
  },
  {
    icon: CirclePlay,
    label: 'Subscriptions',
    link: PAGE.SUBSCRIPTIONS,
  },
  {
    icon: History,
    label: 'History',
    link: PAGE.HISTORY,
  },
  {
    icon: FolderHeart,
    label: 'Linked videos',
    link: PAGE.LINKED_VIDEOS,
    isBottomBorder: true,
  },
];

export const MORE_SIDEBAR_DATA: ISidebarItem[] = [
  {
    icon: Settings,
    label: 'Settings',
    link: PAGE.SETTINGS,
  },
  {
    icon: CircleAlert,
    label: 'Send feedback',
    link: PAGE.FEEDBACK,
  },
];
