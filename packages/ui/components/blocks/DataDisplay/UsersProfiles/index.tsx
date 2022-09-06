import React from "react";
import { HtmlDivProps, UserProfileData, UsersProfilesVariant } from "types";
import { ScrollableContainer, UserProfile, StoryDisplay } from "ui";

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
  maxNarrowItems = 4,
  maxLongItems = 5,
  maxShowMoreItems = 8,
  ...props
}) => {
  return (
    <div
      {...props}
      className="flex flex-col h-full noScroll overflow-scroll gap-4"
    >
      {users &&
        users
          .slice(0, variant === "narrow" ? maxNarrowItems : users.length)
          .map((user, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-11">
                <StoryDisplay
                  storyUserData={{
                    name: user.name,
                    userPhotoSrc: user.userPhotoSrc,
                  }}
                />
              </div>
              <div className="flex flex-col text-white">
                <p className="font-bold">{user.name}</p>
                <p className="text-xs">{user.activityType}</p>
              </div>
            </div>
          ))}
    </div>
  );
};
