import React, { useState } from "react";
import { useGetProductDetailsQuery } from "../services";
import { useMutateShoppingCart, useResponsive } from "@src/index";
import { SectionHeader } from "@sections/ShoppingManagement";
import { useTranslation } from "react-i18next";
import {
  AspectRatioImage,
  HStack,
  HeartOutlineIcon,
  PaperPlaneAngleIcon,
  PlayFillIcon,
  Slider,
  Spacer,
} from "@partials";
import { mapArray, useForm } from "@UI/../utils/src";
import { PresentationType, ShoppingCartItemType } from "@features/API";
import { ProductAttributeDisplay } from "../components/ProductAttributeDisplay";
import {
  BreadCrumb,
  ProductDescription,
  ProductImageGallery,
  ProductViewRight,
  SellerCard,
} from "@blocks";

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

export const ProductView: React.FC<{ productId: string }> = ({ productId }) => {
  const { data } = useGetProductDetailsQuery({ id: productId });
  const [productImgIdx, setProductIdx] = useState<number>(0);

  const { addShoppingCartItem } = useMutateShoppingCart();
  const { handleChange, form } = useForm<
    Parameters<typeof addShoppingCartItem>[0]
  >({
    itemId: "",
    quantity: 1,
    shippingRuleId: "",
    type: ShoppingCartItemType.Product,
    attributes: [],
  });

  const { isMobile } = useResponsive();
  const { t } = useTranslation();

  return isMobile ? (
    <div className="flex flex-col gap-6">
      <SectionHeader sectionTitle={data?.title || ""} />
      <div className="flex flex-col gap-2">
        <Slider
          currentItemIdx={productImgIdx}
          onSliderChange={(idx) => setProductIdx(idx)}
        >
          {mapArray(data?.presentations, (pres, i) => (
            <AspectRatioImage
              key={i}
              ratio={1.14}
              src={pres.src}
              alt={data?.title || ""}
            />
          ))}
        </Slider>
        <div className="w-full flex items-center gap-4 overflow-x-scroll">
          {mapArray(data?.presentations, (pres, i) => (
            <AspectRatioImage
              key={i}
              alt={data?.title || ""}
              ratio={1}
              src={pres.src}
              onClick={() => setProductIdx(i)}
              className="rounded-xl cursor-pointer"
            >
              {pres.type === PresentationType.Video ? (
                <PlayFillIcon className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
              ) : null}
            </AspectRatioImage>
          ))}
        </div>
        <HStack>
          <p className="text-xl font-semibold">{data?.title}</p>
          <HStack>
            <HeartOutlineIcon />
            <PaperPlaneAngleIcon />
          </HStack>
        </HStack>
        {mapArray(data?.attributes, (att, i) => (
          <div key={i}>
            <p>
              {t("Select")} {att.name}
            </p>
            <HStack className="flex-wrap">
              <ProductAttributeDisplay
                {...att}
                onChange={(value) => {
                  handleChange(
                    "attributes",
                    form.attributes
                      ?.filter((v) => v.id !== att.name)
                      .concat([{ id: att.name, value }])
                  );
                }}
                value={[]}
              />
            </HStack>
          </div>
        ))}
      </div>
    </div>
  ) : (
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
