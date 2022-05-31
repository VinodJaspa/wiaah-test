import React from "react";
import { HtmlDivProps, HtmlInputProps } from "types";
import { runIfFn } from "utils";

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
      } border-gray-200 p-2 rounded`}
    />
  );
};

export interface InputGroupProps extends HtmlDivProps {}

export const InputGroup: React.FC<InputGroupProps> = ({
  children,
  className,
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
          isGroup ? "border-2 border-gray-200 rounded-lg" : ""
        } flex gap-1 items-center`}
      >
        {leftElement && (
          <span className="px-1">{runIfFn(leftElement, {})}</span>
        )}
        {children}
        {rightElement && (
          <span className="px-1">{runIfFn(rightElement, {})}</span>
        )}
      </div>
    </InputContext.Provider>
  );
};

export interface InputLeftElementProps {}

export const InputLeftElement: React.FC<InputLeftElementProps> = ({
  children,
}) => {
  const { setInputLeftElement } = React.useContext(InputContext);
  setInputLeftElement(children);
  return null;
};

export interface InputRightElementProps {}

export const InputRightElement: React.FC<InputRightElementProps> = ({
  children,
}) => {
  const { setInputRightElement } = React.useContext(InputContext);
  setInputRightElement(children);
  return null;
};
