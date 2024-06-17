import React from "react";
import { useRouting } from "routing";
import { ServicesType } from "types";
import {
  ServicesSearchBadgeList,
  SocialServicesPostsMetaDataList,
  useGetServicePostSuggestionQuery,
  usePaginationControls,
} from "ui";
import { getRandomImage } from "placeholder";
import {
  ServicePost,
  ServiceType,
  PostLocation,
  Service,
  Account,
  Profile,
  TypeOfService,
} from "@features/API";

type Post = Pick<
  ServicePost,
  | "id"
  | "userId"
  | "comments"
  | "reactionNum"
  | "shares"
  | "createdAt"
  | "views"
  | "location"
  | "serviceId"
  | "serviceType"
> & {
  location: Pick<PostLocation, "address" | "city" | "state" | "country">;
  service: Pick<Service, "id" | "thumbnail" | "price" | "rating" | "title">;
  user: Pick<Account, "id"> & {
    profile?: Pick<
      Profile,
      "id" | "username" | "verified" | "profession" | "photo" | "followers"
    >;
  };
};

const FAKE_POST_DATA: Post[] = [
  {
    id: "post1",
    userId: "user1",
    comments: 3,
    reactionNum: 124,
    shares: 20,
    createdAt: "2023-05-14T12:34:56Z",
    views: 1050,
    location: {
      address: "123 Main St",
      city: "Springfield",
      state: "IL",
      country: "USA",
    },
    serviceId: "service1",
    serviceType: TypeOfService.Vehicle,
    service: {
      id: "service1",
      thumbnail: getRandomImage(),
      price: 150,
      rating: 4.5,
      title: "Plumbing Service",
    },
    user: {
      id: "user1",
      profile: {
        id: "profile1",
        username: "john_doe",
        verified: true,
        profession: "Plumber",
        photo: getRandomImage(),
        followers: 350,
      },
    },
  },
  {
    id: "post1",
    userId: "user1",
    comments: 3,
    reactionNum: 124,
    shares: 20,
    createdAt: "2023-05-14T12:34:56Z",
    views: 1050,
    location: {
      address: "123 Main St",
      city: "Springfield",
      state: "IL",
      country: "USA",
    },
    serviceId: "service1",
    serviceType: TypeOfService.Vehicle,
    service: {
      id: "service1",
      thumbnail: getRandomImage(),
      price: 150,
      rating: 4.5,
      title: "Plumbing Service",
    },
    user: {
      id: "user1",
      profile: {
        id: "profile1",
        username: "john_doe",
        verified: true,
        profession: "Plumber",
        photo: getRandomImage(),
        followers: 350,
      },
    },
  },
  {
    id: "post1",
    userId: "user1",
    comments: 3,
    reactionNum: 124,
    shares: 20,
    createdAt: "2023-05-14T12:34:56Z",
    views: 1050,
    location: {
      address: "123 Main St",
      city: "Springfield",
      state: "IL",
      country: "USA",
    },
    serviceId: "service1",
    serviceType: TypeOfService.Vehicle,
    service: {
      id: "service1",
      thumbnail: getRandomImage(),
      price: 150,
      rating: 4.5,
      title: "Plumbing Service",
    },
    user: {
      id: "user1",
      profile: {
        id: "profile1",
        username: "john_doe",
        verified: true,
        profession: "Plumber",
        photo: getRandomImage(),
        followers: 350,
      },
    },
  },
];

export interface ServicesViewProps { }

export const ServicesView: React.FC<ServicesViewProps> = () => {
  const serviceTabKey = "tab";
  const { getParam, visit } = useRouting();
  const tabKey = getParam(serviceTabKey) as ServicesType;
  const { controls, pagination } = usePaginationControls();
  const { data: _data } = useGetServicePostSuggestionQuery({
    serviceType: tabKey,
    pagination,
  });

  return (
    <div className="flex flex-col gap-4 w-full">
      <ServicesSearchBadgeList
        activeKey={tabKey || "hotel"}
        onClick={(type) => {
          visit((r) => r.addQuery({ [serviceTabKey]: type }));
        }}
      />
      <SocialServicesPostsMetaDataList posts={FAKE_POST_DATA} />
    </div>
  );
};
