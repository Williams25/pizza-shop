import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Link, useSearchParams } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { signIn } from '@/api/sign-in';

const SignInForm = z.object({
  email: z.string().email(),
});

type SignInFormData = z.infer<typeof SignInForm>;

export const SignIn = () => {
  const [params] = useSearchParams();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignInFormData>({
    values: {
      email: params.get('email') || '',
    },
    resolver: zodResolver(SignInForm),
  });

  const { mutateAsync: authenticate } = useMutation({
    mutationFn: signIn,
  });

  const handleSignIn = async (data: SignInFormData) => {
    try {
      await authenticate({ email: data.email });
      toast.success(
        `Enviamos um link de autenticação para seu e-mail ${data.email}`,
        {
          action: {
            label: 'Reenviar',
            onClick: () => handleSignIn(data),
          },
        },
      );
    } catch {
      toast.error(`Credenciais inválidas`);
    }
  };

  return (
    <div className="p-8">
      <Helmet title="Login" />
      <Button asChild className="absolute right-8 top-8" variant={'outline'}>
        <Link to={'/sign-up'}>Novo estabeleciomento</Link>
      </Button>

      <div className="flex w-[350px] flex-col justify-center gap-6">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Acessar painel
          </h1>
          <p className="text-sm text-muted-foreground">
            Acompanhe suas vendas pelo painel parceiro!
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit(handleSignIn)}>
          <div className="space-y-2">
            <Label htmlFor="email">Seu e-mail</Label>
            <Input
              id="email"
              type="email"
              {...register('email', { disabled: isSubmitting })}
            />
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Acessando painel...' : 'Acessar painel'}
          </Button>
        </form>
      </div>
    </div>
  );
};
