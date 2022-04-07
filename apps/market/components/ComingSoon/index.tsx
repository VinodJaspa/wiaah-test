import React, { ReactElement } from "react";
import { Flex, Button, Box, Text, Image, Input } from "@chakra-ui/react";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaTiktok,
} from "react-icons/fa";
import { BsPlayFill } from "react-icons/bs";
import { Clickable, Container, Countdown, VideoPopup } from "ui";
import { social } from "../../lib/Links";
import Link from "next/link";
import { t } from "i18next";
import Head from "next/head";

interface SocialItem {
  name: string;
  component: ReactElement;
  bgColor: string;
  link: string;
}

// mm/dd/yy date formate
const releaseDate = "4/7/2023";

const socialData: SocialItem[] = [
  {
    name: "facebook",
    component: <FaFacebook fill="#fff" />,
    bgColor: "#2562E7",
    link: social.facebook,
  },
  {
    name: "instagram",
    component: <FaInstagram fill="#fff" />,
    bgColor: "#BE1859",
    link: social.instagram,
  },
  {
    name: "twitter",
    component: <FaTwitter fill="#fff" />,
    bgColor: "#5DA4F8",
    link: social.twitter,
  },
  {
    name: "youtube",
    component: <FaYoutube fill="#fff" />,
    bgColor: "#ED4344",
    link: social.youtube,
  },
  {
    name: "tiktok",
    component: <FaTiktok fill="#fff" />,
    bgColor: "#000",
    link: "Tiktok.com/@wiaah",
  },
];

export const CoomingSoon: React.FC = () => {
  const [videoOpen, setVideoOpen] = React.useState<boolean>(false);

  function handleVideoClose() {
    setVideoOpen(false);
  }
  function handleVideoOpen() {
    setVideoOpen(true);
  }

  return (
    <>
      <Head>
        <title>Wiaah coming soon</title>
      </Head>
      <VideoPopup
        open={videoOpen}
        close={handleVideoClose}
        src="https://www.youtube.com/embed/RgKAFK5djSk?autoplay=0&mute=1"
      />
      <Box w="100vw" h="100vh" position={"relative"}>
        <Image
          src="./ComingSoonHero.png"
          position={"absolute"}
          w="100vw"
          h="100vh"
          objectFit={"cover"}
          objectPosition={"top"}
        />
        <Container className="absolute top-0 left-1/2 z-10 h-full -translate-x-1/2">
          <Flex h="100%" w="100%" align={"end"} py="1rem" direction={"column"}>
            <Flex gap={"1rem"}>
              {socialData.map((item, i) => (
                <Clickable>
                  <Link href={item.link}>
                    <Box
                      bg={item.bgColor}
                      fontSize="1.5rem"
                      rounded="100%"
                      p="0.5rem"
                    >
                      {item.component}
                    </Box>
                  </Link>
                </Clickable>
              ))}
            </Flex>

            <Flex
              align="center"
              direction={"column"}
              gap="1rem"
              maxW={"7xl"}
              justify="center"
              px="1rem"
              h="100%"
              alignSelf={"center"}
            >
              <Box
                w="fit-content"
                p="1rem"
                bg="white"
                fontSize={"3rem"}
                rounded="100%"
              >
                <Clickable onClick={handleVideoOpen}>
                  <BsPlayFill />
                </Clickable>
              </Box>
              <Text
                color="white"
                fontSize={"5xl"}
                fontWeight="semibold"
                textAlign="center"
              >
                {t("we_are_coming_soon", "we are coming soon".toUpperCase())}
              </Text>
              <Flex
                direction={{ base: "column", md: "row" }}
                w="full"
                gap={"1rem"}
              >
                <Input bg="white" placeholder={t("your_name", "Your Name")} />
                <Input bg="white" placeholder={t("Your_email", "Your Email")} />
                <Button
                  color="white"
                  borderColor={"white"}
                  px={"4rem"}
                  _hover={{
                    bgColor: "white",
                    color: "#000",
                  }}
                  borderWidth={"3px"}
                  variant={"outline"}
                >
                  {t("sell_with_us", "Sell With Us")}
                </Button>
              </Flex>
              <Countdown toDate={new Date(releaseDate)} />
            </Flex>
          </Flex>
        </Container>
      </Box>
    </>
  );
};
