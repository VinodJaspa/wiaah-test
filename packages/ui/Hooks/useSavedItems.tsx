import { useRecoilState } from "recoil";
import { SavedItemsState } from "../state";
import { LoginPopupState } from "../state/Recoil/LoginPopup";

export const useSavedItems = () => {
  const [savedItems, setSavedItems] = useRecoilState(SavedItemsState);

  function DeleteItem(itemId: string) {
    console.log("delete", itemId);
    setSavedItems((state) => state.filter((item) => item.id !== itemId));
  }

  return {
    DeleteItem,
    savedItems,
  };
};
