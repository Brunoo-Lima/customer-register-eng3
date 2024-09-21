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
import Button from '@/components/ui/button';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { TextField, TextFieldProps } from '@mui/material';

interface ICreditCardProps {
  creditCardList: ICreditCard[];
  setCreditCardList: React.Dispatch<React.SetStateAction<ICreditCard[]>>;
}

export default function CreditCardForm({
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

  const handleDateChange = () => {
    const formattedDate = dayjs().format('MM/YY');
  };

  return (
    <div className="my-2">
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
          {/* <Controller
            name="dateExpired"
            control={control}
            defaultValue={undefined}
            render={({ field }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  views={['year', 'month']} // Visualização limitada a mês/ano
                  label="Data de validade"
                  value={field.value ? dayjs(field.value, 'MM/YY') : null}
                  onChange={(newValue) => {
                    // Formata a data para "MM/YY"
                    const formattedDate = dayjs(newValue).format('MM/YY');
                    field.onChange(formattedDate);
                  }}
                  renderInput={(params: TextFieldProps) => (
                    <Input
                      {...params} // Passa as propriedades necessárias para o Input
                      error={!!errors.dateExpired}
                      helperText={
                        errors.dateExpired ? errors.dateExpired.message : ''
                      }
                    />
                  )}
                />
              </LocalizationProvider>
            )}
          /> */}

          <Input
            type="date"
            label="Data de validade"
            placeholder="dd/mm/aaaa"
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

      <Button
        type="button"
        color="success"
        size="xs"
        onClick={handleAddCreditCard}
      >
        Adicionar
      </Button>
    </div>
  );
}
