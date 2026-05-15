'use client';

import { useQuery } from '@tanstack/react-query';
import * as m from 'motion/react-m';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Heading } from '@/ui/heading/Heading';

import { CreateVideoForm } from '@/app/studio/upload/CreateVideoForm';
import { DragNDropVideo } from '@/app/studio/upload/DragNDropVideo';
import { ProgressVideoProcessing } from '@/app/studio/upload/ProgressVideoProcessing';
import { studioVideoService } from '@/services/studio/studio-video.service';
import type { IVideoFormData } from '@/types/studio-video.types';

export function UploadVideoMain() {
  const form = useForm<IVideoFormData>({
    mode: 'onChange',
  });

  const fileName = form.watch('videoFileName');

  const [isReadyToPublish, setIsReadyToPublish] = useState(false);

  const { data: draft, isLoading: isDraftLoading } = useQuery({
    queryKey: ['video-draft'],
    queryFn: () => studioVideoService.getDraft(),
  });

  useEffect(() => {
    if (!draft) return;

    form.reset({
      draftId: draft.id,
      videoFileName: draft.fileName,
      maxResolution: draft.maxResolution,
      title: draft.originalName || draft.fileName,
      tags: [],
    });

    setIsReadyToPublish(draft.status === 'READY' || draft.progress >= 100);
  }, [draft, form]);

  return (
    <div className='absolute inset-0 z-50 flex items-center justify-center bg-black/50'>
      <m.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        className='relative w-5/6 max-w-5xl'
      >
        <div className='rounded-lg bg-gray-800 p-6'>
          <Heading
            classNameHeading='text-xl'
            className='border-b border-border pb-5'
          >
            Upload a video
          </Heading>

          {isDraftLoading && (
            <div className='flex h-[30vh] items-center justify-center'>
              <p>Loading...</p>
            </div>
          )}

          {!isDraftLoading && !fileName && <DragNDropVideo reset={form.reset} />}

          <ProgressVideoProcessing
            fileName={fileName}
            setIsReadyToPublish={setIsReadyToPublish}
            isReadyToPublish={isReadyToPublish}
          />

          {!!fileName && (
            <CreateVideoForm
              form={form}
              isReadyToPublish={isReadyToPublish}
              setIsReadyToPublish={setIsReadyToPublish}
            />
          )}
        </div>
      </m.div>
    </div>
  );
}
