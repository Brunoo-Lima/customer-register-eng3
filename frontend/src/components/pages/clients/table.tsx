'use client';

import { IClient } from '@/@types/client';
import { EyeIcon, UserRoundPenIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface ITableProps {
  clients: IClient[];
}

export default function Table({ clients }: ITableProps) {
  const router = useRouter();

  const handleAlterClient = (id: number) => {
    router.push(`/clientes/${id}`);
  };

  return (
    <table className="w-full border-collapse">
      <thead className="text-center border-b-[1px] p-2">
        <tr>
          <th>Id</th>
          <th>Nome</th>
          <th>Telefone</th>
          <th>Ranking</th>
          <th>Status</th>
          <th>Editar</th>
          <th>Visualizar</th>
        </tr>
      </thead>

      <tbody>
        {clients.map((client) => (
          <tr key={client.id} className="text-center border-b-[1px]">
            <td className="p-2">{client.id}</td>
            <td className="p-2">{client.name}</td>
            <td className="p-2">{client.phone}</td>
            <td className="p-2">{client.ranking}</td>

            <td className="p-2">
              <p
                className="rounded-sm w-[90%] mx-auto p-1"
                style={{
                  background: `${client.status === 'Ativo' ? 'green' : 'red'} `,
                }}
              >
                {client.status === 'Ativo' ? 'Ativo' : 'Inativo'}
              </p>
            </td>
            <td className="p-2">
              <button onClick={() => handleAlterClient(client.id)}>
                <UserRoundPenIcon size={24} />
              </button>
            </td>
            <td className="p-2">
              <button>
                <EyeIcon size={24} />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
