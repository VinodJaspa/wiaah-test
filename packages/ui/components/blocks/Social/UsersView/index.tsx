import React from "react";
import { VerifiedIcon } from "ui";
import { FaUserPlus } from "react-icons/fa";

interface UsersViewProps {
  users: UserCardProps[];
}

export const UsersView: React.FC<UsersViewProps> = ({ users }) => {
  return (
    <div className="w-full space-y-5 flex flex-col items-center md:mx-0 mx-3">
      {users.map((user: UserCardProps) => (
        <UserCard
          image={user.image}
          name={user.name}
          isFollowed={user.isFollowed}
        />
      ))}
    </div>
  );
};

interface UserCardProps {
  image: string;
  name: string;
  isFollowed: boolean;
}

export const UserCard: React.FC<UserCardProps> = ({
  image,
  name,
  isFollowed,
}) => {
  return (
    <div className=" md:w-1/2 w-full   flex justify-between items-center">
      <div className="flex gap-4 items-center">
        <div className="relative">
          <img src={image} className="rounded-full w-[68px] h-[68px]" />
          <VerifiedIcon className="absolute bottom-0 right-0" />
        </div>

        <p className=" font-semibold">{name}</p>
      </div>
      <div className="flex gap-1 text-[#656565] text-xs">
        <button
          className={`${isFollowed
              ? "bg-[#3CD399] text-white"
              : "bg-white text-[#3CD399] border border-[#3CD399]"
            } font-semibold w-[140px] rounded-full h-[50px] flex gap-1 items-center justify-center`}
        >
          <p>{isFollowed ? "Follow" : "Unfollow"}</p>
          {isFollowed && <FaUserPlus />}
        </button>
      </div>
    </div>
  );
};
