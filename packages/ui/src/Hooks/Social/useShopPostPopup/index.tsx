import { useRecoilState } from "recoil";
import { shopPostPopupIdState } from "@UI";

export const useShopPostPopup = () => {
  const [postId, setPostId] = useRecoilState(shopPostPopupIdState);

  function setCurrentPostId(id: string) {
    setPostId(id);
  }

  function removeCurrentPost() {
    setPostId(undefined);
  }

  return {
    postId,
    setCurrentPostId,
    removeCurrentPost,
  };
};
