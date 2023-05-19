import { useOutsideClick } from "hooks";
import React from "react";
import { useContext } from "react";
import { HtmlDivProps, HtmlInputProps } from "types";
import { CallbackAfter, MapChildren, MaybeFn, runIfFn } from "utils";
import { EyeIcon, EyeIconSlash } from "../icons";

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
  description?: string;
  label?: string;
  error?: string;
  isPassword?: boolean;
}

export const Input: React.FC<InputProps> = ({
  className,
  flushed,
  description,
  label,
  error,
  isPassword,
  ...props
}) => {
  const { isInputGroup, setFocused } = React.useContext(InputContext);
  const [passShow, setPassShow] = React.useState<boolean>(false);

  return (
    <div className="w-full">
      {label ? <p className="font-medium">{label}</p> : null}
      <div className="relative">
        <input
          type={
            isPassword
              ? passShow
                ? "text"
                : "password"
              : props.type || undefined
          }
          onFocus={(e) => {
            props.onFocus && props.onFocus(e);
            setFocused && setFocused(true);
          }}
          {...props}
          className={`${className || ""} ${
            isInputGroup
              ? "border-none focus:ring-0 focus:border-none focus-visible:border-none focus-within:border-none active:border-none"
              : flushed
              ? "border-b-2 border-t-0 border-l-0 border-r-0"
              : "border-2"
          }
        focus:border-primary-200 border-[#EDEDED] rounded-lg px-3 w-full h-10`}
        />
        {isPassword ? (
          passShow ? (
            <button
              className="absolute top-1/2 -translate-y-1/2 right-4"
              onClick={() => setPassShow(false)}
            >
              <EyeIcon className="text-lg" />
            </button>
          ) : (
            <button
              className="absolute top-1/2 -translate-y-1/2 right-4"
              onClick={() => setPassShow(true)}
            >
              <EyeIconSlash className="text-lg" />
            </button>
          )
        ) : null}
      </div>
      {description ? <p>{description}</p> : null}
      {error ? (
        <p className="font-semibold text-red-500 text-lg pt-1">{error}</p>
      ) : null}
    </div>
  );
};

export interface InputGroupProps extends Omit<HtmlDivProps, "children"> {
  flushed?: boolean;
  children?: MaybeFn<InputContextValue>;
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
          isGroup ? (flushed ? "border-b-2" : "border-2") : ""
        } ${
          focused ? "border-primary-200" : "border-[#EDEDED]"
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
      } origin-top transition-transform max-h-96 overflow-scroll thinScroll absolute z-10 top-full left-0 w-full`}
    >
      {display ? children : null}
    </div>
  );
};
