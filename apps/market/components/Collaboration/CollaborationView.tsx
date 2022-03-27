import React, { useState } from "react";
import {
  BoldText,
  CollaboratorCard,
  Container,
  FlexStack,
  GridContainerPager,
  ItemsTable,
} from "ui";
import { useScreenWidth } from "ui/Hooks/useScreenWidth";
import { Shop, ShopProfile } from "../Shop/ShopProfile";
import {
  CollaboratorCategory,
  CollaboratorShop,
} from "types/market/Collaboration";
import { useRouter } from "next/router";
export interface CollaborationViewProps {
  shop: Shop;
  categories: CollaboratorCategory[];
}

export const CollaborationView: React.FC<CollaborationViewProps> = ({
  shop,
  categories,
}) => {
  const router = useRouter();
  const [shopType, setShopType] = useState<string>("");
  const [shops, setShops] = React.useState<CollaboratorShop[]>([]);
  const { min } = useScreenWidth({ minWidth: 500 });

  React.useEffect(() => {
    const category = categories.find((cate) => cate.name === shopType);
    setShops((state) => (category ? category.shops : state));
  }, [shopType]);

  React.useEffect(() => {
    const type = router.query.category;
    const arry = Array.isArray(type);
    setShopType(arry ? type[0] : type);
  }, [router.query.category]);
  return (
    <FlexStack direction="vertical" fullWidth verticalSpacingInRem={2}>
      <ShopProfile shop={shop} />
      <Container>
        <FlexStack
          direction={min ? "vertical" : "horizontal"}
          fullWidth
          horizontalSpacingInRem={2}
        >
          <ItemsTable
            title="Types of Shops"
            items={categories.map((cate) => ({ name: cate.name }))}
            onItemSelect={(item) =>
              router.push({
                pathname: router.asPath.split("?")[0],
                query: { category: item.name },
              })
            }
          />
          <GridContainerPager componentsLimit={5}>
            {shops.map((shop) => (
              <CollaboratorCard
                imageUrl={shop.thumbnailUrl}
                name={shop.name}
                location={shop.location}
              />
            ))}
          </GridContainerPager>
        </FlexStack>
      </Container>
    </FlexStack>
  );
};
