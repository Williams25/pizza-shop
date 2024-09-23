import { http, HttpResponse } from 'msw';
import { GetProfileResponse } from '../get-profile';

export const getProfileMock = http.get<never, never, GetProfileResponse>(
  '/me',
  () => {
    return HttpResponse.json({
      createdAt: new Date(),
      email: 'william007.gabriel@gmail.com',
      id: '54545458454',
      name: 'William Gabriel',
      phone: '16 981230085',
      role: 'manager',
      updatedAt: null,
    });
  },
);
