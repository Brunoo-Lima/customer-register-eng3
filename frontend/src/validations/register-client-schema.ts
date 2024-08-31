import * as yup from 'yup';
import { addressDeliverySchema, addressSchema } from './address-schema';
import { creditCardSchema } from './credit-card-schema';

export type IRegisterClientForm = yup.InferType<typeof RegisterClientSchema>;

export const RegisterClientSchema = yup.object({
  name: yup.string().required('Nome é obrigatório'),
  cpf: yup.string().required('CPF é obrigatório'),
  dateOfBirth: yup.string().required('Data de nascimento é obrigatório'),
  typePhone: yup
    .string()
    .required('Obrigatório a escolha de um tipo de telefone'),
  phone: yup.string().required('Telefone é obrigatório'),
  gender: yup.string().required('Gênero é obrigatório'),
  residentialAddress: addressSchema,
  deliveryAddress: yup
    .array()
    .of(addressDeliverySchema)
    .min(1, 'É necessário pelo menos um endereço de entrega'),
  billingAddress: yup
    .array()
    .of(addressSchema)
    .min(1, 'É necessário pelo menos um endereço de cobrança'),
  creditCard: yup
    .array()
    .of(creditCardSchema)
    .min(1, 'É necessário pelo menos um cartão de crédito'),
  status: yup.string().default('Ativo'),
  email: yup.string().email().required('E-mail é obrigatório'),
  password: yup
    .string()
    .required('Senha é obrigatório')
    .min(8, 'A senha deve ter no mínimo 8 caracteres')
    .matches(/[a-z]/, 'A senha deve conter pelo menos uma letra minúscula')
    .matches(/[A-Z]/, 'A senha deve conter pelo menos uma letra maiúscula')
    .matches(/\d/, 'A senha deve conter pelo menos um número')
    .matches(
      /[@$!%*?&#]/,
      'A senha deve conter pelo menos um caractere especial (@$!%*?&#)'
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Senhas não são iguais')
    .required('Confirmação de senha é obrigatório'),
});
