import Image from 'next/image';
import { Controller, type UseFormReturn } from 'react-hook-form';

import { Field } from '@/ui/field/Field';
import { Textarea } from '@/ui/field/Textarea';
import { TagsField } from '@/ui/tags-field/TagsField';
import { UploadField } from '@/ui/upload-field/UploadField';

import { stripHtml, stripHtmlWithBreaks } from '@/utils/strip-html';

import { UploadSkeleton } from '@/app/studio/upload/UploadSkeleton';
import type { IVideoFormData } from '@/types/studio-video.types';

interface Props {
  isPending?: boolean;
  form: UseFormReturn<IVideoFormData, any, IVideoFormData>;
}

export function VideoForm({
  form: {
    register,
    formState: { errors },
    control,
    watch,
  },
  isPending,
}: Props) {
  return (
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

            <Controller
              control={control}
              name='description'
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <Textarea
                  label='Description'
                  value={stripHtmlWithBreaks(value || '')}
                  onChange={(e) => onChange(e.target.value)}
                  error={error?.message}
                  placeholder='Enter description:'
                  rows={8}
                />
              )}
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
  );
}
