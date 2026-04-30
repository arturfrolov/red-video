import { SkeletonLoader } from '@/ui/skeleton-loader/SkeletonLoader';

export function UploadSkeleton() {
  return (
    <>
      <div>
        <SkeletonLoader
          count={1}
          className='h-[74] bg-gray-700'
        />
        <SkeletonLoader
          count={1}
          className='h-[224] bg-gray-700'
        />
        <SkeletonLoader
          count={1}
          className='bg-gray-700'
        />
        <SkeletonLoader
          count={1}
          className='h-[85] bg-gray-700'
        />
        <SkeletonLoader
          count={1}
          className='h-[114] bg-gray-700'
        />
      </div>
      <div>
        <SkeletonLoader
          count={1}
          className='h-[140] bg-gray-700'
        />
        <SkeletonLoader
          count={2}
          className='bg-gray-700'
        />
      </div>
    </>
  );
}
