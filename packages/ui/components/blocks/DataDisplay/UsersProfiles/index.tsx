import React from "react";
import { HtmlDivProps, UserProfileData, UsersProfilesVariant } from "types";
import { ScrollableContainer, UserProfile } from "ui";

export interface UsersProfilesProps extends HtmlDivProps {
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
    <div {...props} className="flex flex-col gap-4">
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
    </div>
  );
};
