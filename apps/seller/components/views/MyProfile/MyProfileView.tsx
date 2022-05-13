import { Box, Flex, Image, useDimensions } from "@chakra-ui/react";
import React from "react";
import { MyProfile } from "./MyProfile";

export interface MyProfileView {}

export const MyProfileView: React.FC<MyProfileView> = () => {
  const boxRef = React.useRef<HTMLDivElement>(null);
  const dims = useDimensions(boxRef, true);
  return (
    <Flex position={{ base: "relative", md: "initial" }}>
      <Box h={"fit-content"} ref={boxRef}>
        <MyProfile />
      </Box>
      <Image
        position={{ base: "absolute", md: "unset" }}
        top="0px"
        left="0px"
        w="100%"
        overflow={"hidden"}
        bgColor={"blackAlpha.200"}
        zIndex={-1}
        h={{ base: "100%", md: dims ? dims.borderBox.height : "unset" }}
        src="/shop.jpeg"
        objectFit={"cover"}
      />
    </Flex>
  );
};
