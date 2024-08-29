import { IAddressBilling } from '@/@types/client';
import Input from '@/components/utilities/input';
import Textarea from '@/components/utilities/textarea';
import {
  addressSchema,
  IAddressSchema,
} from '@/components/validations/address-schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

interface IAddressBillingProps {
  addressBilling: IAddressBilling[];
  setAddressBilling: React.Dispatch<React.SetStateAction<IAddressBilling[]>>;
}

export default function AddressBilling({
  addressBilling,
  setAddressBilling,
}: IAddressBillingProps) {
  const {
    register,
    formState: { errors },
    reset,
    getValues,
  } = useForm<IAddressSchema>({
    resolver: yupResolver(addressSchema),
  });

  const handleAddAddress = () => {
    const newAddress = getValues();

    const addressBillingWithId: IAddressBilling = {
      id: Math.ceil(Math.random() * 10000),
      ...newAddress,
    };

    setAddressBilling([...addressBilling, addressBillingWithId]);
    reset();
  };

  return (
    <div>
      <div className="space-y-4 mt-2">
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
