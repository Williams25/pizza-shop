import { http, HttpResponse } from 'msw';
import { DeliverOrderParams } from '../deliver-order';

export const deliverOrderMock = http.patch<DeliverOrderParams, never, never>(
  '/orders/:orderId/deliver',
  () => {
    return new HttpResponse(null, { status: 200 });
  },
);
