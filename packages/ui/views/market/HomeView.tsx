// @ts-nocheck
import {
  GridListOrganiser,
  ProductSkeleton,
  SpinnerFallback,
  usePaginationControls,
} from "@blocks";
import { DesignPlacement, Product } from "@features/API";
import { useGetDesignPlacementQuery } from "@features/Moderation";
import { useGetNearPlacesQuery } from "@features/Places/services/useGetNearPlacesQuery";
import {
  useGetCategoryByIdQuery,
  useGetTopProductCategoriesQuery,
} from "@features/Products";
import { useGetTopSalesProductsByCategoryIdQuery } from "@features/Products/services/queries/getTopSalesProductsByCategory";
import {
  GetRecommendedProductsQuery,
  useGetRecommendedProducts,
} from "@features/Products/services/queries/useGetRecommendedProducts";
import { useGetBestShopsQuery } from "@features/Shop/services/queries/useGetBestShopsQuery";
import {
  AddToCartProductButton,
  ArrowLeftIcon,
  ArrowRightIcon,
  AspectRatio,
  AspectRatioImage,
  BookServiceButton,
  Button,
  HStack,
  HeartFillIcon,
  HeartOutlineIcon,
  Image,
  PriceDisplay,
  Slider,
  StarIcon,
  Text,
} from "@partials";
import {
  nearPlacesPlaceholder,
  bestShopsPlaceholder,
  designByPlacementPlaceholder,
  productCategoryByIdPlaceholder,
  topSaleProductsPlaceholder,
  recommendedProductsPlaceholder,
  topProductCategoriesPlaceholder,
  mostViewdVideos,
  getTopProductCategoriesPlaceholder,
} from "placeholder";
import { useGeoLocation } from "@src/utils/React-utils/useGeolocation";
import { useResponsive } from "hooks";
import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useRouting } from "routing";
import { mapArray, setTestid } from "utils";
import {
  MdKeyboardDoubleArrowRight,
  MdKeyboardDoubleArrowLeft,
  MdOutlineStarPurple500,
} from "react-icons/md";
import { GoDotFill } from "react-icons/go";
import { FaHeart, FaRegHeart, FaPlay } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { FaPause } from "react-icons/fa6";
import { useRouter } from "next/router";

export const HomeView: React.FC = () => {
  const [category, setCategory] = useState({
    id: "category-id-0",
    name: "All",
  });

  return (
    <div className="flex flex-col gap-4">
      <HomeViewDesignsDisplay />
      <div className="w-5/6 mx-auto flex justify-center ">
        <TopCategoriesHomePageSlider
          onCategorySelect={({ id, name }) => {
            setCategory({ id, name });
          }}
          selectedCategoryId={category}
        />
      </div>

      <TopSalesCategoryProducts category={category} />
      <BestShopsHomeSection />
      <PlacesNearYouHomeSection />
      <HomeRecommendationSection />
      <MostViewdVideso />
    </div>
  );
};

const HomeViewDesignsDisplay: React.FC = () => {
  const { data: _designs } = useGetDesignPlacementQuery({
    placement: DesignPlacement.Homepage,
    pagination: {
      page: 1,
      take: 10,
    },
  });
  const [idx, setIdx] = useState<number>(0);
  const designs = designByPlacementPlaceholder;

  return (
    <AspectRatio className="w-full overflow-hidden" ratio={0.3}>
      <Slider
        gap={32}
        onSliderChange={(idx) => setIdx(idx)}
        currentItemIdx={idx}
        draggingActive={true}
      >
        {mapArray(designs, (design: { name: string; src: string; text?: string }, i) => (
          <div
            key={i}
            className={`relative w-full h-full ${idx === i ? "block" : "hidden"
              }`}
          >
            <Image
              className="w-full h-full object-cover"
              alt={design.name}
              src={design.src}
            />
            <div className="absolute left-0 top-0 bg-black/10 w-full h-full" />

            {idx === i && (
              <div className="absolute flex flex-col gap-4 left-8 top-1/2 -translate-y-1/2">
                <h1 className="text-4xl text-white font-semibold">
                  {design.text || "Default Text"}
                </h1>
              </div>
            )}
          </div>
        ))}
      </Slider>

      <div className="flex gap-1 items-center absolute left-1/2 -translate-x-1/2 bottom-2">
        {mapArray([...Array(designs?.length)], (_, i) => (
          <div
            key={i}
            className={`${idx === i ? "bg-primary w-4 h-2" : "w-2 h-2 bg-grayText"
              } rounded-full`}
          />
        ))}
      </div>
    </AspectRatio>
  );
};

