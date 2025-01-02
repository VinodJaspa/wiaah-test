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

const BasicSwitch: React.FC<{
  checked: boolean;
  onToggle: () => void;
  className?: string;
  alt?: boolean;
  props?: HtmlDivProps;
}> = ({ checked, onToggle, className = "", alt = false, props }) => {
  const baseClasses = `cursor-pointer w-fit rounded-full p-1 transition-all`;
  const bgClasses = checked
    ? alt
      ? "bg-primary"
      : "bg-primary"
    : alt
      ? "bg-secondaryRed"
      : "bg-gray-300";

  return (
    <div
      {...props}
      onClick={onToggle}
      data-testid="SwitchButton"
      className={`${className} ${baseClasses} ${bgClasses}`}
    >
      <div className="w-8 h-4">
        <div
          className={`${checked ? "translate-x-full text-primary" : "text-gray-300"
            } h-4 w-4 transform flex justify-center text-2xl items-center rounded-full bg-white transition-all`}
        >
          {checked ? <IoCheckmark /> : <MdClose />}
        </div>
      </div>
    </div>
  );
};

const ButtonSwitch: React.FC<{
  checked: boolean;
  onToggle: (value: boolean) => void;
}> = ({ checked, onToggle }) => (
  <HStack>
    <Button
      onClick={() => onToggle(true)}
      outline={!checked}
      center
      colorScheme="primary"
      className="p-2 rounded-[100%]"
    >
      <IoCheckmark />
    </Button>
    <Button
      onClick={() => onToggle(false)}
      outline={checked}
      center
      colorScheme="danger"
      className="p-2 rounded-[100%]"
    >
      <CloseIcon />
    </Button>
  </HStack>
);

export const Switch: React.FC<SwitchProps> = ({
  className,
  onChange,
  checked = false,
  variant = "basic",
  ...props
}) => {
  const handleToggle = () => {
    onChange && onChange(!checked);
  };

  if (variant === "buttons") {
    return <ButtonSwitch checked={checked} onToggle={onChange!} />;
  }

  return (
    <BasicSwitch
      checked={checked}
      onToggle={handleToggle}
      className={className}
      alt={variant === "alt"}
      props={props}
    />
  );
};
