import React from "react";
import { IconBaseProps } from "react-icons";
import { BsFilePdf, BsFilePdfFill } from "react-icons/bs";

export interface PdfIconProps extends IconBaseProps {}

export const PdfIcon: React.FC<PdfIconProps> = (props) => {
  return <BsFilePdfFill {...props} />;
};

export interface PdfOutlineIconProps extends IconBaseProps {}

export const PdfOutlineIcon: React.FC<PdfOutlineIconProps> = (props) => {
  return <BsFilePdf {...props} />;
};
