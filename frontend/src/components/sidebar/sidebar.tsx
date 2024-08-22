import { LogOutIcon } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export default function Sidebar() {
  const { logout } = useAuth();
  return (
    <div className="h-full w-[400px] bg-amber-500 flex flex-col items-center py-[4rem] pb-[2rem]">
      <div className="flex-1">
        <h1 className="text-3xl font-bold text-white">Filtragem</h1>
      </div>

      <button onClick={logout} className="flex items-center gap-2">
        <LogOutIcon size={24} />
        <p>Sair</p>
      </button>
    </div>
  );
}
