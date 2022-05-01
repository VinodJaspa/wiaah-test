import { HStack, Avatar, Flex, Text, StackProps } from "@chakra-ui/react";
import React from "react";
import { Verified } from "ui";
import { UserProfileData, UsersProfilesVariant } from "../UsersProfiles";

export interface UserProfileProps {
  user: UserProfileData;
  variant?: UsersProfilesVariant;
  style?: StackProps;
}

export const UserProfile: React.FC<UserProfileProps> = ({
  user,
  variant,
  style,
}) => {
  return (
    <HStack {...style} data-testid="UserProfile" spacing="1rem">
      {variant === "narrow" ? (
        <Avatar name={user.name} src={user.userPhotoSrc} />
      ) : (
        <>
          <Avatar name={user.name} src={user.userPhotoSrc} />
          <Flex w="100%" direction={"column"}>
            <HStack>
              <Text data-testid="UserName">{user.name}</Text>
              {user.verified && <Verified data-testid="UserVerified" />}
            </HStack>
            <Text
              fontSize={"0.8em"}
              fontWeight="normal"
              textAlign={"start"}
              data-testid="UserActivity"
            >
              {user.activityType}
            </Text>
          </Flex>
        </>
      )}
    </HStack>
  );
};
