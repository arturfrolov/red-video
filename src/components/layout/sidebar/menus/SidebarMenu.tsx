import { usePathname } from 'next/navigation';
import { match } from 'path-to-regexp';

import { MenuItem } from '@/components/layout/sidebar/menus/MenuItem';
import type { ISidebarItem } from '@/components/layout/sidebar/sidebar.types';

interface Props {
  title?: string;
  menu: ISidebarItem[];
  isShowedSidebar: boolean;
}

export function SidebarMenu({ menu, title, isShowedSidebar }: Props) {
  const pathname = usePathname();

  return (
    <nav>
      {title && <div className='opacity-40 uppercase font-medium text-xs mb-3'>{title}</div>}
      <ul>
        {menu.map((menuItem) => (
          <MenuItem
            key={menuItem.link}
            item={menuItem}
            isActive={!!match(menuItem.link)(pathname)}
            isShowedSidebar={isShowedSidebar}
          />
        ))}
      </ul>
    </nav>
  );
}
