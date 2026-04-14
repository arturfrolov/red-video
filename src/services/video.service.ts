import { axiosClassic } from '@/api/axios';

import type { ISingleVideoResponse, IVideo, IVideosPagination } from '@/types/video.types';

class VideoService {
  private _VIDEOS = '/videos';

  getAll(searchTerm?: string | null) {
    return axiosClassic.get<IVideosPagination>(
      this._VIDEOS,
      searchTerm
        ? {
            params: {
              searchTerm,
            },
          }
        : {}
    );
  }

  byPublicId(publicId?: string | null) {
    return axiosClassic.get<ISingleVideoResponse>(`${this._VIDEOS}/by-publicId/${publicId}`);
  }

  getExploreVideos() {
    return axiosClassic.get<IVideosPagination>(`${this._VIDEOS}/explore`);
  }

  getTrendingVideos() {
    return axiosClassic.get<IVideo[]>(`${this._VIDEOS}/trending`);
  }

  getVideoGames() {
    return axiosClassic.get<IVideosPagination>(`${this._VIDEOS}/games`);
  }
}

export const videoService = new VideoService();
