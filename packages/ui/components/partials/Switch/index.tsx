import { setTestid } from "ui/utils/test-utils";
import React from "react";
import { IoCheckmark } from "react-icons/io5";
import { MdClose } from "react-icons/md";
import { HtmlDivProps } from "types";

export interface SwitchProps extends Omit<HtmlDivProps, "onChange"> {
  onChange?: (checked: boolean) => void;
  checked?: boolean;
}

export const Switch: React.FC<SwitchProps> = ({
  className,
  onChange,
  checked,
  ...props
}) => {
  const [Checked, setChecked] = React.useState<boolean>(false);
  function handleToggle() {
    setChecked((state) => {
      onChange && onChange(!state);
      return !state;
    });
  }
  React.useEffect(() => {
    typeof checked === "boolean" && setChecked(checked);
  }, [checked]);
  return (
    <div
      {...props}
      onClick={handleToggle}
      data-testid="SwitchButton"
      className={`${className} ${
        Checked ? "bg-primary" : "bg-gray-300"
      }  cursor-pointer w-fit rounded-full p-1 transition-all`}
    >
      <div className="w-8 h-4">
        <div
          className={`${
            Checked ? "translate-x-full text-primary" : "text-gray-300"
          } h-4 w-4 transform flex justify-center text-2xl  items-center rounded-full bg-white transition-all`}
        >
          {Checked ? <IoCheckmark /> : <MdClose />}
        </div>
      </div>
    </div>
  );
};
