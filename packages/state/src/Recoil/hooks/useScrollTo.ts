import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { FilterAndAddToArray } from "utils";
import { pageRefSectionState, RefSectionType } from "../misc";

export const useScrollTo = () => {
  const sections = useRecoilValue(pageRefSectionState);

  const ScrollTo = (elementKey: string) => {
    const targetElement = sections.find((e) => e.key === elementKey);
    if (!targetElement) return;

    targetElement.ref.scrollIntoView();
  };

  return {
    ScrollTo,
  };
};

export const useSetSectionRef = () => {
  const setRef = useSetRecoilState(pageRefSectionState);
  const addRef = (section: RefSectionType) => {
    setRef((state) => {
      return FilterAndAddToArray(state, section, "exclude", "key");
    });
  };

  const removeRef = (key: string) => {
    setRef((state) => state.filter((ref) => ref.key !== key));
  };

  return {
    addRef,
    removeRef,
  };
};

export const usePublishRef = (key: string) => {
  const { addRef, removeRef } = useSetSectionRef();
  const cb = React.useCallback((node: any) => {
    if (node === null) {
      removeRef(key);
    } else {
      addRef({ key, ref: node });
    }
  }, []);
  return cb;
};
