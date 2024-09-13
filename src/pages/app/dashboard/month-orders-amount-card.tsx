import { getMonthOrdersAmount } from '@/api/get-month-orders-amount';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useQuery } from '@tanstack/react-query';
import { Utensils } from 'lucide-react';

export const MonthOrdersAmountCard = () => {
  const { data: monthOrdersAmount, isLoading } = useQuery({
    queryKey: ['metrics', 'getMonthOrdersAmount'],
    queryFn: getMonthOrdersAmount,
  });
  return (
    <Card>
      <CardHeader className="flex flex-row flex-nowrap items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">Pedidos (mês)</CardTitle>
        <Utensils className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-1">
        {monthOrdersAmount && (
          <>
            <span className="text-2xl font-bold tracking-tight">
              {monthOrdersAmount?.amount.toLocaleString('pt-br')}
            </span>
            <p className="text-xs text-muted-foreground">
              <span
                className={
                  monthOrdersAmount?.diffFromLastMonth >= 0
                    ? 'text-emerald-500 dark:text-emerald-400'
                    : 'text-rose-500 dark:text-rose-400'
                }
              >
                {monthOrdersAmount?.diffFromLastMonth}%
              </span>{' '}
              em relação ao mês passado
            </p>
          </>
        )}

        {isLoading && (
          <>
            <span className="text-2xl font-bold tracking-tight">
              <Skeleton className="h-8 w-16" />
            </span>
            <p className="flex items-center gap-1 text-xs text-muted-foreground">
              <span>
                <Skeleton className="h-4 w-4" />
              </span>{' '}
              em relação ao mês passado
            </p>
          </>
        )}
      </CardContent>
    </Card>
  );
};
