import { UploadCloud } from 'lucide-react';
import { useId } from 'react';
import type { FieldError } from 'react-hook-form';

import { ImagePreview } from '@/ui/upload-field/ImagePreview';

import { useUpload } from './hooks/useUpload';

interface Props {
  folder?: string;
  value?: string;
  onChange: (url: string) => void;
  label: string;
  error?: FieldError;
  className?: string;
  isImage?: boolean;
  overlay?: string;
  sizePreview?: [number, number];
}

export function UploadField({
  label,
  onChange,
  className,
  error,
  folder,
  isImage = true,
  value,
  overlay,
  sizePreview,
}: Props) {
  const { isLoading, uploadFile } = useUpload({ onChange, folder });
  const inputId = useId();

  return (
    <div className={className}>
      <label
        htmlFor={inputId}
        className='mb-2 block font-semibold text-gray-400'
      >
        {label}
      </label>
      <label
        htmlFor={inputId}
        className='flex w-max cursor-pointer items-center rounded-lg border border-primary
          bg-transparent px-4 py-2 text-primary shadow-md transition-colors hover:bg-primary
          hover:text-white'
      >
        <UploadCloud className='mr-2' />
        Загрузить
      </label>

      <input
        id={inputId}
        type='file'
        accept='image/*'
        onChange={uploadFile}
        className='hidden'
      />
      {error && <p className='mt-1 text-sm text-red-500'>{error.message}</p>}

      {isImage && (
        <ImagePreview
          isLoading={isLoading}
          value={value}
          overlay={overlay}
          sizePreview={sizePreview}
        />
      )}
    </div>
  );
}
