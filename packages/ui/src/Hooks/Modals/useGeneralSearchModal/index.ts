import { useRecoilState } from "recoil";
import { GeneralSearchModalOpenState } from "@UI";

export const useGeneralSearchModal = () => {
  const [isOpen, setIsOpen] = useRecoilState(GeneralSearchModalOpenState);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return {
    isOpen,
    openModal,
    closeModal,
  };
};
