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

export const SimpleTabHead: React.FC<SimpleTabHeadProps> = ({ children }) => {
  console.log("tab childs", children);
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

export const SimpleTabItemList: React.FC = ({ children }) => {
  const { currIdx } = React.useContext(SimpleTabsContext);
  return <>{React.Children.toArray(children).at(currIdx)}</>;
};
