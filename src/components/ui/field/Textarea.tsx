import cn from 'clsx';
import { type TextareaHTMLAttributes, useId } from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  registration?: UseFormRegisterReturn;
  wrapperClassName?: string;
}

export function Textarea({ label, error, registration, wrapperClassName, ...props }: Props) {
  const id = useId();

  return (
    <div className={twMerge('mb-4', wrapperClassName)}>
      {label && (
        <label htmlFor={id}>
          <span className='mb-2 block font-semibold text-gray-400'>{label}</span>
        </label>
      )}
      <textarea
        id={id}
        className={cn(
          `duration-333ms w-full resize-none rounded border bg-transparent px-3 py-2 shadow-sm
          transition-[border-color] focus:border-gray-500 focus:ring-0 focus:outline-none`,
          error ? 'border-red-500' : 'border-border'
        )}
        {...props}
        {...registration}
      />

      {error && <p className='mt-1 text-sm text-red-500'>{error}</p>}
    </div>
  );
}
