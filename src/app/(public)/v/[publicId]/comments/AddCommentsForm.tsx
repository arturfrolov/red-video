import { useMutation } from '@tanstack/react-query';
import { type SubmitHandler, useForm } from 'react-hook-form';

import { Textarea } from '@/ui/field/Textarea';

import { useAuth } from '@/hooks/useAuth';

import { commentService } from '@/services/comment.service';
import type { ICommentData } from '@/types/comment.types';

interface Props {
  videoId: string;
  refetch: () => void;
}

export function AddCommentsForm({ refetch, videoId }: Props) {
  const { isLoggedIn } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ICommentData>({
    mode: 'onChange',
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ['create comment'],
    mutationFn: (data: ICommentData) => commentService.create(data),
    onSuccess: () => {
      refetch();
      reset();
    },
  });

  const onSubmit: SubmitHandler<ICommentData> = ({ text }) => {
    mutate({ videoId, text });
  };

  if (!isLoggedIn) return null;

  return (
    <div className='mb-4'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='grid grid-cols-[7fr_1fr] gap-10 lg:gap-14'
      >
        <Textarea
          registration={register('text', {
            required: true,
          })}
          error={errors.text?.message}
          placeholder='Enter comment:'
          rows={1}
          wrapperClassName='mb-0'
        />
        <button
          className='h-max cursor-pointer rounded bg-border px-2 py-2.5 font-medium'
          disabled={isPending}
          aria-label='Comment'
        >
          {isPending ? 'Commenting..' : 'Comment'}
        </button>
      </form>
    </div>
  );
}
