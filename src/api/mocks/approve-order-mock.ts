import { http, HttpResponse } from 'msw';
import { ApproveOrderParams } from '../approve-order';

export const approveOrderMock = http.patch<ApproveOrderParams, never, never>(
  '/orders/:orderId/approve',
  () => {
    return new HttpResponse(null, { status: 200 });
  },
);
