import React from "react";
import { useField } from "formik";

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string; 
  error?:string;// name is required for Formik to track this field
}

export default function TextInput({ label, error,...props }: TextInputProps) {
  const [field, meta] = useField(props.name!);

  return (
    <div className="flex flex-col gap-1 pt-4">
      <label htmlFor={props.name} className="text-xs font-semibold text-gray-900">
        {label}
      </label>
      <input
        {...field} // name, value, onChange, onBlur from Formik
        {...props} // additional props like placeholder, type, etc.
        id={props.name}
        max={50}
        min={3}
        className={`w-full border rounded-lg px-4 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 ${
        error
            ? "border-red-500 focus:ring-red-500"
            : "border-gray-200 focus:ring-gray-300"
        } text-gray-900`}
      />
      {error ? (
        <p className="text-xs text-red-600">{error}</p>
      ) : null}
    </div>
  );
}
