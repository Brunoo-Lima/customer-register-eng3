'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Input from '@/components/utilities/input';
import Textarea from '@/components/utilities/textarea';
import {
  IRegisterClientForm,
  RegisterClientSchema,
} from '@/components/validations/register-client-schema';
import Radio from '@/components/utilities/radio';
import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { clientsList } from '@/components/mocks/clientsList';

export default function AlterClient() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<IRegisterClientForm>({
    resolver: yupResolver(RegisterClientSchema),
  });
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
      setValue('residentialAddress.observation', client.observation);
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
              pattern="(\([0-9]{2}\))\s([9]{1})?([0-9]{4})-([0-9]{4})"
              {...register('phone')}
              error={errors?.phone}
            />
          </div>

          <Input
            type="date"
            label="Data de nascimento"
            placeholder="dd/MM/yyyy"
            {...register('dateOfBirth')}
          />

          <div className="flex flex-col">
            <p className="block text-sm font-medium text-white">Gênero</p>
            <Radio
              label="Masculino"
              value="Masculino"
              {...register('gender')}
            />
            <Radio label="Feminino" value="Feminino" {...register('gender')} />

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
        </div>

        <div className="space-y-4">
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
      </div>

      <div className="flex gap-4 justify-center">
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 outline-none font-medium rounded-lg text-sm max-w-fit px-5 py-2.5 text-center border-transparent"
        >
          Salvar alteração
        </button>

        <button
          type="button"
          onClick={cancelAlterFormsFields}
          className="text-blue-700 bg-white outline-none border-[1px] border-blue-700 font-medium rounded-lg text-sm max-w-fit px-5 py-2.5 text-center"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
