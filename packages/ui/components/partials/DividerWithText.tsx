import React, { FC } from "react";

export interface DivderWithTextProps {
  text?: string;
  hexDividerColor?: string;
  hexTextColor?: string;
  dividerHeightInRem?: 0.5 | 1 | 2 | number;
}

export const DividerWidthText: FC<DivderWithTextProps> = ({
  text,
  hexDividerColor,
  dividerHeightInRem,
  hexTextColor,
  children,
}) => {
  const [DividerStyles, setDividerStyles] = React.useState<React.CSSProperties>(
    {},
  );
  const [TextStyles, setTextStyles] = React.useState<React.CSSProperties>();
  React.useEffect(() => {
    // set Divder Line stlyes
    if (hexDividerColor)
      setDividerStyles((styles) => ({
        ...styles,
        backgroundColor: hexDividerColor,
      }));
    if (!hexDividerColor)
      setDividerStyles((styles) => ({ ...styles, backgroundColor: "#f3f4f6" }));
    if (dividerHeightInRem)
      setDividerStyles((styles) => ({
        ...styles,
        height: `${dividerHeightInRem}rem`,
      }));
    // set text styles
    if (hexTextColor)
      setTextStyles((styles) => ({ ...styles, color: hexTextColor }));
  }, []);

  return (
    <div className="flex items-center">
      <div
        style={DividerStyles}
        className={` my-4 flex h-0.5 w-full bg-gray-100 `}
      ></div>

      {children ? (
        <>{children}</>
      ) : text ? (
        <div style={TextStyles} className={` min-w-fit px-4 capitalize`}>
          {text}
        </div>
      ) : null}
      <div style={DividerStyles} className={` my-4 flex h-0.5 w-full `}></div>
    </div>
  );
};
