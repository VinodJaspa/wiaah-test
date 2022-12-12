import { useRouting } from "routing";
import { mapArray, runIfFn } from "utils";
import {
  AccordionButton,
  AccordionItem,
  AccordionPanel,
} from "../../../partials";

export type NavigationLink = {
  name: string;
  icon: React.ReactNode;
  slug: string;
  onClick: () => void;
  subLinks: NavigationLink[];
};

export const NestedSubmenuNavigationLinks: React.FC<{
  links: NavigationLink[];
  routeSlugs: string[];
  lastDeepNum: number;
  deepSlugs: string[];
  canBeSelected: boolean;
  onRouting?: (url: string) => any;
}> = ({
  lastDeepNum,
  links,
  routeSlugs,
  deepSlugs,
  canBeSelected,
  onRouting,
}) => {
  const { visit } = useRouting();
  const currDeepNum = lastDeepNum + 1;

  return (
    <div className="flex flex-col gap-2 w-full">
      {mapArray(links, ({ icon, name, onClick, slug, subLinks }, i) => {
        const selected = routeSlugs[lastDeepNum] === slug && canBeSelected;

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
                          ? "bg-primary rounded text-white fill-white"
                          : "text-primary"
                      }`
                    : "text-black"
                } flex text-lg items-center py-2 gap-2`}
              >
                {runIfFn(icon)} {name}
              </div>
            </AccordionButton>
            <AccordionPanel initialState={selected === true ? true : undefined}>
              <NestedSubmenuNavigationLinks
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
