'use client';

import { IClient } from '@/@types/client';
import { ISelect } from '@/@types/select';
import { clientsList } from '@/mocks/clientsList';
import { createContext, ReactNode, useContext, useMemo, useState } from 'react';

interface IFilterContextProps {
  isSearching: boolean;
  setIsSearching: React.Dispatch<React.SetStateAction<boolean>>;
  selectedStatus: ISelect | null;
  setSelectedStatus: React.Dispatch<React.SetStateAction<ISelect | null>>;
  selectedState: string | null;
  setSelectedState: React.Dispatch<React.SetStateAction<string | null>>;
  searchName: string;
  setSearchName: React.Dispatch<React.SetStateAction<string>>;
  filteredData: IClient[];
  setFilteredData: React.Dispatch<React.SetStateAction<IClient[]>>;
  clearFilters: () => void;
}

interface FilterProviderProps {
  children: ReactNode;
}

export const FilterContext = createContext<IFilterContextProps>(
  {} as IFilterContextProps
);

export const FilterProvider = ({ children }: FilterProviderProps) => {
  const [isSearching, setIsSearching] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<ISelect | null>(null);
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [searchName, setSearchName] = useState<string>('');
  const [filteredData, setFilteredData] = useState<IClient[]>(clientsList);

  const clearFilters = () => {
    setSelectedState(null);
    setSelectedStatus(null);
    setIsSearching(false);
    setSearchName('');

    setFilteredData(clientsList);
  };

  const contextValue = useMemo(
    () => ({
      selectedStatus,
      setSelectedStatus,
      isSearching,
      setIsSearching,
      selectedState,
      setSelectedState,
      clearFilters,
      searchName,
      setSearchName,
      filteredData,
      setFilteredData,
    }),
    [
      selectedStatus,
      setSelectedStatus,
      isSearching,
      setIsSearching,
      selectedState,
      setSelectedState,
      searchName,
      setSearchName,
      filteredData,
      setFilteredData,
    ]
  );

  return (
    <FilterContext.Provider value={contextValue}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => useContext(FilterContext);
