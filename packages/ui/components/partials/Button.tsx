import { HTMLAttributes } from "enzyme";
import React, {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  FC,
  ReactElement,
  useState,
} from "react";
import { CSSValueUnit } from "types/sharedTypes/css/valueUnit";
import { colorPalette } from "../helpers/colorPalette";
import { CSSValueUnitToString } from "../helpers/CSSValueUnitToString";

type ButtonHTMLProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export interface ButtonProps extends ButtonHTMLProps {
  customClasses?: string;
  text?: string;
  hexBackgroundColor?: string;
  hexTextColor?: string;
  fontSizeInRem?:
    | 0.25
    | 0.5
    | 0.75
    | 1
    | 1.25
    | 1.5
    | 1.75
    | 2
    | 2.25
    | 2.5
    | 2.75
    | 3;
  customFontSizeInRem?: number;
  outlined?: boolean;
  borderWidthInPx?: number;
  borderColor?: string;
  marginTop?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | number;
  paddingY?: CSSValueUnit;
  paddingX?: CSSValueUnit;
  fitWidth?: boolean;
}

export const Button: FC<ButtonProps> = ({
  text,
  hexBackgroundColor,
  hexTextColor,
  fontSizeInRem,
  customFontSizeInRem,
  customClasses,
  outlined = false,
  borderColor,
  borderWidthInPx,
  marginTop,
  children,
  paddingX,
  paddingY,
  fitWidth,
  ...props
}) => {
  const styles: React.CSSProperties = {};

  //  background color
  if (hexBackgroundColor && !outlined) {
    styles.backgroundColor = hexBackgroundColor;
  }
  if (!hexBackgroundColor && !outlined) {
    styles.background = colorPalette.PrimaryGreen;
  }
  // text color
  if (hexTextColor) {
    styles.color = hexTextColor;
  }

  if (!hexTextColor) {
    styles.color = hexTextColor;
  }
  // text size
  if (customFontSizeInRem) {
    styles.fontSize = `${customFontSizeInRem}rem`;
  }
  if (fontSizeInRem) {
    styles.fontSize = `${fontSizeInRem}rem`;
  }

  // outlined border
  if (outlined) {
    styles.borderColor = borderColor || colorPalette.PrimaryGreen;
    styles.borderWidth = `${borderWidthInPx || 2}px`;
  }
  // marginTop
  if (marginTop) {
    styles.marginTop = `${marginTop * 0.25}rem`;
  }

  if (paddingX) {
    styles.paddingLeft = CSSValueUnitToString(paddingX);
    styles.paddingRight = CSSValueUnitToString(paddingX);
  }
  if (paddingY) {
    styles.paddingBottom = CSSValueUnitToString(paddingY);
    styles.paddingTop = CSSValueUnitToString(paddingY);
  }
  if (fitWidth) {
    styles.width = "fit-content";
  }

  return (
    <button
      {...props}
      style={styles}
      className={` ${
        customClasses ? customClasses : ""
      } flex items-center justify-center whitespace-nowrap rounded-sm text-lg capitalize text-white `}
    >
      {text && text}
      {children && children}
    </button>
  );
};
