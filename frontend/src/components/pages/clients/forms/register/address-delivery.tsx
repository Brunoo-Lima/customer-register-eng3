import Input from '@/components/utilities/input';
import Textarea from '@/components/utilities/textarea';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface IAddressDeliverySchema {
  name: string;
  neighborhood: string;
  street: string;
  publicPlace: string;
  number: string;
  zipCode: string;
  city: string;
  state: string;
  country: string;
  observation?: string;
}

export default function AddressDelivery() {
  const [savedAddress, setSavedAddress] = useState<IAddressDeliverySchema[]>(
    []
  );
  const [activeAddress, setActiveAddress] = useState<number | null>(null);

  const {
    register,
    formState: { errors },
    reset,
    getValues,
  } = useForm<IAddressDeliverySchema>();

  const handleAddAddress = () => {
    const newAddress = getValues();
    setSavedAddress([...savedAddress, newAddress]);
    reset();
  };

  const handleAddressClick = (index: number) => {
    setActiveAddress(activeAddress === index ? null : index);
  };

  return (
    <div>
      <ul>
        {savedAddress.map((address, index) => (
          <li key={index} className="mb-2">
            <button
              className="bg-blue-600 p-2 w-full text-left rounded-md"
              type="button"
              onClick={() => handleAddressClick(index)}
            >
              {address.name || `Endereço de entrega ${index + 1}`}
            </button>
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
