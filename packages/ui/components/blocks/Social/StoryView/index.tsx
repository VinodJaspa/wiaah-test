import { UserProfileDisplay } from "@blocks/DataDisplay";
import { ListWrapper } from "@blocks/Wrappers";
import { useResponsive } from "@UI/../hooks";
import React from "react";
import { MdVerified } from "react-icons/md";

interface StoryViewProps {
  stories: StoryCardProps[];
}

interface StoryCardProps {
  id: string;
  name: string;
  userPhoto: string;
  storyPhoto: string;
  seen: boolean;
}

export const StoryView: React.FC<StoryViewProps> = ({ stories }) => {
  const { isMobile } = useResponsive();
  return (
    <ListWrapper
      listProps={{
        className: "gap-3 md:gap-4 flex flex-col",
      }}
      props={{
        className: "flex justify-between  w-full gap-3 md:gap-4",
      }}
      cols={isMobile ? 2 : 8}
    >
      {stories.map((story: StoryCardProps) => (
        <StoryCard
          key={story.id}
          id={story.id}
          name={story.name}
          userPhoto={story.userPhoto}
          storyPhoto={story.storyPhoto}
          seen={story.seen}
        />
      ))}
    </ListWrapper>
  );
};

const StoryCard: React.FC<StoryCardProps> = ({
  id,
  userPhoto,
  name,
  storyPhoto,
  seen,
}) => {
  return (
    <div className="w-full h-[253px] relative">
      <img src={storyPhoto} className="w-full h-full rounded-xl" />
      <div className="absolute w-[68px] h-[68px]  inset-0 m-auto  z-10">
        <UserProfileDisplay
          storyUserData={{ id: id, name: name, userPhotoSrc: userPhoto }}
          seen={seen}
        />
        <MdVerified className="absolute w-[14px] h-[14px] bottom-0 right-0 m-auto text-blue-500 z-10" />
      </div>
    </div>
  );
};
