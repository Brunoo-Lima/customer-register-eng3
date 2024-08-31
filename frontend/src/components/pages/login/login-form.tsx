import { SubmitHandler, useForm } from 'react-hook-form';
import { useAuth } from '../../../hooks/useAuth';
import { ILoginForm, LoginSchema } from '../../../validations/login-schema';
import { yupResolver } from '@hookform/resolvers/yup';

interface ILoginProps {
  create: () => void;
}

export default function LoginForm({ create }: ILoginProps) {
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ILoginForm>({
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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col w-[300px] space-y-5"
    >
      <div className="flex flex-col">
        <label htmlFor="">Usuário</label>
        <input
          className="text-black rounded-md"
          type="text"
          placeholder="Digite seu nome"
          {...register('user')}
        />
        {errors.user && <span className="text-xs">{errors.user.message}</span>}
      </div>

      <div className="flex flex-col">
        <label htmlFor="">Senha</label>
        <input
          className="text-black rounded-md"
          type="password"
          placeholder="Digite sua senha"
          {...register('password')}
        />
        {errors.password && (
          <span className="text-xs">{errors.password.message}</span>
        )}
      </div>

      <div>
        <p className="text-sm">
          Não tem acesso?
          <span onClick={create} className="text-indigo-500 cursor-pointer">
            {' '}
            Crie uma conta!
          </span>
        </p>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-blue-500 text-white h-10 rounded-md hover:bg-blue-700/80 transition duration-300"
      >
        Entrar
      </button>
    </form>
  );
}
