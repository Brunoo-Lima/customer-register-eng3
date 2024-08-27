import * as yup from 'yup';

export type ICreditCardSchema = yup.InferType<typeof creditCardSchema>;

export const creditCardSchema = yup.object().shape({
  number: yup.number().required('Número do cartão de crédito é obrigatório.'),
  cvv: yup.number().min(3).required('CVV é obrigatório.'),
  nameCreditCard: yup
    .string()
    .required('Nome no cartão de crédito é obrigatório.'),
  dateExpired: yup.string().required('Data de validade é obrigatório.'),
  flag: yup.string().required('Escolha da bandeira é obrigatório.'),
});
