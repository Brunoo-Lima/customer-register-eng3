import { IAddressDelivery } from '@/@types/client';
import Input from '@/components/utilities/input';
import Textarea from '@/components/utilities/textarea';
import { IAddressDeliverySchema } from '@/components/validations/address-schema';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

interface IAddressDeliveryProps {
  addressDelivery: IAddressDelivery[];
  setAddressDelivery: React.Dispatch<React.SetStateAction<IAddressDelivery[]>>;
}

export default function AddressDelivery({
  addressDelivery,
  setAddressDelivery,
}: IAddressDeliveryProps) {
  const {
    register,
    formState: { errors },
    reset,
    getValues,
  } = useForm<IAddressDeliverySchema>();

  const handleAddAddress = () => {
    const newAddress = getValues();

    const addressDeliveryWithId: IAddressDelivery = {
      id: Math.ceil(Math.random() * 10000),
      ...newAddress,
    };

    setAddressDelivery([...addressDelivery, addressDeliveryWithId]);
    reset();
  };

  return (
    <div>
      <div className="space-y-4 mt-2">
        <Input
          type="text"
          label="Nome do Endereço"
          placeholder="Nome curto para identificar o endereço"
          {...register('name')}
          error={errors.name}
        />
        <div className="space-y-4">
          <Input
            type="text"
            label="Bairro"
            placeholder="Digite o nome do bairro"
            {...register('neighborhood')}
            error={errors.neighborhood}
          />
          <Input
            type="text"
            label="Rua"
            placeholder="Digite o nome da rua"
            {...register('street')}
            error={errors.street}
          />
          <div className="grid md:grid-cols-2 md:gap-6">
            <Input
              type="text"
              label="Logradouro"
              placeholder="Digite o logradouro"
              {...register('publicPlace')}
              error={errors.publicPlace}
            />
            <Input
              type="number"
              label="Número"
              placeholder="Digite o número"
              {...register('number')}
              error={errors.number}
            />
          </div>
          <div className="grid md:grid-cols-2 md:gap-6">
            <Input
              type="text"
              label="CEP"
              placeholder="00000-000"
              {...register('zipCode')}
              error={errors.zipCode}
            />
            <Input
              type="text"
              label="Cidade"
              placeholder="Digite a cidade"
              {...register('city')}
              error={errors.city}
            />
          </div>
          <div className="grid md:grid-cols-2 md:gap-6">
            <Input
              type="text"
              label="Estado"
              placeholder="Digite o estado"
              {...register('state')}
              error={errors.state}
            />
            <Input
              type="text"
              label="País"
              placeholder="Digite o país"
              {...register('country')}
              error={errors.country}
            />
          </div>
          <Textarea
            label="Observações"
            placeholder="Digite sua observação (opcional)"
            {...register('observation')}
            error={errors.observation}
          />
        </div>
        <button type="button" onClick={handleAddAddress}>
          Adicionar
        </button>
      </div>
    </div>
  );
}
