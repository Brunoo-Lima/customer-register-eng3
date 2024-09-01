import Input from '@/components/ui/input';
import Radio from '@/components/ui/radio';
import { IRegisterClientForm } from '@/validations/register-client-schema';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

interface IClientPersonal {
  register: UseFormRegister<IRegisterClientForm>;
  errors: FieldErrors<IRegisterClientForm>;
}

export default function ClientPersonalInfoForm({
  register,
  errors,
}: IClientPersonal) {
  return (
    <>
      <Input
        type="text"
        label="Nome completo"
        placeholder="Digite o nome completo"
        error={errors?.name}
        {...register('name')}
      />

      <div className="grid grid-cols-2 gap-3 items-center">
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
          <Radio label="Celular" value="Celular" {...register('typePhone')} />
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
    </>
  );
}
