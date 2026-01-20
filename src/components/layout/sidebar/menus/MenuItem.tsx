import cn from 'clsx';
import Link from 'next/link';

import type { ISidebarItem } from '@/components/layout/sidebar/sidebar.types';

interface Props {
  item: ISidebarItem;
  isActive: boolean;
}

export function MenuItem({ item, isActive }: Props) {
  return (
    <li>
      <Link
        href={item.link}
        className='group py-2 flex items-center gap-5'
      >
        <item.icon
          className={cn('shrink-0', {
            'group-hover:text-primary group-hover:rotate-6 transition': !isActive,
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
      {item.isBottomBorder && <span className='h-px bg-border my-5 w-full block'></span>}
    </li>
  );
}
