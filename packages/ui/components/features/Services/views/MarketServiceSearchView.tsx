import { LocationSearchInput } from "@blocks";
import { ServiceType } from "@features/API";
import { useResponsive } from "hooks";
import React from "react";
import { useRouting } from "routing";
import {
  AspectRatioImage,
  Button,
  HStack,
  HeartOutlineAltIcon,
  Input,
  InputGroup,
  InputLeftElement,
  PriceDisplay,
  SearchIcon,
  StarIcon,
} from "@partials";
import { useTranslation } from "react-i18next";
import { mapArray } from "utils";
import { useGetFilteredServicesQuery } from "../Services";

export const MarketServiceSearchView: React.FC<{
  slug: string;
  serviceType: ServiceType;
}> = ({ serviceType, slug }) => {
  const { visit } = useRouting();
  const { isMobile } = useResponsive();
  const { t } = useTranslation();

  const { data: services } = useGetFilteredServicesQuery({
    locationQuery: slug,
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
          {showOn([ServiceType.Hotel]) ? (
            <div className="grid grid-cols-2 gap-2">
              {mapArray(
                services,
                ({
                  id,
                  name,
                  price,
                  rating,
                  type,
                  shop,
                  thumbnail,
                  description,
                }) => (
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
                        <p className="font-medium">
                          {shop?.location?.city}, {shop?.location?.country}
                        </p>
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
                )
              )}
            </div>
          ) : null}
        </>
      ) : (
        <></>
      )}
    </div>
  );
};
