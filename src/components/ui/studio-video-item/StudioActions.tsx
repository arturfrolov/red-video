'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Edit, ExternalLink, Trash2 } from 'lucide-react';
import Link from 'next/link';
import toast, { type Toast } from 'react-hot-toast';

import { PAGE } from '@/config/public-page.config';
import { STUDIO_PAGE } from '@/config/studio-page.config';

import { studioVideoService } from '@/services/studio/studio-video.service';
import type { IVideo } from '@/types/video.types';

interface Props {
  video: IVideo;
}

export function StudioActions({ video }: Props) {
  const queryClient = useQueryClient();

  const { mutate: deleteVideo, isPending: isDeletePending } = useMutation({
    mutationKey: ['delete video'],
    mutationFn: () => studioVideoService.delete(video.id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['studioVideoList'],
      });
      toast.success('Video deleted successfully');
    },
  });

  const handleDelete = () => {
    toast((t: Toast) => (
      <div>
        <p>Are you sure want to delete this video?</p>

        <div className='mt-2 flex justify-end gap-4'>
          <button
            onClick={() => {
              deleteVideo();
              toast.dismiss(t.id);
            }}
            className='cursor-pointer text-red-600'
          >
            Delete
          </button>

          <button
            onClick={() => {
              toast.dismiss(t.id);
            }}
            className='cursor-pointer text-gray-400'
          >
            Cancel
          </button>
        </div>
      </div>
    ));
  };

  return (
    <div className='flex items-start justify-center gap-5'>
      <Link
        href={PAGE.VIDEO(video.publicId)}
        target='_blank'
        title='Open video in new tab'
        className='text-blue-600 opacity-70 transition-opacity hover:opacity-100'
      >
        <ExternalLink size={22} />
      </Link>

      <Link
        href={STUDIO_PAGE.EDIT_VIDEO(video.id)}
        title='Edit video'
        className='text-orange-500 opacity-70 transition-opacity hover:opacity-100'
      >
        <Edit size={22} />
      </Link>

      <button
        onClick={() => {
          handleDelete();
        }}
        title='Delete video'
        disabled={isDeletePending}
        className='cursor-pointer text-red-600 opacity-70 transition-opacity hover:opacity-100'
      >
        <Trash2 size={22} />
      </button>
    </div>
  );
}
