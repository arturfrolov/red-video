import type { IChannel } from './channel.types';

export interface IExploreVideos {
  videos: IVideo[];
  page: number;
  limit: number;
  totalCount: number;
  totalPages: number;
}

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
