import React from "react";
import { useTranslation } from "react-i18next";
import { HiSearch } from "react-icons/hi";
import { HtmlDivProps } from "types";
import { UserProfile } from "ui";
import { usersProfilesPlaceHolder } from "ui";
import { TabsViewer, Input, InputGroup, InputLeftElement, Button } from "ui";
import { useDiscoverTabs } from "ui";

export interface DiscoverHeaderProps {
  containerProps?: HtmlDivProps;
}

export const DiscoverHeader: React.FC<DiscoverHeaderProps> = ({
  containerProps,
}) => {
  const { t } = useTranslation();

  const [searchFilter, setSearchFilter] = React.useState<string>("");
  const [searchFocus, setSearchFocus] = React.useState<boolean>(false);
  const [searchItems, setSearchItems] = React.useState<
    typeof usersProfilesPlaceHolder
  >([]);

  const { discoverTabs, changeDiscoverTab, currentTab } = useDiscoverTabs();
  function handleSearchFilter(filter: string) {
    setSearchFilter(filter);
  }

  const Profiles = usersProfilesPlaceHolder;
  React.useEffect(() => {
    if (Profiles) {
      setSearchItems(() =>
        usersProfilesPlaceHolder.filter((prof) =>
          prof.name.includes(searchFilter)
        )
      );
    }
  }, [searchFilter, Profiles]);

  return (
    <div className="flex flex-col gap-2 w-full relative" {...containerProps}>
      <InputGroup>
        <InputLeftElement>
          <Button
            className="text-black rounded-l-2xl"
            colorScheme="white"
            aria-label="discover filter search"
            color="black"
          >
            <HiSearch />
          </Button>
        </InputLeftElement>
        <Input
          onFocus={() => setSearchFocus(true)}
          onBlur={() => setSearchFocus(false)}
          className="rounded-2xl bg-gray-100"
          value={searchFilter}
          placeholder={`${t("search", "search")}`}
          onChange={(e) => handleSearchFilter(e.target.value)}
        />
      </InputGroup>
      {searchFocus && (
        <div className="flex w-full top-full flex-col gap-2 max-h-[70vh] bg-white overflow-y-scroll p-2 rounded-lg shadow-md absolute thinScroll">
          {searchItems.map((user, i) => (
            <Button className="p-8 bg-white justify-start" colorScheme={"gray"}>
              <UserProfile
                style={{ color: "black" }}
                variant="long"
                user={user}
                key={i}
              />
            </Button>
          ))}
        </div>
      )}
      <TabsViewer
        onTabChange={(idx) => {
          changeDiscoverTab(discoverTabs[idx].link);
        }}
        currentTabIdx={currentTab}
        showPanels={false}
        tabs={discoverTabs}
      />
    </div>
  );
};
