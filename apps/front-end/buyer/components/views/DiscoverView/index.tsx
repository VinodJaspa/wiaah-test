import { useResponsive } from "hooks";
import { getRandomImage, products } from "placeholder";
import React from "react";
import { useTranslation } from "react-i18next";
import { TabType } from "types";
import {
  Container,
  HashtagView,
  TabsViewer,
  PlacesList,
  UsersView,
  ListWrapper,
  DiscoverItem,
} from "ui";

interface ExplorePageProps { }

const discoverItemsPlaceholder = products.map((prod, i) => ({
  image: prod.imgUrl,
}));

export const DiscoverView: React.FC<ExplorePageProps> = () => {
  const { isMobile } = useResponsive();
  const { t } = useTranslation();
  const tabs: TabType[] = [
    {
      name: t("Discover"),
      component: (
        <ListWrapper cols={4}>
          {discoverItemsPlaceholder.map((item, i) => (
            <DiscoverItem thumbnail={item.image} key={i} />
          ))}
        </ListWrapper>
      ),
    },
    { name: t("Stories"), component: <div></div> },
    { name: t("Users"), component: <UsersView users={FAKE_USERS} /> },
    { name: t("Places"), component: <PlacesList places={FAKE_PLACES} /> },
    { name: t("Hashtag"), component: <HashtagView hashtags={FAKE_HASHTAGS} /> },
  ];
  return (
    <Container className="flex-grow w-full flex flex-col gap-4">
      <div className="w-full mt-20">
        <TabsViewer tabs={tabs} border="bottom" />
      </div>
    </Container>
  );
};

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
    image: getRandomImage(),
    name: "Alice",
    isFollowed: true,
  },
  {
    image: getRandomImage(),
    name: "Bob",
    isFollowed: false,
  },
  {
    image: getRandomImage(),
    name: "Charlie",
    isFollowed: true,
  },
  {
    image: getRandomImage(),
    name: "Diana",
    isFollowed: false,
  },
  {
    image: getRandomImage(),
    name: "Edward",
    isFollowed: true,
  },
  {
    image: getRandomImage(),
    name: "Alice",
    isFollowed: true,
  },
  {
    image: getRandomImage(),
    name: "Bob",
    isFollowed: false,
  },
  {
    image: getRandomImage(),
    name: "Charlie",
    isFollowed: true,
  },
  {
    image: getRandomImage(),
    name: "Diana",
    isFollowed: false,
  },
  {
    image: getRandomImage(),
    name: "Edward",
    isFollowed: true,
  },
];
export default DiscoverView;
