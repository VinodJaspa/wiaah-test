import React from "react";
import { useField } from "formik";

export enum StoreFor {
  Babies = "babies",
  Children = "children",
  Men = "men",
  Women = "women",
}

export enum TargetGenders {
  Female = "female",
  Male = "male",
}

interface CheckboxGroupProps {
  enumObj: Record<string, string>;
  name: string;
  label?: string;
}

function CheckboxGroup({ enumObj, name, label }: CheckboxGroupProps) {
  const [field, , helpers] = useField<string[]>({ name });

  const handleChange = (value: string) => {
    if (field.value?.includes(value)) {
      helpers.setValue(field.value.filter((v) => v !== value));
    } else {
      helpers.setValue([...(field.value || []), value]);
    }
  };

  return (
    <div className="space-y-2 pb-4">
      {label && <p className="font-medium text-sm">{label}</p>}
      <div className="flex flex-wrap gap-4 border border-gray-300 p-2"> {/* flex container with wrapping and gap */}
        {Object.values(enumObj).map((value) => (
          <label key={value} className="flex items-center space-x-2">
            <input
              type="checkbox"
              name={name}
              value={value}
              checked={field.value?.includes(value) || false}
              onChange={() => handleChange(value)}
              className="h-4 w-4"
            />
            <span className="capitalize">{value}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

export default CheckboxGroup;
