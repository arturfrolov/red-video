import { useMutation } from '@tanstack/react-query';

import { useAuth } from '@/hooks/useAuth';

import { commentService } from '@/services/comment.service';
import type { IComment } from '@/types/comment.types';

interface Props {
  comment: IComment;
  refetch: () => void;
  newText: string;
}

export function CommentActions({ comment, refetch, newText }: Props) {
  const { isLoggedIn, user } = useAuth();

  const { mutate: update, isPending } = useMutation({
    mutationKey: ['update comment'],
    mutationFn: () =>
      commentService.update(comment.id, {
        text: newText,
        videoId: comment.videoId,
      }),
    onSuccess: () => {
      refetch();
    },
  });

  const { mutate: deleteComment, isPending: isDeletePending } = useMutation({
    mutationKey: ['delete comment'],
    mutationFn: () => commentService.delete(comment.id),
    onSuccess: () => {
      refetch();
    },
  });

  if (!isLoggedIn) return null;
  if (user?.id !== comment.user.id) return null;

  return (
    <div className='mt-3 flex items-center gap-3'>
      <button
        className='text-gray-400s tr cursor-pointer text-sm opacity-90 transition-opacity
          hover:opacity-100'
        disabled={isPending}
        onClick={() => update()}
      >
        Save
      </button>
      <button
        className='text-gray-400s tr cursor-pointer text-sm opacity-90 transition-opacity
          hover:opacity-100'
        disabled={isDeletePending}
        onClick={() => deleteComment()}
      >
        Delete
      </button>
    </div>
  );
}
