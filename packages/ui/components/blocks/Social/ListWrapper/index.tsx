import { Flex } from "@chakra-ui/react";
import React from "react";
import { SocialShopCard } from "ui";

export interface ListWrapperProps {
  children?: React.ReactElement[];
  cols?: number;
}

export const ListWrapper: React.FC<ListWrapperProps> = ({
  cols = 1,
  children,
}) => {
  function sort<T>(items: T[], cols: number): { item: T; postion: number }[] {
    let postion = 0;
    const newItems: { item: T; postion: number }[] = [];

    items.map((item) => {
      if (postion >= cols) postion = 0;
      newItems.push({ item, postion });
      postion++;
    });

    return newItems;
  }
  return (
    <Flex justify={"space-between"} gap="1rem">
      {[...Array(cols)].map((_, index) => (
        <Flex
          data-testid="ListWrapperListContainer"
          w="100%"
          gap="1rem"
          direction={"column"}
          key={index}
        >
          {sort(children || [], cols).map(
            ({ item, postion }, i) =>
              postion == index && (
                <Flex
                  data-testid="ListWrapperItem"
                  direction={"column"}
                  key={i}
                >
                  {item}
                </Flex>
              )
          )}
        </Flex>
      ))}
    </Flex>
  );
};
