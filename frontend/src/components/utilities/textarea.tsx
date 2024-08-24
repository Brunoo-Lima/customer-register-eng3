/* eslint-disable react/display-name */
import { forwardRef, TextareaHTMLAttributes } from 'react';

interface ITextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  placeholder: string;
  label: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, ITextareaProps>(
  ({ placeholder, label, ...rest }, ref) => {
    return (
      <div>
        <label
          htmlFor={label}
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          {label}
        </label>
        <textarea
          id={label}
          rows={4}
          {...rest}
          ref={ref}
          className="border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-700 outline-none"
          placeholder={placeholder}
        />
      </div>
    );
  }
);

export default Textarea;
