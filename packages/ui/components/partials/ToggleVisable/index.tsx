import React from "react";
import { MaybeFn, runIfFn } from "utils";

interface ToggleVisableCtxValues {
  state: string;
  changeState: (state: string) => any;
}

const ToggleVisableCtx = React.createContext<ToggleVisableCtxValues>({
  changeState: () => {},
  state: "",
});
export interface ToggleVisiableProps {
  children: MaybeFn<ToggleVisableCtxValues>;
}

export const ToggleVisable: React.FC<ToggleVisiableProps> = ({ children }) => {
  const [state, setState] = React.useState<string>("");

  function changeState(v: string) {
    setState(v);
  }

  return (
    <ToggleVisableCtx.Provider value={{ state, changeState }}>
      {runIfFn(children, {
        state,
        changeState,
      })}
    </ToggleVisableCtx.Provider>
  );
};

interface ToggleVisableItemProps {
  visableOnState: string | string[];
}

export const ToggleVisableItem: React.FC<ToggleVisableItemProps> = ({
  visableOnState,
  children,
}) => {
  const { state } = React.useContext(ToggleVisableCtx);

  return (
    <>
      {Array.isArray(visableOnState)
        ? visableOnState.includes(state)
          ? children
          : null
        : visableOnState === state
        ? children
        : null}
    </>
  );
};
