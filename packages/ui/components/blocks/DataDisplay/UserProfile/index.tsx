import React from "react";
import { Verified, Avatar } from "ui";
import { HtmlDivProps, UserProfileData, UsersProfilesVariant } from "types";

export interface UserProfileProps extends HtmlDivProps {
  user: UserProfileData;
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
        <Avatar name={user.name} photoSrc={user.userPhotoSrc} />
      ) : (
        <>
          <Avatar name={user.name} src={user.userPhotoSrc} />
          <div className="flex w-full flex-col">
            <div className="flex items-center gap-2">
              <span data-testid="UserName">{user.name}</span>
              {user.verified && <Verified data-testid="UserVerified" />}
            </div>
            <span
              className="text-[0.8em] font-normal text-left"
              data-testid="UserActivity"
            >
              {user.activityType}
            </span>
          </div>
        </>
      )}
    </div>
  );
};
