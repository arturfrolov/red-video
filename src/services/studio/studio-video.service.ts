import { instance } from '@/api/axios';

import type { IPaginationParams } from '@/types/pagination.types';
import type { IVideoDraft, IVideoFormData } from '@/types/studio-video.types';
import type { IStudioVideoResponse, IVideosPagination } from '@/types/video.types';

class StudioVideoService {
  private _VIDEOS = '/studio/videos';

  async getAll(params: IPaginationParams) {
    const data = await instance.get<IVideosPagination>(this._VIDEOS, {
      params,
    });

    return data.data;
  }

  byId(id: string) {
    return instance.get<IStudioVideoResponse>(`${this._VIDEOS}/${id}`);
  }

  async getDraft() {
    const { data } = await instance.get<IVideoDraft | null>(`${this._VIDEOS}/draft`);
    return data;
  }

  create(dto: IVideoFormData) {
    return instance.post(this._VIDEOS, dto);
  }

  update(id: string, dto: IVideoFormData) {
    return instance.put(`${this._VIDEOS}/${id}`, dto);
  }

  delete(id: string) {
    return instance.delete(`${this._VIDEOS}/${id}`);
  }

  deleteDraft(id: string) {
    return instance.delete(`${this._VIDEOS}/draft/${id}`);
  }
}

export const studioVideoService = new StudioVideoService();
