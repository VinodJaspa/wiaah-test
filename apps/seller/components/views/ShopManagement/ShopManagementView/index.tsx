import { useDimensions } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  MdOutlineShoppingBasket,
  MdOutlineComment,
  MdOutlineLocalShipping,
} from "react-icons/md";
import { SettingsSectionType } from "types";
import { FaHistory } from "react-icons/fa";
import { BsBoxArrowInUp } from "react-icons/bs";
import {
  AffiliationIcon,
  ProductManagementSection,
  SettingsSectionsSidebar,
  useResponsive,
  AffiliationHistorySection,
  CanceledOrdersSection,
  ReviewsSection,
  ShippingSettingsSection,
  AffiliationManagementSection,
} from "ui";
import { NotFoundSection } from "../../AccountSettings";

export interface ShopManagementViewProps {}

export const ShopManagementView: React.FC<ShopManagementViewProps> = ({}) => {
  const baseRoute = "shop-management";
  const router = useRouter();
  const { section } = router.query;
  const route = Array.isArray(section) ? section[0] : section;

  const { t } = useTranslation();
  const { isTablet } = useResponsive();
  const minGap = isTablet ? 0 : 48;

  const leftPanelRef = React.useRef<HTMLDivElement>(null);

  const leftPanelDims = useDimensions(leftPanelRef, true);

  const leftPanelwidth = leftPanelDims ? leftPanelDims.borderBox.width : null;

  React.useEffect(() => {
    if (!route) router.push(`/${baseRoute}/${sections[0].panelUrl}`);
  }, [router, route]);

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
    <div className="h-full w-full flex justify-end gap-8">
      <div className="fixed left-[5rem]" ref={leftPanelRef}>
        {!isTablet && (
          <div className="gap-4 w-full sm:w-40 md:w-[15rem] xl:w-[20rem] flex flex-col px-2">
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
            />
          </div>
        )}
      </div>
      <div
        style={{
          width: `calc(100% - ${leftPanelwidth + minGap}px)`,
          paddingRight: minGap,
        }}
        className={`h-full`}
      >
        <>{CurrentSection()}</>
      </div>
    </div>
  );
};

const sections: SettingsSectionType[] = [
  {
    panelName: {
      translationKey: "product_mangagement",
      fallbackText: "Product Management",
    },
    panelIcon: MdOutlineShoppingBasket,
    panelUrl: "/product-management",
    panelComponent: <ProductManagementSection />,
  },
  {
    panelName: {
      translationKey: "affiliation_management",
      fallbackText: "Affiliation Management",
    },
    panelIcon: AffiliationIcon,
    panelUrl: "/affiliation-management",
    panelComponent: <AffiliationManagementSection />,
  },
  {
    panelName: {
      translationKey: "affiliation_history",
      fallbackText: "Affiliation History",
    },
    panelIcon: FaHistory,
    panelUrl: "/affiliation-history",
    panelComponent: <AffiliationHistorySection />,
  },
  {
    panelName: {
      translationKey: "canceled_orders",
      fallbackText: "Canceled Orders",
    },
    panelIcon: BsBoxArrowInUp,
    panelUrl: "/canceled-orders",
    panelComponent: <CanceledOrdersSection />,
  },
  {
    panelName: {
      translationKey: "shipping_settings",
      fallbackText: "Shipping Settings",
    },
    panelIcon: MdOutlineLocalShipping,
    panelUrl: "/shipping-settings",
    panelComponent: <ShippingSettingsSection />,
  },
  {
    panelName: {
      translationKey: "reviews",
      fallbackText: "Reviews",
    },
    panelIcon: MdOutlineComment,
    panelUrl: "/reviews",
    panelComponent: <ReviewsSection />,
  },
];
