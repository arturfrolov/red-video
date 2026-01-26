import { axiosClassic } from '@/api/axios';

import type { IExploreVideos, IVideo } from '@/types/video.types';

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
}

export const videoService = new VideoService();
