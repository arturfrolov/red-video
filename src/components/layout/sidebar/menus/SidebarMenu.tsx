'use client';

import { usePathname } from 'next/navigation';
import { match } from 'path-to-regexp';

import { MenuItem } from '@/components/layout/sidebar/menus/MenuItem';
import { MyChannelMenuItem } from '@/components/layout/sidebar/menus/MyChannelMenuItem';
import type { ISidebarItem } from '@/components/layout/sidebar/sidebar.types';

import { PAGE } from '@/config/public-page.config';

import { useTypedSelector } from '@/store';

interface Props {
  title?: string;
  menu: ISidebarItem[];
  isShowedSidebar: boolean;
}

export function SidebarMenu({ menu, title, isShowedSidebar }: Props) {
  const pathname = usePathname();
  const { isLoggedIn } = useTypedSelector((state) => state.auth);

  return (
    <nav>
      {title && <div className='mb-3 text-xs font-medium uppercase opacity-40'>{title}</div>}
      <ul>
        {menu.map((menuItem) => {
          //item.link === PAGE.MY_CHANNEL ? myChannelLink : item.link

          const props = {
            item: menuItem,
            isActive: !!match(menuItem.link)(pathname),
            isShowedSidebar,
          };

          const isMyChannel = menuItem.link === PAGE.MY_CHANNEL;
          const isMyChannelItem = isMyChannel && isLoggedIn;

          return isMyChannelItem ? (
            <MyChannelMenuItem
              key={menuItem.link}
              {...props}
            />
          ) : isMyChannel ? null : (
            <MenuItem
              key={menuItem.link}
              {...props}
            />
          );
        })}
      </ul>
    </nav>
  );
}
