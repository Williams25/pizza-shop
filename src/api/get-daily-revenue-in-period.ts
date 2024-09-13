import { api } from '@/lib/axios';
import { toast } from 'sonner';
import { isAxiosError } from 'axios';

export interface GetDailyRevenueInPeriodResponse {
  date: string;
  revenue: number;
}

export interface GetDailyRevenueInPeriodQuery {
  from?: Date;
  to?: Date;
}

export const getDailyRevenueInPeriod = async ({
  from,
  to,
}: GetDailyRevenueInPeriodQuery) => {
  try {
    const response = await api.get<GetDailyRevenueInPeriodResponse[]>(
      '/metrics/daily-receipt-in-period',
      { params: { from, to } },
    );

    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      toast.error(error.response?.data.message);
    }
    return undefined;
  }
};
