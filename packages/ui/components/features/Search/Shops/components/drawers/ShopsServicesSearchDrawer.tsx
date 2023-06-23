import { FilterIcon } from "@UI/components/partials/icons/FilterIcon";
import { useSocialControls } from "@blocks";
import {
  Accordion,
  AccordionButton,
  AccordionPanel,
  ArrowRightIcon,
  Button,
  Drawer,
  DrawerContent,
  HStack,
  Image,
  Input,
  LocationOnPointIcon,
  Select,
  Slider,
} from "@partials";
import { SectionHeader } from "@sections/index";
import React from "react";
import { useTranslation } from "react-i18next";
import { mapArray, useForm } from "@UI/../utils/src";
import { StoreType } from "@features/API";
import { useGetFilteredShopsInfiniteQuery } from "@features/Shop";

export const ShopsSearchDrawer: React.FC<{}> = () => {
  const { t } = useTranslation();
  const { viewShop } = useSocialControls();
  const { cancelSearchMixedShopsServices, value } = useSocialControls(
    "searchMixShopAndService"
  );

  const isOpen = typeof value === "string";

  const { form } = useForm<
    Parameters<typeof useGetFilteredShopsInfiniteQuery>[0]
  >({ searchQuery: value, take: 10 });
  const { data } = useGetFilteredShopsInfiniteQuery(form, { enabled: isOpen });

  return (
    <Drawer onClose={() => cancelSearchMixedShopsServices} isOpen={isOpen}>
      <DrawerContent>
        <Accordion>
          <SectionHeader
            onBack={() => cancelSearchMixedShopsServices()}
            sectionTitle={t("Shops & Services")}
          >
            <AccordionButton>
              <FilterIcon />
            </AccordionButton>
          </SectionHeader>
          <AccordionPanel>
            <div className="flex flex-col gap-4">
              <Input></Input>
              <Select></Select>
              <Select></Select>
              <Select></Select>
            </div>
          </AccordionPanel>
        </Accordion>
        <Slider>
          {mapArray(data?.pages, (page) => (
            <>
              {mapArray(page.data, (shop, i) => {
                return (
                  <button
                    onClick={() => viewShop(shop.id)}
                    key={shop.id + i}
                    className="relative"
                  >
                    <Image
                      src={shop.thumbnail}
                      alt={shop.name}
                      className="w-11/12 h-5/6 object-cover"
                    />

                    <div className="absolute top-4 -left-1 bg-primary pl-2 pr-3 py-1">
                      {shop.storeType === StoreType.Product
                        ? `${shop.storeCategory} ${t("Store")}`
                        : `${shop.type} ${t("Service")}`}
                    </div>
                    <div className="absolute bg-white bg-opacity-80 bottom-2 left-2 right-2 flex flex-col gap-6">
                      <div className="flex flex-col gap-2">
                        <p className="text-xl font-semibold">{shop.name}</p>
                        <HStack className="text-sm">
                          <LocationOnPointIcon className="text-primary" />
                          <p className="text-darkBrown">
                            {shop.location.address} {shop.location.city}{" "}
                            {shop.location.country}
                          </p>
                        </HStack>
                      </div>
                    </div>
                    <Button
                      className="self-end"
                      colorScheme="darkbrown"
                      onClick={() => {}}
                    >
                      <p className="text-semibold text-sm">
                        {t("Vist service")}
                      </p>
                      <ArrowRightIcon className="text-white" />
                    </Button>
                  </button>
                );
              })}
            </>
          ))}
        </Slider>
      </DrawerContent>
    </Drawer>
  );
};
