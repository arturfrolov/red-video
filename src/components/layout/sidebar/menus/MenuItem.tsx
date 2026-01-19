import Link from 'next/link';

import type { ISidebarItem } from '@/components/layout/sidebar/sidebar.types';

interface Props {
  item: ISidebarItem;
}

export function MenuItem({ item }: Props) {
  return (
    <li>
      <Link
        href={item.link}
        className='group py-2 flex items-center gap-5'
      >
        <item.icon className='shrink-0 group-hover:text-primary group-hover:rotate-6 transition' />
        <span>{item.label}</span>
      </Link>
      {item.isBottomBorder && <span className='h-px bg-border my-5 w-full block'></span>}
    </li>
  );
}
