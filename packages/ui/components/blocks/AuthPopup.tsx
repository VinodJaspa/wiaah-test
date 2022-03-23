import React, { CSSProperties, FC } from "react";
import { AuthSwitcher } from ".";
import { useLoginPopup } from "../../Hooks";
import { FormContainer } from "./FormContainer";

interface AuthPopupProp {
  onClose?: () => void;
}

export const AuthPopup: FC<AuthPopupProp> = ({ onClose }) => {
  const { popupOpen, CloseLoginPopup } = useLoginPopup();
  const [showSwitcher, setShowSwitcher] = React.useState<boolean>(true);

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
    CloseLoginPopup();
  };

  React.useEffect(() => {
    if (popupOpen) {
      setShowSwitcher(true);
    } else {
      setTimeout(() => {
        setShowSwitcher(false);
      }, 300);
    }
  }, [popupOpen]);

  return (
    <div
      className={`${
        popupOpen ? "opacity-100" : "pointer-events-none opacity-0"
      } fixed top-0 left-0 z-50 flex h-screen w-full items-center justify-center transition-opacity`}
    >
      <div
        className="absolute -z-10 h-full w-full bg-black bg-opacity-40"
        onClick={handleClose}
      ></div>
      <FormContainer
        className={`${
          popupOpen && showSwitcher
            ? "translate-y-0 opacity-100"
            : "translate-y-3/4 opacity-0"
        } transform transition-all`}
      >
        {showSwitcher && <AuthSwitcher loginType="login" />}
      </FormContainer>
    </div>
  );
};
