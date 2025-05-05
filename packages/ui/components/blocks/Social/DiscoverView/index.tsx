import SocialNewsfeedView from "@features/Social/views/SocialNewsfeedView";
import { LocalizationsPH } from "placeholder";
import React from "react";
import { useTranslation } from "react-i18next";
import { TabType } from "types";
import {
  HashtagView,
  LocalizationSearchItem,
  PlacesList,
  StoryView,
  TabsViewer,
  UserMobileView,
  UsersView,
} from "ui";

interface ExplorePageProps {}

export const DiscoverView: React.FC<ExplorePageProps> = () => {
const { t } = useTranslation();

  const tabs: TabType[] = [
    {
      name: t("Discover"),
      component: <SocialNewsfeedView isDiscover />,
    },
    {
      name: t("Stories"),
      component: (
        <div className="w-full mx-3 mb-14">
          <StoryView stories={FAKE_STORIES} />
        </div>
      ),
    },
    {
      name: t("Users"),
      component: (
        <div className="w-full mx-2">
          <UserMobileView users={FAKE_USERS} />
          <UsersView users={FAKE_USERS} />
        </div>
      ),
    },
    { name: t("Places"), component: <PlacesList places={FAKE_PLACES} /> },
    {
      name: t("Localization"),
      component: (
        <div className="md:w-1/2 w-full mt-2 flex flex-col justify-between items-center gap-2">
          {LocalizationsPH.map((city, i) => (
            <LocalizationSearchItem key={i} location={city} />
          ))}
        </div>
      ),
    },
    { name: t("Hashtag"), component: <HashtagView hashtags={FAKE_HASHTAGS} /> },
  ];
  return (
    <div className="container mx-auto h-full">
      <TabsViewer tabs={tabs} border="bottom" />
    </div>
  );
};
const AvatarImage =
  "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250";
const FAKE_HASHTAGS = [
  { title: "Fashion", num: 200000 },
  { title: "Car", num: 100000 },
  { title: "Rolex", num: 50000 },
  { title: "Jewellery", num: 1000000 },
  { title: "Adidas", num: 100000 },
  { title: "Nike", num: 90000 },
  { title: "Movie", num: 40000 },
  { title: "Covid-19", num: 4000000 },
  { title: "UFC", num: 10000 },
  { title: "FIFA", num: 18000000 },
  { title: "Midjourney", num: 1500000 },
  { title: "Chatgpt", num: 2000000 },
  { title: "Figma", num: 200000 },
  { title: "Midjourney", num: 1500000 },
  { title: "Chatgpt", num: 2000000 },
  { title: "Figma", num: 200000 },
];

const FAKE_PLACES = [
  {
    title: "The Blushing Crate",
    location: "3807 Ruckman Road, Oklahoma City",
    type: "Bar",
  },
  {
    title: "The Blushing Crate",
    location: "3807 Ruckman Road, Oklahoma City",
    type: "Bank",
  },
  {
    title: "The Blushing Crate",
    location: "3807 Ruckman Road, Oklahoma City",
    type: "Hospital",
  },
  {
    title: "The Blushing Crate",
    location: "3807 Ruckman Road, Oklahoma City",
    type: "Hospital",
  },
  {
    title: "The Blushing Crate",
    location: "3807 Ruckman Road, Oklahoma City",
    type: "Bar",
  },
  {
    title: "The Blushing Crate",
    location: "3807 Ruckman Road, Oklahoma City",
    type: "Hospital",
  },
  {
    title: "The Blushing Crate",
    location: "3807 Ruckman Road, Oklahoma City",
    type: "Bank",
  },
  {
    title: "The Blushing Crate",
    location: "3807 Ruckman Road, Oklahoma City",
    type: "Bar",
  },
  {
    title: "The Blushing Crate",
    location: "3807 Ruckman Road, Oklahoma City",
    type: "Barbershop",
  },
  {
    title: "The Blushing Crate",
    location: "3807 Ruckman Road, Oklahoma City",
    type: "Groceries",
  },
  {
    title: "The Blushing Crate",
    location: "3807 Ruckman Road, Oklahoma City",
    type: "Barbershop",
  },
  {
    title: "The Blushing Crate",
    location: "3807 Ruckman Road, Oklahoma City",
    type: "Bar",
  },
  {
    title: "The Blushing Crate",
    location: "3807 Ruckman Road, Oklahoma City",
    type: "Groceries",
  },
  {
    title: "The Blushing Crate",
    location: "3807 Ruckman Road, Oklahoma City",
    type: "Groceries",
  },
];
const FAKE_USERS = [
  {
    id: 1,
    image: AvatarImage,
    name: "Alice Elizabeth",
    isFollowed: true,
    location: "New York",
  },
  {
    id: 2,
    image: AvatarImage,
    name: "Bob Simpson",
    isFollowed: false,
    location: "Los Angeles",
  },
  {
    id: 3,
    image: AvatarImage,
    name: "Charlie Cramer",
    isFollowed: true,
    location: "Chicago",
  },
  {
    id: 4,
    image: AvatarImage,
    name: "Diana",
    isFollowed: false,
    location: "San Francisco",
  },
  {
    id: 5,
    image: AvatarImage,
    name: "Edward",
    isFollowed: true,
    location: "Miami",
  },
  {
    id: 6,
    image: AvatarImage,
    name: "Alice",
    isFollowed: true,
    location: "Boston",
  },
  {
    id: 7,
    image: AvatarImage,
    name: "Bob",
    isFollowed: false,
    location: "Houston",
  },
  {
    id: 8,
    image: AvatarImage,
    name: "Charlie",
    isFollowed: true,
    location: "Seattle",
  },
  {
    id: 9,
    image: AvatarImage,
    name: "Diana",
    isFollowed: false,
    location: "Atlanta",
  },
];

