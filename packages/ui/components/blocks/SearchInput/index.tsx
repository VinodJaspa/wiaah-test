import React, { Children, DetailedHTMLProps, InputHTMLAttributes } from "react";
import { CSSValueUnit } from "types/sharedTypes/css/valueUnit";
import { useOutsideClick } from "ui/Hooks";
import { CSSValueUnitToString } from "ui/components/helpers";
import {
  Input,
  InputProps,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
export interface SearchInputProps extends InputProps {
  value: string;
  icon?: () => JSX.Element | undefined;
  initialValue?: string;
  rightElement?: JSX.Element;
  components?: Component[];
  onSelection?: (value: string) => void;
}
interface Component {
  name: string;
  value?: string;
  comp: React.ReactElement;
}
export const SearchFilterInput: React.FC<SearchInputProps> = ({
  icon,
  initialValue,
  components = [],
  onSelection,
  value,
  rightElement,
  ...props
}) => {
  // const [value, setValue] = React.useState<string>(initialValue || "");
  const [dropdownOpen, setDropdownOpen] = React.useState<boolean>(false);
  const [Components, setComponents] = React.useState<Component[]>(
    components || []
  );
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
  }, [value]);
  function handleSelect(index: number) {
    const item = Components[index];
    if (onSelection && item.value) {
      onSelection(item.value);
    }
    setDropdownOpen(false);
  }
  const iconRes = icon ? icon() : undefined;

  return (
    <InputGroup ref={containerRef} position={"relative"}>
      {iconRes && (
        <InputLeftElement>
          <label className={`px-2 text-lg text-gray-400`} htmlFor={props.id}>
            {iconRes}
          </label>
        </InputLeftElement>
      )}
      {rightElement && <InputRightElement>{rightElement}</InputRightElement>}
      {/* @ts-ignore */}
      <Input
        style={inputStyles}
        onFocus={() => setDropdownOpen(true)}
        value={value}
        {...props}
      />
      {Components && dropdownOpen && (
        <div className="thinScroll absolute left-0 top-[110%] z-10 flex max-h-36 w-full flex-col gap-0.5 overflow-scroll bg-white">
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
    </InputGroup>
  );
};
