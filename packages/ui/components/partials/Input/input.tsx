import { useOutsideClick } from "hooks";
import React from "react";
import { useContext } from "react";
import { HtmlDivProps, HtmlInputProps } from "types";
import { CallbackAfter, MapChildren, MaybeFn, runIfFn } from "utils";

interface InputContextValue {
  isInputGroup: boolean;
  isFocused: boolean;
  inputLeftElement: React.ReactNode;
  inputRightElement: React.ReactNode;
  setFocused: (focused: boolean) => any;
  setInputLeftElement: (element: React.ReactNode) => any;
  setInputRightElement: (element: React.ReactNode) => any;
}

const InputContext = React.createContext<InputContextValue>({
  isInputGroup: false,
  inputLeftElement: null,
  inputRightElement: null,
  isFocused: false,
  setFocused: () => {},
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
      } border-gray-200 rounded px-3 w-full`}
    />
  );
};

export interface InputGroupProps extends HtmlDivProps {
  flushed?: boolean;
  children: MaybeFn<InputContextValue>;
}

export const InputGroup: React.FC<InputGroupProps> = ({
  children,
  className,
  flushed = false,
  ...props
}) => {
  const [focused, setFocused] = React.useState<boolean>(false);
  const [leftElement, setLeftElement] = React.useState<React.ReactNode>(null);
  const [rightElement, setRightElement] = React.useState<React.ReactNode>(null);
  const isGroup = !!leftElement || !!rightElement;

  const groupRef = React.useRef<HTMLDivElement>(null);

  useOutsideClick(groupRef, () => {
    setFocused(false);
  });

  console.log("is focused", focused, children);
  return (
    <InputContext.Provider
      value={{
        isFocused: focused,
        isInputGroup: isGroup,
        inputLeftElement: leftElement,
        inputRightElement: rightElement,
        setFocused: (focused) => setFocused(focused),
        setInputLeftElement: (element) => setLeftElement(element),
        setInputRightElement: (element) => setRightElement(element),
      }}
    >
      <div
        {...props}
        onFocus={() => setFocused(true)}
        ref={groupRef}
        className={`${className ?? ""} ${
          isGroup
            ? flushed
              ? "border-b-2 border-gray-200"
              : "border-2 border-gray-200"
            : ""
        } flex gap-1 items-center relative`}
      >
        {leftElement && <>{runIfFn(leftElement, {})}</>}
        {MapChildren<InputContextValue>(children, {
          isFocused: focused,
          isInputGroup: isGroup,
          inputLeftElement: leftElement,
          inputRightElement: rightElement,
          setFocused: (focused) => setFocused(focused),
          setInputLeftElement: (element) => setLeftElement(element),
          setInputRightElement: (element) => setRightElement(element),
        })}
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
        <div {...props} className={`${className || ""} px-2`}>
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

export interface InputSuggestionsProps extends HtmlDivProps {}
export const InputSuggestions: React.FC<InputSuggestionsProps> = ({
  children,
  className,
  ...props
}) => {
  const { isFocused } = useContext(InputContext);
  const [display, setDisplay] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (isFocused) {
      setDisplay(true);
    } else {
      CallbackAfter(300, () => {
        setDisplay(false);
      });
    }
  }, [isFocused]);

  return (
    <div
      {...props}
      className={`${className || ""} ${
        isFocused ? "" : "scale-y-0"
      } origin-top transition-transform max-h-96 overflow-scroll absolute z-10 top-full left-0 w-full`}
    >
      {display ? children : null}
    </div>
  );
};
