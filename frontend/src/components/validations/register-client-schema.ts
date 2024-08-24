import * as yup from 'yup';

export type IRegisterClientForm = yup.InferType<typeof RegisterClientSchema>;

export const RegisterClientSchema = yup.object({
  name: yup.string().required('Nome é obrigatório'),
  cpf: yup.string().required('CPF é obrigatório'),
  typePhone: yup
    .string()
    .required('Obrigatório a escolha de um tipo de telefone'),
  phone: yup.string().required('Telefone é obrigatório'),
  gender: yup.string().required('Gênero é obrigatório'),
  dateOfBirth: yup.string().required('Data de nascimento é obrigatório'),
  neighborhood: yup.string().required('Bairro é obrigatório'),
  street: yup.string().required('Rua é obrigatório'),
  number: yup.string().required('Número é obrigatório'),
  zipCode: yup.string().required('CEP é obrigatório'),
  city: yup.string().required('Cidade é obrigatório'),
  state: yup.string().required('Estado é obrigatório'),
  country: yup.string().required('País é obrigatório'),
  observation: yup.string().optional(),
});
