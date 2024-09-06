import { Button } from '@/components/ui/button';
import { TableCell, TableRow } from '@/components/ui/table';
import { ArrowRight, X } from 'lucide-react';
import { OrderDetails } from './order-details';

export interface IOrderTableRowProps {}

export const OrderTableRow = () => {
  return (
    <TableRow>
      <TableCell>
        <OrderDetails />
      </TableCell>

      <TableCell className="font-mono text-xs font-medium">
        656ds56d5s65d6s5ds6d56
      </TableCell>

      <TableCell className="text-muted-foreground">há 15 minutos</TableCell>

      <TableCell>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-slate-400" />
          <span className="font-medium text-muted-foreground">Pendente</span>
        </div>
      </TableCell>

      <TableCell className="font-medium">William Gabriel</TableCell>

      <TableCell className="font-medium">R$ 149,90</TableCell>

      <TableCell>
        <Button variant={'outline'} size={'xs'}>
          <ArrowRight className="mr-2 h-3 w-3" />
          Aprovar
        </Button>
      </TableCell>

      <TableCell>
        <Button variant={'ghost'} size={'xs'}>
          <X className="mr-2 h-3 w-3" />
          Cancelar
        </Button>
      </TableCell>
    </TableRow>
  );
};
