import { MenuItem } from '@/components/layout/sidebar/menus/MenuItem';
import type { ISidebarItem } from '@/components/layout/sidebar/sidebar.types';

interface Props {
  title?: string;
  menu: ISidebarItem[];
}

export function SidebarMenu({ menu, title }: Props) {
  return (
    <nav>
      {title && <div className='opacity-40 uppercase font-medium text-xs mb-3'>{title}</div>}
      <ul>
        {menu.map((menuItem) => (
          <MenuItem
            key={menuItem.link}
            item={menuItem}
          />
        ))}
      </ul>
    </nav>
  );
}
