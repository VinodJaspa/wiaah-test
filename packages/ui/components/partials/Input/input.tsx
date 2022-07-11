import React from "react";
import { HtmlDivProps, HtmlInputProps } from "types";
import { PassPropsToChild, runIfFn } from "utils";

interface InputContextValue {
  isInputGroup: boolean;
  inputLeftElement: React.ReactNode;
  inputRightElement: React.ReactNode;

  setInputLeftElement: (element: React.ReactNode) => any;
  setInputRightElement: (element: React.ReactNode) => any;
}

const InputContext = React.createContext<InputContextValue>({
  isInputGroup: false,
  inputLeftElement: null,
  inputRightElement: null,

  setInputLeftElement: () => {},
  setInputRightElement: () => {},
});

export interface InputProps extends HtmlInputProps {
  flushed?: boolean;
  icon?: any;
}

export const Input: React.FC<InputProps> = ({
  className,
  flushed,
  ...props
}) => {
  const { isInputGroup } = React.useContext(InputContext);

  return (
    <input
      {...props}
      className={`${className || ""} ${
        isInputGroup ? "" : flushed ? "border-b-2" : "border-2"
      } border-gray-200 rounded px-3`}
    />
  );
};

export interface InputGroupProps extends HtmlDivProps {
  flushed?: boolean;
}

export const InputGroup: React.FC<InputGroupProps> = ({
  children,
  className,
  flushed = false,
  ...props
}) => {
  const [leftElement, setLeftElement] = React.useState<React.ReactNode>(null);
  const [rightElement, setRightElement] = React.useState<React.ReactNode>(null);
  const isGroup = !!leftElement || !!rightElement;
  return (
    <InputContext.Provider
      value={{
        isInputGroup: isGroup,
        inputLeftElement: leftElement,
        inputRightElement: rightElement,
        setInputLeftElement: (element) => setLeftElement(element),
        setInputRightElement: (element) => setRightElement(element),
      }}
    >
      <div
        {...props}
        className={`${className ?? ""} ${
          isGroup
            ? flushed
              ? "border-b-2 border-gray-200"
              : "border-2 border-gray-200"
            : ""
        } flex gap-1 items-center`}
      >
        {leftElement && <>{runIfFn(leftElement, {})}</>}
        {children}
        {rightElement && <>{runIfFn(rightElement, {})}</>}
      </div>
    </InputContext.Provider>
  );
};

export interface InputLeftElementProps extends HtmlDivProps {}

export const InputLeftElement: React.FC<InputLeftElementProps> = ({
  children,
  className,
  ...props
}) => {
  const { setInputLeftElement } = React.useContext(InputContext);
  React.useEffect(
    () =>
      setInputLeftElement(
        <div {...props} className={`${className || ""}`}>
          {children}
        </div>
      ),
    [children]
  );
  return null;
};

export interface InputRightElementProps extends HtmlDivProps {}

export const InputRightElement: React.FC<InputRightElementProps> = ({
  children,
  className,
  ...props
}) => {
  const { setInputRightElement } = React.useContext(InputContext);
  React.useEffect(() => {
    setInputRightElement(
      <div {...props} className={`${className || ""}`}>
        {children}
      </div>
    );
  }, [children]);
  return null;
};
