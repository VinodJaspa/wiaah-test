import { Image, Slider } from "@partials";
import { SectionHeader } from "@sections/ShoppingManagement";
import React from "react";
import { useTranslation } from "react-i18next";
import { useGetFilteredShopsQuery } from "../services";
import { mapArray, useForm } from "@UI/../utils/src";
import { usePaginationControls } from "@blocks";
import { useResponsive } from "@src/index";
import { StoreType } from "@features/API";
import { startCase } from "lodash";
import { FilterIcon } from "@UI/components/partials/icons/FilterIcon";

export const ShopsSearchView: React.FC<{
  slug: string;
}> = ({ slug }) => {
  const { t } = useTranslation();
  const { controls, pagination } = usePaginationControls();
  const { isMobile } = useResponsive();
  const { form } = useForm<Parameters<typeof useGetFilteredShopsQuery>[0]>({
    pagination,
    searchQuery: slug,
  });
  const { data: shops } = useGetFilteredShopsQuery(form);

  return isMobile ? (
    <div className="flex flex-col gap-4">
      <SectionHeader sectionTitle={t("Shops & Services")}>
        <button onClick={() => {}}>
          <FilterIcon className="text-2xl" />
        </button>
      </SectionHeader>

      <Slider>
        {mapArray(shops, (shop, i) => (
          <div key={shop.id + i} className="relative w-11/12 h-5/6">
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
