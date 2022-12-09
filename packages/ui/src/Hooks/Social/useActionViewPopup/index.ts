import { useRecoilState } from "recoil";
import { ActionViewIdState } from "ui";

export const useActionViewPopup = () => {
  const [actionId, setActionId] = useRecoilState(ActionViewIdState);

  function setCurrentActionId(id: string) {
    setActionId(id);
  }

  function removeCurrentAction() {
    setActionId(undefined);
  }

  return {
    actionId,
    setCurrentActionId,
    removeCurrentAction,
  };
};
