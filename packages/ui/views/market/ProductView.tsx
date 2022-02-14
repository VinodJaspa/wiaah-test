import React, {useState } from "react";
import {BreadCrumb } from "ui/components/blocks/BreadCrumb";
import {
ProductImageGallery,
ProductViewRight,
ProductDescription,
SellerCard,
} from "ui/components";
import {Product } from "../../components/blocks/products/product";
import {Swiper,SwiperSlide } from "swiper/react";
import {Navigation } from "swiper";
import {useMediaQuery } from "react-responsive";
import "swiper/css";
import "swiper/css/navigation";

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
const images = [
  {
    original: "https://picsum.photos/id/1018/1000/600/",
    thumbnail: "https://picsum.photos/id/1018/250/150/",
  },
  {
    original: "https://picsum.photos/id/1015/1000/600/",
    thumbnail: "https://picsum.photos/id/1015/250/150/",
  },
  {
    original: "https://picsum.photos/id/1019/1000/600/",
    thumbnail: "https://picsum.photos/id/1019/250/150/",
  },
  {
    original: "https://picsum.photos/id/1020/1000/600/",
    thumbnail: "https://picsum.photos/id/1020/250/150/",
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
export const ProductView: React.FC = () => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  return (
    <>
      <div className="block w-full space-y-6 p-5">
        <div className="">
          <BreadCrumb breadcrumb={breadcrumb} />
        </div>
        <div>
          <div className="flex-column mb-20 flex-wrap items-end lg:flex lg:justify-between">
            <div className="w-full lg:w-8/12">
              <ProductImageGallery images={images} />
            </div>
            <div className="mt-0 w-full md:mt-4 lg:w-4/12 lg:pl-5">
              <ProductViewRight
                price={1000}
                name="Camera Digital with extra lenses"
                reviews={5}
                off={10}
                rating={4}
              />
            </div>
          </div>
          <div className="flex-column flex-wrap lg:flex lg:justify-between">
            <div className="w-full lg:w-8/12 xl:w-9/12">
              <ProductDescription
                description="The product description goes here!"
                comments={productComments}
              />
            </div>
            <div className="mt-10 w-full pl-0 sm:w-6/12 md:w-5/12 lg:w-4/12 lg:pl-8 xl:w-3/12">
              <SellerCard name="EMH Test Shop" reviews={5} rating={4} />
            </div>
          </div>
          <div className="">
            <p className="my-10 flex justify-center text-2xl font-bold uppercase">
              RELATED PRODUCTS
            </p>
            <div className="relative mb-10 md:px-20">
              <Swiper
                spaceBetween={30}
                slidesPerView={isTabletOrMobile ? 2 : 4}
                navigation={true}
                modules={[Navigation]}
              >
                {[...Array(12)].map((_, i: number) => (
                  <SwiperSlide className="flex justify-center" key={i}>
                    <Product
                      name="Camera Digital with extra lenses"
                      imgUrl="/shop-2.jpeg"
                      price={518.68}
                      rating={4}
                      cashback={10}
                      off={10}
                      oldPrice={600}
                    ></Product>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
