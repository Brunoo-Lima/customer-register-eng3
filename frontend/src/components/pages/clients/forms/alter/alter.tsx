'use client';

import { IAddressBilling, IAddressDelivery } from '@/@types/client';
import { ICreditCard } from '@/@types/credit-card';
import Input from '@/components/ui/input';
import Radio from '@/components/ui/radio';
import { clientsList } from '@/mocks/clientsList';
import {
  IRegisterClientForm,
  RegisterClientSchema,
} from '@/validations/register-client-schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import Address from './address';
import { XIcon } from 'lucide-react';
import AddressDelivery from './address-delivery';
import Button from '@/components/ui/button';
import AddressBilling from './address-billing';
import CreditCard from './credit-card';

export default function AlterClientForm() {
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
    setValue,
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
  const [activeAddressDelivery, setActiveAddressDelivery] = useState<
    number | null
  >(null);

  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    const client = clientsList.find((client) => client.id === Number(id));

    if (client) {
      setValue('name', client.name);
      setValue('cpf', client.cpf);
      setValue('typePhone', client.typePhone);
      setValue('phone', client.phone);
      setValue('dateOfBirth', client.dateOfBirth);
      setValue('gender', client.gender);
      setValue('residentialAddress.neighborhood', client.address.neighborhood);
      setValue('residentialAddress.street', client.address.street);
      setValue('residentialAddress.publicPlace', client.address.publicPlace);
      setValue('residentialAddress.number', client.address.number.toString());
      setValue('residentialAddress.zipCode', client.address.zipCode);
      setValue('residentialAddress.city', client.address.city);
      setValue('residentialAddress.state', client.address.state);
      setValue('residentialAddress.country', client.address.country);
      setValue('residentialAddress.observation', client.address.observation);
      setValue('status', client.status);
    }
  }, [id, setValue]);

  const onSubmit: SubmitHandler<IRegisterClientForm> = () => {
    router.replace('/clientes');
  };

  const cancelAlterFormsFields = () => {
    router.back();
    reset();
  };

  const handleAddressClick = (index: number) => {
    setActiveAddress(activeAddress === index ? null : index);
  };

  const handleDeleteAddressBilling = (id: number) => {
    setAddressBilling(addressBilling.filter((item) => item.id !== id));
  };

  const handleAddressDeliveryClick = (index: number) => {
    setActiveAddressDelivery(activeAddressDelivery === index ? null : index);
  };

  const handleDeleteAddressDelivery = (id: number) => {
    setAddressDelivery(addressDelivery.filter((item) => item.id !== id));
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

            <div>
              <p className="block text-sm font-medium text-white">
                Status do cliente
              </p>
              <Radio label="Ativo" value="Ativo" {...register('status')} />
              <Radio label="Inativo" value="Inativo" {...register('status')} />
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
              <Address />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold my-2">
                Endereço de entrega
              </h3>

              <ul>
                {addressDelivery.map((address, index) => (
                  <li key={index} className="mb-2">
                    <div
                      className="bg-blue-600 p-2 w-full text-left rounded-md cursor-pointer flex justify-between items-center"
                      onClick={() => handleAddressDeliveryClick(index)}
                    >
                      {address.name || `Endereço de entrega ${index + 1}`}

                      <button
                        className="z-10"
                        type="button"
                        onClick={() => handleDeleteAddressDelivery(address.id)}
                      >
                        <XIcon size={18} color="#fff" />
                      </button>
                    </div>
                    {activeAddressDelivery === index && (
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

              {isAddAddressDelivery && (
                <AddressDelivery
                  addressDelivery={addressDelivery}
                  setAddressDelivery={setAddressDelivery}
                />
              )}

              <Button
                type="button"
                size="sm"
                color="addFields"
                onClick={() => setIsAddAddressDelivery(!isAddAddressDelivery)}
              >
                Adicionar endereço
              </Button>
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

                <Button
                  type="button"
                  size="sm"
                  color="addFields"
                  onClick={() => setIsAddAddressBilling(!isAddAddressBilling)}
                >
                  Adicionar endereço
                </Button>
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

                <Button
                  type="button"
                  size="sm"
                  color="addFields"
                  onClick={() => setIsAddCreditCard(!isAddCreditCard)}
                >
                  Adicionar cartão
                </Button>
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <Button type="submit" size="default" color="primary">
                Salvar alteração
              </Button>

              <Button
                type="button"
                size="default"
                onClick={cancelAlterFormsFields}
                color="empty"
                className="border-[1px] border-blue-700"
              >
                Cancelar
              </Button>
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
