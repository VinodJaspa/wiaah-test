import React from "react";
import { SocialServicePostMetaDataCard } from "@UI";
import { TypeOfService } from "@features/API";

export interface ServicePostStoryProps {
  postId: string;
}

export const ServicePostStory: React.FC<ServicePostStoryProps> = ({
  postId,
}) => {
  return (
    <div className="w-full h-full">
      <SocialServicePostMetaDataCard
        post={{
          id: "1",
          userId: "10",
          comments: 5,
          reactionNum: 20,
          shares: 3,
          createdAt: "2024-06-28T00:00:00Z",
          views: 100,
          location: {
            address: "123 Main St",
            city: "Sample City",
            state: "Sample State",
            country: "Sample Country",
          },
          serviceId: "100",
          serviceType: TypeOfService.HotelRoom,
          service: {
            id: "100",
            thumbnail: "sample_thumbnail_url",
            price: 99.99,
            rating: 4.5,
            title: "Sample Service Title",
          },
          user: {
            id: "10",
            profile: {
              id: "20",
              username: "sampleuser",
              verified: true,
              profession: "Sample Profession",
              photo: "sample_photo_url",
              followers: 200,
            },
          },
        }}
      />
    </div>
  );
};
