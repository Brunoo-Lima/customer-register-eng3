'use client';

import { useAuth } from '@/components/hooks/useAuth';
import { ILoginForm, LoginSchema } from '@/components/validations/login-schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';

export default function Home() {
  const { login } = useAuth();
  const { register, handleSubmit } = useForm<ILoginForm>({
    resolver: yupResolver(LoginSchema),
  });

  const onSubmit: SubmitHandler<ILoginForm> = async (form) => {
    try {
      await login(form.user, form.password);
    } catch (err: any) {
      console.log(err);
    }
  };
  return (
    <section>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="">Usuário</label>
          <input
            type="text"
            placeholder="Digite seu nome"
            {...register('user')}
          />
        </div>

        <div>
          <label htmlFor="">Senha</label>
          <input
            type="password"
            placeholder="Digite sua senha"
            {...register('password')}
          />
        </div>

        <button type="submit">Entrar</button>
      </form>
    </section>
  );
}
