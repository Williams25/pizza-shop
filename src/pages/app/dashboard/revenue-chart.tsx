import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import colors from 'tailwindcss/colors';

import {
  ResponsiveContainer,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Line,
} from 'recharts';
import { getDailyRevenueInPeriod } from '@/api/get-daily-revenue-in-period';
import { useQuery } from '@tanstack/react-query';
import { Label } from '@/components/ui/label';
import { DatePickerRange } from '@/components/data-range-picker';
import { useState } from 'react';
import { DateRange } from 'react-day-picker';
import { subDays } from 'date-fns';

export const RevenueChart = () => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: subDays(new Date(), 7),
    to: new Date(),
  });

  const { data: dailyRevenueInPeriod } = useQuery({
    queryKey: ['metrics', 'getDailyRevenueInPeriod', dateRange],
    queryFn: () =>
      getDailyRevenueInPeriod({
        from: dateRange?.from,
        to: dateRange?.to,
      }),
  });

  const handleDateChange = (date: DateRange | undefined) => {
    setDateRange(date);
  };

  return (
    <Card className="col-span-6">
      <CardHeader className="flex-row items-center justify-between pb-8">
        <div className="space-y-1">
          <CardTitle className="text-base font-medium">
            Receita no período
          </CardTitle>
          <CardDescription>Receita diária no período</CardDescription>
        </div>

        <div className="flex items-center gap-3">
          <Label>Periodo</Label>
          <DatePickerRange date={dateRange} onDateChange={handleDateChange} />
        </div>
      </CardHeader>

      <CardContent>
        {dailyRevenueInPeriod && (
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={dailyRevenueInPeriod} style={{ fontSize: 12 }}>
              <XAxis
                dataKey={'date'}
                tickLine={false}
                axisLine={false}
                dy={16}
              />
              <YAxis
                stroke="#888"
                axisLine={false}
                tickLine={false}
                width={80}
                tickFormatter={(value: number) =>
                  (value / 100).toLocaleString('pt-br', {
                    style: 'currency',
                    currency: 'BRL',
                  })
                }
              />

              <CartesianGrid vertical={false} className="stroke-muted" />

              <Line
                type={'linear'}
                strokeWidth={2}
                dataKey={'receipt'}
                stroke={colors.violet['500']}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
};
