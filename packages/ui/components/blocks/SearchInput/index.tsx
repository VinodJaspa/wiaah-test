import React from "react";
import { useOutsideClick } from "@src/Hooks";
import {
  InputGroup,
  InputLeftElement,
  InputProps,
  InputRightElement,
} from "ui";
import { Input } from "ui";
import { HtmlInputProps } from "types";
export interface SearchFilterInputProps extends InputProps {
  value: string;
  icon?: () => JSX.Element | undefined;
  initialValue?: string;
  rightElement?: JSX.Element;
  components?: Component[];
  onSelection?: (value: string) => void;
  onNotFound?: (found: boolean) => any;
}
interface Component {
  name: string;
  value?: string;
  comp: React.ReactElement;
}
export const SearchFilterInput: React.FC<SearchFilterInputProps> = ({
  icon,
  initialValue,
  components = [],
  onSelection,
  value,
  rightElement,
  onNotFound,
  ...props
}) => {
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
      onNotFound && onNotFound(components.length > 0);
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
    <InputGroup
      ref={containerRef}
      flushed={props.flushed}
      className="relative h-12"
    >
      {iconRes && (
        <InputLeftElement>
          <label className={`px-2 text-lg text-gray-400`} htmlFor={props.id}>
            {iconRes}
          </label>
        </InputLeftElement>
      )}
      {rightElement && <InputRightElement>{rightElement}</InputRightElement>}
      <Input
        style={inputStyles}
        onFocus={() => setDropdownOpen(true)}
        value={value}
        className={`${props.className || ""} ${
          iconRes ? "pl-10" : "pl-0"
        } w-full`}
        {...props}
      />
      {Components && dropdownOpen && (
        <div className="thinScroll absolute left-0 top-[110%] z-10 flex max-h-16 w-full flex-col gap-0.5 overflow-scroll bg-white">
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
