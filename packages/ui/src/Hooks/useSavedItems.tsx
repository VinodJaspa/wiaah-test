import { useRecoilState } from "recoil";
import { SavedItemsState } from "../state";

export const useSavedItems = () => {
  const [savedItems, setSavedItems] = useRecoilState(SavedItemsState);

  function DeleteItem(itemId: string) {
    setSavedItems((state) => state.filter((item) => item.id !== itemId));
  }

  return {
    DeleteItem,
    savedItems,
  };
};
