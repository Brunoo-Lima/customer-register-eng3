/* eslint-disable react/display-name */
import { forwardRef, SelectHTMLAttributes } from 'react';
import Select, { StylesConfig } from 'react-select';

interface IOptions {
  value: string;
  label: string;
}

interface ISelect extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: IOptions[];
}
const customStyles: StylesConfig<any, false> = {
  control: (provided) => ({
    ...provided,
    border: '1px solid #4b5563', // border-gray-600
    borderRadius: '0.375rem', // rounded-lg
    backgroundColor: '#374151', // bg-gray-700
    padding: '0.2rem', // p-2
    color: '#ffffff', // text-white
    boxShadow: 'none',
    '&:hover': {
      borderColor: '#3b82f6', // focus:border-blue-500
    },
    '&:focus': {
      borderColor: '#3b82f6', // focus:border-blue-500
      boxShadow: '0 0 0 1px #3b82f6', // focus:ring-blue-500
    },
  }),
  placeholder: (provided) => ({
    ...provided,
    color: '#9ca3af', // placeholder-gray-400
  }),
  singleValue: (provided) => ({
    ...provided,
    color: '#ffffff', // text-white
  }),
  input: (provided) => ({
    ...provided,
    color: '#ffffff', // text-white
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: '#374151', // bg-gray-700
  }),
  menuList: (provided) => ({
    ...provided,
    backgroundColor: '#374151', // bg-gray-700
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#3b82f6' : '#374151', // Cor do fundo da opção selecionada e não selecionada
    color: state.isSelected ? '#ffffff' : '#ffffff', // Cor do texto da opção selecionada e não selecionada
    '&:hover': {
      backgroundColor: '#3b82f6', // Cor de fundo ao passar o mouse
      color: '#ffffff', // Cor do texto ao passar o mouse
    },
  }),
};

const SelectForm = forwardRef<HTMLSelectElement, ISelect>(
  ({ label, options }, ref) => {
    return (
      <div className="w-1/2">
        <label
          htmlFor="flag"
          className="block mb-2 text-sm font-medium text-white"
        >
          {label}
        </label>
        <Select styles={customStyles} options={options} ref={ref as any} />
      </div>
    );
  }
);

export default SelectForm;
