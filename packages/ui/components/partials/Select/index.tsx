import { BiChevronDown } from "react-icons/bi";
import React from "react";
import { HtmlDivProps } from "types";
import { ElementChilds } from "types";
import { useCallbackAfter, useOutsideClick } from "hooks";

type OnOptionSelect = (value: string) => any;
export interface SelectChildProps {
  onOptionSelect: OnOptionSelect;
}

export interface SelectProps
  extends Omit<HtmlDivProps, "children" | "onSelect"> {
  children: ElementChilds<SelectChildProps>;
  onOptionSelect?: OnOptionSelect;
  placeholder?: string;
  value?: string;
  flushed?: boolean;
}

export const Select: React.FC<SelectProps> = ({
  placeholder,
  className,
  children,
  value,
  flushed,
  ...props
}) => {
  const ph = placeholder ? (
    <SelectOption className="text-gray-500" value>
      {placeholder}
    </SelectOption>
  ) : Array.isArray(children) ? (
    children[0]
  ) : (
    children
  );
  const [open, setOpen] = React.useState<boolean>(false);
  const [selectedOption, setSelectedOption] =
    React.useState<React.ReactElement>(ph);
  const [showChild, setShowChild] = React.useState<boolean>(false);
  const ref = React.useRef<HTMLDivElement>(null);
  useOutsideClick(ref, handleClose);
  let timeout: NodeJS.Timer;

  React.useEffect(() => {
    if (open) {
      clearTimeout(timeout);
      setShowChild(true);
    } else {
      useCallbackAfter(200, () => {
        setShowChild(false);
      });
    }
  }, [open]);

  React.useEffect(() => {
    if (value === "") {
      setSelectedOption(ph);
    }
  }, [value]);

  function handleSelect(value: string, child: React.ReactElement) {
    props.onOptionSelect && props.onOptionSelect(value);
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
    <div
      {...props}
      ref={ref}
      className={`${className || ""} ${
        flushed ? "border-b-2" : "border-2"
      } bg-white border-gray-200 items-center flex  rounded relative`}
    >
      <div
        onClick={handleToggle}
        data-testid="SelectBar"
        className="flex w-full p-2 items-center justify-between"
      >
        <div
          data-testid="SelectedOption"
          className="cursor-pointer w-full flex items-center whitespace-nowrap "
        >
          {selectedOption &&
            React.cloneElement(selectedOption, { selectable: false })}
        </div>
        <BiChevronDown className="text-xl" />
      </div>
      <div
        data-testid="SelectOptionsContainer"
        className={`${
          open ? "scale-y-100" : "scale-y-0"
        } transition-all duration-75 z-50 bg-white origin-top max-h-48 overflow-y-scroll transform absolute left-0 flex flex-col top-full w-full`}
      >
        {showChild ? (
          <>
            {Array.isArray(children)
              ? children.map((child, i) => (
                  <React.Fragment key={i}>
                    {React.cloneElement<SelectChildProps>(child, {
                      onOptionSelect: (value) =>
                        handleSelect(value, children[i]),
                      key: i,
                    })}
                  </React.Fragment>
                ))
              : React.cloneElement<SelectChildProps>(children, {
                  onOptionSelect: (value) => handleSelect(value, children),
                })}
          </>
        ) : null}
      </div>
    </div>
  );
};

export interface SelectListProps
  extends Partial<Omit<HtmlDivProps, "onSelect"> & SelectChildProps> {
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
          : ""
      }
       `}
    />
  );
};
