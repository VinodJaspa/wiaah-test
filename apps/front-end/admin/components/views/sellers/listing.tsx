import { ProductDetailsTable } from "@blocks";
import { HotelsSearchList } from "@UI";
import React from "react";

export const SellerListing: React.FC<{}> = () => {
  const isProducts = false;
  const productComp = isProducts ? (
    <ProductDetailsTable />
  ) : (
    <HotelsSearchList
      rooms={[...Array(10)].map((_, i) => ({
        bathrooms: 3,
        beds: 4,
        cancelationPolicies: [{ cost: 50, duration: 10 }],
        createdAt: new Date().toString(),
        dailyPrice: true,
        description: "Service Desecriptin",
        discount: {
          units: 15,
          value: 10,
        },
        hotelId: "",
        id: "",
        measurements: { inFeet: 87, inMeter: 40 },
        num_of_rooms: 5,
        presentations: [
          {
            src: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/184305239.jpg?k=2d22fe63ae1f8960e057238c98fb436f7bd9f65854e3a5e918607c5cfa1d0a52&o=&hp=1",
          },
        ],
        pricePerNight: 150,
        rating: 4.5,
        reviews: 150,
        sellerId: "",
        title: "Service title",
        updatedAt: new Date().toString(),
        extras: [],
      }))}
      total={50}
    />
  );

  return productComp;
};
