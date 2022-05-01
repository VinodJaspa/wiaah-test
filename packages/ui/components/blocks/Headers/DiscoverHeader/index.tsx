import {
  Box,
  InputGroup,
  InputLeftElement,
  IconButton,
  Icon,
  Input,
  Flex,
  Button,
  BoxProps,
} from "@chakra-ui/react";
import React from "react";
import { useTranslation } from "react-i18next";
import { HiSearch } from "react-icons/hi";
import { UserProfile } from "ui";
import { usersProfilesPlaceHolder } from "ui";
import { TabsViewer } from "ui";
import { useDiscoverTabs } from "ui/Hooks";

export interface DiscoverHeaderProps {
  containerProps?: BoxProps;
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

  // const {
  //   data: Profiles,
  //   isLoading,
  //   isError,
  // } = useQuery("DiscoverPageItems", () => usersProfilesPlaceHolder);

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
    <Flex
      {...containerProps}
      direction={"column"}
      gap="0.5rem"
      w="100%"
      position={"relative"}
    >
      <InputGroup>
        <InputLeftElement>
          <IconButton
            roundedLeft={"2xl"}
            colorScheme="gray"
            variant={"ghost"}
            aria-label="discover filter search"
            color="black"
            icon={<Icon as={HiSearch} />}
          />
        </InputLeftElement>
        <Input
          onFocus={() => setSearchFocus(true)}
          onBlur={() => setSearchFocus(false)}
          bg="gray.100"
          rounded={"2xl"}
          value={searchFilter}
          placeholder={`${t("search", "search")}`}
          onChange={(e) => handleSearchFilter(e.target.value)}
        />
      </InputGroup>
      {searchFocus && (
        <Flex
          w="100%"
          p="0.5rem"
          rounded={"lg"}
          shadow="md"
          position={"absolute"}
          top="100%"
          maxH={"70vh"}
          bg="white"
          overflowY="scroll"
          className="thinScroll"
          direction={"column"}
          gap="0.5rem"
        >
          {searchItems.map((user, i) => (
            <Button
              py="2rem"
              justifyContent={"start"}
              bgColor={"white"}
              px="2rem"
              colorScheme={"gray"}
            >
              <UserProfile
                style={{ color: "black" }}
                variant="long"
                user={user}
                key={i}
              />
            </Button>
          ))}
        </Flex>
      )}
      <TabsViewer
        tabsProps={{
          index: currentTab,
          onChange: (index) => changeDiscoverTab(discoverTabs[index].link),
        }}
        showPanels={false}
        tabs={discoverTabs}
      />
    </Flex>
  );
};
