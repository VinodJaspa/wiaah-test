import React from "react";
import { useTranslation } from "react-i18next";
import { useRouting } from "routing";
import {
  LogoIcon,
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  DashboardIcon,
  ShopIcon,
  ArrowRightIcon,
  ServicesIcon,
} from "ui";
import { mapArray, runIfFn } from "utils";

type NavigationLink = {
  name: string;
  icon: React.ReactNode;
  slug: string;
  onClick: () => void;
  subLinks: NavigationLink[];
};

export const AdminNavigationSidebar: React.FC<{
  currentUrl: string;
  onRoute: (newUrl: string) => void;
}> = ({ currentUrl: _url = "", onRoute }) => {
  let currentUrl = _url[0] === "/" ? _url.slice(1) : _url;
  const routeSlugs = currentUrl.split("?")[0].split("/");
  const { t } = useTranslation();

  const links: NavigationLink[] = [
    {
      icon: DashboardIcon,
      name: "Dashboard",
      onClick() {},
      slug: "dashboard",
      subLinks: [],
    },
    {
      icon: ShopIcon,
      name: t("Product Shop"),
      onClick() {},
      slug: "product-shop",
      subLinks: [
        {
          icon: () => (
            <>
              <ArrowRightIcon />
            </>
          ),
          name: t("Category"),
          onClick() {},
          slug: "category",
          subLinks: [],
        },
        {
          icon: () => (
            <>
              <ArrowRightIcon />
            </>
          ),
          name: t("Products"),
          onClick() {},
          slug: "products",
          subLinks: [],
        },
        {
          icon: () => (
            <>
              <ArrowRightIcon />
            </>
          ),
          name: t("Filters"),
          onClick() {},
          slug: "filters",
          subLinks: [],
        },
      ],
    },
    {
      icon: ServicesIcon,
      name: t("Service Shop"),
      onClick() {},
      slug: "service-shop",
      subLinks: [
        {
          icon: () => (
            <>
              <ArrowRightIcon />
            </>
          ),
          name: t("Category"),
          onClick() {},
          slug: "category",
          subLinks: [],
        },
        {
          icon: () => (
            <>
              <ArrowRightIcon />
            </>
          ),
          name: t("Services"),
          onClick() {},
          slug: "services",
          subLinks: [],
        },
        {
          icon: () => (
            <>
              <ArrowRightIcon />
            </>
          ),
          name: t("Filters"),
          onClick() {},
          slug: "filters",
          subLinks: [],
        },
      ],
    },
  ];

  return (
    <div className="flex flex-col w-full border-r border-opacity-20 border-r-black h-full gap-4">
      <div className="flex bg-white justify-center items-center h-24 border-b border-opacity-20 border-b-black">
        <LogoIcon className="text-8xl text-primary" />
      </div>
      <div className="px-4 ">
        <Accordion>
          <NestedLinks
            canBeSelected={true}
            deepSlugs={[]}
            lastDeepNum={0}
            links={links}
            routeSlugs={routeSlugs}
          />
        </Accordion>
      </div>
    </div>
  );
};

const NestedLinks: React.FC<{
  links: NavigationLink[];
  routeSlugs: string[];
  lastDeepNum: number;
  deepSlugs: string[];
  canBeSelected: boolean;
}> = ({ lastDeepNum, links, routeSlugs, deepSlugs, canBeSelected }) => {
  const { visit } = useRouting();
  const currDeepNum = lastDeepNum + 1;

  return (
    <div className="flex flex-col gap-2 w-full">
      {mapArray(links, ({ icon, name, onClick, slug, subLinks }, i) => {
        const selected = routeSlugs[lastDeepNum] === slug && canBeSelected;
        console.log({
          selected,
          routeSlugs,
          lastDeepNum,
          currDeepNum,
          canBeSelected,
          slug,
        });
        return subLinks.length > 0 ? (
          <AccordionItem itemkey={`${currDeepNum}-${i}`}>
            <AccordionButton
              className={`${
                lastDeepNum === 0 && selected
                  ? "text-white"
                  : selected
                  ? "text-primary"
                  : "text-black"
              }`}
            >
              <div
                style={{
                  paddingLeft: `${currDeepNum * 0.5}rem`,
                }}
                className={`${
                  selected
                    ? `${
                        lastDeepNum === 0
                          ? "bg-primary rounded text-white"
                          : "text-primary"
                      }`
                    : "text-black"
                } flex text-lg items-center py-2 gap-2`}
              >
                {runIfFn(icon)} {name}
              </div>
            </AccordionButton>
            <AccordionPanel forceState={selected === true ? true : undefined}>
              <NestedLinks
                canBeSelected={selected}
                lastDeepNum={currDeepNum}
                links={subLinks}
                routeSlugs={routeSlugs}
                deepSlugs={[...deepSlugs, slug]}
              />
            </AccordionPanel>
          </AccordionItem>
        ) : (
          <div
            onClick={() =>
              visit((r) => r.addPath([...deepSlugs, slug].join("/")), false)
            }
            style={{
              paddingLeft: `${currDeepNum * 0.5}rem`,
            }}
            className={`${
              selected
                ? `${
                    lastDeepNum === 0
                      ? "bg-primary rounded text-white"
                      : "text-primary"
                  }`
                : "text-black"
            } flex text-lg items-center py-2 gap-2`}
          >
            {runIfFn(icon)} {name}
          </div>
        );
      })}
    </div>
  );
};
