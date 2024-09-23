import { http, HttpResponse } from 'msw';
import { GetMonthOrdersCanceledAmountResponse } from '../get-month-orders-canceled-amount';

export const getMonthOrdersCanceledAmountMock = http.get<
  never,
  never,
  GetMonthOrdersCanceledAmountResponse
>('/metrics/month-canceled-orders-amount', () => {
  return HttpResponse.json({
    amount: 20,
    diffFromLastMonth: -5,
  });
});
