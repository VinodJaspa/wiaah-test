import { AspectRatio, Box, Button, Flex, Text } from "@chakra-ui/react";
import { t } from "i18next";
import React, { DetailedHTMLProps, IframeHTMLAttributes } from "react";
import { IoClose } from "react-icons/io5";
import { useOutsideClick } from "ui/Hooks";
import { Clickable } from "ui";

export interface VideoPopupProps
  extends DetailedHTMLProps<
    IframeHTMLAttributes<HTMLIFrameElement>,
    HTMLIFrameElement
  > {
  open?: boolean;
  close?: () => void;
}

export const VideoPopup: React.FC<VideoPopupProps> = ({
  open,
  close,
  ...props
}) => {
  const [show, setShow] = React.useState<boolean>(open || false);
  const videoRef = React.useRef(null);
  useOutsideClick(videoRef, () => handleClose);
  function handleClose() {
    close && close();
  }

  React.useEffect(() => {
    if (open) {
      setShow(true);
    } else {
      setTimeout(() => {
        setShow(false);
      }, 300);
    }
  }, [open]);

  return (
    <Flex
      pointerEvents={open ? "all" : "none"}
      opacity={open ? 1 : 0}
      transition="all"
      transitionDuration={"500"}
      position={"fixed"}
      bgColor="rgba(0,0,0,0.4)"
      zIndex={20}
      top="0px"
      left="0px"
      w="100vw"
      h="100vh"
      justify={"center"}
      px="1rem"
      align="center"
    >
      <Flex
        ref={videoRef}
        translateY={open ? "0%" : "40%"}
        transition="all"
        transitionDuration={"500"}
        w={{ base: "100%", sm: "40rem", md: "60rem" }}
        rounded={"md"}
        bg="white"
        p="0.5rem"
        direction={"column"}
        gap="1.5rem"
      >
        <Flex fontSize={"1.5rem"} justify={"end"}>
          <Clickable onClick={handleClose}>
            <IoClose />
          </Clickable>
        </Flex>
        {show && (
          <AspectRatio ratio={16 / 9}>
            <iframe width={"100%"} height="auto" {...props} />
          </AspectRatio>
        )}
      </Flex>
    </Flex>
  );
};
