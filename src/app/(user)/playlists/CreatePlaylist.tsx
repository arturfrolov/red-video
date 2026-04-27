import { useMutation } from '@tanstack/react-query';
import { X } from 'lucide-react';
import * as m from 'motion/react-m';
import type { RefObject } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useHotkeys } from 'react-hotkeys-hook';

import { Button } from '@/ui/button/Button';
import { Field } from '@/ui/field/Field';
import { Heading } from '@/ui/heading/Heading';
import { SkeletonLoader } from '@/ui/skeleton-loader/SkeletonLoader';

import { playlistService } from '@/services/playlist.service';
import type { IPlaylistData } from '@/types/playlist.types';

interface Props {
  refetch: () => void;
  onClose: () => void;
  ref: RefObject<any | null>;
}

export function CreatePlaylist({ refetch, onClose, ref }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IPlaylistData>({
    mode: 'onChange',
  });

  useHotkeys('esc', (e) => {
    e.preventDefault();
    onClose();
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ['create playlist'],
    mutationFn: (data: IPlaylistData) => playlistService.createPlaylist(data),
    onSuccess: () => {
      refetch();
      reset();
      onClose();
      toast.success('Playlist created successfully');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit: SubmitHandler<IPlaylistData> = (data) => {
    mutate(data);
  };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'>
      <m.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        className='relative w-md'
      >
        <div
          className='rounded-lg bg-gray-800 p-6'
          ref={ref}
        >
          <button
            onClick={onClose}
            className='absolute top-2 right-2 cursor-pointer text-white hover:text-gray-300'
            title='Close modal'
          >
            <X />
          </button>
          <Heading classNameHeading='text-xl'>Create a playlist</Heading>
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
                <Field
                  label='Video public id (from url)'
                  type='text'
                  registration={register('videoPublicId', {
                    required: 'Video public id is required!',
                    minLength: {
                      value: 10,
                      message: 'Video public id must be exactly 10 characters!',
                    },
                    maxLength: {
                      value: 10,
                      message: 'Video public id must be exactly 10 characters!',
                    },
                  })}
                  error={errors.videoPublicId?.message}
                  placeholder='Enter video public id:'
                />

                <div className='mt-6 text-center'>
                  <Button
                    type='submit'
                    isLoading={isPending}
                  >
                    Create
                  </Button>
                </div>
              </>
            )}
          </form>
        </div>
      </m.div>
    </div>
  );
}
