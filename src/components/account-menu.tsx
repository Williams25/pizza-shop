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
import { useMutation, useQuery } from '@tanstack/react-query';
import { getProfile } from '@/api/get-profile';
import { Skeleton } from './ui/skeleton';
import { Dialog, DialogTrigger } from './ui/dialog';
import { StoreProfileDialog } from './store-profile-dialog';
import { getManagedRestaurant } from '@/api/get-managed-restaurant';
import { signOut } from '@/api/sign-out';
import { useNavigate } from 'react-router-dom';

export const AccountMenu = () => {
  const navigate = useNavigate();
  const { data: profile, isLoading: isLoadingProfile } = useQuery({
    queryKey: ['getProfile'],
    queryFn: getProfile,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  const { data: managedRestaurant, isLoading: isLoadingManagedRestaurant } =
    useQuery({
      queryKey: ['getManagedRestaurant'],
      queryFn: getManagedRestaurant,
      staleTime: Infinity,
      refetchOnWindowFocus: false,
    });

  const { mutateAsync: signOutFn, isPending: isSigningOut } = useMutation({
    mutationFn: signOut,
    onSuccess() {
      navigate('/sign-in', { replace: true });
    },
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
            <ChevronDown className="ml-2 h-4 w-4" />
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

          <DropdownMenuItem
            asChild
            className="text-rose-500 dark:text-rose-400"
            disabled={isSigningOut}
          >
            <button onClick={() => signOutFn()} className="w-full">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sair</span>
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <StoreProfileDialog />
    </Dialog>
  );
};
