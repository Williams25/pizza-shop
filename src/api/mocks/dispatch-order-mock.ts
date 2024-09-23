import { http, HttpResponse } from 'msw';
import { DispatchOrderParams } from '../dispatch-order';

export const dispatchOrderMock = http.patch<DispatchOrderParams, never, never>(
  '/orders/:orderId/dispatch',
  () => {
    return new HttpResponse(null, { status: 200 });
  },
);
