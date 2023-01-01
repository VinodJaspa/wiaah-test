import { useRecoilState } from "recoil";
import { ActionViewIdState } from "@UI";

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
