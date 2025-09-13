import React, { useState } from "react";
import { VerifiedIcon } from "ui";
import Link from "next/link";

interface UsersViewProps {
  users: UserCardProps[];
}

export const UsersView: React.FC<UsersViewProps> = ({ users }) => {
  return (
    <div className="w-full flex flex-col divide-y">
      {users.map((user: UserCardProps) => (
        <UserCard
          key={user.id}
          id={user.id}
          image={user.image}
          name={user.name}
          handle={user.handle}
          isFollowed={user.isFollowed}
          verified={user.verified}
        />
      ))}
    </div>
  );
};

interface UserCardProps {
  id: number;
  image: string;
  name: string;
  handle?: string;
  verified?: boolean;
  isFollowed: boolean;
}

export const UserCard: React.FC<UserCardProps> = ({
  id,
  image,
  name,
  handle,
  verified,
  isFollowed,
}) => {
  const [isFollowing, setIsFollowing] = useState<boolean>(isFollowed);

  return (
    <div className="flex justify-between items-center py-3 px-2 hover:bg-gray-50 transition">
      {/* Left: Avatar + Name */}
      <Link href={`/profile/${id}`} className="flex gap-3 items-center">
        <img
          src={image}
          className="rounded-full w-12 h-12 object-cover border"
          alt={name}
        />
        <div className="flex flex-col">
          <div className="flex items-center gap-1">
            <p className="font-semibold text-sm">{name}</p>
            {verified && <VerifiedIcon className="w-4 h-4 text-primary" />}
          </div>
          <p className="text-gray-500 text-xs">@{name}</p>
        </div>
      </Link>

      {/* Right: Follow Button */}
      <button
        onClick={() => setIsFollowing((prev) => !prev)}
        className={`px-4 py-1 text-xs font-semibold rounded-full transition ${
          isFollowing
            ? "bg-black text-white hover:bg-gray-800"
            : "bg-gray-100 text-black hover:bg-gray-200"
        }`}
      >
        {isFollowing ? "Followed" : "Follow"}
      </button>
    </div>
  );
};
