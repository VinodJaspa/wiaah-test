import React from "react";
import { SocialServicePostMetaDataCard } from "ui";

export interface ServicePostStoryProps {
  postId: string;
}

export const ServicePostStory: React.FC<ServicePostStoryProps> = ({
  postId,
}) => {
  return (
    <div className="w-full h-full">
      <SocialServicePostMetaDataCard
        id="13"
        label="hotel"
        name="hotel name"
        type="hotel"
        attachments={[{ src: "/place-2.jpg", type: "image" }]}
      />
    </div>
  );
};
