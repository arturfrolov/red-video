import { useMutation } from '@tanstack/react-query';
import cn from 'clsx';
import { LogOut } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

import { PAGE } from '@/config/public-page.config';
import { STUDIO_PAGE } from '@/config/studio-page.config';

import { authService } from '@/services/auth.service';
import { useTypedSelector } from '@/store';

interface Props {
  isShowedSidebar: boolean;
  onItemClick?: () => void;
}

export function Logout({ isShowedSidebar, onItemClick }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const { mutate, isPending } = useMutation({
    mutationKey: ['logout'],
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      if (pathname.includes(STUDIO_PAGE.HOME) || pathname.includes(STUDIO_PAGE.SETTINGS)) {
        router.push(PAGE.HOME);
      }
    },
  });

  const { isLoggedIn } = useTypedSelector((state) => state.auth);

  if (!isLoggedIn) return null;

  return (
    <button
      type='button'
      onClick={() => {
        onItemClick?.();
        mutate();
      }}
      className={cn(
        'group flex min-h-10 cursor-pointer items-center rounded-md py-2 transition-colors hover:text-primary',
        'gap-5',
        !isShowedSidebar && 'lg:justify-center lg:gap-0'
      )}
      title='Logout'
    >
      <LogOut className={'shrink-0 transition group-hover:rotate-6 group-hover:text-primary'} />
      <span className={cn({ 'lg:hidden': !isShowedSidebar })}>
        {isPending ? 'Please wait...' : 'Logout'}
      </span>
    </button>
  );
}
