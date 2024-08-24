'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import InputRegister from '@/components/utilities/input-register';
import Textarea from '@/components/utilities/textarea';
import {
  IRegisterClientForm,
  RegisterClientSchema,
} from '@/components/validations/register-client-schema';
import Radio from '@/components/utilities/radio';

export default function RegisterClient() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterClientForm>({
    resolver: yupResolver(RegisterClientSchema),
  });

  const onSubmit: SubmitHandler<IRegisterClientForm> = () => {};

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col justify-center gap-8 my-8"
    >
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <InputRegister
            type="text"
            label="Nome completo"
            placeholder="Digite o nome completo"
            error={errors?.name}
            {...register('name')}
          />

          <InputRegister
            type="text"
            label="CPF"
            placeholder="000.000.000-00"
            {...register('cpf')}
            error={errors?.cpf}
          />

          <div className="grid md:grid-cols-2 md:gap-6 items-center">
            <div>
              <p>Tipo do telefone: </p>
              <Radio label="Móvel" {...register('phone')} />
              <Radio label="Fixo" {...register('phone')} />

              {errors?.typePhone && (
                <span className="text-sm text-red-600">
                  {errors.typePhone.message}
                </span>
              )}
            </div>

            <InputRegister
              type="tel"
              label="Telefone"
              placeholder="(00) 0000-0000"
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              {...register('phone')}
              error={errors?.phone}
            />
          </div>

          <InputRegister
            type="date"
            label="Data de nascimento"
            placeholder="dd/MM/yyyy"
            {...register('dateOfBirth')}
          />

          <div className="flex flex-col">
            <label htmlFor="">Gênero</label>
            <Radio label="Masculino" {...register('gender')} />
            <Radio label="Feminino" {...register('gender')} />
          </div>
        </div>

        <div className="space-y-4">
          <InputRegister
            type="text"
            label="Bairro"
            placeholder="Digite o nome do bairro"
            {...register('neighborhood')}
            error={errors?.neighborhood}
          />

          <InputRegister
            type="text"
            label="Rua"
            placeholder="Digite o nome da rua"
            {...register('street')}
            error={errors?.street}
          />

          <div className="grid md:grid-cols-2 md:gap-6">
            <InputRegister
              type="text"
              label="Logradouro"
              placeholder="Digite o logradouro"
            />
            <InputRegister
              type="number"
              label="Número"
              placeholder="Digite o número"
              {...register('number')}
              error={errors?.number}
            />
          </div>
          <div className="grid md:grid-cols-2 md:gap-6">
            <InputRegister
              type="text"
              label="CEP"
              placeholder="00000-000"
              {...register('zipCode')}
              error={errors?.zipCode}
            />
            <InputRegister
              type="text"
              label="Cidade"
              placeholder="Digite a cidade"
              {...register('city')}
              error={errors?.city}
            />
          </div>

          <div className="grid md:grid-cols-2 md:gap-6">
            <InputRegister
              type="text"
              label="Estado"
              placeholder="Digite o estado"
              {...register('state')}
              error={errors?.state}
            />
            <InputRegister
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
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm max-w-fit px-5 py-2.5 text-center border-transparent"
        >
          Adicionar cliente
        </button>

        <button
          type="button"
          className="text-blue-700 bg-white focus:ring-4 focus:outline-none focus:ring-blue-300 border-[1px] border-blue-700 font-medium rounded-lg text-sm max-w-fit px-5 py-2.5 text-center"
        >
          Limpar campos
        </button>
      </div>
    </form>
  );
}
