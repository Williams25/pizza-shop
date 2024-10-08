import { getDayOrdersAmount } from '@/api/get-day-orders-amount';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useQuery } from '@tanstack/react-query';
import { Utensils } from 'lucide-react';

export const DayOrdersAmountCard = () => {
  const { data: dayOrdersAmount, isLoading } = useQuery({
    queryKey: ['metrics', 'getDayOrdersAmount'],
    queryFn: getDayOrdersAmount,
  });

  return (
    <Card>
      <CardHeader className="flex flex-row flex-nowrap items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">Pedidos (dia)</CardTitle>
        <Utensils className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-1">
        {dayOrdersAmount && (
          <>
            <span className="text-2xl font-bold tracking-tight">
              {dayOrdersAmount?.amount.toLocaleString('pt-br')}
            </span>
            <p className="text-xs text-muted-foreground">
              <span
                className={
                  dayOrdersAmount?.diffFromYesterday >= 0
                    ? 'text-emerald-500 dark:text-emerald-400'
                    : 'text-rose-500 dark:text-rose-400'
                }
              >
                {dayOrdersAmount?.diffFromYesterday}%
              </span>{' '}
              em relação a ontem
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
              em relação a ontem
            </p>
          </>
        )}
      </CardContent>
    </Card>
  );
};
