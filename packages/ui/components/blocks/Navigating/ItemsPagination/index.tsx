import { HStack, IconButton, Select, Text } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import React from "react";
import { useTranslation } from "react-i18next";

export interface ItemsPaginationProps {
  currentPage: number;
  maxItemsNum?: number;
  onNextClick?: (currentPage: number) => any;
  onPrevClick?: (currentPage: number) => any;
  onItemsPerPageChange?: (itemsPerPage: number) => any;
}

export const ItemsPagination: React.FC<ItemsPaginationProps> = ({
  currentPage,
  maxItemsNum = 0,
  onItemsPerPageChange,
  onNextClick,
  onPrevClick,
}) => {
  const { t } = useTranslation();
  const [itemsPerPage, setItemsPerPage] = React.useState<number>(5);
  function handleItemsPerPageChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setItemsPerPage(parseInt(e.target.value));
  }
  React.useEffect(() => {
    onItemsPerPageChange && onItemsPerPageChange(itemsPerPage);
  }, [itemsPerPage]);
  return (
    <HStack
      fontSize={{ base: "md", md: "lg", lg: "xl" }}
      w="100%"
      color={"gray"}
      justify={"end"}
    >
      <Text>{t("items_per_page", "Items Per Page")}</Text>
      <Select
        onChange={handleItemsPerPageChange}
        variant={"outline"}
        value={itemsPerPage}
        w="fit-content"
      >
        {[...Array(10)].map((_, i) => (
          <option value={i + 1}>{i + 1}</option>
        ))}
      </Select>
      <Text>
        {currentPage} {t("of", "of")}{" "}
        {maxItemsNum > 0 ? Math.ceil(maxItemsNum / itemsPerPage) : "Unkown"}
      </Text>
      <HStack>
        <IconButton
          aria-label={t("view_next_page", "View Next Page")}
          as={ChevronLeftIcon}
          colorScheme="gray"
          fontSize={"x-large"}
          bgColor="white"
          color="gray"
          onClick={() => {
            onPrevClick && onPrevClick(currentPage);
          }}
        />
        <IconButton
          aria-label={t("view_next_page", "View Next Page")}
          as={ChevronRightIcon}
          fontSize={"x-large"}
          colorScheme="gray"
          bgColor="white"
          color="gray"
          onClick={onNextClick && onNextClick(currentPage)}
        />
      </HStack>
    </HStack>
  );
};
