import type { IChannel } from './channel.types';
import type { IPagination } from '@/types/pagination.types';

export interface IVideo {
  id: string;
  title: string;
  publicId: string;
  description: string;
  thumbnailUrl: string;
  videoFileName: string;
  viewsCount: number;
  isPublic: boolean;
  channel: IChannel;
  createdAt: string;
}

export interface IFullVideo extends IVideo {
  likes: [];
}

export interface ISingleVideoResponse extends IFullVideo {
  similarVideos: IVideo[];
}

export interface IVideosPagination extends IPagination {
  videos: IVideo[];
}
