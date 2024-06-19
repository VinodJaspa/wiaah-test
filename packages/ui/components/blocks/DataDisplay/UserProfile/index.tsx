import React from "react";
import { Verified, Avatar } from "@UI";
import { Profile } from "@features/API";
import { HtmlDivProps, UserProfileData, UsersProfilesVariant } from "types";

export interface UserProfileProps extends HtmlDivProps {
  user: Pick<
    Profile,
    "id" | "photo" | "username" | "followers" | "verified" | "profession"
  >;
  variant?: UsersProfilesVariant;
}

export const UserProfile: React.FC<UserProfileProps> = ({
  user,
  variant,
  ...props
}) => {
  return (
    <div
      {...props}
      data-testid="UserProfile"
      className="flex gap-4 items-center"
    >
      {variant === "narrow" ? (
        <Avatar name={user.username} photoSrc={user.photo} />
      ) : (
        <>
          <Avatar name={user.username} src={user.photo} />
          <div className="flex w-full flex-col">
            <div className="flex items-center gap-2">
              <span data-testid="UserName">{user.username}</span>
              {user.verified && <Verified data-testid="UserVerified" />}
            </div>
            <span
              className="text-[0.8em] font-normal text-left"
              data-testid="UserActivity"
            >
              {user.profession}
            </span>
          </div>
        </>
      )}
    </div>
  );
};
