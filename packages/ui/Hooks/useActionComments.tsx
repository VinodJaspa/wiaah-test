import { useRecoilState } from "recoil";
import { ActionCommentsOpenState } from "ui/state";

export const useActionComments = () => {
  const [open, setOpen] = useRecoilState(ActionCommentsOpenState);

  function OpenComments() {
    setOpen(true);
  }
  function CloseComments() {
    setOpen(false);
  }
  function ToggleComments() {
    setOpen((open) => !open);
  }
  return {
    open,
    OpenComments,
    CloseComments,
    ToggleComments,
  };
};
