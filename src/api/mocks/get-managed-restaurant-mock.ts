import { http, HttpResponse } from 'msw';
import { GetManagedRestaurantResponse } from '../get-managed-restaurant';

export const getManagedRestaurantMock = http.get<
  never,
  never,
  GetManagedRestaurantResponse
>('/managed-restaurant', () => {
  return HttpResponse.json({
    createdAt: new Date(),
    description: 'Custom description Managed Restaurant',
    id: 'managed-restaurant844545455',
    managerId: 'managed-restaurant844545455',
    name: 'Pizza Shop',
    updatedAt: null,
  });
});
