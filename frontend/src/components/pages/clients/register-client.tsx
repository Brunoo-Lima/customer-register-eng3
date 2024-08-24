'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Textarea from '@/components/utilities/textarea';
import {
  IRegisterClientForm,
  RegisterClientSchema,
} from '@/components/validations/register-client-schema';
import Radio from '@/components/utilities/radio';
import Input from '@/components/utilities/input';
import DatePicker from '@/components/utilities/date-picker';

export default function RegisterClient() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IRegisterClientForm>({
    resolver: yupResolver(RegisterClientSchema),
  });

  const onSubmit: SubmitHandler<IRegisterClientForm> = () => {};

  const clearFormFields = () => {
    reset();
  };

  return (
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

          <Input
            type="text"
            label="CPF"
            placeholder="000.000.000-00"
            {...register('cpf')}
            error={errors?.cpf}
          />

          <div className="grid md:grid-cols-2 md:gap-4 items-start">
            <div>
              <p className="block text-sm font-medium text-white">
                Tipo do telefone:{' '}
              </p>
              <Radio label="Celular" {...register('phone')} />
              <Radio label="Fixo" {...register('phone')} />

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

          <DatePicker />

          <Input
            type="date"
            label="Data de nascimento"
            placeholder="dd/MM/yyyy"
            {...register('dateOfBirth')}
          />

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
        </div>

        <div className="space-y-4">
          <Input
            type="text"
            label="Bairro"
            placeholder="Digite o nome do bairro"
            {...register('neighborhood')}
            error={errors?.neighborhood}
          />

          <Input
            type="text"
            label="Rua"
            placeholder="Digite o nome da rua"
            {...register('street')}
            error={errors?.street}
          />

          <div className="grid md:grid-cols-2 md:gap-6">
            <Input
              type="text"
              label="Logradouro"
              placeholder="Digite o logradouro"
              {...register('publicPlace')}
              error={errors?.publicPlace}
            />
            <Input
              type="number"
              label="Número"
              placeholder="Digite o número"
              {...register('number')}
              error={errors?.number}
            />
          </div>
          <div className="grid md:grid-cols-2 md:gap-6">
            <Input
              type="text"
              label="CEP"
              placeholder="00000-000"
              {...register('zipCode')}
              error={errors?.zipCode}
            />
            <Input
              type="text"
              label="Cidade"
              placeholder="Digite a cidade"
              {...register('city')}
              error={errors?.city}
            />
          </div>

          <div className="grid md:grid-cols-2 md:gap-6">
            <Input
              type="text"
              label="Estado"
              placeholder="Digite o estado"
              {...register('state')}
              error={errors?.state}
            />
            <Input
              type="text"
              label="País"
              placeholder="Digite o país"
              {...register('country')}
              error={errors?.country}
            />
          </div>

          <div>
            <Textarea
              label="Observações"
              placeholder="Digite sua observação (opcional)"
              {...register('observation')}
              error={errors?.observation}
            />
          </div>
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
    </form>
  );
}
