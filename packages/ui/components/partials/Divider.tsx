import React from "react";
export interface DividerProps {}
export const Divider: React.FC<DividerProps> = (props) => {
  const {} = props;
  return (
    <>
      <div className="my-4 flex h-0.5 w-full bg-gray-100"></div>
    </>
  );
};
