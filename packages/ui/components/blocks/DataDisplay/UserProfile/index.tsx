import { Avatar, Verified } from "@UI";
import { useRouter } from "next/router";
import React from "react";
import { HtmlDivProps, UsersProfilesVariant } from "types";

export interface UserProfileProps extends HtmlDivProps {
  user: {
    id: string;
    name: string;
    photo: string;
    activityType?: string;
    verified?: boolean;
    profession: string;
  };
  variant?: UsersProfilesVariant;
}

export const UserProfile: React.FC<UserProfileProps> = ({
  user,
  variant,
  ...props
}) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/profile/${user.id}`)}
      {...props}
      data-testid="UserProfile"
      className="flex gap-4 items-center cursor-pointer"
    >
      {variant === "narrow" ? (
        <Avatar name={user.name} photoSrc={user.photo} />
      ) : (
        <>
          <Avatar name={user.name} src={user.photo} />
          <div className="flex w-full flex-col">
            <div className="flex items-center gap-2">
              <span data-testid="UserName">{user.name}</span>
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
