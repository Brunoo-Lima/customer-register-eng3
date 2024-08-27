import { selectFlagCrediCard } from '@/components/mocks/select';
import Input from '@/components/utilities/input';
import SelectForm from '@/components/utilities/select';
import {
  creditCardSchema,
  ICreditCardSchema,
} from '@/components/validations/credit-card-schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface ICreditCard {
  number: number;
  cvv: number;
  nameCreditCard: string;
  dateExpired: string;
  flag: string;
}

export default function CreditCard() {
  const [creditCardList, setCreditCardList] = useState<ICreditCard[]>([]);
  const [activeCreditCard, setActiveCreditCard] = useState<number | null>(null);

  const {
    register,
    formState: { errors },
    reset,
    getValues,
  } = useForm<ICreditCardSchema>({
    resolver: yupResolver(creditCardSchema),
  });

  const handleAddCreditCard = () => {
    const newCreditCard = getValues();
    setCreditCardList([...creditCardList, newCreditCard]);
    reset();
  };

  const handleCreditCardClick = (index: number) => {
    setActiveCreditCard(activeCreditCard === index ? null : index);
  };

  return (
    <div>
      {creditCardList.map((credit, index) => (
        <li key={index} className="mb-2 list-none">
          <button
            className="bg-blue-600 p-2 w-full text-left rounded-md"
            type="button"
            onClick={() => handleCreditCardClick(index)}
          >
            {`Cartão ${index + 1}`}
          </button>
          {activeCreditCard === index && (
            <div className="bg-zinc-800 border-[1px] rounded-md border-gray-500 p-2 grid grid-cols-2 my-2">
              <p>Bandeira do cartão: {credit.flag}</p>
              <p>Número do cartão: {credit.number}</p>
              <p>CVV: {credit.cvv}</p>
              <p>Nome impresso: {credit.nameCreditCard}</p>
              <p>Data de validade: {credit.dateExpired}</p>
            </div>
          )}
        </li>
      ))}

      {/* TOOD: VERIFICAR O PQ DO SELECT NAO TA PEGANDO O DADO SELECIONADO */}
      <div className="space-y-4 mb-4">
        <SelectForm
          label="Bandeira"
          options={selectFlagCrediCard}
          {...register('flag')}
        />

        <Input
          type="number"
          label="Número do cartão"
          placeholder="0000-0000-0000-0000"
          {...register('number')}
          error={errors?.number}
        />

        <div className="grid grid-cols-2 gap-4">
          <Input
            type="date"
            label="Data de validade"
            placeholder="dd/mm"
            {...register('dateExpired')}
            error={errors?.dateExpired}
          />

          <Input
            type="number"
            label="CVV"
            placeholder="000"
            {...register('cvv')}
            error={errors?.cvv}
          />
        </div>

        <Input
          type="text"
          label="Nome no cartão"
          placeholder="Nome impresso no cartão"
          {...register('nameCreditCard')}
          error={errors?.nameCreditCard}
        />
      </div>

      <button
        onClick={handleAddCreditCard}
        type="button"
        className="bg-green-500 p-2 rounded-md my-2"
      >
        Adicionar
      </button>
    </div>
  );
}
