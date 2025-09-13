import { QRCodeSVG } from "qrcode.react";
import React from "react";
import { HtmlDivProps } from "types";

export interface QrcodeDisplayProps extends Omit<HtmlDivProps, "value"> {
  value: string;
  transparentBg?: boolean;
  color?: string;
  size?: number;
}

export const QrcodeDisplay: React.FC<QrcodeDisplayProps> = ({
  value,
  className,
  transparentBg,
  color,
  size,
  ...props
}) => {
  return (
    <div {...props} className={`${className || ""}`}>
      <QRCodeSVG
        //@ts-ignore
        size={size || 128}
        fgColor={color}
        bgColor={transparentBg ? "transparent" : undefined}
        className="text-white fill-white"
        value={value}
      />
    </div>
  );
};
