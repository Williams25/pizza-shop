import { api } from '@/lib/axios';

export interface GetProfileResponse {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'manager' | 'customer';
  createdAt: Date | null;
  updatedAt: Date | null;
}

export const getProfile = async () => {
  const { data } = await api.get<GetProfileResponse>('/me');
  return data;
};
