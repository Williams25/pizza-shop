import { getMonthRevenue } from '@/api/get-month-revenue';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useQuery } from '@tanstack/react-query';
import { DollarSign } from 'lucide-react';

export const MonthRevenueCard = () => {
  const { data: monthRevenue, isLoading } = useQuery({
    queryKey: ['metrics', 'getMonthRevenue'],
    queryFn: getMonthRevenue,
  });
  return (
    <Card>
      <CardHeader className="flex flex-row flex-nowrap items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">
          Receita total (mês)
        </CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-1">
        {monthRevenue && (
          <>
            <span className="text-2xl font-bold tracking-tight">
              {(monthRevenue?.receipt / 100).toLocaleString('pt-br', {
                style: 'currency',
                currency: 'BRL',
              })}
            </span>
            <p className="text-xs text-muted-foreground">
              <span
                className={
                  monthRevenue?.diffFromLastMonth >= 0
                    ? 'text-emerald-500 dark:text-emerald-400'
                    : 'text-rose-500 dark:text-rose-400'
                }
              >
                {monthRevenue?.diffFromLastMonth}%
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
