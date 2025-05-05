import { Meta, StoryFn } from "@storybook/react";
import { SearchServiceCard } from "./SearchServiceCard";
import { storybookSearchCardsTitle } from "utils";

export default {
  title: "UI / Features /Search /Cards /SearchServiceCard",
  component: SearchServiceCard,
} as Meta<typeof SearchServiceCard>;

const template: StoryFn<typeof SearchServiceCard> = (args) => (
  <div className="w-64">
    <SearchServiceCard {...args} />
  </div>
);

export const SinglePrice = {
  render: template,

  args: {
    serviceData: {
      reviews: 150,
      discount: 26,
      id: "123",
      label: "Hotel",
      location: {
        country: "USA",
        countryCode: "CH",
        state: "LA",
        address: "Smart Street",
        postalCode: 8,
        cords: {
          lat: 56,
          lng: 24,
        },
        city: "LA",
      },
      price: 500,
      rating: 4.8,
      thumbnail:
        "https://www.europahotelbelfast.com/wp-content/uploads/2021/12/Shannon-Suite-5.jpg",
      title: "Well Furnished Apartment",
    },
    serviceType: "hotel",
    sellerInfo: {
      name: "Seller name",
      profession: "Profession",
      thumbnail: "/profile (1).jfif",
      verified: true,
    },
  },
};

export const RangePrice = {
  render: template,

  args: {
    serviceData: {
      reviews: 150,
      discount: 26,
      id: "123",
      label: "Hotel",
      location: {
        country: "USA",
        countryCode: "CH",
        state: "LA",
        address: "Smart Street",
        postalCode: 8,
        cords: {
          lat: 56,
          lng: 24,
        },
        city: "LA",
      },
      price: [50, 5000],
      rating: 4.8,
      thumbnail:
        "https://www.europahotelbelfast.com/wp-content/uploads/2021/12/Shannon-Suite-5.jpg",
      title: "Well Furnished Apartment",
    },
    serviceType: "hotel",
    sellerInfo: {
      name: "Seller name",
      profession: "Profession",
      thumbnail: "/profile (1).jfif",
      verified: true,
    },
  },
};
