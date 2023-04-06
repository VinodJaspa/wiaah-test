import { BiChevronDown } from "react-icons/bi";
import React from "react";
import { HtmlDivProps } from "types";
import { ElementChilds } from "types";
import { useOutsideClick } from "hooks";
import { CallbackAfter } from "utils";
import { ArrowDownIcon } from "@UI";

type OnOptionSelect<T> = (value: T) => any;
export interface SelectChildProps<T> {
  onOptionSelect: OnOptionSelect<T>;
}

export interface SelectProps<SelectOptionType = string>
  extends Omit<HtmlDivProps, "children" | "onSelect"> {
  children?: ElementChilds<SelectChildProps<SelectOptionType>> | null;
  onOptionSelect?: OnOptionSelect<SelectOptionType>;
  placeholder?: string;
  value?: string | boolean | number;
  flushed?: boolean;
  label?: string;
  labelClassName?: string;
}

export function Select<ValueType = string>({
  placeholder,
  className,
  children,
  value,
  flushed,
  onOptionSelect,
  label,
  labelClassName,
  ...props
}: SelectProps<ValueType>) {
  const ph = placeholder ? (
    <SelectOption className="text-gray-500" value>
      {placeholder}
    </SelectOption>
  ) : children ? (
    Array.isArray(children) ? (
      children[0]
    ) : (
      children
    )
  ) : null;
  const [open, setOpen] = React.useState<boolean>(false);
  const [selectedOption, setSelectedOption] =
    React.useState<React.ReactElement | null>(ph);
  const [showChild, setShowChild] = React.useState<boolean>(false);
  const ref = React.useRef<HTMLDivElement>(null);

  useOutsideClick(ref, handleClose);
  let timeout: NodeJS.Timer;

  React.useEffect(() => {
    if (open) {
      clearTimeout(timeout);
      setShowChild(true);
    } else {
      CallbackAfter(200, () => {
        setShowChild(false);
      });
    }
  }, [open]);

  React.useEffect(() => {
    if (value === "" || !value) {
      setSelectedOption(ph);
    }
  }, [value]);

  function handleSelect(value: ValueType, child: React.ReactElement) {
    onOptionSelect && onOptionSelect(value);
    setSelectedOption(child);
    handleClose();
  }
  function handleClose() {
    setOpen(false);
  }

  function handleToggle() {
    setOpen((state) => !state);
  }
  return (
    <div className="w-full flex flex-col gap-1">
      {label ? (
        <p className={`${labelClassName ? labelClassName : "font-semibold"}`}>
          {label}
        </p>
      ) : null}
      <div
        {...props}
        ref={ref}
        className={`${className || ""} ${
          flushed ? "border-b-2" : "border-2"
        } bg-white border-[#EDEDED] items-center flex rounded-xl relative`}
      >
        <div
          onClick={handleToggle}
          data-testid="SelectBar"
          className="flex w-full p-2 items-center justify-between"
        >
          <div className="flex flex-col gap-1">
            <div
              data-testid="SelectedOption"
              className="cursor-pointer w-full flex items-center gap-2 whitespace-nowrap "
            >
              {selectedOption &&
                React.cloneElement(selectedOption, { selectable: false })}
            </div>
          </div>
          <div className="flex h-full gap-2">
            <div className="h-6 border-l border-black"></div>
            <ArrowDownIcon className="text-xl" />
          </div>
        </div>
        <div
          data-testid="SelectOptionsContainer"
          className={`${
            open ? "scale-y-100" : "scale-y-0"
          } transition-all duration-75 z-50 bg-white origin-top max-h-48 overflow-y-scroll thinScroll transform absolute left-0 flex flex-col top-full w-full`}
        >
          {children && showChild ? (
            <>
              {Array.isArray(children)
                ? children.map((child, i) => (
                    <React.Fragment key={i}>
                      {React.cloneElement<SelectChildProps<ValueType>>(child, {
                        onOptionSelect: (value) =>
                          handleSelect(value, children[i]),
                        key: i,
                      })}
                    </React.Fragment>
                  ))
                : React.cloneElement<SelectChildProps<ValueType>>(children, {
                    onOptionSelect: (value) => handleSelect(value, children),
                  })}
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export interface SelectListProps
  extends Partial<Omit<HtmlDivProps, "onSelect"> & SelectChildProps<any>> {
  value: any;
  selectable?: boolean;
}

export const SelectOption: React.FC<SelectListProps> = ({
  onOptionSelect,
  className,
  value,
  selectable = true,
  ...props
}) => {
  return (
    <div
      {...props}
      onClick={() => onOptionSelect && onOptionSelect(value)}
      className={`${className || ""} ${
        selectable
          ? "px-4 py-2 cursor-pointer hover:bg-gray-200 active:bg-gray-300 w-full"
          : "px-2"
      }
       select-none `}
    />
  );
};