const TopCategoriesHomePageSlider: React.FC<{
  selectedCategoryId?: { id: string; name: string };
  onCategorySelect: ({ id, name }: { id: string; name: string }) => any;
}> = ({ onCategorySelect, selectedCategoryId }) => {
const { t }: { t: (key: string, ...args: any[]) => string } = useTranslation();
  const ref = useRef<HTMLDivElement>(null);
  const { data: _data, hasNextPage } = useGetTopProductCategoriesQuery(
    { take: 10 },
    { getNextPageParam: (last) => last.nextCursor },
  );
  const data = { pages: [getTopProductCategoriesPlaceholder] };
  const scroll = (scrollOffset: number) => {
    if (ref.current) {
      ref.current.scrollLeft += scrollOffset;
    }
  };

  return (
    <div className="flex flex-col gap-4 w-fit">
      <p className="font-semibold self-center text-3xl sm:text-xl py-4">
        {t("Best sales by categories")}
      </p>
      <HStack>
        <button onClick={() => scroll(-20)}>
          <MdKeyboardDoubleArrowLeft className="text-[2rem]" />
        </button>
        <div
          ref={ref}
          {...setTestid("productCategoriesContainer")}
          className="flex items-center w-full overflow-x-scroll noScroll gap-4 m-2"
        >
          {mapArray(data?.pages, (page, i) => (
            <React.Fragment key={i}>
              {mapArray(page.data, (category, i) => (
                <button
                  {...setTestid(`category-${category.id}`)}
                  key={i + category.id}
                  onClick={() => {
                    onCategorySelect({ id: category.id, name: category.name });
                  }}
                  className={`${selectedCategoryId?.id === category.id
                      ? "bg-black text-white"
                      : "bg-white text-black"
                    } border border-back rounded-full py-1 px-2`}
                >
                  {category.name}
                </button>
              ))}
            </React.Fragment>
          ))}
        </div>
        <button onClick={() => scroll(20)}>
          <MdKeyboardDoubleArrowRight className="text-[2rem]" />
        </button>
      </HStack>
    </div>
  );
};

