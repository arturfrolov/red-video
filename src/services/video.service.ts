import axios from 'axios';

import type { IExploreVideos, IVideo } from '@/types/video.types';

class VideoService {
  private readonly BASE_URL = 'http://localhost:4200/api/videos';
  async getExploreVideos() {
    const res = await axios.get<IExploreVideos>(`${this.BASE_URL}/explore`);
    return res.data.videos;
  }

  async getTrendingVideos() {
    const res = await axios.get<IVideo[]>(`${this.BASE_URL}/trending`);
    return res.data;
  }

  async getAll(searchTerm?: string | null) {
    const res = await axios.get<IExploreVideos>(
      `${this.BASE_URL}`,
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
