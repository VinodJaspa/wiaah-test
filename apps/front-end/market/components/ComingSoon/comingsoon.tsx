import React, { ReactElement } from "react";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaTiktok,
} from "react-icons/fa";
import { BsPlayFill, BsSnapchat } from "react-icons/bs";
import { Button, Clickable, Container, Countdown, Image, Input } from "ui";
import { social } from "../../data/Links";
import Link from "next/link";
import Head from "next/head";
import { useTranslation } from "react-i18next";
import { runIfFn } from "utils";

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
  {
    name: "snapchat",
    component: <BsSnapchat fill="#fff" />,
    bgColor: "#f0f04f",
    link: social.snapchat,
  },
];

export const CoomingSoon: React.FC = () => {
  const [videoOpen, setVideoOpen] = React.useState<boolean>(false);
const { t } = useTranslation();
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
      {/* <VideoPopup
        open={videoOpen}
        close={handleVideoClose}
        src="https://www.youtube.com/embed/RgKAFK5djSk?autoplay=0&mute=1"
      /> */}
      <div className="w-screen h-screen relative">
        <Image
          alt="Hero"
          className="absolute w-screen h-screen object-cover object-top"
          src="./ComingSoonHero.png"
        />
        <Container className="absolute top-0 left-1/2 z-10 h-full -translate-x-1/2">
          <div className="w-full h-full items-end py-4 flex flex-col">
            <div className="flex gap-4">
              {socialData.map((item, i) => (
                <Clickable key={i}>
                  <Link href={item.link}>
                    <div
                      style={{
                        backgroundColor: item.bgColor,
                      }}
                      className={`text-2xl rounded-full p-2`}
                    >
                      {runIfFn(item.component)}
                    </div>
                  </Link>
                </Clickable>
              ))}
            </div>

            <div className="items-center flex flex-col gap-4 max-w-7xl justify-center px-4 h-full self-center">
              <div className="w-fit p-4 bg-white text-5xl rounded-full">
                <Clickable onClick={handleVideoOpen}>
                  <BsPlayFill />
                </Clickable>
              </div>
              <p className="text-white text-5xl font-semibold text-center">
                {t("we_are_coming_soon", "we are coming soon".toUpperCase())}
              </p>
              <div className="flex flex-col md:flex-row w-full gap-4">
                <Input placeholder={t("your_name", "Your Name")} />
                <Input placeholder={t("Your_email", "Your Email")} />
                <Button className="text-white px-16 whitespace-nowrap border-white border-2 hover:text-black hover:bg-white">
                  {t("sell_with_us", "Sell With Us")}
                </Button>
              </div>
              <Countdown toDate={new Date(releaseDate)} />
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};
