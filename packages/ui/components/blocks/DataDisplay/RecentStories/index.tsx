import { Center, Flex, FlexProps, HStack, Icon } from "@chakra-ui/react";
import React from "react";
import { HiPlus } from "react-icons/hi";
import { StoryDisplay, StoryDisplayProps } from "ui";
import { useResponsive, useNewStoryModal } from "ui";
export interface RecentStoriesProps extends FlexProps {
  stories: StoryDisplayProps[];
  onNewStoryClick?: () => any;
}
const InitialStory: StoryDisplayProps[] = [
  {
    storyUserData: {
      name: "You",
      userPhotoSrc: "/person-icon.png",
    },
    floatingIcon: {
      items: [
        {
          label: (
            <Center
              h="1.5rem"
              w="1.5rem"
              fontSize={"x-large"}
              rounded="full"
              color="white"
              bg="primary.main"
            >
              <Icon as={HiPlus} />
            </Center>
          ),
          right: true,
          bottom: true,
        },
      ],
    },
  },
];

export const RecentStories: React.FC<RecentStoriesProps> = ({
  stories,
  w = "100%",
  gap = "1rem",
  overflowX = "scroll",
  align = "center",
  onNewStoryClick,
  ...props
}) => {
  const { isMobile } = useResponsive();
  const { openNewStoryModal } = useNewStoryModal();
  return (
    //@ts-ignore
    <Flex
      {...props}
      w={w}
      gap={isMobile ? "1rem" : "0.25rem"}
      overflowX={overflowX}
      align={align}
      className={`${props.className && props.className} no-scrollBar`}
    >
      {InitialStory.concat(stories).map((story, i) => (
        <StoryDisplay
          innerProps={{
            onClick: () => {
              console.log(i);
              if (i === 0) openNewStoryModal();
            },
          }}
          {...story}
        />
      ))}
    </Flex>
  );
};
