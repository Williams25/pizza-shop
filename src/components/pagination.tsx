import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';
import { Button } from './ui/button';

export interface IPaginationProps {
  pageIndex: number;
  totalCount: number;
  perPage: number;
  onPageChange: (page: number) => Promise<void> | void;
  disabled?: boolean;
}

export const Pagination = ({
  pageIndex,
  perPage,
  totalCount,
  onPageChange,
  disabled,
}: IPaginationProps) => {
  const pages = Math.ceil(totalCount / perPage) || 1;

  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-muted-foreground">
        Total de {totalCount} item(s)
      </span>

      <div className="flex items-center gap-6 lg:gap-8">
        <div className="text-sm font-medium">
          Página {pageIndex + 1} de {pages}
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant={'outline'}
            className="h-8 w-8 p-0"
            onClick={() => onPageChange(0)}
            disabled={disabled || pageIndex === 0}
          >
            <ChevronsLeft />
            <span className="sr-only">Primeira página</span>
          </Button>

          <Button
            variant={'outline'}
            className="h-8 w-8 p-0"
            onClick={() => onPageChange(pageIndex - 1)}
            disabled={disabled || pageIndex === 0}
          >
            <ChevronLeft />
            <span className="sr-only">Página anterior</span>
          </Button>

          <Button
            variant={'outline'}
            className="h-8 w-8 p-0"
            onClick={() => onPageChange(pageIndex + 1)}
            disabled={disabled || pages - 1 === pageIndex}
          >
            <ChevronRight />
            <span className="sr-only">Próxima página</span>
          </Button>

          <Button
            variant={'outline'}
            className="h-8 w-8 p-0"
            onClick={() => onPageChange(pages - 1)}
            disabled={disabled || pages - 1 === pageIndex}
          >
            <ChevronsRight />
            <span className="sr-only">Última página</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
