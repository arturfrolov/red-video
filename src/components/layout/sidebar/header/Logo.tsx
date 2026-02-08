import { SquarePlay } from 'lucide-react';
import Link from 'next/link';

import { PAGE } from '@/config/public-page.cofig';

export function Logo() {
  return (
    <Link
      href={PAGE.HOME}
      className='inline-flex items-center gap-1.5'
    >
      <SquarePlay
        className='text-primary'
        size={29}
      />
      <span className='font-medium text-xl'>RED video</span>
    </Link>
  );
}
