import cn from 'clsx';
import Link from 'next/link';

import type { IMenuItemProps } from '@/components/layout/sidebar/menus/menu.types';

export function MenuItem({ item, isActive, isShowedSidebar, onItemClick }: IMenuItemProps) {
  return (
    <li>
      <Link
        href={item.link}
        className={cn(
          'group flex min-h-10 items-center rounded-md py-2 transition-colors hover:text-primary',
          'gap-5',
          !isShowedSidebar && 'lg:justify-center lg:gap-0',
          isActive && 'text-white'
        )}
        title={item.label}
        onClick={onItemClick}
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
            'lg:hidden': !isShowedSidebar,
          })}
        >
          {item.label}
        </span>
      </Link>
      {item.isBottomBorder && <span className='my-5 block h-px w-full bg-border'></span>}
    </li>
  );
}
