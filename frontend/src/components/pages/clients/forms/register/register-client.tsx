'use client';

import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Textarea from '@/components/utilities/textarea';
import {
  IRegisterClientForm,
  RegisterClientSchema,
} from '@/components/validations/register-client-schema';
import Radio from '@/components/utilities/radio';
import Input from '@/components/utilities/input';
import DatePicker from '@/components/utilities/date-picker';
import AddressDelivery from './address-delivery';
import { useState } from 'react';
import AddressBilling from './address-billing';
import CreditCard from './credit-card';
import { IAddressBilling, IAddressDelivery } from '@/@types/client';
import { XIcon } from 'lucide-react';
import { ICreditCard } from '@/@types/credit-card';

export default function RegisterClient() {
  const methods = useForm<IRegisterClientForm>({
    resolver: yupResolver(RegisterClientSchema),
    defaultValues: {
      deliveryAddress: [],
      billingAddress: [],
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = methods;

  const [isAddAddressDelivery, setIsAddAddressDelivery] = useState(false);
  const [isAddAddressBilling, setIsAddAddressBilling] = useState(false);
  const [isAddCreditCard, setIsAddCreditCard] = useState(false);
  const [creditCardList, setCreditCardList] = useState<ICreditCard[]>([]);
  const [activeCreditCard, setActiveCreditCard] = useState<number | null>(null);
  const [addressBilling, setAddressBilling] = useState<IAddressBilling[]>([]);
  const [activeAddress, setActiveAddress] = useState<number | null>(null);
  const [addressDelivery, setAddressDelivery] = useState<IAddressDelivery[]>(
    []
  );

  const onSubmit: SubmitHandler<IRegisterClientForm> = () => {};

  const clearFormFields = () => {
    reset();
  };

  const handleAddressClick = (index: number) => {
    setActiveAddress(activeAddress === index ? null : index);
  };

  const handleDeleteAddressBilling = (id: number) => {
    setAddressBilling(addressBilling.filter((item) => item.id !== id));
  };

  const handleCreditCardClick = (index: number) => {
    setActiveCreditCard(activeCreditCard === index ? null : index);
  };

  const handleDeleteCreditCard = (id: number) => {
    setCreditCardList(creditCardList.filter((item) => item.id !== id));
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col justify-center gap-8 my-8"
      >
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <Input
              type="text"
              label="Nome completo"
              placeholder="Digite o nome completo"
              error={errors?.name}
              {...register('name')}
            />

            <div className="grid grid-cols-2 gap-2 items-center">
              <Input
                type="text"
                label="CPF"
                placeholder="000.000.000-00"
                {...register('cpf')}
                error={errors?.cpf}
              />

              <Input
                type="date"
                label="Data de nascimento"
                placeholder="dd/MM/aaaa"
                {...register('dateOfBirth')}
                error={errors?.dateOfBirth}
              />
            </div>

            <div className="grid md:grid-cols-2 md:gap-4 items-start">
              <div>
                <p className="block text-sm font-medium text-white">
                  Tipo do telefone:{' '}
                </p>
                <Radio
                  label="Celular"
                  value="Celular"
                  {...register('typePhone')}
                />
                <Radio label="Fixo" value="Fixo" {...register('typePhone')} />

                {errors?.typePhone && (
                  <span className="text-sm text-red-600">
                    {errors.typePhone.message}
                  </span>
                )}
              </div>

              <Input
                type="tel"
                label="Telefone"
                placeholder="(00) 0000-0000"
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                {...register('phone')}
                error={errors?.phone}
              />
            </div>

            <div className="flex flex-col">
              <p className="block text-sm font-medium text-white">Gênero</p>
              <Radio label="Masculino" {...register('gender')} />
              <Radio label="Feminino" {...register('gender')} />

              {errors?.gender && (
                <span className="text-red-600 text-sm">
                  {errors.gender.message}
                </span>
              )}
            </div>

            <Input
              type="email"
              label="E-mail"
              placeholder="Digite o e-mail"
              {...register('email')}
              error={errors?.email}
            />

            <Input
              type="password"
              label="Senha"
              placeholder="Digite a senha"
              {...register('password')}
              error={errors?.password}
            />

            <Input
              type="password"
              label="Confirmação da senha"
              placeholder="Digite a senha novamente"
              {...register('confirmPassword')}
              error={errors?.confirmPassword}
            />

            <div className="space-y-4">
              <div className="my-2">
                <h3 className="text-xl font-semibold">Endereço</h3>
              </div>

              <Input
                type="text"
                label="Bairro"
                placeholder="Digite o nome do bairro"
                {...register('residentialAddress.neighborhood')}
                error={errors?.residentialAddress?.neighborhood}
              />

              <Input
                type="text"
                label="Rua"
                placeholder="Digite o nome da rua"
                {...register('residentialAddress.street')}
                error={errors?.residentialAddress?.street}
              />

              <div className="grid md:grid-cols-2 md:gap-6">
                <Input
                  type="text"
                  label="Logradouro"
                  placeholder="Digite o logradouro"
                  {...register('residentialAddress.publicPlace')}
                  error={errors?.residentialAddress?.publicPlace}
                />
                <Input
                  type="number"
                  label="Número"
                  placeholder="Digite o número"
                  {...register('residentialAddress.number')}
                  error={errors?.residentialAddress?.number}
                />
              </div>
              <div className="grid md:grid-cols-2 md:gap-6">
                <Input
                  type="text"
                  label="CEP"
                  placeholder="00000-000"
                  {...register('residentialAddress.zipCode')}
                  error={errors?.residentialAddress?.zipCode}
                />
                <Input
                  type="text"
                  label="Cidade"
                  placeholder="Digite a cidade"
                  {...register('residentialAddress.city')}
                  error={errors?.residentialAddress?.city}
                />
              </div>

              <div className="grid md:grid-cols-2 md:gap-6">
                <Input
                  type="text"
                  label="Estado"
                  placeholder="Digite o estado"
                  {...register('residentialAddress.state')}
                  error={errors?.residentialAddress?.state}
                />
                <Input
                  type="text"
                  label="País"
                  placeholder="Digite o país"
                  {...register('residentialAddress.country')}
                  error={errors?.residentialAddress?.country}
                />
              </div>

              <div>
                <Textarea
                  label="Observações"
                  placeholder="Digite sua observação (opcional)"
                  {...register('residentialAddress.observation')}
                  error={errors?.residentialAddress?.observation}
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold my-2">
                Endereço de entrega
              </h3>

              {isAddAddressDelivery && <AddressDelivery />}

              <button
                type="button"
                onClick={() => setIsAddAddressDelivery(!isAddAddressDelivery)}
                className="bg-blue-500 p-2"
              >
                Adicionar endereço
              </button>
            </div>

            <div>
              <h3 className="text-xl font-semibold my-2">
                Endereço de cobrança
              </h3>

              <div>
                <ul>
                  {addressBilling.map((address, index) => (
                    <li key={index} className="mb-2">
                      <div
                        className="bg-blue-600 p-2 w-full text-left rounded-md cursor-pointer flex justify-between items-center"
                        onClick={() => handleAddressClick(index)}
                      >
                        {`Endereço de cobrança ${index + 1}`}

                        <button
                          className="z-10"
                          type="button"
                          onClick={() => handleDeleteAddressBilling(address.id)}
                        >
                          <XIcon size={18} color="#fff" />
                        </button>
                      </div>
                      {activeAddress === index && (
                        <div className="bg-zinc-800 border-[1px] rounded-md border-gray-500 p-2 grid grid-cols-2 my-2">
                          <p>Rua: {address.street}</p>
                          <p>Bairro: {address.neighborhood}</p>
                          <p>CEP: {address.zipCode}</p>
                          <p>Cidade: {address.city}</p>
                          <p>Estado: {address.state}</p>
                          <p>País: {address.country}</p>
                          <p>Observação: {address.observation}</p>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>

                {isAddAddressBilling && (
                  <AddressBilling
                    addressBilling={addressBilling}
                    setAddressBilling={setAddressBilling}
                  />
                )}

                <button
                  type="button"
                  onClick={() => setIsAddAddressBilling(!isAddAddressBilling)}
                  className="bg-blue-500 p-2"
                >
                  Adicionar endereço
                </button>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold my-2">Cartão de Crédito</h3>

              <div>
                {creditCardList.map((credit, index) => (
                  <li key={index} className="mb-2 list-none">
                    <div
                      className="bg-blue-600 p-2 w-full text-left rounded-md cursor-pointer flex justify-between items-center"
                      onClick={() => handleCreditCardClick(index)}
                    >
                      {`Cartão ${index + 1}`}

                      <button
                        className="z-10"
                        type="button"
                        onClick={() => handleDeleteCreditCard(credit.id)}
                      >
                        <XIcon size={18} color="#fff" />
                      </button>
                    </div>
                    {activeCreditCard === index && (
                      <div className="bg-zinc-800 border-[1px] rounded-md border-gray-500 p-2 grid grid-cols-2 my-2">
                        <p>Bandeira do cartão: {credit.flag}</p>
                        <p>N° do cartão: {credit.number}</p>
                        <p>CVV: {credit.cvv}</p>
                        <p>Nome: {credit.nameCreditCard}</p>
                        <p>Expira: {credit.dateExpired}</p>
                      </div>
                    )}
                  </li>
                ))}

                {isAddCreditCard && (
                  <CreditCard
                    creditCardList={creditCardList}
                    setCreditCardList={setCreditCardList}
                  />
                )}

                <button
                  type="button"
                  onClick={() => setIsAddCreditCard(!isAddCreditCard)}
                  className="bg-blue-500 p-2"
                >
                  Adicionar cartão
                </button>
              </div>
            </div>

            <div className="flex gap-4 justify-center">
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm max-w-fit px-5 py-2.5 text-center border-transparent"
              >
                Adicionar cliente
              </button>

              <button
                type="button"
                onClick={clearFormFields}
                className="text-blue-700 bg-white border-[1px] border-blue-700 font-medium rounded-lg text-sm max-w-fit px-5 py-2.5 text-center"
              >
                Limpar campos
              </button>
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
