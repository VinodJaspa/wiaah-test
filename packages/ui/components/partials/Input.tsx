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
}

export const Input: FC<InputProps> = ({
  setId = undefined,
  icon = null,
  iconAlign,
  containerClassName = "",
  labelClassName = "",
  inputClassName,
  fullWidth,
  ...props
}) => {
  const [ContainerStyles, setContainerStyles] = React.useState<CSSProperties>(
    {}
  );
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
        {...props}
        id={setId}
      />
    </div>
  );
};
