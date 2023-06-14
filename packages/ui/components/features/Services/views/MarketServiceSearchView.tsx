import { LocationSearchInput, usePaginationControls } from "@blocks";
import { ServiceType } from "@features/API";
import { useResponsive } from "hooks";
import React from "react";
import { useRouting } from "routing";
import {
  AspectRatioImage,
  Button,
  DotIcon,
  HStack,
  HeartOutlineAltIcon,
  Input,
  InputGroup,
  InputLeftElement,
  LocationIcon,
  Pagination,
  PriceDisplay,
  SearchIcon,
  StarIcon,
} from "@partials";
import { useTranslation } from "react-i18next";
import { mapArray } from "utils";
import { useGetFilteredServicesQuery } from "../Services";

export const MarketServiceSearchView: React.FC<{
  serviceType: ServiceType;
}> = ({ serviceType }) => {
  const { visit } = useRouting();
  const { isMobile } = useResponsive();
  const { t } = useTranslation();

  const { controls, pagination } = usePaginationControls();

  const { data: services } = useGetFilteredServicesQuery({
    pagination,
  });
  const showOn = (types: ServiceType[]) => types.includes(serviceType);

  return (
    <div className="flex flex-col gap-4">
      {/* search bar */}

      {showOn([ServiceType.Hotel]) ? (
        isMobile ? (
          <HStack>
            <InputGroup>
              <InputLeftElement>
                <SearchIcon />
              </InputLeftElement>
              <Input />
            </InputGroup>
            <Button>{t("Submit")}</Button>
          </HStack>
        ) : (
          <LocationSearchInput
            onLocationSelect={(location) => {
              visit((routes) =>
                routes.visitServiceLocationSearchResults(serviceType, location)
              );
            }}
          />
        )
      ) : null}

      {isMobile ? (
        <>
          <div className="grid grid-cols-2 gap-2">
            {mapArray(
              services?.data,
              ({
                name,
                price,
                rating,
                shop,
                thumbnail,
                description,
                reviews,
              }) => (
                <>
                  {showOn([ServiceType.Hotel]) ? (
                    <MarketHotelServiceSearchCardAlt
                      description={description}
                      location={`${shop?.location?.city}, ${shop?.location?.country}`}
                      name={name}
                      price={price}
                      rating={rating}
                      thumbnail={thumbnail}
                    />
                  ) : null}
                  {showOn([ServiceType.Restaurant]) ? (
                    <MarketRestaurantServiceSearchCardAlt
                      reviews={reviews}
                      location={`${shop?.location?.city}, ${shop?.location?.country}`}
                      name={name}
                      price={price}
                      rating={rating}
                      thumbnail={thumbnail}
                    />
                  ) : null}
                </>
              )
            )}
          </div>
        </>
      ) : (
        <></>
      )}
      <Pagination controls={controls} />
    </div>
  );
};

export const MarketHotelServiceSearchCardAlt: React.FC<{
  thumbnail: string;
  name: string;
  rating: number;
  description: string;
  price: number;
  location: string;
}> = ({ description, location, name, price, rating, thumbnail }) => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-1 p-1">
      <AspectRatioImage
        className="rounded-xl"
        ratio={1.2}
        src={thumbnail}
        alt={name}
      >
        <button className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center rounded-full bg-black/30">
          <HeartOutlineAltIcon className="text-sm text-white fill-white" />
        </button>
      </AspectRatioImage>
      <div className="p-1 flex flex-col gap-8">
        <HStack className="justify-between">
          <p className="font-medium">{location}</p>
          <HStack className="text-xs">
            <StarIcon />
            <p>
              {rating}/{5}
            </p>
          </HStack>
        </HStack>
        <p className="text-grayText text-xs">{description}</p>
        <div className="flex items-end">
          <PriceDisplay
            price={price}
            className="mt-1"
            symbolProps={{ className: "text-primary" }}
          />
          /<span className="text-[0.625rem]">{t("Night")}</span>
        </div>
      </div>
    </div>
  );
};

export const MarketRestaurantServiceSearchCardAlt: React.FC<{
  name: string;
  thumbnail: string;
  rating: number;
  reviews: number;
  location: string;
  price: number;
}> = ({ location, name, price, rating, reviews, thumbnail }) => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-1 p-1">
      <AspectRatioImage alt={name} src={thumbnail} ratio={1.2}>
        <></>
      </AspectRatioImage>
      <div className="flex flex-col gap-2 p-1">
        <p className="text-[0.938rem] font-medium">{name}</p>
        <HStack>
          <LocationIcon className="text-primary" />
          <p className="text-xs">{location}</p>
        </HStack>
        <HStack>
          <StarIcon className="text-yellow-300" />
          <HStack className="text-xs text-grayText">
            <p>{rating}/5</p>
            <DotIcon />
            <p>{`(${reviews}) ${t("Reviews")}`}</p>
          </HStack>
        </HStack>
        <p className="flex items-end text-[0.938rem]">
          <PriceDisplay price={price} className="font-medium" />/
          <span className="text-[0.625rem]">{t("Serving")}</span>
        </p>
      </div>
    </div>
  );
};
