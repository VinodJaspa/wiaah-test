import { newStoryModalOpenState } from "@src/state";
import { useRecoilState } from "recoil";
export const useNewStoryModal = () => {
  const [isOpen, setOpen] = useRecoilState(newStoryModalOpenState);

  function openNewStoryModal() {
    setOpen(true);
  }
  function closeNewStoryModal() {
    setOpen(false);
  }

  return {
    isOpen,
    closeNewStoryModal,
    openNewStoryModal,
  };
};
