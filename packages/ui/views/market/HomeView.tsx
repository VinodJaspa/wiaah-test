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
  topProductCategoriesPlaceholder,
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
        {mapArray(designs, (design, i) => (
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
                  {design.text}
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
  const { t } = useTranslation();
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
      <p className="font-semibold self-center text-3xl sm:text-xl">
        {t("Best sales by categories")}
      </p>
      <HStack>
        <button onClick={() => scroll(-20)}>
          <MdKeyboardDoubleArrowLeft className="text-[2rem]" />
        </button>
        <div
          ref={ref}
          {...setTestid("productCategoriesContainer")}
          className="flex items-center w-full overflow-x-scroll noScroll gap-4"
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
                  className={`${selectedCategoryId.id === category.id
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
  const { t } = useTranslation();
  const { visit } = useRouting();
  const { pagination } = usePaginationControls({ itemsPerPage: 40 });
  const { data: _categoryRes } = useGetCategoryByIdQuery(category.id!);
  const { data: _data, isLoading: _isLoading } =
    useGetTopSalesProductsByCategoryIdQuery(
      {
        categoryId: category.name === "All" ? undefined : category.id!,
        pagination,
      },
      { enabled: !!category.name },
    );
  const data = topSaleProductsPlaceholder;

  return (
    <div className="flex flex-col gap-4">
      <p className="font-semibold text-lg  sm:text-2xl">
        {category.name === "All" ? t("Products") : category.name} {t("for you")}
      </p>
      <div
        {...setTestid("home-page-products-container")}
        className="grid grid-cols-2 md:gap-5 gap-2 sm:grid-cols-3 md:grid-cols-4"
      >
        {/*{isLoading
          ? mapArray([...Array(40)], () => <ProductSkeleton />)
          :*/}

        {mapArray(data, (prod, i) => (
          <div
            onClick={() => visit((r) => r.visitProduct(prod.id))}
            key={i}
            className="cursor-pointer flex flex-col gap-4 sm:gap-2 test  rounded-xl shadow-md"
            {...setTestid(`home-page-product`)}
            data-itemID={prod.id}
          >
            <div className="flex flex-col gap-1  ">
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
                  className="w-8 h-8 flex justify-center items-center absolute bg-black bg-opacity-10 rounded-full top-2 right-2"
                >
                  {prod.saved ? <HeartOutlineIcon /> : <HeartFillIcon />}
                </button>
              </AspectRatioImage>
            </div>
            <div className="p-3 rounded-b-xl flex flex-col justify-between h-full">
              <div className="flex flex-col gap-2 ">
                <p className="font-semibold text-xl">{prod.title}</p>
                <p className="text-[#7B7B7B]">{prod.description}</p>
                <div className="flex items-center gap-1">
                  <MdOutlineStarPurple500 className="text-[#FFDF00]" />
                  <p className="text-xs">
                    {prod.rate}/{5} {`(${prod.reviews} ${t("Reviews")})`}
                  </p>
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

const HomeRecommendationSection: React.FC = () => {
  const { t } = useTranslation();
  const products: Array<
    Pick<Product, "thumbnail" | "title" | "rate" | "price" | "discount" | "id">
  > = [];

  const { pagination } = usePaginationControls();

  const { data: _data, ...props } = useGetRecommendedProducts(pagination);
  const data = recommendedProductsPlaceholder;

  return (
    <div className="flex flex-col gap-4">
      <p className="font-medium text-3xl sm:text-lg">
        {t("Recommended for you")}
      </p>
      <SpinnerFallback {...props}>
        <div className="grid grid-cols-4 gap-1 sm:grid-cols-2">
          {mapArray(data?.data, (prod, i) => (
            <div key={i} className="flex flex-col gap-4 sm:gap-2  p-1">
              <div className="flex flex-col gap-1">
                <AspectRatioImage
                  className="rounded-xl"
                  src={prod.thumbnail}
                  alt={prod.title}
                  ratio={0.85}
                >
                  <button
                    onClick={() => {
                      // TODO: integrate
                    }}
                    className="w-8 h-8 flex justify-center items-center absolute bg-black bg-opacity-10 rounded-full top-2 right-2"
                  >
                    {prod.saved ? <HeartOutlineIcon /> : <HeartFillIcon />}
                  </button>
                </AspectRatioImage>
                <p className="font-medium">{prod.title}</p>
              </div>
              <Text className="text-xs text-grayText" maxLines={1}>
                {prod.description}
              </Text>
              <HStack className="gap-1">
                <StarIcon className="text-yellow-300" />
                <p className="text-xs">
                  {prod.rate}/{5} {`(${prod.reviews} ${t("Reviews")})`}
                </p>
              </HStack>
              <div className="flex pt-4 sm:pt-2 justify-between w-full items-center sm:flex-col gap-8 sm:gap-4">
                <PriceDisplay
                  price={prod.price}
                  decimel
                  className="font-semibold text-2xl sm:text-base"
                />
                <AddToCartProductButton
                  productId={prod.id}
                  className="sm:w-full"
                  colorScheme="darkbrown"
                  outline
                />
              </div>
            </div>
          ))}
        </div>
      </SpinnerFallback>
    </div>
  );
};

const PlacesNearYouHomeSection: React.FC = () => {
  const { lat, lng } = useGeoLocation();
  const { isMobile } = useResponsive();
  const { t } = useTranslation();

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
    <div className="flex flex-col gap-8">
      <p>{t("Places near you")}</p>
      <SpinnerFallback error={error} isError={isError} isLoading={false}>
        <div
          {...setTestid("homepage-near-places-container")}
          className="grid xl:grid-cols-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
          {mapArray(places, (place, i) => (
            <div
              {...setTestid("service-card")}
              key={i}
              className="flex flex-col p-1 gap-4"
            >
              <div className="flex flex-col gap-1">
                <AspectRatioImage
                  src={place.thumbnail}
                  alt={place.name}
                  ratio={1}
                />
                <Text maxLines={1} className="font-medium text-sm sm:text-lg">
                  {place.name}
                </Text>
              </div>
              <HStack className="justify-between">
                <HStack>
                  <StarIcon className="text-yellow-200" />
                  <p className="text-grayText text-xs">
                    {place.rating}/{5}
                  </p>
                </HStack>
                <BookServiceButton serviceId={place.id} />
              </HStack>
            </div>
          ))}
        </div>
      </SpinnerFallback>
    </div>
  );
};

const BestShopsHomeSection: React.FC = () => {
  const { t } = useTranslation();
  const { visit } = useRouting();
  const { isMobile } = useResponsive();
  const { data: _data } = useGetBestShopsQuery({ take: 5 });
  const data = bestShopsPlaceholder;

  return (
    <div className="flex flex-col gap-4">
      <p className="text-3xl sm:text-lg">{t("Best shops")}</p>
      <GridListOrganiser
        presets={
          isMobile
            ? [
              {
                cols: 5,
                points: [
                  {
                    c: 3,
                    r: 1,
                  },
                  {
                    c: 2,
                    r: 1,
                  },
                  {
                    c: 2,
                    r: 1,
                  },
                  {
                    c: 3,
                    r: 1,
                  },
                  {
                    c: 5,
                    r: 1,
                  },
                ],
              },
            ]
            : [
              {
                cols: 13,
                points: [
                  {
                    c: 4,
                    r: 2,
                  },
                  {
                    c: 2,
                    r: 1,
                  },
                  {
                    c: 5,
                    r: 1,
                  },
                  {
                    c: 4,
                    r: 1,
                  },
                  {
                    c: 5,
                    r: 1,
                  },
                ],
              },
            ]
        }
      >
        {mapArray(data, (shop, i) => (
          <div key={i} className={`relative`}>
            <Image
              src={shop.thumbnail}
              className="w-full h-full object-cover"
              alt={shop.name}
            />
            <div className="absolute top-1/2 -translate-y-1/2 left-2 items-center flex flex-col gap-2">
              <p className="text-[0.5rem] sm:text-sm">{`${shop.storeCategory
                } ${t("store")}`}</p>
              <p className="text-[0.625rem] sm:text-xl">{shop.name}</p>
              <Button
                className="text-xs sm:text-sm"
                onClick={() => visit((r) => r.visitShop(shop))}
              >
                {t("Visit now")}
              </Button>
            </div>
          </div>
        ))}
      </GridListOrganiser>
    </div>
  );
};

const recommendedProductsPlaceholder: GetRecommendedProductsQuery["getProductRecommendation"] =
{
  __typename: "ProductPaginationResponse",
  hasMore: true,
  total: 5,
  data: [
    {
      __typename: "Product",
      id: "1",
      rate: 4.5,
      reviews: 120,
      thumbnail: "/shop-2.jpeg",
      title: "Product Title 1",
      description: "A great product for everyday use.",
      saved: true,
      price: 19.99,
    },
    {
      __typename: "Product",
      id: "2",
      rate: 4.2,
      reviews: 95,
      thumbnail: "/shop-2.jpeg",
      title: "Product Title 2",
      description: "This product is loved by everyone.",
      saved: false,
      price: 29.99,
    },
    {
      __typename: "Product",
      id: "3",
      rate: 4.8,
      reviews: 210,
      thumbnail: "/shop-2.jpeg",
      title: "Product Title 3",
      description: "Top-rated product with excellent features.",
      saved: true,
      price: 39.99,
    },
    {
      __typename: "Product",
      id: "4",
      rate: 3.9,
      reviews: 45,
      thumbnail: "/shop-2.jpeg",
      title: "Product Title 4",
      description: "A budget-friendly product for everyone.",
      saved: false,
      price: 14.99,
    },
    {
      __typename: "Product",
      id: "5",
      rate: 4.0,
      reviews: 85,
      thumbnail: "/shop-2.jpeg",
      title: "Product Title 5",
      description: "A product with good value for money.",
      saved: true,
      price: 24.99,
    },
  ],
};
