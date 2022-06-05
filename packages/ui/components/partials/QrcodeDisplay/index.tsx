import { QRCodeSVG } from "qrcode.react";
import React from "react";
import { HtmlDivProps } from "types";

export interface QrcodeDisplayProps extends Omit<HtmlDivProps, "value"> {
  value: string;
}

export const QrcodeDisplay: React.FC<QrcodeDisplayProps> = ({
  value,
  className,
  ...props
}) => {
  return (
    <div {...props} className={`${className || ""}`}>
      <QRCodeSVG size={"100%"} value={value} />
    </div>
  );
};
