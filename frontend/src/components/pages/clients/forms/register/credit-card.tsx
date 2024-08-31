import { ICreditCard } from '@/@types/credit-card';
import { selectFlagCrediCard } from '@/mocks/select';
import Input from '@/components/ui/input';
import SelectForm from '@/components/ui/select';
import {
  creditCardSchema,
  ICreditCardSchema,
} from '@/validations/credit-card-schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';

interface ICreditCardProps {
  creditCardList: ICreditCard[];
  setCreditCardList: React.Dispatch<React.SetStateAction<ICreditCard[]>>;
}

export default function CreditCard({
  creditCardList,
  setCreditCardList,
}: ICreditCardProps) {
  const {
    register,
    control,
    formState: { errors },
    reset,
    handleSubmit,
    getValues,
  } = useForm<ICreditCardSchema>({
    resolver: yupResolver(creditCardSchema),
  });

  const handleAddCreditCard = handleSubmit(() => {
    const newCreditCard = getValues();

    const creditCardWithID: ICreditCard = {
      id: Math.ceil(Math.random() * 10000),
      ...newCreditCard,
    };

    setCreditCardList([...creditCardList, creditCardWithID]);
    reset();
  });

  return (
    <div>
      <div className="space-y-4 mb-4">
        <Controller
          name="flag"
          control={control}
          render={({ field }) => (
            <SelectForm
              label="Bandeira"
              options={selectFlagCrediCard}
              value={
                selectFlagCrediCard.find(
                  (option) => option.value === field.value
                ) || null
              }
              onChange={(option) => field.onChange(option?.value || null)}
              error={errors.flag}
            />
          )}
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
