import React, { DetailedHTMLProps, FC, HTMLAttributes } from "react";

interface FormContainerProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> { }

export const FormContainer: FC<FormContainerProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div {...props} className={`${className} flex w-full lg:max-w-2xl`}>
      <div className="w-full rounded-lg bg-white px-8 pt-4 pb-6 shadow-xl ">
        {/*@ts-ignore*/}
        {children}
      </div>
    </div>
  );
};
