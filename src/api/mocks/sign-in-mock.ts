import { http, HttpResponse } from 'msw';
import { SignInBody } from '../sign-in';

export const signInMock = http.post<never, SignInBody>(
  '/authenticate',
  async ({ request }) => {
    const { email } = await request.json();

    if (email === 'william007.gabriel@gmail.com') {
      return new HttpResponse(null, {
        status: 200,
        headers: {
          'set-cookie': 'auth=sample-jwt',
        },
      });
    }

    return new HttpResponse(null, { status: 401 });
  },
);
