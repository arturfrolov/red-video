'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { UploadCloud } from 'lucide-react';
import * as m from 'motion/react-m';
import { useEffect, useState } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { Button } from '@/ui/button/Button';
import { Field } from '@/ui/field/Field';
import { Textarea } from '@/ui/field/Textarea';
import { Heading } from '@/ui/heading/Heading';
import { SkeletonLoader } from '@/ui/skeleton-loader/SkeletonLoader';
import { useUpload } from '@/ui/upload-field/useUpload';

import { playlistService } from '@/services/playlist.service';
import { fileService } from '@/services/studio/file.service';
import type { IPlaylistData } from '@/types/playlist.types';
import type { IVideoFormData } from '@/types/studio-video.types';

export function UploadVideoForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch,
  } = useForm<IVideoFormData>({
    mode: 'onChange',
  });

  const fileName = watch('videoFileName');

  // const { mutate, isPending } = useMutation({
  //   mutationKey: ['create playlist'],
  //   mutationFn: (data: IPlaylistData) => playlistService.createPlaylist(data),
  //   onSuccess: () => {
  //     reset();
  //     toast.success('Playlist created successfully');
  //   },
  //   onError: (error) => {
  //     toast.error(error.message);
  //   },
  // });

  const [progress, setProgress] = useState(0);
  const [isReadyToPublish, setIsReadyToPublish] = useState(false);

  const { uploadFile, isLoading: isUploading } = useUpload({
    onSuccess(data) {
      const file = data[0];
      if (!file) return;

      reset({
        videoFileName: file.url,
        maxResolution: file.maxResolution,
        title: file.name,
      });

      toast.success('File uploaded successfully');
    },
    onError() {
      toast.error('Filed to upload video');
    },
  });

  const { data: processingData, isSuccess } = useQuery({
    queryKey: ['processing-video', fileName],
    queryFn: () => fileService.getProcessingStatus(fileName),
    refetchInterval(query) {
      const queryProgress = query.state.data?.data;
      return queryProgress !== undefined && progress < 100 ? 1000 : false;
    },
  });

  useEffect(() => {
    const progressResponse = processingData?.data;
    if (!progressResponse) return;
    setProgress(progressResponse);

    if (progressResponse === 100) {
      setIsReadyToPublish(true);
      toast.success('Video processing completed');
    }
  }, [isSuccess, processingData?.data]);

  const onSubmit: SubmitHandler<IVideoFormData> = (data) => {
    // mutate(data);
  };

  const isPending = false;

  return (
    <div className='absolute inset-0 z-50 flex items-center justify-center bg-black/50'>
      <m.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        className='relative w-5/6 max-w-4xl'
      >
        <div className='rounded-lg bg-gray-800 p-6'>
          <Heading
            classNameHeading='text-xl'
            className='border-b border-border pb-5'
          >
            Upload a video
          </Heading>

          <label
            className='text-blue trecking-wide border-blue flex cursor-pointer flex-col items-center
              rounded-lg border bg-gray-200 px-4 py-6 uppercase shadow-lg transition duration-200
              hover:bg-primary hover:text-white'
          >
            <UploadCloud size={40} />
            <span className='mt-2 text-base leading-normal'>Select a video</span>
            <input
              type='file'
              className='hidden'
              accept='video/*'
              onChange={uploadFile}
            />
          </label>

          {isUploading && (
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className='flex flex-col items-center'
            >
              <p>Uploading...</p>
            </m.div>
          )}

          {progress > 0 && progress < 100 && (
            <m.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className='h-2 rounded-xl bg-primary transition-all duration-300'
            />
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            {isPending ? (
              <SkeletonLoader count={2} />
            ) : (
              <>
                <Field
                  label='Title'
                  type='text'
                  registration={register('title', { required: 'Title is required!' })}
                  error={errors.title?.message}
                  placeholder='Enter title:'
                  autoComplete='title'
                />

                <Textarea
                  label='Description'
                  registration={register('description')}
                  error={errors.description?.message}
                  placeholder='Enter description:'
                  rows={12}
                />
              </>
            )}

            <div className='mt-6 text-center'>
              <Button
                type='submit'
                isLoading={isPending || !isReadyToPublish}
              >
                {isReadyToPublish ? 'Publish' : 'Processing...'}
              </Button>
            </div>
          </form>
        </div>
      </m.div>
    </div>
  );
}
