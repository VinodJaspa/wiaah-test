import { Avatar, HStack, Flex, Text, FlexProps } from "@chakra-ui/react";
import React from "react";
import { UserProfileData, UsersProfilesVariant } from "types";
import { ScrollableContainer, UserProfile } from "ui";

export interface UsersProfilesProps extends FlexProps {
  users: UserProfileData[];
  variant?: UsersProfilesVariant;
  maxNarrowItems?: number;
  maxLongItems?: number;
  maxShowMoreItems?: number;
}

export const UsersProfiles: React.FC<UsersProfilesProps> = ({
  users,
  variant = "narrow",
  maxNarrowItems = 5,
  maxLongItems = 5,
  maxShowMoreItems = 8,
  ...props
}) => {
  return (
    <Flex {...props} direction={"column"} gap="1rem">
      <ScrollableContainer
        maxShowMoreItems={maxShowMoreItems}
        doesShowMore={variant === "narrow" ? false : true}
        maxInitialItems={variant === "narrow" ? maxNarrowItems : maxLongItems}
        data-testid="UsersProfilesContainer"
      >
        {users &&
          users
            .slice(0, variant === "narrow" ? maxNarrowItems : users.length)
            .map((user, i) => (
              <UserProfile user={user} key={i} variant={variant} />
            ))}
      </ScrollableContainer>
    </Flex>
  );
};
