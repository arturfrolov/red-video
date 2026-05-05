'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Edit } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { Button } from '@/ui/button/Button';
import { Heading } from '@/ui/heading/Heading';

import { STUDIO_PAGE } from '@/config/studio-page.config';

import { VideoForm } from '@/app/studio/upload/VideoForm';
import { studioVideoService } from '@/services/studio/studio-video.service';
import type { IVideoFormData } from '@/types/studio-video.types';

export function EditVideoForm() {
  const { id } = useParams();
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);

  const form = useForm<IVideoFormData>({
    mode: 'onChange',
  });

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ['get studio video', id],
    queryFn: () => studioVideoService.byId(id as string),
  });

  useEffect(() => {
    if (!isSuccess) return;

    const initialVideo = data.data;

    form.reset({
      title: initialVideo.title,
      description: initialVideo.description,
      maxResolution: initialVideo.maxResolution,
      thumbnailUrl: initialVideo.thumbnailUrl,
      tags: initialVideo.tags.map((tag) => tag.name),
      videoFileName: initialVideo.videoFileName,
    });
  }, [form, isSuccess, data]);

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ['edit video'],
    mutationFn: (data: IVideoFormData) => studioVideoService.update(id as string, data),
    onSuccess() {
      setIsRedirecting(true);
      router.push(STUDIO_PAGE.HOME);
      queryClient.invalidateQueries({
        queryKey: ['studioVideoList'],
      });
      toast.success('Video successfully updated!');
    },
    onError() {
      toast.error('Video updating has error!');
    },
  });

  const onSubmit: SubmitHandler<IVideoFormData> = (data) => {
    mutate(data);
  };

  const isFormPending = isLoading || isPending || isRedirecting;

  return (
    <div className='mx-auto max-w-7xl'>
      <Heading
        Icon={Edit}
        isPageHeading
      >
        Edit video
      </Heading>

      <form onSubmit={form.handleSubmit(onSubmit)}>
        <VideoForm
          form={form}
          isPending={isFormPending}
        />
        <div className='mt-4 text-right'>
          <Button
            type='submit'
            isLoading={isPending || isRedirecting}
          >
            Update
          </Button>
        </div>
      </form>
    </div>
  );
}
