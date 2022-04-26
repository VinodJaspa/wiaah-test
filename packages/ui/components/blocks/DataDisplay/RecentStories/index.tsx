import { Center, Flex, FlexProps, HStack, Icon } from "@chakra-ui/react";
import React from "react";
import { HiPlus } from "react-icons/hi";
import { StoryDisplay, StoryDisplayProps } from "ui";

export interface RecentStoriesProps extends FlexProps {
  stories: StoryDisplayProps[];
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
  ...props
}) => {
  return (
    <Flex
      {...props}
      w={w}
      gap={gap}
      overflowX={overflowX}
      align={align}
      className={`${props.className && props.className} no-scrollBar`}
    >
      {InitialStory.concat(stories).map((story, i) => (
        <StoryDisplay {...story} />
      ))}
    </Flex>
  );
};
