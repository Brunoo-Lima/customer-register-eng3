import * as yup from 'yup';

export const addressSchema = yup.object({
  neighborhood: yup.string().required('Bairro é obrigatório'),
  publicPlace: yup.string().required('Logradouro é obrigatório'),
  street: yup.string().required('Rua é obrigatório'),
  number: yup.string().required('Número é obrigatório'),
  zipCode: yup.string().required('CEP é obrigatório'),
  city: yup.string().required('Cidade é obrigatório'),
  state: yup.string().required('Estado é obrigatório'),
  country: yup.string().required('País é obrigatório'),
  observation: yup.string().optional(),
});

export type IAddressDeliverySchema = yup.InferType<
  typeof addressDeliverySchema
>;

export const addressDeliverySchema = addressSchema.shape({
  name: yup.string().required('Nome é obrigatório'),
});
