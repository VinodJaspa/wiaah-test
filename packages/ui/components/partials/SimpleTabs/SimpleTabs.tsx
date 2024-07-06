import React from "react";
import { HtmlDivProps } from "types";
import {
  mapArray,
  MaybeFn,
  PassPropsToChild,
  PassPropsToFnOrElem,
  runIfFn,
} from "utils";

interface SimpleTabsCtxType {
  currIdx: number;
  setCurrIdx: (idx: number) => any;
}

const SimpleTabsContext = React.createContext<SimpleTabsCtxType>({
  currIdx: 0,
  setCurrIdx(idx) { },
});

interface SimpleTabsProps {
  onChange?: (idx: number) => any;
  value?: number;
  children?: React.ReactNode;
}

export const SimpleTabs: React.FC<SimpleTabsProps> = ({
  onChange: _onChange,
  value: _value,
  children,
}) => {
  const [idx, setIdx] = React.useState<number>(0);

  const value = _value ?? idx;
  const onChange = _onChange ?? setIdx;
  return (
    <SimpleTabsContext.Provider
      value={{
        currIdx: value,
        setCurrIdx(idx) {
          onChange(idx);
        },
      }}
      children={children}
    />
  );
};

type SimpleTabHeadChildProps = {
  selected: boolean;
} & HtmlDivProps;

interface SimpleTabHeadProps {
  children: MaybeFn<SimpleTabHeadChildProps>;
}

export const SimpleTabHead: React.FC<SimpleTabHeadProps> = ({
  children: _children,
}) => {
  const children = _children
    ? (Array.isArray(_children) ? _children : [_children]).filter((v) => !!v)
    : [];
  const { setCurrIdx, currIdx } = React.useContext(SimpleTabsContext);

  return (
    <>
      {mapArray(children, (c, i) => (
        <>
          {PassPropsToFnOrElem<SimpleTabHeadChildProps>(c, {
            onClick: () => setCurrIdx(i),
            selected: i === currIdx,
          })}
        </>
      ))}
    </>
  );
};

export const SimpleTabItemList: React.FC<{ children: React.ReactNode }> = ({
  children: _children,
}) => {
  const children = _children
    ? React.Children.toArray(_children).filter((v) => !!v)
    : [];
  const { currIdx } = React.useContext(SimpleTabsContext);
  return <>{React.Children.toArray(children).at(currIdx)}</>;
};

export const SimpleTabHeadButton: React.FC<{
  selected?: boolean;
  onClick?: () => any;
  children?: React.ReactNode;
}> = ({ onClick, selected, children }) => {
  return (
    <div
      onClick={onClick}
      className={`${selected
          ? "border border-b-0 border-b-gray-300 text-black"
          : "text-gray border border-white"
        } px-4 py-2`}
    >
      {/* @ts-ignore */}
      {children}
    </div>
  );
};
