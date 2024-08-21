import * as yup from 'yup';

export type ILoginForm = yup.InferType<typeof LoginSchema>;

export const LoginSchema = yup.object({
  user: yup.string().required('Usuário é obrigatório'),
  password: yup
    .string()
    .required('Senha é obrigatória')
    .min(8, 'Senha deve ter pelo menos 8 caracteres'),
});
