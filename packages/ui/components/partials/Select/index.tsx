import { BiChevronDown } from "react-icons/bi";
import React from "react";
import { HtmlDivProps } from "types";
import { ElementChilds } from "../Menu";

type OnOptionSelect = (value: string) => any;
export interface SelectChildProps {
  onOptionSelect: OnOptionSelect;
}

export interface SelectProps
  extends Omit<HtmlDivProps, "children" | "onSelect"> {
  children: ElementChilds<SelectChildProps>;
  onOptionSelect?: OnOptionSelect;
  placeholder?: string;
}

export const Select: React.FC<SelectProps> = ({
  placeholder,
  className,
  children,
  ...props
}) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [selectedOption, setSelectedOption] =
    React.useState<React.ReactElement>(
      Array.isArray(children) ? children[0] : children
    );
  const [showChild, setShowChild] = React.useState<boolean>(false);
  let timeout: NodeJS.Timer;

  React.useEffect(() => {
    if (open) {
      clearTimeout(timeout);
      setShowChild(true);
    } else {
      setTimeout(() => {
        setShowChild(false);
      }, 200);
    }
  }, [open]);

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
      className={`${
        className || ""
      } border-gray-300 items-center flex border-2 rounded relative`}
    >
      <div className="flex w-full p-2 items-center justify-between">
        <div
          onClick={handleToggle}
          className="cursor-pointer px-2 w-full flex items-center whitespace-nowrap "
        >
          {React.cloneElement(selectedOption, { selectable: false })}
        </div>
        <BiChevronDown className="text-xl" />
      </div>
      <div
        className={`${
          open ? "scale-y-100" : "scale-y-0"
        } transition-all origin-top overflow-hidden transform absolute left-0 flex flex-col top-full w-full`}
      >
        {showChild ? (
          <>
            {Array.isArray(children)
              ? children.map((child, i) => (
                  <>
                    {React.cloneElement<SelectChildProps>(child, {
                      onOptionSelect: (value) =>
                        handleSelect(value, children[i]),
                      key: i,
                    })}
                  </>
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
    ></div>
  );
};
