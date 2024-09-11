import { StatusOrder } from '@/api/get-orders';

export interface IOrderStatusProps {
  status: StatusOrder;
}

const orderStatusMap: Record<StatusOrder, string> = {
  canceled: 'Cancelado',
  delivered: 'Entregue',
  delivering: 'Em entrega',
  pending: 'Pendente',
  processing: 'Em preparo',
};

const orderStatusColorMap: Record<StatusOrder, string> = {
  canceled: 'bg-rose-500',
  delivered: 'bg-emerald-500',
  delivering: 'bg-amber-400',
  pending: 'bg-slate-400',
  processing: 'bg-amber-400',
};

export const OrderStatus = ({ status }: IOrderStatusProps) => {
  return (
    <div className="flex items-center gap-2">
      <span className={`h-2 w-2 rounded-full ${orderStatusColorMap[status]}`} />
      <span className="font-medium text-muted-foreground">
        {orderStatusMap[status]}
      </span>
    </div>
  );
};
