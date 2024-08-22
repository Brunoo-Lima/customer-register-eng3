'use client';

import Sidebar from '@/components/sidebar/sidebar';
import { PropsWithChildren } from 'react';

export default function MasterLayout({ children }: PropsWithChildren) {
  return (
    <section className="w-full h-screen p-0 flex items-stretch ">
      <Sidebar />

      <div className="w-full overflow-auto flex flex-col pr-6 pl-6">
        {children}
      </div>
    </section>
  );
}
