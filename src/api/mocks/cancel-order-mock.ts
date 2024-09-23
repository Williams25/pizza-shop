import { http, HttpResponse } from 'msw';
import { CancelOrderParams } from '../cancel-order';

export const cancelOrderMock = http.patch<CancelOrderParams, never, never>(
  '/orders/:orderId/cancel',
  () => {
    return new HttpResponse(null, { status: 200 });
  },
);
