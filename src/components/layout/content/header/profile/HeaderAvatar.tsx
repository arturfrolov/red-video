import Image from 'next/image';
import Link from 'next/link';

import { SkeletonLoader } from '@/ui/skeleton-loader/SkeletonLoader';

import { STUDIO_PAGE } from '@/config/studio-page.config';

import { useProfile } from '@/hooks/useProfile';

export function HeaderAvatar() {
  const { profile, isLoading } = useProfile();

  if (isLoading) return <SkeletonLoader className='mb-0 w-10 rounded-md' />;

  return (
    <div className='relative'>
      <Link
        href={STUDIO_PAGE.SETTINGS}
        className='shrink-0'
        aria-label='Open settings'
      >
        <Image
          src={profile?.channel?.avatarUrl || '/images/avatar.png'}
          alt='avatar'
          width={40}
          height={40}
          className='rounded-lg'
        />
      </Link>
      {profile?.verificationToken && (
        <div className='absolute -bottom-3.5 -left-4 w-max rounded bg-primary p-0.5 text-xs'>
          Not verified!
        </div>
      )}
    </div>
  );
}