const TopSalesCategoryProducts: React.FC<{
  category?: { id: string; name: string };
}> = ({ category }) => {
const { t }: { t: (key: string, ...args: any[]) => string } = useTranslation();
  const { visit } = useRouting();
  const { pagination } = usePaginationControls({ itemsPerPage: 40 });
  const { data: _categoryRes } = useGetCategoryByIdQuery(category?.id!);
  const { data: _data, isLoading: _isLoading } =
    useGetTopSalesProductsByCategoryIdQuery(
      {
        categoryId: category?.name === "All" ? undefined : category?.id!,
        pagination,
      },
      { enabled: !!category?.name },
    );
  const data = topSaleProductsPlaceholder;

  return (
    <div className="flex flex-col gap-4">
      <p className="font-semibold text-lg  sm:text-2xl py-4">
        {category?.name === "All" ? t("Products") : category?.name} {t("for you")}
      </p>
      <div
        {...setTestid("home-page-products-container")}
        className="grid grid-cols-2 md:gap-6 gap-2 sm:grid-cols-3 md:grid-cols-4"
      >
        {/*{isLoading
          ? mapArray([...Array(40)], () => <ProductSkeleton />)
          :*/}

        {mapArray(data, (prod, i) => (
          <div
            onClick={() => visit((r) => r.visitProduct(prod.id))}
            key={i}
            className="cursor-pointer flex flex-col mb-4 gap-4 sm:gap-2 test  rounded-xl shadow-md"
            {...setTestid(`home-page-product`)}
            data-itemID={prod.id}
          >
            <div className="flex flex-col gap-1 relative  ">
              <AspectRatioImage
                imageClassName="rounded-t-xl"
                src={prod.thumbnail}
                alt={prod.title}
                ratio={0.85}
              >
                <button
                  onClick={() => {
                    // TODO: integrate
                  }}
                  className=" text-white z-30 p-3 flex justify-center items-center absolute bg-black bg-opacity-30 rounded-full top-2 right-2"
                >
                  {prod.saved ? (
                    <FaRegHeart className="w-5 h-5" />
                  ) : (
                    <FaHeart className="w-5 h-5" />
                  )}
                </button>
              </AspectRatioImage>
            </div>
            <div className="p-3 rounded-b-xl flex flex-col justify-between h-full">
              <div className="flex flex-col gap-2 ">
                <p className="font-semibold text-xl">{prod.title}</p>
                <p className="text-[#7B7B7B] truncate">{prod.description}</p>
                <div className="flex items-center gap-1">
                  <MdOutlineStarPurple500 className="text-[#FFDF00] w-5 h-5" />
                  <div className="flex gap-[3px] mt-[2px] text-[14px] items-center">
                    <p className="text-[#515151]">
                      {prod.rate}/{5}
                    </p>
                    <GoDotFill className="w-[6px] h-[6px]  text-[#6D6D6D]" />
                    <p className=" text-[#6D6D6D]">
                      {`(${prod.reviews} ${t("Reviews")})`}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex pt-4 sm:pt-2 justify-between w-full items-center flex-col sm:flex-row gap-8 sm:gap-4">
                <PriceDisplay
                  price={prod.price}
                  decimel
                  className="font-semibold text-2xl sm:text-base"
                />
                <AddToCartProductButton
                  productId={prod.id}
                  className="w-fit px-4 py-2"
                  colorScheme="darkbrown"
                  outline
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const BestShopsHomeSection: React.FC = () => {
const { t }: { t: (key: string, ...args: any[]) => string } = useTranslation();
  const router = useRouter();
  const { isMobile } = useResponsive();
  const { data: _shopData } = useGetBestShopsQuery({ take: 5 });
  const data = bestShopsPlaceholder;

  const handleVisitShop = (id: string) => {
    console.log("inside handleVisitShop");
    router.push(`/shop/${id}`);
  };

  interface ShopCard {
    src: string;
    shopId: string;
    name: string;
    imageClassName: string;
    descriptionClassName: string;
  }

  const images = data.map((shop) => shop.thumbnail);

  const GRID_PATTERNS = {
    image: [
      "col-span-16 row-span-2",
      "col-span-10 row-span-1",
      "col-span-15 row-span-1",
      "col-span-24 row-span-1",
      "col-span-19 row-span-1",
    ],
    description: [
      "top-5 left-5",
      "left-1/2 transform -translate-x-1/2 top-2 text-base",
      "bottom-5 left-5",
      "top-1/2 transform -translate-y-1/2 left-5",
      "top-5 right-5",
    ],
  } as const;

  const ShopCards: ShopCard[] = data.map((shop, index) => ({
    src: shop.thumbnail,
    shopId: shop.id,
    name: shop.name,
    imageClassName: GRID_PATTERNS.image[index % GRID_PATTERNS.image.length],
    descriptionClassName:
      GRID_PATTERNS.description[index % GRID_PATTERNS.description.length],
  }));

  const splitIntoChunks = <T,>(array: T[], chunkSize: number): T[][] => {
    const chunks: T[][] = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  };

  const imageChunks = splitIntoChunks(ShopCards, 5);

  const Grid: React.FC<{ shopCards: ShopCard[] }> = ({ shopCards }) => (
    <div className="grid grid-rows-2 grid-flow-col grid-cols-[repeat(50,_minmax(0,_1fr))] gap-4  w-full ">
      {shopCards.map((shopCard, index) => (
        <div className={`relative + ${shopCard.imageClassName}`} key={index}>
          <img
            src={shopCard.src}
            className="object-cover rounded-2xl w-full h-full "
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-30 rounded-2xl"></div>
          {/* Text and Button */}
          <div
            className={`flex flex-col justify-center items-center gap-1 absolute ${shopCard.descriptionClassName}`}
          >
            <p className="text-[14px] text-white font-medium">Fashion shop</p>
            <p className="text-[22px] w-full font-semibold text-white drop-shadow-lg">
              {shopCard.name}
            </p>
            <Button
              className="px-3 w-fit h-fit py-1 bg-[#20ECA7] text-white font-semibold text-lg"
              onClick={() => handleVisitShop(shopCard.shopId)}
            >
              Visit now
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
  return (
    <div className="flex flex-col gap-4">
      <p className="text-lg sm:text-2xl font-semibold py-4">
        {t("Best shops")}
      </p>
      <div className="space-y-4 felx flex-col w-full mb-4 ">
        {imageChunks.map((chunk, index) => (
          <Grid key={index} shopCards={chunk} />
        ))}
      </div>
    </div>
  );
};

const PlacesNearYouHomeSection: React.FC = () => {
  const { lat, lng } = useGeoLocation();
  const { isMobile } = useResponsive();
const { t }: { t: (key: string, ...args: any[]) => string } = useTranslation();

  const {
    data: _places,
    isLoading: _isLoading,
    isError,
    error,
  } = useGetNearPlacesQuery(
    {
      lat: lat!,
      lon: lng!,
      take: isMobile ? 6 : 5,
    },
    {
      enabled: typeof lat === "number" && typeof lng === "number",
    },
  );
  const places = nearPlacesPlaceholder;

  return (
    <div className="flex flex-col gap-4">
      <p className="font-semibold text-lg sm:text-2xl py-4">
        {t("Places near you")}
      </p>
      <SpinnerFallback error={error} isError={isError} isLoading={false}>
        <div
          {...setTestid("homepage-near-places-container")}
          className="grid  grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-4 "
        >
          {mapArray(places, (place, i) => (
            <div
              {...setTestid("service-card")}
              key={i}
              className="flex flex-col p-1 gap-2"
            >
              <div className="flex flex-col ">
                <AspectRatioImage
                  imageClassName="rounded-xl"
                  src={place.thumbnail}
                  alt={place.name}
                  ratio={1}
                />
              </div>
              <div className="flex flex-col  ">
                <p className="font-medium text-sm sm:text-[18px] font-semibold">
                  {place.name}
                </p>
                <div className="flex justify-between items-center gap-2">
                  <div className="flex  items-center gap-1">
                    <MdOutlineStarPurple500 className="text-[#FFDF00] w-5 h-5" />
                    <div className="flex gap-[3px] mt-[2px] text-[14px] items-center">
                      <p className="text-[#515151] text-[16px]">
                        {place.rating}/{5}
                      </p>
                    </div>
                  </div>
                  <Button
                    colorScheme="darkbrown"
                    className="bg-black text-white flex items-center justify-between gap-2 px-2 py-1"
                  >
                    <p>Book now</p>
                    <IoIosArrowForward className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </SpinnerFallback>
    </div>
  );
};

const HomeRecommendationSection: React.FC = () => {
const { t }: { t: (key: string, ...args: any[]) => string } = useTranslation();
  const products: Array<
    Pick<Product, "thumbnail" | "title" | "rate" | "price" | "discount" | "id">
  > = [];

  const { pagination } = usePaginationControls();

  const { data: _data, ...props } = useGetRecommendedProducts(pagination);
  const data = recommendedProductsPlaceholder;

  return (
    <div className="flex flex-col gap-4">
      <p className="font-semibold sm:text-3xl text-lg w-full flex justify-center py-4 ">
        {t("Recommended for you")}
      </p>
      <SpinnerFallback {...props}>
        <div className="grid sm:grid-cols-5 gap-3 grid-cols-2 mb-4">
          {mapArray(data?.data, (prod, i) => (
            <div
              {...setTestid("service-card")}
              key={i}
              className="flex flex-col p-1 gap-2"
            >
              <div className="flex flex-col ">
                <AspectRatioImage
                  src={prod.thumbnail}
                  alt={prod.title}
                  ratio={1}
                />
              </div>
              <div className="flex flex-col gap-2">
                <p className="font-medium text-sm sm:text-[18px] font-semibold">
                  {prod.title}
                </p>

                <PriceDisplay
                  oldPrice={prod.price + 20}
                  price={prod.price}
                  decimel
                  className="font-semibold text-2xl sm:text-base"
                />
                <div className="flex justify-between items-center">
                  <div className="flex  items-center gap-1">
                    <MdOutlineStarPurple500 className="text-[#FFDF00] w-5 h-5" />
                    <div className="flex gap-[3px] mt-[2px] text-[14px] items-center">
                      <p className="text-[#515151] text-[16px]">
                        {prod.rate}/{5}
                      </p>
                    </div>
                  </div>
                  <AddToCartProductButton
                    productId={prod.id}
                    className="p-1 font-bold"
                    colorScheme="darkbrown"
                    outline
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </SpinnerFallback>
    </div>
  );
};

const MostViewdVideso: React.FC = () => {
  const data = mostViewdVideos;

const { t }: { t: (key: string, ...args: any[]) => string } = useTranslation();

  const { visit } = useRouting();

  return (
    <div className="flex flex-col gap-4">
      <p className="font-semibold text-lg  sm:text-2xl py-4">
        Most Viewd Videos
      </p>
      <div
        {...setTestid("home-page-products-container")}
        className="grid grid-cols-2 md:gap-6 gap-2 sm:grid-cols-3 md:grid-cols-4"
      >
        {mapArray(data, (prod, i) => (
          <div
            key={i}
            className="cursor-pointer flex flex-col mb-4 gap-4 sm:gap-2 test  rounded-xl "
            {...setTestid(`home-page-product`)}
            data-itemID={prod.id}
          >
            <div className="flex flex-col gap-1  ">
              <VideoPlayer
                src={prod.thumbnail}
                loop
                muted
                className="border-4 h-[300px] sm:h-[400px]"
              />
            </div>
            <div className="p-3 rounded-b-xl flex flex-col justify-between h-full">
              <div className="flex flex-col gap-2 ">
                <p className="font-semibold text-xl">{prod.title}</p>
                <p className="text-[#7B7B7B] truncate">{prod.description}</p>
                <div className="flex items-center gap-1">
                  <MdOutlineStarPurple500 className="text-[#FFDF00] w-5 h-5" />
                  <div className="flex gap-[3px] mt-[2px] text-[14px] items-center">
                    <p className="text-[#515151]">
                      {prod.rate}/{5}
                    </p>
                    <GoDotFill className="w-[6px] h-[6px]  text-[#6D6D6D]" />
                    <p className=" text-[#6D6D6D]">
                      {`(${prod.reviews} ${t("Reviews")})`}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex pt-4 sm:pt-2 justify-between w-full items-center flex-col sm:flex-row gap-8 sm:gap-4">
                <PriceDisplay
                  price={prod.price}
                  decimel
                  className="font-semibold text-2xl sm:text-base"
                />
                <AddToCartProductButton
                  productId={prod.id}
                  className="w-fit px-4 py-2"
                  colorScheme="darkbrown"
                  outline
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

interface VideoPlayerProps {
  src: string; // Path to the video source
  poster?: string; // Optional poster image for the video
  autoplay?: boolean; // Autoplay the video
  loop?: boolean; // Loop the video
  muted?: boolean; // Mute the video by default
  className?: string; // Additional classes for the video
  controls?: boolean; // Show native video controls
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  src,
  poster,
  autoplay = false,
  loop = false,
  muted = false,
  className = "",
  controls = false,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(false); // Tracks hover state

  // Handle play and pause
  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  return (
    <div
      className="relative w-full max-w-md mx-auto overflow-hidden rounded-xl shadow-lg"
      onMouseEnter={() => setShowControls(true)} // Show controls on hover
      onMouseLeave={() => setShowControls(false)} // Hide controls on mouse leave
    >
      {/* Video */}
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        autoPlay={autoplay}
        loop={loop}
        muted={muted}
        className={`w-full h-auto object-cover rounded-xl ${className}`}
        controls={controls} // Optional native controls
        onClick={togglePlay}
      >
        Your browser does not support the video tag.
      </video>
      {/* Custom Play/Pause Button */}
      {!controls && (
        <button
          className={`absolute inset-0 m-auto border border-white w-14 h-14 bg-white bg-opacity-30 rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform duration-300 ${isPlaying && !showControls ? "opacity-0" : "opacity-100"
            }`}
          onClick={togglePlay}
          aria-label={isPlaying ? "Pause video" : "Play video"}
        >
          {isPlaying ? (
            (<FaPause className="w-6 h-6 text-white" />) // Pause icon
          ) : (
            (<FaPlay className="w-6 h-6 text-white" />) // Play icon
          )}
        </button>
      )}
    </div>
  );
};
