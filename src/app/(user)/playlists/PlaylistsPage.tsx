'use client';
import { useQuery } from '@tanstack/react-query';
import { ListVideo } from 'lucide-react';

import { Button } from '@/ui/button/Button';
import { Heading } from '@/ui/heading/Heading';
import { SkeletonLoader } from '@/ui/skeleton-loader/SkeletonLoader';

import { useOutside } from '@/hooks/useOutside';

import { CreatePlaylist } from '@/app/(user)/playlists/CreatePlaylist';
import { PlaylistItem } from '@/app/(user)/playlists/PlaylistItem';
import { useUserPlaylists } from '@/app/(user)/playlists/hooks/useUserPlaylists';

export function PlaylistsPage() {
  const { isShow, ref, setIsShow } = useOutside(false);

  const { data, isLoading, refetch } = useUserPlaylists();

  return (
    <section>
      <div className='mb-10 flex items-center justify-between'>
        <Heading
          isPageHeading
          Icon={ListVideo}
          className='mb-0'
        >
          Playlists
        </Heading>
        <Button
          variant='secondary'
          onClick={() => setIsShow(true)}
        >
          Create a playlist
        </Button>
      </div>
      <div className='grid grid-cols-5 gap-6'>
        {isLoading ? (
          <SkeletonLoader
            count={3}
            className='mb-6 h-64 rounded-md'
          />
        ) : data?.data?.length ? (
          data?.data?.map((playlist) => (
            <PlaylistItem
              key={playlist.id}
              playlist={playlist}
            />
          ))
        ) : (
          <p>Playlists not found</p>
        )}
      </div>

      {isShow && (
        <CreatePlaylist
          refetch={refetch}
          onClose={() => setIsShow(false)}
          ref={ref}
        />
      )}
    </section>
  );
}
