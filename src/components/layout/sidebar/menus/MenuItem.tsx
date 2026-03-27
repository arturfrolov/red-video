import cn from 'clsx';
import Link from 'next/link';

import type { IMenuItemProps } from '@/components/layout/sidebar/menus/menu.types';

export function MenuItem({ item, isActive, isShowedSidebar }: IMenuItemProps) {
  return (
    <li>
      <Link
        href={item.link}
        className='group flex items-center gap-5 py-2'
      >
        <item.icon
          className={cn('shrink-0', {
            'transition group-hover:rotate-6 group-hover:text-primary': !isActive,
            'text-red-400': isActive && !isShowedSidebar,
          })}
        />
        <span
          className={cn('border-b', {
            'border-white': isActive,
            'border-transparent': !isActive,
          })}
        >
          {item.label}
        </span>
      </Link>
      {item.isBottomBorder && <span className='my-5 block h-px w-full bg-border'></span>}
    </li>
  );
}
