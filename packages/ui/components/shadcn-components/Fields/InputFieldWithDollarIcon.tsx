import { useField, FieldHookConfig } from 'formik';
import React, { InputHTMLAttributes } from 'react';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    name: string;
    showDollarIcon?: boolean;
}

export default function InputFieldWithDollar({ label, showDollarIcon, ...props }: InputFieldProps) {
    const [field, meta] = useField(props);

    return (
        <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-800">{label}</label>
            <div className="relative">
                <input
                    {...field}
                    {...props}
                    className={`w-full border border-gray-300 rounded-lg px-4 py-2 text-sm pr-10 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black ${showDollarIcon ? 'pr-10' : ''
                        }`}
                />
                {showDollarIcon && (
                    <div className="absolute inset-y-0 right-3 flex items-center text-gray-500 pointer-events-none">
                        $
                    </div>
                )}
            </div>
            {meta.touched && meta.error && (
                <p className="text-sm text-red-600">{meta.error}</p>
            )}
        </div>
    );
}