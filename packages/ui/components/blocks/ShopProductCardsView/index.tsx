import { ShopProductCard, ShopProductCardProps } from "@blocks/ShopProductCard";
import { ListWrapper } from "@blocks/Wrappers";
import { useResponsive } from "@UI/../hooks";
import React from "react";

interface ShopProductCardsViewProps {
  products: ShopProductCardProps[];
}

export const ShopProductCardsView: React.FC<ShopProductCardsViewProps> = ({
  products,
}) => {
  const { isMobile } = useResponsive();
  return (
    <div className=" flex justify-center items-center mt-4 md:mt-0 ">
      <ListWrapper
        cols={isMobile ? 2 : 4}
        listProps={{
          className: "gap-2 md:gap-4 flex flex-col",
        }}
        props={{
          className:
            "flex justify-between w-fit md:w-full h-full gap-2 md:gap-4 my-6 md:mt-0 ",
        }}
      >
        {products.map((product, i) => (
          <ShopProductCard key={i} {...product} />
        ))}
      </ListWrapper>
    </div>
  );
};
