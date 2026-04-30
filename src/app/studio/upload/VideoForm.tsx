import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Controller, type SubmitHandler, type UseFormReturn } from 'react-hook-form';
import toast from 'react-hot-toast';

import { Button } from '@/ui/button/Button';
import { Field } from '@/ui/field/Field';
import { Textarea } from '@/ui/field/Textarea';
import { TagsField } from '@/ui/tags-field/TagsField';
import { UploadField } from '@/ui/upload-field/UploadField';

import { STUDIO_PAGE } from '@/config/studio-page.config';

import { UploadSkeleton } from '@/app/studio/upload/UploadSkeleton';
import { studioVideoService } from '@/services/studio/studio-video.service';
import type { IVideoFormData } from '@/types/studio-video.types';

interface Props {
  form: UseFormReturn<IVideoFormData, any, IVideoFormData>;
  isReadyToPublish: boolean;
}

export function VideoForm({
  form: {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
    watch,
  },
  isReadyToPublish,
}: Props) {
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationKey: ['create video'],
    mutationFn: (data: IVideoFormData) => studioVideoService.create(data),
    onSuccess: () => {
      reset();
      toast.success('Video published successfully');
      router.push(STUDIO_PAGE.HOME);
    },
    onError: () => {
      toast.error('Video creating has error!');
    },
  });

  const onSubmit: SubmitHandler<IVideoFormData> = (data) => {
    mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='grid grid-cols-[2.5fr_1fr] gap-10'>
        {isPending ? (
          <UploadSkeleton />
        ) : (
          <>
            <div className=''>
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
                registration={register('description', {
                  required: 'Description is required!',
                })}
                error={errors.description?.message}
                placeholder='Enter description:'
                rows={8}
              />

              <Controller
                control={control}
                name='thumbnailUrl'
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <UploadField
                    label='Thumbnail: '
                    onChange={onChange}
                    value={value}
                    error={error}
                    folder='thumbnails'
                    className='mb-5'
                    sizePreview={[151, 82]}
                  />
                )}
              />

              <Controller
                control={control}
                name='tags'
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <TagsField
                    label='Tags:'
                    onTagsChange={onChange}
                    tags={value}
                    error={error?.message}
                  />
                )}
              />
            </div>

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
                    <div
                      className='flex h-full items-center justify-center bg-gray-900 text-sm
                        font-medium'
                    >
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
          </>
        )}
      </div>

      <div className='mt-6 text-right'>
        <Button
          type='submit'
          disabled={!isReadyToPublish}
          isLoading={isPending}
        >
          {isReadyToPublish ? 'Publish' : 'Processing...'}
        </Button>
      </div>
    </form>
  );
}
