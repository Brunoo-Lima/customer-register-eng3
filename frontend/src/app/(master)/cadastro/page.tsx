import RegisterClient from '@/components/pages/clients/forms/register/register-client';
import Header from '@/components/ui/header';

export default function RegisterPage() {
  return (
    <>
      <Header title="Cadastro de clientes" />

      <RegisterClient />
    </>
  );
}
