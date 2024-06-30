import React from "react";
import { BreadCrumb } from "@UI";
import {
  ProductImageGallery,
  ProductViewRight,
  ProductDescription,
  SellerCard,
  Spacer,
} from "@UI";
import { useTranslation } from "react-i18next";
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

export interface ProductViewProps {
  productId: string;
}

export const ProductView: React.FC<ProductViewProps> = ({ productId }) => {
  const { t } = useTranslation();

  return (
    <>
      <div className="block w-full space-y-6 p-5">
        <div className="">
          <BreadCrumb links={breadcrumb} />
        </div>
        <div>
          <div className="flex-column h-fit flex-wrap items-stretch lg:flex lg:h-[28rem] lg:justify-between">
            <div className="h-full w-full lg:w-8/12">
              <ProductImageGallery images={productGalleryitems} />
            </div>
            <div className=" h-full w-full lg:mt-0  lg:w-4/12 lg:pl-5 ">
              <ProductViewRight
                id="wasdwad"
                price={1000}
                oldPrice={1500}
                name="Camera Digital with extra lenses"
                reviews={5}
                off={10}
                rating={4}
                category="Horology"
                imgUrl="/shop.jpeg"
              />
            </div>
          </div>
          <Spacer />
          <Spacer />
          <Spacer />
          <div className="flex-column flex-wrap lg:flex lg:justify-between">
            <div className="w-full lg:w-8/12 xl:w-8/12">
              <ProductDescription
                description="The product description goes here!"
                comments={productComments}
              />
            </div>
            <div className="mt-10 w-full pl-0 sm:w-6/12 md:w-5/12 lg:w-4/12 lg:pl-8 xl:w-4/12">
              <SellerCard id="15" name="EMH Test Shop" reviews={5} rating={4} />
            </div>
          </div>
          <div className="">
            <p className="my-10 flex justify-center text-2xl font-bold uppercase">
              {t("Related Products")}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
