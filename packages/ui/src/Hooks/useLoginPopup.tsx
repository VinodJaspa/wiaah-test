import { useRecoilState } from "recoil";
import { LoginPopupState } from "../state/Recoil/LoginPopup";

export const useLoginPopup = () => {
  const [popupOpen, setOpen] = useRecoilState(LoginPopupState);
console.log(popupOpen,"popupOpen");

  function OpenLoginPopup() {
    setOpen(true);
  }

  function CloseLoginPopup() {
    setOpen(false);
  }

  return {
    OpenLoginPopup,
    CloseLoginPopup,
    popupOpen,
  };
};
