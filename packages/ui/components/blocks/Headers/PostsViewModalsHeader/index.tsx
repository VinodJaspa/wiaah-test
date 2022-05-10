import { ChevronLeftIcon } from "@chakra-ui/icons";
import { BoxProps, Icon, Text } from "@chakra-ui/react";
import React from "react";
import { FloatingContainer } from "ui";

export interface PostsViewModalsHeaderProps {
  onBackClick?: () => any;
}

export const PostsViewModalsHeader: React.FC<PostsViewModalsHeaderProps> = ({
  onBackClick,
  children,
}) => {
  return (
    <FloatingContainer
      display={"flex"}
      justifyContent={"center"}
      py="0.5rem"
      pl="2rem"
      items={[
        {
          label: (
            <Icon
              cursor={"pointer"}
              onClick={() => onBackClick && onBackClick()}
              fontSize={"xx-large"}
              color={"black"}
              as={ChevronLeftIcon}
            />
          ),
          left: "0.25rem",
          top: "50%",

          floatingItemProps: {
            translateY: "-50%",
          },
        },
      ]}
    >
      {children}
    </FloatingContainer>
  );
};
