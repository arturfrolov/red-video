import Image from 'next/image';
import Link from 'next/link';

import { STUDIO_PAGE } from '@/config/studio-page.cofig';

export function HeaderProfile() {
  return (
    <Link
      href={STUDIO_PAGE.SETTINGS}
      className='shrink-0'
    >
      <Image
        src='/uploads/avatars/redgroup.jpg'
        alt='avatar'
        width={40}
        height={40}
        className='rounded-lg'
      />
    </Link>
  );
}
