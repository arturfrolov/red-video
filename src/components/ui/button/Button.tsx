import cn from 'clsx';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  children: ReactNode;
  variant?: 'primary' | 'secondary';
}

export function Button({ children, isLoading, variant = 'primary', ...props }: Props) {
  return (
    <button
      className={cn(
        'cursor-pointer rounded px-10 py-2 font-semibold transition-colors disabled:bg-gray-400',
        {
          'bg-primary text-white hover:bg-red-400': variant === 'primary',
          'bg-gray-600 text-white hover:bg-gray-500': variant === 'secondary',
        }
      )}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? 'Loading...' : children}
    </button>
  );
}
