import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { Search, X } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import { z } from 'zod';

const orderFilterSchema = z.object({
  orderId: z.string().optional(),
  customerName: z.string().optional(),
  status: z.string().optional(),
});

type OrderFilterSchema = z.infer<typeof orderFilterSchema>;

export const OrderTableFilters = () => {
  const [params, setParams] = useSearchParams();

  const orderId = params.get('orderId') || '';
  const customerName = params.get('customerName') || '';
  const status = params.get('status') || 'all';

  const { register, handleSubmit, control, reset } = useForm<OrderFilterSchema>(
    {
      resolver: zodResolver(orderFilterSchema),
      defaultValues: {
        customerName,
        orderId,
        status,
      },
    },
  );

  const handleFilter = (data: OrderFilterSchema) => {
    setParams((prev) => {
      if (data.orderId) prev.set('orderId', data.orderId);
      else prev.delete('orderId');

      if (data.customerName) prev.set('customerName', data.customerName);
      else prev.delete('customerName');

      if (data.status) prev.set('status', data.status || '');
      else prev.delete('status');

      prev.set('page', '1');
      return prev;
    });
  };

  const handleRemoveFilters = () => {
    setParams((prev) => {
      prev.delete('orderId');
      prev.delete('customerName');
      prev.delete('status');

      prev.set('page', '1');
      return prev;
    });
    reset({ customerName: '', status: 'all', orderId: '' });
  };

  return (
    <form
      className="flex items-center gap-2"
      onSubmit={handleSubmit(handleFilter)}
    >
      <span className="text-sm font-semibold">Filtros:</span>
      <Input
        placeholder="ID do pedido"
        className="h-8 w-[auto]"
        {...register('orderId')}
      />
      <Input
        placeholder="Nome do cliente"
        className="h-8 w-[320px]"
        {...register('customerName')}
      />
      <Controller
        name="status"
        control={control}
        render={({ field }) => (
          <Select
            defaultValue="all"
            name={field.name}
            onValueChange={field.onChange}
            value={field.value}
            disabled={field.disabled}
          >
            <SelectTrigger className="h-8 w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos status</SelectItem>
              <SelectItem value="pending">Pendente</SelectItem>
              <SelectItem value="canceled">Cancelado</SelectItem>
              <SelectItem value="processing">Em preparo</SelectItem>
              <SelectItem value="delivering">Em entrega</SelectItem>
              <SelectItem value="delivered">Entregue</SelectItem>
            </SelectContent>
          </Select>
        )}
      />

      <Button type="submit" variant={'secondary'} size={'xs'}>
        <Search className="mr-2 h-4 w-4" />
        Filtrar
      </Button>
      <Button
        type="button"
        variant={'outline'}
        size={'xs'}
        onClick={handleRemoveFilters}
      >
        <X className="mr-2 h-4 w-4" />
        Remover filtros
      </Button>
    </form>
  );
};
