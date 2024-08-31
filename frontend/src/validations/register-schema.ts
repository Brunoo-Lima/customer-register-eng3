import * as yup from 'yup';

export type IRegisterForm = yup.InferType<typeof RegisterSchema>;

export const RegisterSchema = yup.object({
  name: yup.string().required('Nome é obrigatório'),
  password: yup.string().required('Senha é obrigatória'),
  confirmPassword: yup
    .string()
    .required('Confirmação de senha é obrigatório')
    .oneOf([yup.ref('password')], 'As senhas devem ser iguais'),
});
