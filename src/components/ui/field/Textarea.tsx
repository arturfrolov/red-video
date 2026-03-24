import cn from 'clsx';
import type { TextareaHTMLAttributes } from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  registration: UseFormRegisterReturn;
}

export function Textarea({ label, error, registration, ...props }: Props) {
  return (
    <div className='mb-4'>
      <label>
        <span className='mb-2 block font-semibold text-gray-400'>{label}</span>
        <textarea
          className={cn(
            'duration-333ms w-full resize-none rounded border bg-transparent px-3 py-2 shadow-sm transition-[border-color] focus:border-gray-500 focus:ring-0 focus:outline-none',
            error ? 'border-red-500' : 'border-border'
          )}
          {...props}
          {...registration}
        />
      </label>
      {error && <p className='mt-1 text-sm text-red-500'>{error}</p>}
    </div>
  );
}
