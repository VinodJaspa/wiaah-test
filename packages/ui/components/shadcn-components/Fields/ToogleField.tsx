import React from "react";
import { useField } from "formik";
import SharedLabel from "./SharedLabel";


interface SharedToggleProps {
  name: string;
  label?: string;
  options: { label: string; value: string }[];
}

export const SharedToggle: React.FC<SharedToggleProps> = ({
  name,
  label = "",
  options,
}) => {
  const [field, , helpers] = useField(name);

  return (
    <div className="space-y-1">
      <SharedLabel>{label}</SharedLabel>
      <ToggleGroup
        type="single"
        value={field.value}
        onValueChange={(val) => val && helpers.setValue(val)}
      >
        {options.map((option) => (
          <ToggleGroupItem key={option.value} value={option.value}>
            {option.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
};
const ToggleGroup = ({ value, onValueChange, children }: any) => (
  <div className="flex gap-2">
    {React.Children.map(children, (child: any) =>
      React.cloneElement(child, {
        isActive: child.props.value === value,
        onClick: () => onValueChange(child.props.value)
      })
    )}
  </div>
);

const ToggleGroupItem = ({ value, isActive, onClick, children }: any) => (
  <button
    type="button"
    onClick={onClick}
    className={`px-4 py-1 rounded-md border text-sm ${
      isActive ? "bg-black text-white" : "bg-white text-gray-700"
    }`}
  >
    {children}
  </button>
);