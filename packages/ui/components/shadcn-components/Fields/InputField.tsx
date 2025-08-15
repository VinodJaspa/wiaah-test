import { useField, FieldHookConfig } from "formik";
import React, { InputHTMLAttributes, ReactNode } from "react";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string; // required for Formik
  icon?: ReactNode; // optional icon prop
  iconClassName?: string; // new prop for styling the icon
}

export default function InputField({
  label,
  icon,
  iconClassName = "text-gray-400 h-4 w-4", // default icon style
  ...props
}: InputFieldProps) {
  const [field, meta] = useField(props);

  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-800 mb-2 pt-2">
        {label}
      </label>

      <div className="relative">
        {icon && (
          <span
            className={`absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none ${iconClassName}`}
          >
            {icon}
          </span>
        )}
        <input
          {...field}
          {...props}
          className={`w-full border rounded-md py-2 text-sm focus:outline-none focus:ring-2 mb-2 text-gray-900
            ${icon ? "pl-10" : "px-4"} 
            ${
              meta.error && meta.touched
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-gray-300"
            }
          `}
        />
      </div>

      {meta.error && meta.touched && (
        <p className="text-xs text-red-600">{meta.error}</p>
      )}
    </div>
  );
}
