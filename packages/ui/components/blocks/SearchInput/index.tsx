import React, { Children, DetailedHTMLProps, InputHTMLAttributes } from "react";
import { CSSValueUnit } from "types/sharedTypes/css/valueUnit";
import { useOutsideClick } from "ui/Hooks";
import { CSSValueUnitToString } from "ui/components/helpers";
export interface SearchInputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  icon?: React.ReactElement;
  iconAlign?: "start" | "end";
  fullWidth?: boolean;
  variant?: "text" | "number";
  initialValue?: string;
  explictWidth?: CSSValueUnit;
  components?: Component[];
  onValueChange?: (value: string) => void;
  onSelection?: (value: string) => void;
}
interface Component {
  name: string;
  value?: string;
  comp: React.ReactElement;
}
export const _SearchInput: React.FC<SearchInputProps> = ({
  icon,
  iconAlign,
  fullWidth,
  initialValue,
  explictWidth,
  onValueChange,
  components,
  onSelection,
  ...props
}) => {
  const [value, setValue] = React.useState<string>(initialValue || "");
  const [dropdownOpen, setDropdownOpen] = React.useState<boolean>(false);
  const [Components, setComponents] = React.useState<Component[]>(
    components || []
  );
  const ContainerStyles: React.CSSProperties = {};
  const inputStyles: React.CSSProperties = {};

  const containerRef = React.useRef<HTMLDivElement>(null);

  useOutsideClick(containerRef, () => setDropdownOpen(false));

  React.useEffect(() => {
    if (components) {
      setComponents((state) =>
        components.filter((item) => {
          if (!value || value.length < 1) return state;
          return item.name.toLowerCase().includes(value.toLowerCase());
        })
      );
    }
    if (onValueChange) {
      onValueChange(value);
    }
  }, [value]);

  if (fullWidth) {
    inputStyles.width = "100%";
  }

  switch (iconAlign) {
    case "end":
      ContainerStyles.flexDirection = "row-reverse";
      break;
  }
  if (explictWidth) {
    ContainerStyles.width = CSSValueUnitToString(explictWidth);
  }

  function handleSelect(index: number) {
    const item = Components[index];
    if (onSelection && item.value) {
      onSelection(item.value);
    }
    setValue(item.name);
    setDropdownOpen(false);
  }

  return (
    <div
      ref={containerRef}
      style={ContainerStyles}
      className={`relative flex w-fit items-center gap-2 rounded border-2 border-gray-400 border-opacity-50 `}
    >
      {icon && (
        <label className={`px-2 text-lg text-gray-400`} htmlFor={props.id}>
          {icon}
        </label>
      )}
      <input
        style={inputStyles}
        className={`
             w-full border-none p-2 placeholder-opacity-50 outline-none focus:ring-0`}
        value={value}
        onFocus={() => setDropdownOpen(true)}
        onChange={(e) => setValue(e.target.value)}
        {...props}
      />
      {Components && dropdownOpen && (
        <div className="no-scroll absolute left-0 top-[110%] z-10 flex max-h-36 w-full flex-col gap-0.5 overflow-scroll bg-white">
          {Components.map((comp, i) => (
            <div
              className="cursor-pointer bg-white p-2 hover:bg-gray-100"
              onClick={() => handleSelect(i)}
              key={i}
            >
              {comp.comp}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
