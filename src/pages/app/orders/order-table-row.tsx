import { Button } from '@/components/ui/button';
import { TableCell, TableRow } from '@/components/ui/table';
import { ArrowRight, Search, X } from 'lucide-react';
import { OrderDetails } from './order-details';
import { GetOrdersResponse, Order, StatusOrder } from '@/api/get-orders';
import { OrderStatus } from './order-status';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useMemo, useState } from 'react';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { cancelOrder } from '@/api/cancel-order';
import { approveOrder } from '@/api/approve-order';
import { deliverOrder } from '@/api/deliver-order';
import { dispatchOrder } from '@/api/dispatch-order';

export interface IOrderTableRowProps {
  order: Order;
}

export const OrderTableRow = ({ order }: IOrderTableRowProps) => {
  const [isDetailsOpen, setIsDetailsOpen] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const updateStatusOrderOnCache = (orderId: string, status: StatusOrder) => {
    const cached = queryClient.getQueriesData<GetOrdersResponse>({
      queryKey: ['getOrders'],
    });
    cached.forEach(([cacheKey, cacheData]) => {
      if (!cacheData) return;

      queryClient.setQueryData<GetOrdersResponse>(cacheKey, {
        ...cacheData,
        orders: cacheData.orders.map((order) => ({
          ...order,
          status: order.orderId === orderId ? status : order.status,
        })),
      });
    });
  };

  const { mutateAsync: cancelOrderFn, isPending: isCancelingOrder } =
    useMutation({
      mutationFn: cancelOrder,
      onSuccess: (_, { orderId }) => {
        updateStatusOrderOnCache(orderId, 'canceled');
      },
    });

  const { mutateAsync: approveOrderFn, isPending: isApprovingOrder } =
    useMutation({
      mutationFn: approveOrder,
      onSuccess: (_, { orderId }) => {
        updateStatusOrderOnCache(orderId, 'processing');
      },
    });

  const { mutateAsync: dispatchOrderFn, isPending: isDispatchingOrder } =
    useMutation({
      mutationFn: dispatchOrder,
      onSuccess: (_, { orderId }) => {
        updateStatusOrderOnCache(orderId, 'delivering');
      },
    });

  const { mutateAsync: deliverOrderFn, isPending: isDeliveringOrder } =
    useMutation({
      mutationFn: deliverOrder,
      onSuccess: (_, { orderId }) => {
        updateStatusOrderOnCache(orderId, 'delivered');
      },
    });

  const labelApproveButton = useMemo(() => {
    if (order.status === 'pending') {
      return {
        label: 'Aprovar',
        isPending: isApprovingOrder,
        onMutate: approveOrderFn,
      };
    }

    if (order.status === 'processing') {
      return {
        label: 'Em entrega',
        isPending: isDispatchingOrder,
        onMutate: dispatchOrderFn,
      };
    }

    if (order.status === 'delivering') {
      return {
        label: 'Entregue',
        isPending: isDeliveringOrder,
        onMutate: deliverOrderFn,
      };
    }

    return null;
  }, [order.status, isApprovingOrder, isDeliveringOrder, isDispatchingOrder]);

  return (
    <TableRow>
      <TableCell>
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogTrigger asChild>
            <Button variant={'outline'} size={'xs'}>
              <Search className="h-3 w-3" />
              <span className="sr-only">Detalhes do pedido</span>
            </Button>
          </DialogTrigger>

          <OrderDetails orderId={order.orderId} open={isDetailsOpen} />
        </Dialog>
      </TableCell>

      <TableCell className="font-mono text-xs font-medium">
        {order.orderId}
      </TableCell>

      <TableCell className="text-muted-foreground">
        {formatDistanceToNow(order.createdAt, {
          locale: ptBR,
          addSuffix: true,
        })}
      </TableCell>

      <TableCell>
        <OrderStatus status={order.status} />
      </TableCell>

      <TableCell className="font-medium">{order.customerName}</TableCell>

      <TableCell className="font-medium">
        {order.total.toLocaleString('pt-br', {
          style: 'currency',
          currency: 'BRL',
        })}
      </TableCell>

      <TableCell>
        {labelApproveButton && (
          <Button
            variant={'outline'}
            size={'xs'}
            disabled={labelApproveButton.isPending}
            onClick={() =>
              labelApproveButton.onMutate({ orderId: order.orderId })
            }
          >
            <ArrowRight className="mr-2 h-3 w-3" />
            {labelApproveButton.label}
          </Button>
        )}
      </TableCell>

      <TableCell>
        <Button
          variant={'ghost'}
          size={'xs'}
          disabled={
            !['processing', 'pending'].includes(order.status) ||
            isCancelingOrder
          }
          onClick={() => cancelOrderFn({ orderId: order.orderId })}
        >
          <X className="mr-2 h-3 w-3" />
          Cancelar
        </Button>
      </TableCell>
    </TableRow>
  );
};
