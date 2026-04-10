import type { IChannel } from '@/types/channel.types';
import type { IWatchHistory } from '@/types/history.types';
import type { IVideo } from '@/types/video.types';

export interface IUser {
  id: string;
  name?: string;
  email: string;
}

export interface IFullUser extends IUser {
  channel: IChannel;
  subscriptions: IChannel[];
  watchHistory: IWatchHistory[];
  verificationToken?: string | null;
}

export interface IVideoLike {
  id: string;
  videoId: string;
  userId: string;
}

export interface IProfileResponse extends IFullUser {
  likes: IVideoLike[];
  subscribedVideos: IVideo[];
}
