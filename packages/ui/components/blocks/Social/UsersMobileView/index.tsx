import React from "react";
import { IoLocationOutline } from "react-icons/io5";
import { FaUserPlus } from "react-icons/fa";
import { ListWrapper } from "ui";
import { useResponsive } from "@UI/../hooks";
interface UserMobileCardProps {
  image: string;
  name: string;
  location: string;
}
interface UserMobileViewProps {
  users: UserMobileCardProps[];
}
export const UserMobileView: React.FC<UserMobileViewProps> = ({ users }) => {
  const { isMobile } = useResponsive();
  return (
    <ListWrapper
      cols={3}
      listProps={{
        className: "gap-1 md:gap-4 flex flex-col",
      }}
      props={{
        className: " md:hidden flex justify-between  w-full gap-1 md:gap-4",
      }}
    >
      {users.map((user: UserMobileCardProps, i) => (
        <UserMobileCard
          key={i}
          image={user.image}
          name={user.name}
          location={user.location}
        />
      ))}
    </ListWrapper>
  );
};

const UserMobileCard: React.FC<UserMobileCardProps> = ({
  image,
  name,
  location,
}) => {
  return (
    <div className=" relative w-full h-[184px] rounded-lg">
      <img src={image} className="w-full h-full object-cover rounded-xl " />
      <div className=" w-full absolute bottom-3 left-1/2 transform -translate-x-1/2 z-10 flex flex-col text-center items-center ">
        <h2 className=" font-bold text-base text-white mb-0.5 ">{name}</h2>
        <div className=" flex gap-1 items-center mb-1">
          <IoLocationOutline className="w-3 h-3 text-white" />
          <p className="text-gray-100 font-medium text-xs"> {location}</p>
        </div>
        <FaUserPlus className="w-6 h-6 text-white" />
      </div>
    </div>
  );
};
