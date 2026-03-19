import { useMutation } from '@tanstack/react-query';
import { LogOut } from 'lucide-react';

import { authService } from '@/services/auth.service';
import { useTypedSelector } from '@/store';

export function Logout() {
  const { mutate, isPending } = useMutation({
    mutationKey: ['logout'],
    mutationFn: () => authService.logout(),
  });

  const { isLoggedIn } = useTypedSelector((state) => state.auth);

  if (!isLoggedIn) return null;

  return (
    <button
      onClick={() => mutate()}
      className='group cursor-pointer py-2 flex items-center gap-5'
    >
      <LogOut className={'shrink-0 group-hover:text-primary group-hover:rotate-6 transition'} />
      <span>{isPending ? 'Please wait...' : 'Logout'}</span>
    </button>
  );
}
