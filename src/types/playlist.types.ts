import type { IVideo } from '@/types/video.types';

export interface IPlaylist {
  id: string;
  title: string;
  videos: IVideo[];
  userId: string;
  createdAt: string;
}

export interface IPlaylistData {
  title: string;
  videoPublicId: string;
}
