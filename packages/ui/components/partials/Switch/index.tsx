import { setTestid } from "utils/src/test/test-utils";
import React from "react";
import { IoCheckmark } from "react-icons/io5";
import { MdClose } from "react-icons/md";
import { HtmlDivProps } from "types";
import { HStack } from "../Stack";
import { Button } from "../Button";
import { CloseIcon } from "../icons";

export interface SwitchProps extends Omit<HtmlDivProps, "onChange"> {
  onChange?: (checked: boolean) => void;
  checked?: boolean;
  label?: string;
  variant?: "basic" | "buttons" | "alt";
}

export const Switch: React.FC<SwitchProps> = ({
  className,
  onChange,
  checked,
  variant = "basic",
  ...props
}) => {
  function handleToggle() {
    onChange && onChange(!checked);
  }
  switch (variant) {
    case "basic":
      return (
        <div
          {...props}
          onClick={handleToggle}
          data-testid="SwitchButton"
          className={`${className} ${
            checked ? "bg-primary" : "bg-gray-300"
          }  cursor-pointer w-fit rounded-full p-1 transition-all`}
        >
          <div className="w-8 h-4">
            <div
              className={`${
                checked ? "translate-x-full text-primary" : "text-gray-300"
              } h-4 w-4 transform flex justify-center text-2xl  items-center rounded-full bg-white transition-all`}
            >
              {checked ? <IoCheckmark /> : <MdClose />}
            </div>
          </div>
        </div>
      );
    case "buttons":
      return (
        <HStack>
          <Button
            onClick={() => onChange && onChange(true)}
            outline={!checked}
            center
            colorScheme="primary"
            className="p-2 rounded-[100%]"
          >
            <IoCheckmark />
          </Button>
          <Button
            onClick={() => onChange && onChange(false)}
            outline={checked}
            center
            colorScheme="danger"
            className="p-2 rounded-[100%]"
          >
            <CloseIcon />
          </Button>
        </HStack>
      );

    case "alt":
      return (
        <div
          {...props}
          onClick={handleToggle}
          data-testid="SwitchButton"
          className={`${className} ${
            checked ? "bg-primary" : "bg-secondaryRed"
          }  cursor-pointer w-fit rounded-full p-1 transition-all`}
        >
          <div className="w-8 h-4">
            <div
              className={`${
                checked ? "translate-x-full text-primary" : "text-gray-300"
              } h-4 w-4 transform flex justify-center text-2xl  items-center rounded-full bg-white transition-all`}
            ></div>
          </div>
        </div>
      );
    default:
      break;
  }
};
