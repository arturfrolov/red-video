import type { IUser } from '@/types/user.types';
import type { IVideo } from '@/types/video.types';

export interface IWatchHistory {
  id: string;
  user: IUser;
  video: IVideo;
  watchedAt: string;
}
