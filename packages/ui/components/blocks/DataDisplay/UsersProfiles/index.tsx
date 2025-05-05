import React from "react";
import { HtmlDivProps, UsersProfilesVariant } from "types";
import {
  ScrollableContainer,
  StoryDisplayProps,
  UserProfileDisplay,
} from "@UI";
import Link from "next/link";

export interface UsersProfilesProps extends HtmlDivProps {
  users: (StoryDisplayProps["storyUserData"] & { profession: string })[];
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
      <ScrollableContainer
        containerProps={{ className: "gap-4" }}
        autoShowAll
        maxInitialItems={maxNarrowItems}
      >
        {users &&
          users
            // .slice(0, variant === "narrow" ? maxNarrowItems : users.length)
            .map((user, i) => (
              <div key={i} className="flex items-center gap-3">
                <Link href={`/profile/${user.id}`} className="w-11">
                  <UserProfileDisplay storyUserData={user} />
                </Link>
                <div className="flex flex-col text-white">
                  <Link href={`/profile/${user.id}`}>
                    <p className="font-bold">{user.name}</p>
                  </Link>
                  <p className="text-xs">{user.profession}</p>
                </div>
              </div>
            ))}
      </ScrollableContainer>
    </div>
  );
};
