import React from "react";
import { useField } from "formik";

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  name: string; 
  error?:string;// name is required for Formik tracking
}

export default function TextArea({ label,error, ...props }: TextAreaProps) {
  const [field, meta] = useField(props.name!);

  return (
    <div className="flex flex-col gap-1 pt-4">
      <label htmlFor={props.name} className="text-xs font-semibold text-gray-900">
        {label}
      </label>
      <textarea
        {...field} // value, onChange, onBlur from Formik
        {...props} // other props like placeholder, rows
        id={props.name}
        rows={props.rows || 4}
        className={`w-full border rounded-lg px-4 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 resize-none ${
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
