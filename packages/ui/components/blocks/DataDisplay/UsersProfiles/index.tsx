import { Avatar, HStack, Flex, Text, FlexProps } from "@chakra-ui/react";
import React from "react";
import { Verified, ScrollableContainer } from "ui";

export interface UserProfileData {
  name: string;
  userPhotoSrc: string;
  activityType: string;
  verified?: boolean;
}

export type UsersProfilesVariant = "narrow" | "long";

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
              <HStack key={i} data-testid="UserProfile" spacing="1rem">
                {variant === "narrow" ? (
                  <Avatar name={user.name} src={user.userPhotoSrc} />
                ) : (
                  <>
                    <Avatar name={user.name} src={user.userPhotoSrc} />
                    <Flex direction={"column"}>
                      <HStack>
                        <Text data-testid="UserName">{user.name}</Text>
                        {user.verified && (
                          <Verified data-testid="UserVerified" />
                        )}
                      </HStack>
                      <Text data-testid="UserActivity">
                        {user.activityType}
                      </Text>
                    </Flex>
                  </>
                )}
              </HStack>
            ))}
      </ScrollableContainer>
    </Flex>
  );
};
