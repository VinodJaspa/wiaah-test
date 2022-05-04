import { ChevronLeftIcon } from "@chakra-ui/icons";
import { Icon, Text } from "@chakra-ui/react";
import React from "react";
import { FloatingContainer } from "ui";

export interface PostsViewModalsHeaderProps {
  onBackClick?: () => any;
}

export const PostsViewModalsHeader: React.FC<PostsViewModalsHeaderProps> = ({
  onBackClick,
}) => {
  return (
    <FloatingContainer
      display={"flex"}
      justifyContent={"center"}
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
      <Text>publication</Text>
    </FloatingContainer>
  );
};
