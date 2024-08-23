import Clients from '@/components/pages/clients/clients';

export default function ClientesPage() {
  return (
    <>
      <header className="py-6">
        <h1 className="text-2xl font-bold">Lista de Clientes</h1>
      </header>

      <Clients />
    </>
  );
}
