import type { EnumVideoPlayerQuality } from '@/ui/video-player/video-player.types';

export interface IVideoFormData {
  draftId?: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoFileName: string;
  maxResolution?: EnumVideoPlayerQuality;
  tags: string[];
}

export type TVideoDraftStatus = 'PROCESSING' | 'READY' | 'FAILED';

export interface IVideoDraft {
  id: string;
  fileName: string;
  originalName?: string;
  maxResolution?: EnumVideoPlayerQuality;
  progress: number;
  status: TVideoDraftStatus;
  createdAt: string;
  updatedAt: string;
}