const FAKE_STORIES = [
  {
    id: "1",
    name: "John Doe",
    userPhoto: "https://randomuser.me/api/portraits/men/1.jpg",
    storyPhoto: "https://picsum.photos/200/300?random=1",
    seen: false,
    isVerified: true,
  },
  {
    id: "2",
    name: "Jane Smith",
    userPhoto: "https://randomuser.me/api/portraits/women/2.jpg",
    storyPhoto: "https://picsum.photos/200/300?random=2",
    seen: true,
    isVerified: false,
  },
  {
    id: "3",
    name: "Alice Johnson",
    userPhoto: "https://randomuser.me/api/portraits/women/3.jpg",
    storyPhoto: "https://picsum.photos/200/300?random=3",
    seen: false,
    isVerified: true,
  },
  {
    id: "4",
    name: "Bob Brown",
    userPhoto: "https://randomuser.me/api/portraits/men/4.jpg",
    storyPhoto: "https://picsum.photos/200/300?random=4",
    seen: true,
    isVerified: false,
  },
  {
    id: "5",
    name: "Emily Davis",
    userPhoto: "https://randomuser.me/api/portraits/women/5.jpg",
    storyPhoto: "https://picsum.photos/200/300?random=5",
    seen: false,
    isVerified: true,
  },
  {
    id: "6",
    name: "Chris Wilson",
    userPhoto: "https://randomuser.me/api/portraits/men/6.jpg",
    storyPhoto: "https://picsum.photos/200/300?random=6",
    seen: true,
    isVerified: false,
  },
  {
    id: "7",
    name: "Sara White",
    userPhoto: "https://randomuser.me/api/portraits/women/7.jpg",
    storyPhoto: "https://picsum.photos/200/300?random=7",
    seen: false,
    isVerified: true,
  },
  {
    id: "8",
    name: "David Clark",
    userPhoto: "https://randomuser.me/api/portraits/men/8.jpg",
    storyPhoto: "https://picsum.photos/200/300?random=8",
    seen: true,
    isVerified: false,
  },
  {
    id: "9",
    name: "Mia Taylor",
    userPhoto: "https://randomuser.me/api/portraits/women/9.jpg",
    storyPhoto: "https://picsum.photos/200/300?random=9",
    seen: false,
    isVerified: true,
  },
  {
    id: "10",
    name: "James King",
    userPhoto: "https://randomuser.me/api/portraits/men/10.jpg",
    storyPhoto: "https://picsum.photos/200/300?random=10",
    seen: true,
    isVerified: false,
  },
];
const FAKE_IMAGES = [
  { src: "https://picsum.photos/300/200?random=1", alt: "Placeholder 1" },
  { src: "https://picsum.photos/300/300?random=2", alt: "Placeholder 2" },
  { src: "https://picsum.photos/300/400?random=3", alt: "Placeholder 3" },
  { src: "https://picsum.photos/300/500?random=4", alt: "Placeholder 4" },
  { src: "https://picsum.photos/300/200?random=5", alt: "Placeholder 5" },
  { src: "https://picsum.photos/300/300?random=6", alt: "Placeholder 6" },
  { src: "https://picsum.photos/300/400?random=7", alt: "Placeholder 7" },
  { src: "https://picsum.photos/300/500?random=8", alt: "Placeholder 8" },
  { src: "https://picsum.photos/300/200?random=9", alt: "Placeholder 9" },
  { src: "https://picsum.photos/300/300?random=10", alt: "Placeholder 10" },
];
export default DiscoverView;
