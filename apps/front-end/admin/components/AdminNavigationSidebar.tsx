import React from "react";
import { useRouting } from "routing";
import {
  LogoIcon,
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
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

  console.log(routeSlugs);

  const links: NavigationLink[] = [
    {
      icon: "icon",
      name: "dashboard",
      onClick() {},
      slug: "dashboard",
      subLinks: [
        {
          icon: "sub",
          name: "sub panel",
          onClick() {},
          slug: "sub",
          subLinks: [],
        },
        {
          icon: "sub",
          name: "sub panel",
          onClick() {},
          slug: "sub-1",
          subLinks: [],
        },
        {
          icon: "sub",
          name: "sub panel",
          onClick() {},
          slug: "sub-2",
          subLinks: [
            {
              icon: "sub",
              name: "sub panel",
              onClick() {},
              slug: "sub-3",
              subLinks: [],
            },
            {
              icon: "sub",
              name: "sub panel",
              onClick() {},
              slug: "sub-4",
              subLinks: [
                {
                  icon: "sub",
                  name: "sub panel",
                  onClick() {},
                  slug: "sub-5",
                  subLinks: [],
                },
              ],
            },
          ],
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
            <AccordionButton>
              {selected ? (
                <div
                  style={{
                    paddingLeft: `${currDeepNum * 0.5}rem`,
                  }}
                  className={` text-primary border-b-primary flex text-lg items-center py-2 border-b border-opacity-20 gap-2`}
                >
                  {name}
                </div>
              ) : (
                <div
                  style={{
                    paddingLeft: `${currDeepNum * 0.5}rem`,
                  }}
                  className={` text-primary border-b-primary flex text-lg items-center py-2 border-b border-opacity-20 gap-2`}
                >
                  {name}
                </div>
              )}
            </AccordionButton>
            <AccordionPanel>
              <NestedLinks
                canBeSelected={true}
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
              visit((r) => r.addPath([...deepSlugs, slug].join("/")))
            }
            style={{
              paddingLeft: `${currDeepNum * 0.5}rem`,
            }}
            className={`${
              selected
                ? " text-primary border-b-primary"
                : "border-b-black text-black"
            } flex text-lg items-center py-2 border-b border-opacity-20 border-b-black gap-2`}
          >
            {name}
          </div>
        );
      })}
    </div>
  );
};
