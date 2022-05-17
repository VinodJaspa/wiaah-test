import { Flex, useDimensions } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { useTranslation } from "react-i18next";
import { MdShoppingBasket } from "react-icons/md";
import { SettingsSectionType } from "types";
import {
  ProductManagementSection,
  SettingsSectionsSidebar,
  useResponsive,
} from "ui";
import { NotFoundSection } from "../../AccountSettings";

export interface ShopManagementViewProps {}

export const ShopManagementView: React.FC<ShopManagementViewProps> = ({}) => {
  const baseRoute = "shop-management";
  const { t } = useTranslation();
  const router = useRouter();
  const { isTablet } = useResponsive();
  const { section } = router.query;
  const minGap = isTablet ? 0 : 48;

  console.log("section", section);
  const leftPanelRef = React.useRef<HTMLDivElement>(null);

  const leftPanelDims = useDimensions(leftPanelRef, true);

  const leftPanelwidth = leftPanelDims ? leftPanelDims.borderBox.width : null;

  const route = Array.isArray(section) ? section[0] : section;

  const sectionIdx = sections.findIndex(
    (panel) => panel.panelUrl === `/${route}`
  );

  const CurrentSection = (): React.ReactElement => {
    if (sectionIdx > -1) {
      return sections[sectionIdx].panelComponent;
    } else {
      return NotFoundSection();
    }
  };

  return (
    <Flex h="100%" w="100%" justify={"end"} gap="2rem">
      <div className="fixed left-[5rem]" ref={leftPanelRef}>
        {!isTablet && (
          <Flex
            w={{ base: "100%", sm: "10rem", md: "15rem", lg: "20rem" }}
            direction={"column"}
            gap="1rem"
          >
            <p className="text-xl px-4 font-bold">
              {t("shop_management", "Shop Management")}
            </p>
            <SettingsSectionsSidebar
              currentActive={
                sections[sectionIdx] ? sections[sectionIdx].panelUrl : null
              }
              onPanelClick={(url) =>
                router.replace(`/${baseRoute}${url}`, null, {
                  shallow: true,
                })
              }
              panelsInfo={sections}
              innerProps={{
                w: "100%",
              }}
            />
          </Flex>
        )}
      </div>
      <Flex
        w={`calc(100% - ${leftPanelwidth + minGap}px)`}
        pr={`${minGap}px`}
        h="full"
      >
        <>{CurrentSection()}</>
      </Flex>
    </Flex>
  );
};

const sections: SettingsSectionType[] = [
  {
    panelName: {
      translationKey: "product_mangagement",
      fallbackText: "Product Management",
    },
    panelIcon: MdShoppingBasket,
    panelUrl: "/product-management",
    panelComponent: <ProductManagementSection />,
  },
];
