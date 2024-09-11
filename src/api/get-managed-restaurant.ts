import { api } from '@/lib/axios';

export interface GetManagedRestaurantResponse {
  id: string;
  name: string;
  description: string;
  createdAt: Date | null;
  updatedAt: Date | null;
  managerId: string | null;
}

export const getManagedRestaurant = async () => {
  const { data } = await api.get<GetManagedRestaurantResponse>(
    '/managed-restaurant',
  );
  return data;
};
