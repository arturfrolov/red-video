import { axiosClassic } from '@/api/axios';

import type { IExploreVideos, ISingleVideoResponse, IVideo } from '@/types/video.types';

class VideoService {
  private _VIDEOS = '/videos';
  async getExploreVideos() {
    const res = await axiosClassic.get<IExploreVideos>(`${this._VIDEOS}/explore`);
    return res.data.videos;
  }

  async getTrendingVideos() {
    const res = await axiosClassic.get<IVideo[]>(`${this._VIDEOS}/trending`);
    return res.data;
  }

  async getVideoGames() {
    const res = await axiosClassic.get<IExploreVideos>(`${this._VIDEOS}/games`);
    return res.data.videos;
  }

  async getAll(searchTerm?: string | null) {
    const res = await axiosClassic.get<IExploreVideos>(
      this._VIDEOS,
      searchTerm
        ? {
            params: {
              searchTerm,
            },
          }
        : {}
    );
    return res.data.videos;
  }

  byPublicId(publicId?: string | null) {
    return axiosClassic.get<ISingleVideoResponse>(`${this._VIDEOS}/by-publicId/${publicId}`);
  }
}

export const videoService = new VideoService();
