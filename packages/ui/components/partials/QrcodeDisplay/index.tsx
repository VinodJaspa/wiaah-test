import { QRCodeSVG } from "qrcode.react";
import React from "react";
import { HtmlDivProps } from "types";

export interface QrcodeDisplayProps extends Omit<HtmlDivProps, "value"> {
  value: string;
  transparentBg?: boolean;
  color?: string;
}

export const QrcodeDisplay: React.FC<QrcodeDisplayProps> = ({
  value,
  className,
  transparentBg,
  color,
  ...props
}) => {
  return (
    <div {...props} className={`${className || ""}`}>
      <QRCodeSVG
        size={"100%"}
        fgColor={color}
        bgColor={transparentBg ? "transparent" : undefined}
        className="text-white fill-white"
        value={value}
      />
    </div>
  );
};
