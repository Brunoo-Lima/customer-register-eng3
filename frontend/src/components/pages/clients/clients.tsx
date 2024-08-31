import { clientsList } from '@/mocks/clientsList';
import Table from './table';
import { SearchIcon } from 'lucide-react';

export default function Clients() {
  return (
    <>
      <div className="border-b-[1.5px] border-b-gray-600/75 py-6">
        <div className="flex justify-between items-center">
          <div>
            <div className="relative">
              <div className="absolute top-0.5 left-0.5 rounded-full bg-blue-900 size-6 flex items-center justify-center">
                <SearchIcon size={16} color="#fff" />
              </div>

              <input
                type="text"
                placeholder="Digite o nome do cliente"
                className="ps-7 pe-2 border-[1px] border-transparent rounded-lg h-7 text-sm text-black outline-none focus-visible:border-blue-500"
              />
            </div>
          </div>

          <button className="bg-blue-700 text-white w-24 h-9 rounded-2xl align-middle">
            Buscar
          </button>
        </div>
      </div>

      <div className="overflow-x-auto mt-16 mb-4">
        <Table clients={clientsList} />
      </div>
    </>
  );
}
