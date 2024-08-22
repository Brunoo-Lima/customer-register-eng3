import Table from '@/components/pages/clients/table';
import { clientsList } from '@/components/mocks/clientsList';

export default function ClientesPage() {
  return (
    <>
      <h1>Cadastro de clientes</h1>

      <Table clients={clientsList.clients} />
    </>
  );
}
