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

type PublishableRefs = {
  vehicle: string;
  map: string;
  description: string;
  contact: string;
  rooms: string;
  resturants: string;
  polices: string;
  reviews: string;
  doctors: string;
  workingHours: string;
  localization: string;
};

const publishableRefs: Record<keyof PublishableRefs, keyof PublishableRefs> = {
  vehicle: "vehicle",
  contact: "contact",
  description: "description",
  map: "map",
  polices: "polices",
  resturants: "resturants",
  reviews: "reviews",
  rooms: "rooms",
  doctors: "doctors",
  workingHours: "workingHours",
  localization: "localization",
};

export const usePublishRef = (
  param: string | ((refs: typeof publishableRefs) => string)
) => {
  const { addRef, removeRef } = useSetSectionRef();
  const key = typeof param === "function" ? param(publishableRefs) : param;
  const cb = React.useCallback((node: any) => {
    if (node === null) {
      removeRef(key);
    } else {
      addRef({ key, ref: node });
    }
  }, []);
  return cb;
};
