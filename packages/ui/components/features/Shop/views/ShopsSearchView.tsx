import { Image, Slider } from "@partials";
import { SectionHeader } from "@sections/ShoppingManagement";
import React from "react";
import { useTranslation } from "react-i18next";
// import { useGetFilteredShopsQuery } from "../services";
import { mapArray, useForm } from "@UI/../utils/src";
import { usePaginationControls } from "@blocks";
import { useResponsive } from "@src/index";
import { StoreType } from "@features/API";
import { startCase } from "lodash";
import { FilterIcon } from "@UI/components/partials/icons/FilterIcon";
import { getRandomImage } from "placeholder";

const FAKE_SHOPS_DATA = [
  {
    id: "1",
    thumbnail: getRandomImage(),
    type: "Electronics",
    storeType: StoreType.Service,
    storeCategory: "Home Appliances",
  },

  {
    id: "2",
    thumbnail: getRandomImage(),
    type: "Electronics",
    storeType: StoreType.Service,
    storeCategory: "Home Appliances",
  },
  {
    id: "3",
    thumbnail: getRandomImage(),
    type: "Electronics",
    storeType: StoreType.Service,
    storeCategory: "Home Appliances",
  },
  {
    id: "4",
    thumbnail: getRandomImage(),
    type: "Electronics",
    storeType: StoreType.Service,
    storeCategory: "Home Appliances",
  },
  {
    id: "5",
    thumbnail: getRandomImage(),
    type: "Electronics",
    storeType: StoreType.Service,
    storeCategory: "Home Appliances",
  },
];

export const ShopsSearchView: React.FC<{
  slug: string;
}> = ({ slug }) => {
  const { t } = useTranslation();
  const { controls, pagination } = usePaginationControls();
  const { isMobile } = useResponsive();
  // WARNING: this grqphql endpoint is not ready yet
  // const { form } = useForm<Parameters<typeof useGetFilteredShopsQuery>[0]>({
  //   pagination,
  //   searchQuery: slug,
  // });
  //
  //WARNING: graphql server is not ready yet & this specific endpoint is not created yet
  // const { data: shops } = useGetFilteredShopsQuery(form);

  const shops = FAKE_SHOPS_DATA;

  return isMobile ? (
    <div className="flex flex-col gap-4">
      <SectionHeader sectionTitle={t("Shops & Services")}>
        <button onClick={() => { }}>
          <FilterIcon className="text-2xl" />
        </button>
      </SectionHeader>

      <Slider>
        {mapArray(shops, (shop, i) => (
          <div
            key={shop.id + i}
            className="relative w-11/12 h-full object-cover"
          >
            <Image src={shop.thumbnail} className="w-full h-full" />

            <div className="absolute bg-primary top-8 left-0">
              {shop.storeType === StoreType.Service
                ? `${startCase(shop.type || "")}`
                : `${shop.storeCategory} ${t("Store")}`}
            </div>
          </div>
        ))}
      </Slider>
    </div>
  ) : null;
};
