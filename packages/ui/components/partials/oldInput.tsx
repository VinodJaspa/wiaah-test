import React, {
  CSSProperties,
  DetailedHTMLProps,
  FC,
  InputHTMLAttributes,
  ReactElement,
} from "react";
import { Field } from "formik";
import { CSSValueUnit } from "types/sharedTypes/css/valueUnit";
import { useOutsideClick } from "../../Hooks";
import { CSSValueUnitToString } from "../helpers/CSSValueUnitToString";
import { InputErrorMsg } from "types/sharedTypes/misc/ErrorMsg";
export interface oldInputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  icon?: ReactElement;
  iconAlign?: "start" | "end";
  fullWidth?: boolean;
  variant?: "text" | "number";
  initialValue?: string;
  formik?: boolean;
  explictWidth?: CSSValueUnit;
  message?: InputErrorMsg;
  onValueChange?: (value: string) => void;
}

export const oldInput: FC<oldInputProps> = ({
  icon = null,
  iconAlign,
  fullWidth,
  initialValue,
  variant,
  explictWidth,
  onValueChange,
  message,
  formik,
  ...props
}) => {
  const [value, setValue] = React.useState<string>(initialValue || "");
  const [focus, setFocus] = React.useState<boolean>(false);
  const ContainerStyles: React.CSSProperties = {};
  const inputStyles: React.CSSProperties = {};
  const wrapperStyles: React.CSSProperties = {};
  const containerRef = React.useRef<HTMLDivElement>(null);

  useOutsideClick(containerRef, () => setFocus(false));

  React.useEffect(() => {
    if (onValueChange) {
      onValueChange(value);
    }
  }, [value]);

  if (fullWidth) {
    wrapperStyles.width = "100%";
  }

  switch (iconAlign) {
    case "end":
      ContainerStyles.flexDirection = "row-reverse";
      break;
  }
  if (explictWidth) {
    wrapperStyles.width = CSSValueUnitToString(explictWidth);
  }

  if (formik) {
    switch (variant) {
      case "number":
        return (
          <Field
            type="number"
            {...props}
            className="no-arrows h-full w-full border-none text-center outline-none "
          />
        );
      default:
        return (
          <div
            ref={containerRef}
            style={wrapperStyles}
            className="flex flex-col"
          >
            <div
              style={ContainerStyles}
              className={`flex w-full items-center gap-2 rounded border-2 ${
                focus ? "border-black" : "border-gray-400"
              } border-opacity-50  transition-all`}
            >
              {icon && (
                <label
                  className={`px-2 text-lg text-gray-400`}
                  htmlFor={props.id}
                >
                  {icon}
                </label>
              )}
              <Field
                style={inputStyles}
                className={`
             w-full border-none p-2 placeholder-opacity-50 outline-none focus:ring-0`}
                onFocus={() => setFocus(true)}
                {...props}
              />
            </div>
            {message && (
              <span
                id={`${props.id || ""}InputMessage`}
                className={`${
                  message.error ? "text-red-500" : "text-green-500"
                } w-full px-1 text-sm `}
              >
                {message.msg}
              </span>
            )}
          </div>
        );
    }
  } else {
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
            ref={containerRef}
            style={wrapperStyles}
            className="flex flex-col"
          >
            <div
              style={ContainerStyles}
              className={`flex w-full items-center gap-2 rounded border-2 ${
                focus ? "border-black" : "border-gray-400"
              } border-opacity-50  transition-all`}
            >
              {icon && (
                <label
                  className={`px-2 text-lg text-gray-400`}
                  htmlFor={props.id}
                >
                  {icon}
                </label>
              )}
              <input
                style={inputStyles}
                className={`
             w-full border-none p-2 placeholder-opacity-50 outline-none focus:ring-0`}
                value={value}
                onFocus={() => setFocus(true)}
                onChange={(e) => setValue(e.target.value)}
                {...props}
              />
            </div>
            {message && (
              <span
                className={`${
                  message.error ? "text-red-500" : "text-green-500"
                } w-full px-1 text-sm `}
              >
                {message.msg}
              </span>
            )}
          </div>
        );
    }
  }
};
