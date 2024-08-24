export interface IAddress {
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  publicPlace: string;
  country: string;
}

export interface IClient {
  id: number;
  name: string;
  email: string;
  dateOfBirth: string;
  cpf: string;
  typePhone: string;
  phone: string;
  ranking: number;
  gender: string;
  status: 'active' | 'inactive' | string;
  address: IAddress;
  observation?: string;
}
