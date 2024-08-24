import RegisterClient from '@/components/pages/clients/register-client';

export default function RegisterPage() {
  return (
    <>
      <header className="py-6">
        <h1 className="text-2xl font-bold">Cadastro de Clientes</h1>
      </header>

      <RegisterClient />
    </>
  );
}
