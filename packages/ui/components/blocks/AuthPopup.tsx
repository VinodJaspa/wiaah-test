import React, { CSSProperties, FC, useEffect } from "react";
import { AuthSwitcher } from ".";
import { LoginType } from "../../../../apps/market/lib/LoignTypes";
import { FormContainer } from "./FormContainer";

interface AuthPopupProp {
  onClose?: () => void;
  show: boolean;
}

export const AuthPopup: FC<AuthPopupProp> = ({ onClose, show }) => {
  const [style, setStyle] = React.useState<CSSProperties>({});
  const [showSwitcher, setShowSwitcher] = React.useState<boolean>(true);

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  React.useEffect(() => {
    if (show) {
      setShowSwitcher(true);
    } else {
      setTimeout(() => {
        setShowSwitcher(false);
      }, 300);
    }
  }, [show]);

  return (
    <div
      className={`${
        show ? "opacity-100" : "pointer-events-none opacity-0"
      } fixed top-0 left-0 z-50 flex h-screen w-full items-center justify-center transition-opacity`}
    >
      <div
        className="absolute -z-10 h-full w-full bg-black bg-opacity-40"
        onClick={handleClose}
      ></div>
      <FormContainer
        style={style}
        className={`${
          show && showSwitcher
            ? "translate-y-0 opacity-100"
            : "translate-y-3/4 opacity-0"
        } transform transition-all`}
      >
        {showSwitcher && <AuthSwitcher loginType="login" />}
      </FormContainer>
    </div>
  );
};
