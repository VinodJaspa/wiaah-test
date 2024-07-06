import React from "react";
import { FloatingContainer, ArrowLeftIcon } from "@UI";

export interface PostsViewModalsHeaderProps {
  onBackClick?: () => any;
  children?: React.ReactNode;
}

export const PostsViewModalsHeader: React.FC<PostsViewModalsHeaderProps> = ({
  onBackClick,
  children,
}) => {
  return (
    <FloatingContainer
      className="flex justify-center py-2 px-8"
      items={[
        {
          label: (
            <ArrowLeftIcon
              className="cursor-pointer text-2xl text-black"
              onClick={() => onBackClick && onBackClick()}
            />
          ),
          left: "0.25rem",
          top: "50%",

          floatingItemProps: {
            className: "top-1/2 ",
          },
        },
      ]}
    >
      <>{children}</>
    </FloatingContainer>
  );
};
