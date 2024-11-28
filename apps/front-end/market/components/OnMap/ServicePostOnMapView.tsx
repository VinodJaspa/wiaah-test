import { TypeOfService } from "@features/API";
import { useResponsive } from "hooks";
import React from "react";
import {
  GetServicePostQuery,
  LocationSearchInput,
  RenderMap,
  ScrollingWrapper,
  SocialServicesPostsMetaDataList,
  useGetServicePostDetails,
} from "ui";

type ServicePostOnMapViewProps = {
  id: string;
};

export const ServicePostOnMapView: React.FC<ServicePostOnMapViewProps> = ({
  id,
}) => {
  const { isTablet } = useResponsive();
  const { data: _posts } = useGetServicePostDetails(id);
  const posts = placeholderGetServicePostQuery;
  return (
    <div className="flex p-4 flex-col gap-2">
      <span className="w-full md:w-1/2">
        <LocationSearchInput onLocationSelect={() => { }} />
      </span>
      <div className="w-full relative pb-40 md:pb-0 flex-col-reverse md:flex-row h-auto md:h-[75vh] flex gap-8 md:gap-4 justify-between">
        <div className="w-full absolute bottom-0 left-0 md:static md:w-full md:h-full">
          <ScrollingWrapper horizonatal={isTablet}>
            <SocialServicesPostsMetaDataList
              posts={posts}
            ></SocialServicesPostsMetaDataList>
          </ScrollingWrapper>
        </div>
        <div className="w-full h-[75vh] md:h-auto">
          <RenderMap />
        </div>
      </div>
    </div>
  );
};

const placeholderGetServicePostQuery: GetServicePostQuery["getServicePost"] = [
  {
    __typename: "ServicePost",
    id: "post1",
    reactionNum: 100,
    shares: 25,
    comments: 50,
    createdAt: new Date().toISOString(),
    userId: "user1",
    serviceId: "service1",
    serviceType: TypeOfService.HotelRoom,
    views: 300,
    location: {
      __typename: "PostLocation",
      address: "123 Placeholder Street",
      city: "Placeholder City",
      country: "Placeholder Country",
      state: "Placeholder State",
    },
    service: {
      __typename: "Service",
      id: "service1",
      title: "Sample Service Title",
      thumbnail: "/shop.jpeg",
      price: 99.99,
      rating: 4.5,
    },
    user: {
      __typename: "Account",
      id: "user1",
      profile: {
        __typename: "Profile",
        id: "profile1",
        username: "placeholder_user",
        photo: "/shop-2.jpeg",
        profession: "Developer",
        verified: true,
        followers: 1200,
      },
    },
  },
];
