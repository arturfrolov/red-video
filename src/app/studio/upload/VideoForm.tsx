import type { SubmitHandler, UseFormReturn } from 'react-hook-form';

import { Button } from '@/ui/button/Button';
import { Field } from '@/ui/field/Field';
import { Textarea } from '@/ui/field/Textarea';
import { SkeletonLoader } from '@/ui/skeleton-loader/SkeletonLoader';

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
  },
  isReadyToPublish,
}: Props) {
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

  const onSubmit: SubmitHandler<IVideoFormData> = (data) => {
    // mutate(data);
  };

  const isPending = false;

  return (
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
          disabled={!isReadyToPublish}
        >
          {isReadyToPublish ? 'Publish' : 'Processing...'}
        </Button>
      </div>
    </form>
  );
}
