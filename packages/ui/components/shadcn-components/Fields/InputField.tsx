import { useField, FieldHookConfig } from 'formik';
import React, { InputHTMLAttributes } from 'react';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string; // explicitly required
}

export default function InputField({ label, ...props }: InputFieldProps) {
  const [field, meta] = useField(props);

  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-800">{label}</label>
      <input
        {...field}
        {...props}
        className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
      />
      {meta.touched && meta.error && (
        <p className="text-sm text-red-600">{meta.error}</p>
      )}
    </div>
  );
}
