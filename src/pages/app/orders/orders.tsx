import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Helmet } from 'react-helmet-async';
import { OrderTableRow } from './order-table-row';
import { OrderTableFilters } from './order-table-filters';
import { Pagination } from '@/components/pagination';
import { useQuery } from '@tanstack/react-query';
import { getOrders } from '@/api/get-orders';
import { useSearchParams } from 'react-router-dom';
import { z } from 'zod';
import { useCallback } from 'react';
import { OrderTableRowSkeletonContent } from './order-table-row-skeleton';

export const Orders = () => {
  const [params, setParams] = useSearchParams();

  const orderId = params.get('orderId') || null;
  const customerName = params.get('customerName') || null;
  const status = params.get('status') || null;

  const pageIndex = z.coerce
    .number()
    .transform((page) => page - 1)
    .parse(params.get('page') || '1');

  const {
    data: result,
    isFetching,
    isLoading,
  } = useQuery({
    queryKey: ['getOrders', pageIndex, orderId, customerName, status],
    queryFn: () => getOrders({ pageIndex, orderId, customerName, status }),
  });

  const handlePaginate = useCallback(
    (page: number) => {
      setParams((prev) => {
        prev.set('page', String(page + 1));
        return prev;
      });
    },
    [setParams],
  );

  return (
    <>
      <Helmet title="Pedidos" />
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Pedidos</h1>
        <div className="my-2.5">
          <OrderTableFilters />

          <div className="my-3.5 rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[64px]"></TableHead>
                  <TableHead className="w-[140px]">Indentificador</TableHead>
                  <TableHead className="w-[180px]">Realizado há</TableHead>
                  <TableHead className="w-[140px]">Status</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead className="w-[140px]">Total do pedido</TableHead>
                  <TableHead className="w-[164px]"></TableHead>
                  <TableHead className="w-[164px]"></TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {isFetching || isLoading ? (
                  <OrderTableRowSkeletonContent />
                ) : (
                  result &&
                  result.orders.map((order) => (
                    <OrderTableRow key={order.orderId} order={order} />
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {result && (
            <Pagination
              pageIndex={result?.meta.pageIndex || 0}
              perPage={result?.meta.perPage || 10}
              totalCount={result?.meta.totalCount || 0}
              onPageChange={handlePaginate}
              disabled={isFetching || isLoading}
            />
          )}
        </div>
      </div>
    </>
  );
};
