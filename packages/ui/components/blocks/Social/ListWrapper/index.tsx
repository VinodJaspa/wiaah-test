import { Flex, FlexProps } from "@chakra-ui/react";
import React from "react";

export interface ListWrapperProps {
  children?: React.ReactElement[];
  cols?: number;
  gap?: boolean;
  style?: FlexProps;
}

export const ListWrapper: React.FC<ListWrapperProps> = ({
  cols = 1,
  children,
  gap = true,
  style,
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
    <Flex {...style} justify={"space-between"} gap={gap ? "1rem" : "0rem"}>
      {[...Array(cols)].map((_, index) => (
        <Flex
          data-testid="ListWrapperListContainer"
          w={`${100 / cols}%`}
          gap={gap ? "1rem" : "0rem"}
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
