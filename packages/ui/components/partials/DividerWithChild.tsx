import React, { FC } from "react";

export interface DividerWithChildProps {
  hexDividerColor?: string;
  dividerHeightInRem?: 0.5 | 1 | 2 | number;
}

export const DividerWidthChild: FC<DividerWithChildProps> = ({
  hexDividerColor,
  dividerHeightInRem,
  children,
}) => {
  const [DividerStyles, setDividerStyles] = React.useState<React.CSSProperties>(
    {}
  );
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
  }, []);
  return (
    <div className="flex items-center">
      <div style={DividerStyles} className={` my-4 flex h-0.5 w-full `}></div>
      {children ? children : null}
      <div style={DividerStyles} className={` my-4 flex h-0.5 w-full `}></div>
    </div>
  );
};
