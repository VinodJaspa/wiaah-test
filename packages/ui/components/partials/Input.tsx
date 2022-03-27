import React, {
  CSSProperties,
  DetailedHTMLProps,
  FC,
  InputHTMLAttributes,
  ReactElement,
} from "react";

interface InputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  setId?: string;
  icon?: ReactElement;
  iconAlign?: "start" | "end";
  containerClassName?: string;
  labelClassName?: string;
  fullWidth?: boolean;
  inputClassName?: string;
  variant?: "text" | "number";
  initialValue?: string | number;
  onValueChange?: (value: string | number) => void;
}

export const Input: FC<InputProps> = ({
  setId = undefined,
  icon = null,
  iconAlign,
  containerClassName = "",
  labelClassName = "",
  inputClassName,
  fullWidth,
  initialValue,
  variant,
  onValueChange,
  ...props
}) => {
  const [value, setValue] = React.useState<any>(initialValue);
  const [ContainerStyles, setContainerStyles] = React.useState<CSSProperties>(
    {}
  );

  React.useEffect(() => {
    if (onValueChange) {
      onValueChange(value);
    }
  }, [value]);

  React.useEffect(() => {
    if (fullWidth) setContainerStyles((state) => ({ ...state, width: "100%" }));
  }, []);
  React.useEffect(() => {
    switch (iconAlign) {
      case "end":
        setContainerStyles((state) => ({
          ...state,
          flexDirection: "row-reverse",
        }));
        break;
    }
  }, []);
  switch (variant) {
    case "number":
      return (
        <input
          type="number"
          {...props}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="no-arrows h-full w-full border-none text-center outline-none "
        />
      );
    default:
      return (
        <div
          style={ContainerStyles}
          className={`${containerClassName} flex items-center gap-4 rounded border-2 border-gray-400 border-opacity-50 py-1 px-3`}
        >
          <label
            className={`${labelClassName} text-lg text-gray-400`}
            htmlFor={setId}
          >
            {icon}
          </label>
          <input
            className={`${inputClassName} w-full py-2 placeholder-opacity-50`}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            {...props}
            id={setId}
          />
        </div>
      );
  }
};
