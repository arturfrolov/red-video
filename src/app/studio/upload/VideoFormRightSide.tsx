import Image from 'next/image';
import type { UseFormWatch } from 'react-hook-form';

import type { IVideoFormData } from '@/types/studio-video.types';

interface Props {
  watch: UseFormWatch<IVideoFormData>;
}

export function VideoFormRightSide({ watch }: Props) {
  return (
    <div>
      <div className='overflow-hidden rounded-md bg-gray-700'>
        <div className='relative aspect-video'>
          {watch('thumbnailUrl') ? (
            <Image
              src={watch('thumbnailUrl')}
              alt='Uploaded thumbnail'
              fill
              className='object-cover'
              sizes={'(max-width: 768px) 100vw, 25vw'}
            />
          ) : (
            <div className='flex h-full items-center justify-center bg-gray-900 text-sm font-medium'>
              Wait thumbnail...
            </div>
          )}
        </div>

        <div className='p-2 text-sm'>
          <span className='mb-0.5 block text-[0.9rem] text-gray-400'>File name:</span>
          <span>{watch('videoFileName')}</span>
        </div>
      </div>
    </div>
  );
}
