import { useRecoilState } from "recoil";
import { NewWithdrawalOpenState } from "ui/state";

export const useNewWithdrawalModal = () => {
  const [isOpen, setOpen] = useRecoilState(NewWithdrawalOpenState);

  function onOpen() {
    setOpen(true);
  }
  function onClose() {
    setOpen(false);
  }
  function onToggle() {
    setOpen((open) => !open);
  }

  return {
    isOpen,
    onClose,
    onOpen,
    onToggle,
  };
};
