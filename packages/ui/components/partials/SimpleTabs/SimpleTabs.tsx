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
  setCurrIdx(idx) {},
});

interface SimpleTabsProps {}

export const SimpleTabs: React.FC<SimpleTabsProps> = (props) => {
  const [idx, setIdx] = React.useState<number>(0);
  return (
    <SimpleTabsContext.Provider
      value={{
        currIdx: idx,
        setCurrIdx(idx) {
          setIdx(idx);
        },
      }}
      {...props}
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
    ? React.Children.toArray(_children).filter((v) => !!v)
    : [];
  const { setCurrIdx, currIdx } = React.useContext(SimpleTabsContext);
  return (
    <>
      {mapArray(Array.isArray(children) ? children : [children], (c, i) => (
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

export const SimpleTabItemList: React.FC = ({ children: _children }) => {
  const children = _children
    ? React.Children.toArray(_children).filter((v) => !!v)
    : [];
  const { currIdx } = React.useContext(SimpleTabsContext);
  return <>{React.Children.toArray(children).at(currIdx)}</>;
};

export const SimpleTabHeadButton: React.FC<{
  selected?: boolean;
  onClick?: () => any;
}> = ({ onClick, selected, children }) => {
  return (
    <div
      onClick={onClick}
      className={`${
        selected
          ? "border border-b-0 border-b-gray-300 text-black"
          : "text-gray border border-white"
      } px-4 py-2`}
    >
      {children}
    </div>
  );
};
