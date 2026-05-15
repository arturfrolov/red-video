import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import type { Dispatch, SetStateAction } from 'react';
import { type SubmitHandler, type UseFormReturn } from 'react-hook-form';

import { Button } from '@/ui/button/Button';

import { STUDIO_PAGE } from '@/config/studio-page.config';

import { VideoForm } from '@/app/studio/upload/VideoForm';
import { studioVideoService } from '@/services/studio/studio-video.service';
import type { IVideoFormData } from '@/types/studio-video.types';

interface Props {
  form: UseFormReturn<IVideoFormData, any, IVideoFormData>;
  isReadyToPublish: boolean;
  setIsReadyToPublish: Dispatch<SetStateAction<boolean>>;
}

export function CreateVideoForm({ form, isReadyToPublish, setIsReadyToPublish }: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const draftId = form.watch('draftId');
  const fileName = form.watch('videoFileName');

  const { mutate, isPending } = useMutation({
    mutationKey: ['create video'],
    mutationFn: (data: IVideoFormData) => {
      const { draftId, ...videoData } = data;
      return studioVideoService.create(videoData);
    },
    async onSuccess() {
      form.reset();
      queryClient.invalidateQueries({ queryKey: ['video-draft'] });
      const { toast } = await import('react-hot-toast');
      toast.success('Video published successfully');
      router.push(STUDIO_PAGE.HOME);
    },
    async onError() {
      const { toast } = await import('react-hot-toast');
      toast.error('Video creating has error!');
    },
  });

  const { mutate: discardDraft, isPending: isDiscarding } = useMutation({
    mutationKey: ['delete video draft', draftId],
    mutationFn: () => studioVideoService.deleteDraft(draftId as string),
    async onSuccess() {
      form.reset({
        draftId: undefined,
        videoFileName: '',
        title: '',
        description: '',
        thumbnailUrl: '',
        tags: [],
      });
      setIsReadyToPublish(false);
      queryClient.setQueryData(['video-draft'], null);
      queryClient.removeQueries({ queryKey: ['processing-video', fileName] });
      const { toast } = await import('react-hot-toast');
      toast.success('Draft discarded');
    },
    async onError() {
      const { toast } = await import('react-hot-toast');
      toast.error('Draft deleting has error!');
    },
  });

  const onSubmit: SubmitHandler<IVideoFormData> = (data) => {
    mutate(data);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <VideoForm form={form} />

      <div className='mt-6 flex justify-end gap-3'>
        {!!draftId && (
          <Button
            type='button'
            variant='secondary'
            disabled={isPending}
            isLoading={isDiscarding}
            onClick={() => discardDraft()}
          >
            Discard
          </Button>
        )}

        <Button
          type='submit'
          disabled={!isReadyToPublish || isDiscarding}
          isLoading={isPending}
        >
          {isReadyToPublish ? 'Publish' : 'Processing...'}
        </Button>
      </div>
    </form>
  );
}
