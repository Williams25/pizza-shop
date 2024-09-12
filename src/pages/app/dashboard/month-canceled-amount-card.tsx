import { getMonthOrdersCanceledAmount } from '@/api/get-month-orders-canceled-amount';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { DollarSign } from 'lucide-react';

export const MonthCanceledAmountCard = () => {
  const { data: monthOrdersCanceledAmount } = useQuery({
    queryKey: ['metrics', 'getMonthOrdersCanceledAmount'],
    queryFn: getMonthOrdersCanceledAmount,
  });

  return (
    <Card>
      <CardHeader className="flex flex-row flex-nowrap items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">
          Cancelamentos (mês)
        </CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-1">
        {monthOrdersCanceledAmount && (
          <>
            <span className="text-2xl font-bold tracking-tight">
              {monthOrdersCanceledAmount.amount.toLocaleString('pt-br')}
            </span>
            <p className="text-xs text-muted-foreground">
              <span
                className={
                  monthOrdersCanceledAmount?.diffFromLastMonth < 0
                    ? 'text-emerald-500 dark:text-emerald-400'
                    : 'text-rose-500 dark:text-rose-400'
                }
              >
                {monthOrdersCanceledAmount?.diffFromLastMonth}%
              </span>{' '}
              em relação ao mês passado
            </p>
          </>
        )}
      </CardContent>
    </Card>
  );
};
