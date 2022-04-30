import React from "react";
import { NextPage } from "next";
import { PlaceCard, PlaceCardProps } from "ui";
import { Box } from "@chakra-ui/react";
import { PostCardPlaceHolder } from "ui/placeholder";

export const placeCardPlaceholder: PlaceCardProps = {
  user: PostCardPlaceHolder.profileInfo,
  placeAttachments: [
    {
      src: "/place-1.jpg",
      type: "image",
    },
  ],
  placeLocation: "los angeles",
  placeType: "Hotel",
  openFrom: "07:30 AM",
  openTo: "10:30 PM",
};

const preview: NextPage = () => {
  return (
    <section className="flex min-h-screen w-full items-center justify-center bg-slate-200">
      <PlaceCard {...placeCardPlaceholder} />
    </section>
  );
};

export default preview;
