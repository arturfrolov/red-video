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
}

export const videoService = new VideoService();
