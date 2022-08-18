import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import {
  ImageSlider,
  Container,
  CookiesInfoBanner,
  AspectRatio,
  RequiredSocialMediaTags,
  MetaImage,
  MetaKeywords,
  MetaDescription,
  MetaTitle,
  MetaUrl,
} from "ui";
import { HomeView } from "ui/views";
import { MasterLayout } from "@components";

const Market: NextPage = () => {
  return (
    <>
      <Head>
        {/* <meta
          property="og:url"
          content="http://www.nytimes.com/2015/02/19/arts/international/when-great-minds-dont-think-alike.html"
        />
        <meta property="og:type" content="article" />
        <meta
          property="og:title"
          content="When Great Minds Don’t Think Alike"
        />
        <meta
          property="og:description"
          content="How much does culture influence creative thinking?"
        />
        <meta
          property="og:image"
          content="http://static01.nyt.com/images/2015/02/19/arts/international/19iht-btnumbers19A/19iht-btnumbers19A-facebookJumbo-v2.jpg"
        /> */}
        <RequiredSocialMediaTags />
        <MetaImage content="https://images.adsttc.com/media/images/5efe/1f7f/b357/6540/5400/01d7/newsletter/archdaily-houses-104.jpg?1593712501" />
        <MetaKeywords
          content={["marketplace", "sell", "selling", "shop", "service"]}
        />
        <MetaUrl url="https://wiaah.com" />
        <MetaDescription content="wiaah is a would wide social marketplace that let sellers and service providers reach out millions of people through social media" />
        <meta name="subject" content="Wiaah marketplace" />
        <meta name="copyright" content="Wiaah" />
        <MetaTitle content={`Wiaah | Market`} />
      </Head>
      <MasterLayout>
        <AspectRatio ratio={6 / 16}>
          <ImageSlider
            images={["/shop.jpeg", "/shop-2.jpeg", "/shop-3.jpeg"]}
          />
        </AspectRatio>
        <Container>
          <HomeView />
        </Container>
        <div className="fixed bottom-4 left-0 w-full">
          <Container>
            <CookiesInfoBanner />
          </Container>
        </div>
      </MasterLayout>
    </>
  );
};

export default Market;
