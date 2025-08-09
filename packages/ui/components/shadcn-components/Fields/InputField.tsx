import { useField, FieldHookConfig } from 'formik';
import React, { InputHTMLAttributes } from 'react';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string; // explicitly required
}

export default function InputField({ label, ...props }: InputFieldProps) {
  const [field, meta, helpers] = useField(props);


  // React.useEffect(() => {
  //   // For example, clear error on mount:
  //   helpers.setError('');
  // }, [helpers]); 

  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-800 mb-2 pt-2">{label}</label>
      <input
        {...field}
        {...props}
        className={`w-full border rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 mb-2 text-gray-900
          ${meta.error
            ? "border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:ring-gray-300"
          }
        `}

      />
      {meta.error && (
        <p className="text-xs text-red-600">{meta.error}</p>
      )}
    </div>
  );
}
