import type { IChannel } from '@/types/channel.types';
import type { IUser } from '@/types/user.types';

export interface IComment {
  id: string;
  text: string;
  createdAt: string;
  user: IUser & {
    channel?: IChannel;
  };
}

export interface ICommentData {
  text: string;
  videoId: string;
}
