/* eslint-disable react/display-name */
import { forwardRef } from 'react';
import { FieldError } from 'react-hook-form';
import Select, { StylesConfig } from 'react-select';

const customStyles: StylesConfig<any, false> = {
  control: (provided) => ({
    ...provided,
    border: '0.5px solid #4b5563',
    borderRadius: '0.375rem',
    backgroundColor: '#fff',
    padding: '0 0.2rem ',
    color: '#000',
    boxShadow: 'none',
    '&:hover': {
      borderColor: '#3b82f6',
    },
    '&:focus': {
      borderColor: '#3b82f6',
      boxShadow: '0 0 0 1px #3b82f6',
    },
  }),
  placeholder: (provided) => ({
    ...provided,
    color: '#000',
  }),
  singleValue: (provided) => ({
    ...provided,
    color: '#000',
  }),
  input: (provided) => ({
    ...provided,
    color: '#000',
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: '#fff',
  }),
  menuList: (provided) => ({
    ...provided,
    padding: '0',
    backgroundColor: '#ffff',
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#3b82f6' : '#fff',
    color: state.isSelected ? '#fff' : '#000',

    '&:hover': {
      cursor: 'pointer',
    },
  }),
};

export interface IOptions {
  value: string;
  label: string;
}

interface ISelect {
  options: IOptions[];
  value: IOptions | null;
  onChange: (value: IOptions | null) => void;
  error?: FieldError | null;
  placeholder: string;
}

const SelectSearch = forwardRef<HTMLSelectElement, ISelect>(
  ({ options, value, onChange, placeholder, error }, ref) => {
    return (
      <div className="w-36">
        <Select
          placeholder={placeholder}
          styles={customStyles}
          options={options}
          value={value}
          onChange={onChange}
        />

        {error && <span className="text-sm text-red-600">{error.message}</span>}
      </div>
    );
  }
);

export default SelectSearch;
