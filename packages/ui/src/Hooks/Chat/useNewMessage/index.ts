import { useRecoilState } from "recoil";
import { NewMessageModalOpenState } from "@UI";
export const useNewMessage = () => {
  const [isOpen, setOpen] = useRecoilState(NewMessageModalOpenState);

  function closeModal() {
    setOpen(false);
  }

  function openModal() {
    setOpen(true);
  }

  return {
    isOpen,
    closeModal,
    openModal,
  };
};
