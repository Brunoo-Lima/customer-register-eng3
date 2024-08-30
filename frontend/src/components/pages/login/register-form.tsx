import {
  IRegisterForm,
  RegisterSchema,
} from '@/components/validations/register-schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';

interface IRegisterProps {
  back: () => void;
}

export default function RegisterForm({ back }: IRegisterProps) {
  // const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IRegisterForm>({
    resolver: yupResolver(RegisterSchema),
  });

  const onSubmit: SubmitHandler<IRegisterForm> = async (form) => {
    try {
      // await login(form.user, form.password);
      back();
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
          {...register('name')}
        />
        {errors.name && <span className="text-xs">{errors.name.message}</span>}
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

      <div className="flex flex-col">
        <label htmlFor="">Confirmar senha</label>
        <input
          className="text-black rounded-md"
          type="password"
          placeholder="Digite sua senha novamente"
          {...register('confirmPassword')}
        />
        {errors.confirmPassword && (
          <span className="text-xs">{errors.confirmPassword.message}</span>
        )}
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white h-10 rounded-md hover:bg-blue-700/80 transition duration-300"
      >
        Criar conta
      </button>
    </form>
  );
}
