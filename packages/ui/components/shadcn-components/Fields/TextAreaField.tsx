import React from "react";
import { useField } from "formik";

interface TextareaFieldProps {
  name: string;
  label?: string;
  placeholder?: string;
  rows?: number;
}

const TextareaField: React.FC<TextareaFieldProps> = ({
  name,
  label,
  placeholder = "",
  rows = 4,
}) => {
  const [field, meta] = useField(name);

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <textarea
        id={name}
        {...field}
        placeholder={placeholder}
        rows={rows}
        className={`w-full p-3 border rounded-md shadow-sm text-gray-700 placeholder:text-gray-500
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
          ${meta.touched && meta.error ? "border-red-500" : "border-gray-200"}
        `}
      />
      {meta.touched && meta.error && (
        <p className="mt-1 text-sm text-red-500">{meta.error}</p>
      )}
    </div>
  );
};

export default TextareaField;
