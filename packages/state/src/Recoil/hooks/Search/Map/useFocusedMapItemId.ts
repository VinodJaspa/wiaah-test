import { useRecoilValue, useSetRecoilState } from "recoil";
import { FocusedMapItemIdState } from "../../../";

export const useGetFocusedMapItemId = () => {
  const itemId = useRecoilValue(FocusedMapItemIdState);

  return { itemId };
};

export const useMutateFocusedMapItemId = () => {
  const setItemId = useSetRecoilState(FocusedMapItemIdState);

  const focusMapItem = (id: string) => {
    setItemId(id);
  };
  const unFocusMapItem = () => {
    setItemId(null);
  };
  return {
    focusMapItem,
    unFocusMapItem,
  };
};
