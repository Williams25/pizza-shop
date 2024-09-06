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

export const Orders = () => {
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
                <OrderTableRow />
              </TableBody>
            </Table>
          </div>
          <Pagination pageIndex={1} perPage={10} totalCount={10} />
        </div>
      </div>
    </>
  );
};
