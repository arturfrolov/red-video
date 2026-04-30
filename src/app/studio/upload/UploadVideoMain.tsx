'use client';

import * as m from 'motion/react-m';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Heading } from '@/ui/heading/Heading';

import { DragNDropVideo } from '@/app/studio/upload/DragNDropVideo';
import { ProgressVideoProcessing } from '@/app/studio/upload/ProgressVideoProcessing';
import { VideoForm } from '@/app/studio/upload/VideoForm';
import type { IVideoFormData } from '@/types/studio-video.types';

export function UploadVideoMain() {
  const form = useForm<IVideoFormData>({
    mode: 'onChange',
  });

  const fileName = form.watch('videoFileName');

  const [isReadyToPublish, setIsReadyToPublish] = useState(false);

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

          {!fileName && <DragNDropVideo reset={form.reset} />}

          <ProgressVideoProcessing
            fileName={fileName}
            setIsReadyToPublish={setIsReadyToPublish}
            isReadyToPublish={isReadyToPublish}
          />

          {!!fileName && (
            <VideoForm
              form={form}
              isReadyToPublish={isReadyToPublish}
            />
          )}
        </div>
      </m.div>
    </div>
  );
}
