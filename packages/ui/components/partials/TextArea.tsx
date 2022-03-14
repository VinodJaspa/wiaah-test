import React, {
  CSSProperties,
  DetailedHTMLProps,
  FC,
  ReactElement,
  TextareaHTMLAttributes,
  useEffect,
  useState,
} from "react";

interface TextAreaProps
  extends DetailedHTMLProps<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  setId?: string;
  icon?: ReactElement;
  iconAlign?: "start" | "end";
  fullWidth?: boolean;
  containerClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
}

export const TextArea: FC<TextAreaProps> = ({
  setId = undefined,
  icon = null,
  iconAlign,
  containerClassName = "",
  labelClassName = "",
  fullWidth,
  inputClassName,
  ...props
}) => {
  const [ContainerStyles, setContainerStyles] = React.useState<CSSProperties>(
    {}
  );
  const [LabelStyles, setLabelStyles] = React.useState<CSSProperties>({});

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
      {icon && (
        <label
          style={LabelStyles}
          className={`${labelClassName} text-lg text-gray-400`}
          htmlFor={setId}
        >
          {icon}
        </label>
      )}
      <textarea
        className={`${inputClassName} h-32 w-full resize-none border-none py-2 placeholder-opacity-50 shadow-none outline-none ring-0 focus:border-none  focus:shadow-none  focus:outline-none focus:ring-0 active:border-none active:shadow-none active:outline-none active:ring-0`}
        {...props}
        id={setId}
      />
    </div>
  );
};
