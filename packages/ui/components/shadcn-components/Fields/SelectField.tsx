import { useField, FieldHookConfig } from 'formik';
import React, { SelectHTMLAttributes } from 'react';

interface Option {
  label: string;
  value: string;
}

interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  name: string;
  options: Option[];
}

export default function SelectField({ label, options, ...props }: SelectFieldProps) {
  const [field, meta] = useField(props);

  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-800">{label}</label>
      <select
        {...field}
        {...props}
        className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm bg-white"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {meta.touched && meta.error && (
        <p className="text-sm text-red-600">{meta.error}</p>
      )}
    </div>
  );
}
