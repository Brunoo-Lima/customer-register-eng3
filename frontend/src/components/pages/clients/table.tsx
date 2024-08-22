interface ITableProps {
  clients: {
    id: number;
    name: string;
    email: string;
    dateOfBirth: string;
    cpf: string;
    phone: string;
    ranking: number;
    address: {
      street: string;
      number: string;
      neighborhood: string;
      city: string;
      state: string;
      zipCode: string;
    };
  }[];
}

export default function Table({ clients }: ITableProps) {
  return (
    <table>
      <thead>
        <th>Nome</th>
      </thead>

      <tbody>
        {clients.map((client) => (
          <tr key={client.id}>
            <td>{client.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
