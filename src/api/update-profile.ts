import { api } from '@/lib/axios';

export interface UpdateProfileBody {
  name: string;
  description: string;
}

export const updateProfile = async (body: UpdateProfileBody) => {
  await api.put(`/profile`, body);
};
