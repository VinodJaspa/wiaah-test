import {
  GridListOrganiser,
  SpinnerFallback,
  usePaginationControls,
} from "@blocks";
import { DesignPlacement, Product } from "@features/API";
import { useGetDesignPlacementQuery } from "@features/Moderation";
import { useGetNearPlacesQuery } from "@features/Places/services/useGetNearPlacesQuery";
import { useGetTopProductCategoriesQuery } from "@features/Products";
import { useGetTopSalesProductsByCategoryIdQuery } from "@features/Products/services/queries/getTopSalesProductsByCategory";
import { useGetRecommendedProducts } from "@features/Products/services/queries/useGetRecommendedProducts";
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
import { useGeoLocation } from "@src/utils/React-utils/useGeolocation";
import { useResponsive } from "hooks";
import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useRouting } from "routing";
import { mapArray, setTestid } from "utils";

export const HomeView: React.FC = () => {
  const [category, setCategory] = useState<string>();
  return (
    <div className="flex flex-col gap-4">
      <HomeViewDesignsDisplay />
      <div className="w-5/6 mx-auto">
        <TopCategoriesHomePageSlider
          onCategorySelect={(id) => {
            setCategory(id);
          }}
          selectedCategoryId={category}
        />
      </div>

      <TopSalesCategoryProducts categoryId={category} />
      <BestShopsHomeSection />
      <PlacesNearYouHomeSection />
      <HomeRecommendationSection />
    </div>
  );
};

const HomeRecommendationSection: React.FC = () => {
  const { t } = useTranslation();
  const products: Array<
    Pick<Product, "thumbnail" | "title" | "rate" | "price" | "discount" | "id">
  > = [];

  const { pagination } = usePaginationControls();

  const { data, ...props } = useGetRecommendedProducts(pagination);

  return (
    <div className="flex flex-col gap-4">
      <p className="font-medium text-3xl sm:text-lg">
        {t("Recommended for you")}
      </p>
      <SpinnerFallback {...props}>
        <div className="grid grid-cols-4 gap-1 sm:grid-cols-2">
          {mapArray(data?.data, (prod, i) => (
            <div className="flex flex-col gap-4 sm:gap-2  p-1">
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

  const {
    data: places,
    isLoading,
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
    }
  );

  return (
    <div className="flex flex-col gap-8">
      <SpinnerFallback error={error} isError={isError} isLoading={isLoading}>
        <div className="grid xl:grid-cols-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {mapArray(places, (place, i) => (
            <div key={i} className="flex flex-col p-1 gap-4">
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
  const { data } = useGetBestShopsQuery({ take: 5 });

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
              <p className="text-[0.5rem] sm:text-sm">{`${
                shop.storeCategory
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

const TopSalesCategoryProducts: React.FC<{
  categoryId?: string;
}> = ({ categoryId }) => {
  const { t } = useTranslation();
  const { pagination } = usePaginationControls();
  const { data } = useGetTopSalesProductsByCategoryIdQuery(
    {
      categoryId: categoryId!,
      pagination,
    },
    { enabled: !!categoryId }
  );

  const isAll = categoryId === "all";

  const category = "";

  return (
    <div className="flex flex-col gap-4">
      <p className="font-medium text-3xl sm:text-lg">
        {isAll ? t("Products") : category} {t("for you")}
      </p>
      <div className="grid grid-cols-4 gap-1 sm:grid-cols-2">
        {mapArray(data?.data, (prod, i) => (
          <div className="flex flex-col gap-4 sm:gap-2  p-1">
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
    </div>
  );
};

const HomeViewDesignsDisplay: React.FC = () => {
  const { data: designs } = useGetDesignPlacementQuery({
    placement: DesignPlacement.Homepage,
    pagination: {
      page: 1,
      take: 10,
    },
  });
  const [idx, setIdx] = useState<number>(0);

  return (
    <AspectRatio className="w-full overflow-hidden" ratio={0.3}>
      <Slider
        gap={32}
        onSliderChange={(idx) => setIdx(idx)}
        currentItemIdx={idx}
      >
        {mapArray(designs, (design, i) => (
          <>
            <Image
              className="w-full h-full object-cover"
              alt={design.name}
              src={design.src}
            />
            <div className="absolute left-0 top-0 bg-black/10 w-full h-full" />

            <div className="absolute flex flex-col gap-4 left-8 top-1/2 -translate-y-1/2">
              <h1 className="text-4xl text-white font-semibold">
                {design.text}
              </h1>
            </div>
          </>
        ))}
      </Slider>

      <div className="flex gap-1 items-center absolute left-1/2 -translate-x-1/2 bottom-2">
        {mapArray([...Array(designs?.length)], (_, i) => (
          <div
            className={`${
              idx === i ? "bg-primary w-4 h-2" : "w-2 h-2 bg-grayText"
            } rounded-full`}
          />
        ))}
      </div>
    </AspectRatio>
  );
};

const TopCategoriesHomePageSlider: React.FC<{
  selectedCategoryId?: string;
  onCategorySelect: (id: string) => any;
}> = ({ onCategorySelect, selectedCategoryId }) => {
  const { t } = useTranslation();
  const ref = useRef<HTMLDivElement>(null);
  const { data, hasNextPage } = useGetTopProductCategoriesQuery(
    { take: 10 },
    { getNextPageParam: (last) => last.nextCursor }
  );

  const scroll = (scrollOffset: number) => {
    if (ref.current) {
      ref.current.scrollLeft += scrollOffset;
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <p className="font-semibold self-center text-3xl sm:text-xl">
        {t("Best sales by categories")}
      </p>
      <HStack>
        <button onClick={() => scroll(-20)}>
          <ArrowLeftIcon className="text-[2rem]" />
        </button>
        <div
          ref={ref}
          {...setTestid("productCategoriesContainer")}
          className="flex items-center w-full overflow-y-scroll gap-4"
        >
          {mapArray(data?.pages, (page, i) => (
            <React.Fragment key={i}>
              {mapArray(page.data, (category, i) => (
                <button
                  {...setTestid(`category-${category.id}`)}
                  key={i + category.id}
                  onClick={() => {
                    onCategorySelect(category.id);
                  }}
                  className={`${
                    selectedCategoryId === category.id ? "bg-black" : "bg-white"
                  } border border-back rounded-full py-1 px-2`}
                >
                  {category.name}
                </button>
              ))}
            </React.Fragment>
          ))}
        </div>
        <button onClick={() => scroll(20)}>
          <ArrowRightIcon className="text-[2rem]" />
        </button>
      </HStack>
    </div>
  );
};
