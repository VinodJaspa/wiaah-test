import React, { useState } from "react";
import {
  Container,
  FlexStack,
  GridContainerPager,
  ItemsTable,
  Clickable,
  CollaboratorCard,
} from "ui";
import { useScreenWidth } from "hooks";
import { ShopProfile } from "../Shop/ShopProfile";
import {
  CollaboratorCategory,
  CollaboratorShop,
} from "../../../../../packages/types/src/market/Collaboration";
import { useRouter } from "next/router";
import { shopRouting } from "uris";
export interface CollaborationViewProps {
  shopId: string;
  categories: CollaboratorCategory[];
}

export const CollaborationView: React.FC<CollaborationViewProps> = ({
  shopId,
  categories,
}) => {
  const router = useRouter();
  const [shopType, setShopType] = useState<string>("");
  const [shops, setShops] = React.useState<CollaboratorShop[]>([]);
  const { min } = useScreenWidth({ minWidth: 500 });

  React.useEffect(() => {
    const category = categories.find((cate) => cate.name === shopType);
    setShops((state) => (category ? category.shops : state));
  }, [shopType, categories]);

  React.useEffect(() => {
    const type = router.query.category;
    const arry = Array.isArray(type);
    setShopType(arry ? type[0] : type);
  }, [router.query.category]);

  function handleNavToShop(shopId: string) {
    router.push(shopRouting.shopPage + "/" + shopId);
  }

  return (
    <FlexStack direction="vertical" fullWidth verticalSpacingInRem={2}>
      <ShopProfile shopId={shopId} />
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
            {shops.map((shop, i) => (
              <Clickable key={i} onClick={() => handleNavToShop(shop.id)}>
                <CollaboratorCard
                  imageUrl={shop.thumbnailUrl}
                  name={shop.name}
                  location={shop.location}
                />
              </Clickable>
            ))}
          </GridContainerPager>
        </FlexStack>
      </Container>
    </FlexStack>
  );
};
