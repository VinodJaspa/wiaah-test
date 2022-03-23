import { HTMLAttributes } from "enzyme";
import React, {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  FC,
  ReactElement,
  useState,
} from "react";
import { colorPalette } from "../helpers/colorPalette";

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
  ...props
}) => {
  const [BtnStyles, setBtnStyles] = React.useState<React.CSSProperties>({});

  React.useEffect(() => {
    //  background color
    if (hexBackgroundColor && !outlined)
      setBtnStyles((styles) => ({
        ...styles,
        backgroundColor: hexBackgroundColor,
      }));
    if (!hexBackgroundColor && !outlined)
      setBtnStyles((styles) => ({
        ...styles,
        background: colorPalette.PrimaryGreen,
      }));
    // text color
    if (hexTextColor)
      setBtnStyles((styles) => ({ ...styles, color: hexTextColor }));

    if (!hexTextColor)
      setBtnStyles((styles) => ({ ...styles, color: hexTextColor }));
    // text size
    if (customFontSizeInRem)
      setBtnStyles((styles) => ({
        ...styles,
        fontSize: `${customFontSizeInRem}rem`,
      }));
    if (fontSizeInRem)
      setBtnStyles((styles) => ({
        ...styles,
        fontSize: `${fontSizeInRem}rem`,
      }));
    // outlined border
    if (outlined) {
      setBtnStyles((styles) => ({
        ...styles,
        borderColor: borderColor || colorPalette.PrimaryGreen,
        borderWidth: `${borderWidthInPx || 2}px`,
      }));
    }
    // marginTop
    if (marginTop)
      setBtnStyles((styles) => ({
        ...styles,
        marginTop: `${marginTop * 0.25}rem`,
      }));
  }, []);

  return (
    <button
      {...props}
      style={BtnStyles}
      className={` ${
        customClasses ? customClasses : ""
      } flex h-12 w-full flex-col items-center justify-center rounded-sm text-lg capitalize  text-white `}
    >
      {children && children}
    </button>
  );
};
