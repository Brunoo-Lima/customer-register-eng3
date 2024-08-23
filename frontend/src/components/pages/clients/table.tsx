import { IClient } from '@/@types/client';
import { UserRoundPenIcon } from 'lucide-react';

interface ITableProps {
  clients: IClient[];
}

export default function Table({ clients }: ITableProps) {
  return (
    <table className="w-full border-collapse">
      <thead className="text-center border-b-[1px] p-2">
        <tr>
          <th>Ranking</th>
          <th>Nome</th>
          <th>Telefone</th>
          <th>Editar</th>
          <th>Status</th>
        </tr>
      </thead>

      <tbody>
        {clients.map((client) => (
          <tr key={client.id} className="text-center border-b-[1px]">
            <td className="p-2">{client.ranking}</td>
            <td className="p-2">{client.name}</td>
            <td className="p-2">{client.phone}</td>
            <td className="p-2">
              <button>
                <UserRoundPenIcon size={24} />
              </button>
            </td>
            <td className="p-2">
              {client.status === 'active' ? 'Ativo' : 'Inativo'}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
