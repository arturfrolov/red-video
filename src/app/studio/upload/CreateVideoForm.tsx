import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { type SubmitHandler, type UseFormReturn } from 'react-hook-form';

import { Button } from '@/ui/button/Button';

import { STUDIO_PAGE } from '@/config/studio-page.config';

import { VideoForm } from '@/app/studio/upload/VideoForm';
import { studioVideoService } from '@/services/studio/studio-video.service';
import type { IVideoFormData } from '@/types/studio-video.types';

interface Props {
  form: UseFormReturn<IVideoFormData, any, IVideoFormData>;
  isReadyToPublish: boolean;
}

export function CreateVideoForm({ form, isReadyToPublish }: Props) {
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationKey: ['create video'],
    mutationFn: (data: IVideoFormData) => studioVideoService.create(data),
    async onSuccess() {
      form.reset();
      const { toast } = await import('react-hot-toast');
      toast.success('Video published successfully');
      router.push(STUDIO_PAGE.HOME);
    },
    async onError() {
      const { toast } = await import('react-hot-toast');
      toast.error('Video creating has error!');
    },
  });

  const onSubmit: SubmitHandler<IVideoFormData> = (data) => {
    mutate(data);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <VideoForm form={form} />

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
