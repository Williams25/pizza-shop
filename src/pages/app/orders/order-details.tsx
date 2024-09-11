import { getOrderDetails } from '@/api/get-order-details';
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useQuery } from '@tanstack/react-query';
import { OrderStatus } from './order-status';
import { ptBR } from 'date-fns/locale';
import { formatDistanceToNow } from 'date-fns';
import { OrderDetailsSkeleton } from './order-details-skeleton';

export interface IOrderDetailsProps {
  orderId: string;
  open: boolean;
}

export const OrderDetails = ({ orderId, open }: IOrderDetailsProps) => {
  const {
    data: order,
    isFetching,
    isLoading,
  } = useQuery({
    queryKey: ['getOrderDetails', orderId],
    queryFn: () => getOrderDetails({ orderId }),
    enabled: open,
  });

  return (
    <DialogContent>
      {isFetching || isLoading || !order ? (
        <OrderDetailsSkeleton />
      ) : (
        <>
          <DialogHeader>
            <DialogTitle>Pedido: {order?.id}</DialogTitle>
            <DialogDescription>Detalhes do pedido</DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            <Table>
              <TableRow>
                <TableCell className="text-muted-foreground">Status</TableCell>
                <TableCell className="flex justify-end">
                  <OrderStatus status={order?.status} />
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="text-muted-foreground">Cliente</TableCell>
                <TableCell className="flex justify-end">
                  {order?.customer?.name}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="text-muted-foreground">
                  Telefone
                </TableCell>
                <TableCell className="flex justify-end">
                  {order?.customer?.phone || '-'}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="text-muted-foreground">E-mail</TableCell>
                <TableCell className="flex justify-end">
                  {order?.customer?.email}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="text-muted-foreground">
                  Realizado há
                </TableCell>
                <TableCell className="flex justify-end">
                  {formatDistanceToNow(order?.createdAt, {
                    locale: ptBR,
                    addSuffix: true,
                  })}
                </TableCell>
              </TableRow>
            </Table>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Produto</TableHead>
                  <TableHead className="text-right">Qtd.</TableHead>
                  <TableHead className="text-right">Preço</TableHead>
                  <TableHead className="text-right">Sub total</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {order?.orderItems?.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.product.name}</TableCell>
                    <TableCell className="text-right">
                      {item.quantity}
                    </TableCell>
                    <TableCell className="text-right">
                      {(item.priceInCents / 100).toLocaleString('pt-br', {
                        style: 'currency',
                        currency: 'BRL',
                      })}
                    </TableCell>
                    <TableCell className="text-right">
                      {(
                        (item.priceInCents / 100) *
                        item.quantity
                      ).toLocaleString('pt-br', {
                        style: 'currency',
                        currency: 'BRL',
                      })}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableCell colSpan={3}>Total do pedido</TableCell>
                <TableCell className="text-right font-medium">
                  {(order?.totalInCents / 100).toLocaleString('pt-br', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </TableCell>
              </TableFooter>
            </Table>
          </div>
        </>
      )}
    </DialogContent>
  );
};
