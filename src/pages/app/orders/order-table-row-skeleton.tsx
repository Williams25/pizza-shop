import { TableCell, TableRow } from '@/components/ui/table';

import { Skeleton } from '@/components/ui/skeleton';

export const OrderTableRowSkeleton = () => {
  return (
    <TableRow>
      <TableCell>
        <Skeleton className="h-8 w-8" />
      </TableCell>

      <TableCell className="font-mono text-xs font-medium">
        <Skeleton className="h-4 w-40" />
      </TableCell>

      <TableCell className="text-muted-foreground">
        <Skeleton className="h-4 w-40" />
      </TableCell>

      <TableCell>
        <Skeleton className="h-4 w-40" />
      </TableCell>

      <TableCell className="font-medium">
        <Skeleton className="h-4 w-full" />
      </TableCell>

      <TableCell className="font-medium">
        <Skeleton className="h-4 w-40" />
      </TableCell>

      <TableCell>
        <Skeleton className="h-8 w-24" />
      </TableCell>

      <TableCell>
        <Skeleton className="h-8 w-24" />
      </TableCell>
    </TableRow>
  );
};

export const OrderTableRowSkeletonContent = () => (
  <>
    <OrderTableRowSkeleton />
    <OrderTableRowSkeleton />
    <OrderTableRowSkeleton />
    <OrderTableRowSkeleton />
    <OrderTableRowSkeleton />
    <OrderTableRowSkeleton />
    <OrderTableRowSkeleton />
    <OrderTableRowSkeleton />
    <OrderTableRowSkeleton />
    <OrderTableRowSkeleton />
  </>
);
