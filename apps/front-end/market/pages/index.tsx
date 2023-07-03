import React from "react";
import type { NextPage } from "next";
import { ImageSlider, Container, CookiesInfoBanner, AspectRatio } from "ui";
import { HomeView } from "ui/views";
import { MasterLayout } from "@components";

const Market: NextPage = () => {
  return (
    <>
      <MasterLayout>
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
