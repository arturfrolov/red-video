import { useMutation } from '@tanstack/react-query';
import { Check, ListVideo } from 'lucide-react';
import { AnimatePresence } from 'motion/react';
import * as m from 'motion/react-m';

import { useOutside } from '@/hooks/useOutside';

import { useUserPlaylists } from '@/app/my/playlists/hooks/useUserPlaylists';
import { playlistService } from '@/services/playlist.service';
import type { ISingleVideoResponse } from '@/types/video.types';

interface Props {
  video: ISingleVideoResponse;
}

export function SaveToPlaylist({ video }: Props) {
  const { data, refetch: refetchPlaylists } = useUserPlaylists();

  const { isShow, ref, setIsShow } = useOutside(false);

  const { mutate: togglePlaylist, isPending } = useMutation({
    mutationKey: ['toggle video'],
    mutationFn: (playlistId: string) => playlistService.toggleVideoInPlaylist(playlistId, video.id),
    async onSuccess() {
      const { toast } = await import('react-hot-toast');
      toast.success('Successfully changed', {
        id: 'playlist',
      });
      setIsShow(false);
      refetchPlaylists();
    },
  });

  return (
    <div
      className='relative z-10'
      ref={ref}
    >
      <button
        className='flex cursor-pointer items-center gap-1 opacity-80 transition-opacity
          hover:opacity-100'
        onClick={() => setIsShow(!isShow)}
      >
        <ListVideo size={20} />
        Save
      </button>

      <AnimatePresence>
        {isShow && (
          <m.ul
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className='absolute right-0 bottom-8 w-max max-w-32 rounded bg-gray-800 px-3 py-2
              shadow'
          >
            {data?.data.map((playlist) => (
              <li
                key={playlist.id}
                className='mb-1'
              >
                <button
                  onClick={() => {
                    togglePlaylist(playlist.id);
                  }}
                  className='flex cursor-pointer items-center gap-1 border-b border-b-transparent
                    transition-colors hover:text-primary'
                  disabled={isPending}
                >
                  {playlist.videos.some((v) => v.id === video.id) && <Check size={16} />}
                  {playlist.title}
                </button>
              </li>
            ))}
          </m.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
