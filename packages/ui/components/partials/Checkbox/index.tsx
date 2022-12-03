import React from "react";
import { HtmlInputProps } from "types";

interface CheckBoxCtxValues {
  values: string[];
  toggleCheckBox: (value: string) => any;
}

const CheckBoxCtx = React.createContext<CheckBoxCtxValues>({
  toggleCheckBox: () => {},
  values: [],
});

export interface CheckboxProps extends HtmlInputProps {}

export const Checkbox: React.FC<CheckboxProps> = ({
  children,
  className,
  value,
  ...props
}) => {
  const { toggleCheckBox } = React.useContext(CheckBoxCtx);
  return (
    <div className="flex gap-2 items-center">
      <input
        onChange={() =>
          typeof value === "string" && typeof toggleCheckBox === "function"
            ? toggleCheckBox(value)
            : null
        }
        color="green"
        className={`${className} ring-0 checked:bg-primary   checked:hover:bg-primary checked:focus:bg-primary focus:ring-0  active:ring-0`}
        type={"checkbox"}
        {...props}
      />
      <span>{children}</span>
    </div>
  );
};

export interface CheckboxGroupProps {
  onChange: (values: string[]) => any;
}

export const CheckBoxGroup: React.FC<CheckboxGroupProps> = ({
  onChange,
  ...props
}) => {
  const [values, setValues] = React.useState<string[]>([]);

  function toggleCheckBox(value: string) {
    setValues((state) => {
      const valueExists = state.findIndex((v) => v === value) > -1;
      return valueExists
        ? state.filter((v) => v !== value)
        : state.concat(value);
    });
  }

  return <CheckBoxCtx.Provider value={{ values, toggleCheckBox }} {...props} />;
};
