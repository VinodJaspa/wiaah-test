import { useSocialControls } from "@blocks";
import { useGeneralSearch } from "@features/Search/_services/useGeneralSearch";
import {
  ArrowLeftAlt1Icon,
  ArrowLeftIcon,
  CloseIcon,
  Drawer,
  DrawerContent,
  HStack,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  SearchIcon,
} from "@partials";
import React from "react";
import { useTranslation } from "react-i18next";
import { mapArray, useForm } from "utils";

export const SearchDrawer: React.FC = () => {
  const { value, hideGeneralSearch } = useSocialControls("showGeneralSearch");
  const { t } = useTranslation();
  const isOpen = value === true;

  const { form, inputProps, reset } = useForm<
    Parameters<typeof useGeneralSearch>[0]
  >({
    searchQ: "",
  });

  //TODO: pagination
  const { data, isLoading } = useGeneralSearch(form);

  const handleSearch = (id: string) => {};

  return (
    <Drawer full position="bottom" isOpen={isOpen} onClose={hideGeneralSearch}>
      <DrawerContent>
        <div className="w-full flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <button onClick={hideGeneralSearch}>
              <ArrowLeftIcon />
            </button>
            <InputGroup>
              <InputLeftElement>
                <SearchIcon />
              </InputLeftElement>
              <Input {...inputProps("searchQ")} />
              <InputRightElement>
                <button onClick={reset}>
                  <CloseIcon />
                </button>
              </InputRightElement>
            </InputGroup>
            <button className="text-primary">{t("Research")}</button>
          </div>

          {mapArray(data, (search) => (
            <HStack className="justify-between">
              <p>{search.title}</p>
              <HStack>
                {search.thumbnail ? (
                  <Image
                    className="w-7 h-7 rounded-full object-cover"
                    src={search.thumbnail}
                  />
                ) : null}

                <button
                  // TODO: get search item type and id and do the navigation
                  onClick={() => handleSearch("")}
                  className="flex w-7 h-7 justify-center items-center rounded-full bg-lightGray"
                >
                  <ArrowLeftAlt1Icon className="-rotate-45 text-primary" />
                </button>
              </HStack>
            </HStack>
          ))}
        </div>
      </DrawerContent>
    </Drawer>
  );
};
