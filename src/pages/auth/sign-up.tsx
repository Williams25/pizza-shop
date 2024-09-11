import { registerRestaurant } from '@/api/register-restaurant';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Label } from '@radix-ui/react-label';
import { useMutation } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { z } from 'zod';

const SignUpForm = z.object({
  email: z.string().email(),
  restaurantName: z.string().min(1),
  managerName: z.string().min(1),
  phone: z.string().min(11).max(11),
});

type SignUpFormData = z.infer<typeof SignUpForm>;

export const SignUp = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignUpFormData>({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(SignUpForm),
  });

  const { mutateAsync: registerRestaurantFn } = useMutation({
    mutationFn: registerRestaurant,
  });

  const handleSignUp = async (data: SignUpFormData) => {
    try {
      await registerRestaurantFn(data);
      toast.success(`Restaurante cadastrado com sucesso!`, {
        action: {
          label: 'Login',
          onClick: () => navigate(`/sign-in?email=${data.email}`),
        },
      });
    } catch {
      toast.error(`Erro ao cadastrar restaurante - ${data.restaurantName}`);
    }
  };

  return (
    <div className="p-8">
      <Helmet title="Cadastro" />
      <Button asChild className="absolute right-8 top-8" variant={'outline'}>
        <Link to={'/sign-in'}>Fazer login</Link>
      </Button>

      <div className="flex w-[350px] flex-col justify-center gap-6">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Criar conta grátis
          </h1>
          <p className="text-sm text-muted-foreground">
            Seja um parceiro e comece suas vendas!
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit(handleSignUp)}>
          <div className="space-y-2">
            <Label htmlFor="restaurantName">Nome do estabelecimento</Label>
            <Input
              id="restaurantName"
              type="text"
              {...register('restaurantName', { disabled: isSubmitting })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="managerName">Seu nome</Label>
            <Input
              id="managerName"
              type="text"
              {...register('managerName', { disabled: isSubmitting })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Seu e-mail</Label>
            <Input
              id="email"
              type="email"
              {...register('email', { disabled: isSubmitting })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Seu celular</Label>
            <Input
              id="phone"
              type="tel"
              {...register('phone', { disabled: isSubmitting })}
            />
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Finalizando cadastro...' : 'Finalizar cadastro'}
          </Button>

          <p className="px-6 text-center text-sm leading-relaxed text-muted-foreground">
            Ao continuar, você concorda com nossos{' '}
            <a href="" className="underline underline-offset-4">
              Termos de serviço
            </a>{' '}
            e{' '}
            <a href="" className="underline underline-offset-4">
              políticas de privacidade
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};
