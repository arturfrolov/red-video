import { Dot, Link, Radio } from 'lucide-react';
import Image from 'next/image';

import type { ISidebarSubItem } from '@/components/layout/sidebar/sidebar.types';

interface Props {
  item: ISidebarSubItem;
}

export function SubItem({ item }: Props) {
  return (
    <li>
      <Link href={item.link}>
        {item.avatar && (
          <Image
            src={item.avatar}
            alt={item.label}
            width={30}
            height={30}
          />
        )}
        <span>
          <span>{item.label}</span>
          {item.isLiveNow && <Radio />}
          {item.isRecentUpload && <Dot />}
        </span>
      </Link>
    </li>
  );
}
