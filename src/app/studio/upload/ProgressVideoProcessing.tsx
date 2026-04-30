'use client';

import { useQuery } from '@tanstack/react-query';
import { type Dispatch, type SetStateAction, useEffect } from 'react';
import toast from 'react-hot-toast';

import { fileService } from '@/services/studio/file.service';

interface Props {
  fileName: string;
  isReadyToPublish: boolean;
  setIsReadyToPublish: Dispatch<SetStateAction<boolean>>;
}

export function ProgressVideoProcessing({
  fileName,
  isReadyToPublish,
  setIsReadyToPublish,
}: Props) {
  const { data: progress = 0 } = useQuery({
    queryKey: ['processing-video', fileName],
    queryFn: () => fileService.getProcessingStatus(fileName),
    select(data) {
      return data?.data?.status;
    },
    refetchInterval(query) {
      const queryProgress = query.state.data?.data;
      return queryProgress !== undefined && queryProgress.status < 100 ? 4000 : false;
    },
    enabled: !!fileName && !isReadyToPublish,
  });

  useEffect(() => {
    if (progress !== 100) return;

    setIsReadyToPublish(true);
    toast.success('Video processed successfully!', {
      id: `video-processing-completed-${fileName}`,
    });
  }, [fileName, progress, setIsReadyToPublish]);

  return (
    progress > 0 && (
      <div
        className='relative mb-6 flex w-full items-center justify-center overflow-hidden rounded-md
          py-0.5 text-sm font-medium'
        style={{
          backgroundColor: 'rgb(196 196 196 / 12%)',
        }}
      >
        <div
          className='absolute inset-0 h-full animate-pulse bg-linear-to-r from-gray-500 to-gray-600
            transition-all'
          style={{
            width: progress ? `${progress}%` : '0%',
          }}
        />
        <span className='relative'>Processing video {Math.round(progress)}%</span>
      </div>
    )
  );
}
