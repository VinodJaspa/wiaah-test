import React from "react";
import { BreadCrumb, ProductImageGallery, SpinnerFallback } from "@UI";
import { ProductDescription, SellerCard, useGetServiceDataQuery } from "@UI";
import { ServiceRightView } from "@UI";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import { ProductGalleryItem } from "types";

const breadcrumb = [
  {
    text: "Home",
    url: "/",
  },
  {
    text: "Horology",
    url: "/category/horology",
  },
  {
    text: "Golden Whatch Rolex 1988",
    url: "",
  },
];
const productGalleryitems: ProductGalleryItem[] = [
  {
    type: "image",
    original: "https://picsum.photos/id/1018/1000/600/",
    thumbnail: "https://picsum.photos/id/1018/250/150/",
  },
  {
    type: "image",
    original: "https://picsum.photos/id/1015/1000/600/",
    thumbnail: "https://picsum.photos/id/1015/250/150/",
  },
  {
    type: "image",
    original: "https://picsum.photos/id/1019/1000/600/",
    thumbnail: "https://picsum.photos/id/1019/250/150/",
  },
  {
    type: "image",
    original: "https://picsum.photos/id/1020/1000/600/",
    thumbnail: "https://picsum.photos/id/1020/250/150/",
  },
  {
    type: "video",
    original:
      "https://storage.googleapis.com/web-dev-assets/video-and-source-tags/chrome.webm",
    thumbnail:
      "https://storage.googleapis.com/web-dev-assets/video-and-source-tags/chrome.webm",
  },
];

const productComments = [
  {
    name: "Rehan",
    date: "08-Oct-2020",
    rating: 5,
    comment: "Good product",
  },
  {
    name: "John",
    date: "08-Oct-2020",
    rating: 3,
    comment: "Really great product highly recommand it",
  },
  {
    name: "Jane",
    date: "08-Oct-2020",
    rating: 4,
    comment: "Amazing!!!",
  },
  {
    name: "Rehan",
    date: "08-Oct-2020",
    rating: 5,
    comment: "Good product",
  },
  {
    name: "John",
    date: "08-Oct-2020",
    rating: 3,
    comment: "Really great product highly recommand it",
  },
];

export interface ServiceViewProps {
  serviceId: string;
}

export const ServiceView: React.FC<ServiceViewProps> = ({ serviceId }) => {
  const { data, isLoading, isError } = useGetServiceDataQuery(serviceId);

  const { t } = useTranslation();
  const router = useRouter();
  const breadCrumbLinks = [{ text: "wiaah", url: "/" }].concat(
    [...(router.query.categories || [])].map((cate, i) => ({
      text: cate,
      url: `/${cate}`,
    }))
  );
  return (
    <>
      <div className="block w-full space-y-6 p-5">
        <div className="">
          <BreadCrumb links={breadCrumbLinks} />
        </div>
        <div>
          <div className="flex-column mb-10 flex-wrap  lg:flex  lg:justify-between">
            <div className="h-full w-full lg:w-8/12">
              <SpinnerFallback isLoading={isLoading} isError={isError}>
                {data ? (
                  <ProductImageGallery images={data.servicePresentation} />
                ) : null}
              </SpinnerFallback>
            </div>
            <div className="mt-4 h-full w-full lg:mt-0  lg:w-4/12 lg:pl-5 ">
              <ServiceRightView serviceId={serviceId} />
            </div>
          </div>
          <div className="flex-column flex-wrap lg:flex lg:justify-between">
            <div className="w-full lg:w-8/12 xl:w-8/12">
              <ProductDescription
                description="The product description goes here!"
                comments={productComments}
              />
            </div>
            <div className="mt-10 w-full pl-0 sm:w-6/12 md:w-5/12 lg:w-4/12 lg:pl-8 xl:w-4/12">
              <SellerCard
                id={"1"}
                name="EMH Test Shop"
                reviews={5}
                rating={4}
              />
            </div>
          </div>
          <div className="">
            <p className="my-10 flex justify-center text-2xl font-bold uppercase">
              {t("Related_Products", "Related Products")}
            </p>
            <div className="relative mb-10 md:px-20">
              {/* <Swiper
                spaceBetween={30}
                slidesPerView={isTabletOrMobile ? 2 : 4}
                navigation={true}
                modules={[Navigation]}
              >
                {[...Array(12)].map((_, i: number) => (
                  <SwiperSlide className="flex justify-center" key={i}>
                    <ProductCard
                      buttonText="Add to Card"
                      id={`${i}`}
                      name={t("Camera Digital with extra lenses")}
                      imageUrl="/shop-2.jpeg"
                      price={518.68}
                      rating={4}
                      cashback="5%"
                      // off={15}
                      oldPrice={600}
                    />
                  </SwiperSlide>
                ))}
              </Swiper> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
