import { ChevronLeft } from 'lucide-react';

interface IHeaderProps {
  title: string;
  isButtonBack?: boolean;
}

export default function Header({ title, isButtonBack }: IHeaderProps) {
  return (
    <header className="py-6">
      {isButtonBack && (
        <button>
          <ChevronLeft size={18} color="#000" />
        </button>
      )}
      <h1 className="text-2xl font-bold">{title}</h1>
    </header>
  );
}
