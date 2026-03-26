import Image from 'next/image';

import { SkeletonLoader } from '@/ui/skeleton-loader/SkeletonLoader';

interface Props {
  isLoading: boolean;
  value?: string;
  overlay?: string;
  aspectRatio?: '16:9' | '1:1';
}
export function ImagePreview({ isLoading, value, overlay, aspectRatio }: Props) {
  const isWidescreenRatio = aspectRatio === '16:9';
  const width = isWidescreenRatio ? 446 : 100;
  const height = isWidescreenRatio ? 250 : 100;

  return (
    <div className='mt-3'>
      {isLoading ? (
        <SkeletonLoader style={{ width, height }} />
      ) : (
        !!value && (
          <div className='relative'>
            {!!overlay && (
              <Image
                src={overlay}
                alt='Overlay'
                className='absolute inset-0 top-0 left-0 h-full rounded-md'
                width={width}
                height={height}
                priority
              />
            )}
            <Image
              src={value}
              alt='Uploaded image'
              className='rounded-md'
              width={width}
              height={height}
              priority
            />
          </div>
        )
      )}
    </div>
  );
}
