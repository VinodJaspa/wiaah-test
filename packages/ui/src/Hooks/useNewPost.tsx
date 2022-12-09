import { useRecoilState } from "recoil";
import { AddNewPostModalOpenState } from "../state/Recoil/Seller/HomePage/NewPostModalState";

export const useNewPost = () => {
  const [isOpen, setOpen] = useRecoilState(AddNewPostModalOpenState);

  function OpenModal() {
    setOpen(true);
  }
  function CloseModal() {
    setOpen(false);
  }

  return {
    isOpen,
    OpenModal,
    CloseModal,
  };
};
