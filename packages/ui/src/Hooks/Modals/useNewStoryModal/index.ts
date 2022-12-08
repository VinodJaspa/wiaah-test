import { useRecoilState } from "recoil";
import { newStoryModalOpenState } from "ui";
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
