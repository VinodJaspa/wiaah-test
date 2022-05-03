import React from "react";
import { NextPage } from "next";
import {
  GridWrapper,
  GridWrapperDataType,
  PlaceCard,
  PlaceCardProps,
} from "ui";
import { Box } from "@chakra-ui/react";
import { PostCardPlaceHolder } from "ui/placeholder";

// export const placeCardPlaceholder: PlaceCardProps = {
//   user: PostCardPlaceHolder.profileInfo,
//   placeAttachments: [
//     {
//       src: "/place-1.jpg",
//       type: "image",
//     },
//   ],
//   placeLocation: "los angeles",
//   placeType: "Hotel",
//   openFrom: "07:30 AM",
//   openTo: "10:30 PM",
// };

const customPh: GridWrapperDataType[] = [
  {
    component: <Box bg="gray" h="full" w="full" />,
    displayVariant: "portrait",
  },
  {
    component: <Box bg="gray" h="full" w="full" />,
    displayVariant: "landscape",
  },
  {
    component: <Box bg="gray" h="full" w="full" />,
    displayVariant: "large",
  },
];

const ph: GridWrapperDataType[] = customPh.concat(
  [...Array(10)].map(() => ({
    component: <Box bg="gray" h="full" w="full" />,
    displayVariant: "normal",
  }))
);

const preview: NextPage = () => {
  return (
    <section className="w-full h-screen">
      <Box w="50%" m={"auto"}>
        <GridWrapper cols={3} items={ph} />
      </Box>
    </section>
  );
};

export default preview;
