import React from "react";
import { useField, useFormikContext } from "formik";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

interface PhoneFieldProps {
  name: string;
  label: string;
  placeholder?: string;
}

const PhoneField: React.FC<PhoneFieldProps> = ({ name, label, placeholder }) => {
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext<any>();

  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-800">{label}</label>
      <PhoneInput
    onChange={(value) => setFieldValue(name, value || "")}
        placeholder={placeholder || "Enter phone number"}
        defaultCountry="US"
        international
        countryCallingCodeEditable={false}
        className={`w-full border rounded-md px-2 py-2 h-15 text-sm focus:outline-none focus:ring-2 mb-2 text-gray-900

            ${
              meta.error && meta.touched
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-gray-300"
            }
          `}
      />
      {meta.touched && meta.error && (
        <p className="text-xs text-red-600">{meta.error}</p>
      )}
    </div>
  );
};

export default PhoneField;
