import { Building, ChevronDown, LogOut } from 'lucide-react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { useQuery } from '@tanstack/react-query';
import { getProfile } from '@/api/get-profile';
import { Skeleton } from './ui/skeleton';
import { Dialog, DialogTrigger } from './ui/dialog';
import { StoreProfileDialog } from './store-profile-dialog';
import { getManagedRestaurant } from '@/api/get-managed-restaurant';

export const AccountMenu = () => {
  const { data: profile, isLoading: isLoadingProfile } = useQuery({
    queryKey: ['getProfile'],
    queryFn: getProfile,
  });

  const { data: managedRestaurant, isLoading: isLoadingManagedRestaurant } =
    useQuery({
      queryKey: ['getManagedRestaurant'],
      queryFn: getManagedRestaurant,
    });

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={'outline'} className="flex select-none items-center">
            {!isLoadingManagedRestaurant ? (
              managedRestaurant?.name
            ) : (
              <Skeleton className="h-4 w-40" />
            )}
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel className="flex flex-col">
            <span>
              {!isLoadingProfile ? (
                profile?.name
              ) : (
                <Skeleton className="h-4 w-40" />
              )}
            </span>
            <span className="text-xs font-normal text-muted-foreground">
              {!isLoadingProfile ? (
                profile?.email
              ) : (
                <Skeleton className="mt-2 h-4 w-40" />
              )}
            </span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DialogTrigger asChild>
            <DropdownMenuItem>
              <Building className="mr-2 h-4 w-4" />
              <span>Perfil da loja</span>
            </DropdownMenuItem>
          </DialogTrigger>

          <DropdownMenuItem className="text-rose-500 dark:text-rose-400">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Sair</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <StoreProfileDialog />
    </Dialog>
  );
};
