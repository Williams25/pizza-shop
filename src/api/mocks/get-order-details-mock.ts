import { http, HttpResponse } from 'msw';
import {
  GetOrderDetailsParams,
  GetOrderDetailsResponse,
} from '../get-order-details';

export const getOrderDetailsMock = http.get<
  GetOrderDetailsParams,
  never,
  GetOrderDetailsResponse
>('/orders/:orderId', ({ params }) => {
  return HttpResponse.json({
    createdAt: new Date().toISOString(),
    customer: {
      email: 'william007.gabriel@gmail.com',
      name: 'william gabriel',
      phone: '(16) 98123-0085',
    },
    id: params.orderId,
    orderItems: [
      {
        id: 'order-item-1',
        priceInCents: 1000,
        product: {
          name: 'Pizza Pepperoni',
        },
        quantity: 1,
      },
      {
        id: 'order-item-2',
        priceInCents: 2000,
        product: {
          name: 'Pizza Marguerita',
        },
        quantity: 2,
      },
    ],
    status: 'pending',
    totalInCents: 5000,
  });
});
