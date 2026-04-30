'use client';

import { useQuery } from '@tanstack/react-query';
import * as m from 'motion/react-m';
import { type Dispatch, type SetStateAction, useEffect } from 'react';
import toast from 'react-hot-toast';

import { fileService } from '@/services/studio/file.service';

interface Props {
  fileName: string;
  setIsReadyToPublish: Dispatch<SetStateAction<boolean>>;
}

export function ProgressVideoProcessing({ fileName, setIsReadyToPublish }: Props) {
  const { data: progress = 0 } = useQuery({
    queryKey: ['processing-video', fileName],
    queryFn: () => fileService.getProcessingStatus(fileName),
    select(data) {
      return data?.data?.status;
    },
    refetchInterval(query) {
      const queryProgress = query.state.data?.data;
      return queryProgress !== undefined && queryProgress.status < 100 ? 5000 : false;
    },
    enabled: !!fileName,
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
      <m.div
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        className='h-2 rounded-xl bg-primary transition-all duration-300'
      />
    )
  );
}
