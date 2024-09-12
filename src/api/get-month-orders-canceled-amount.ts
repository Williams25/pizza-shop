import { api } from '@/lib/axios';

export interface GetMonthOrdersCanceledAmountResponse {
  amount: number;
  diffFromLastMonth: number;
}

export const getMonthOrdersCanceledAmount = async () => {
  const response = await api.get<GetMonthOrdersCanceledAmountResponse>(
    '/metrics/month-canceled-orders-amount',
  );

  return response.data;
};
