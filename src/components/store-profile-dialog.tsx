import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button } from './ui/button';
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import {
  getManagedRestaurant,
  GetManagedRestaurantResponse,
} from '@/api/get-managed-restaurant';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateProfile } from '@/api/update-profile';
import { toast } from 'sonner';

const storeProfileSchema = z.object({
  name: z.string().min(1),
  description: z.string(),
});

type StoreProfileSchema = z.infer<typeof storeProfileSchema>;

export const StoreProfileDialog = () => {
  const queryClient = useQueryClient();

  const { data: managedRestaurant } = useQuery({
    queryKey: ['getManagedRestaurant'],
    queryFn: getManagedRestaurant,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm<StoreProfileSchema>({
    resolver: zodResolver(storeProfileSchema),
    values: {
      description: managedRestaurant?.description || '',
      name: managedRestaurant?.name || '',
    },
  });

  const updateManageRestaurantCache = ({
    description,
    name,
  }: StoreProfileSchema) => {
    const cached = queryClient.getQueryData<GetManagedRestaurantResponse>([
      'getManagedRestaurant',
    ]);

    if (!cached) return;

    const newCached: GetManagedRestaurantResponse = {
      ...cached,
      description,
      name,
    };

    queryClient.setQueryData<GetManagedRestaurantResponse>(
      ['getManagedRestaurant'],
      newCached,
    );

    return { cached, newCached };
  };

  const { mutateAsync: updateProfileFn } = useMutation({
    mutationFn: updateProfile,
    onMutate({ description, name }) {
      return updateManageRestaurantCache({ description, name });
    },
    onError(_, __, context) {
      if (!context) return;
      const { cached } = context;
      updateManageRestaurantCache(cached);
    },
  });

  const handleUpdateProfile = async (data: StoreProfileSchema) => {
    try {
      await updateProfileFn(data);
      toast.success('Perfil autalizado');
    } catch {
      toast.success('Falha ao atualizar o perfil, tente novamente');
    }
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Perfil da loja</DialogTitle>
        <DialogDescription>
          Atualize as informações do seu estabelecimento visíveis ao seu cliente
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit(handleUpdateProfile)}>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nome
            </Label>
            <Input id="name" className="col-span-3" {...register('name')} />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Descrição
            </Label>
            <Textarea
              id="description"
              className="col-span-3"
              {...register('description')}
            />
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant={'ghost'} type="button" disabled={isSubmitting}>
              Cancelar
            </Button>
          </DialogClose>

          <Button type="submit" variant={'success'} disabled={isSubmitting}>
            {isSubmitting ? 'Salvando...' : 'Salvar'}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};
