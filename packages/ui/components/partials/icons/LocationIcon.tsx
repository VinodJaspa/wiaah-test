import React from "react";
import { HiLocationMarker, HiOutlineLocationMarker } from "react-icons/hi";
import { IconBaseProps } from "react-icons";
import { Button, ButtonProps } from "ui";

export const LocationIcon: React.FC<IconBaseProps> = (props) => {
  return <HiLocationMarker {...props} />;
};
export const LocationOutlineIcon: React.FC<IconBaseProps> = (props) => {
  return <HiOutlineLocationMarker {...props} />;
};

export const LocationIconButton: React.FC<
  ButtonProps & { outline?: boolean; iconProps?: IconBaseProps }
> = ({ outline, iconProps, ...props }) => {
  return (
    <Button {...props}>
      {outline ? (
        <LocationOutlineIcon {...iconProps} />
      ) : (
        <LocationIcon {...iconProps} />
      )}
    </Button>
  );
};
