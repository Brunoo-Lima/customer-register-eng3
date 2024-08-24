/* eslint-disable react/display-name */
import { forwardRef, InputHTMLAttributes } from 'react';

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  type: string;
  placeholder: string;
  label: string;
}

const InputRegister = forwardRef<HTMLInputElement, IInputProps>(
  ({ type, placeholder, label, ...rest }, ref) => {
    return (
      <div>
        <label
          htmlFor={label}
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          {label}
        </label>
        <input
          type={type}
          id={label}
          name={label}
          className="border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-700 outline-none"
          placeholder={placeholder}
          ref={ref}
          {...rest}
        />
      </div>
    );
  }
);

export default InputRegister;
