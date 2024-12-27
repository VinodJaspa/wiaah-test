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
import { useRouter } from "next/router";
import { shopRouting } from "uris";
import { ShopProfile } from "components/Shop";
import { CollaboratorCategory, CollaboratorShop } from "types";
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
    setShops((state) =>
      category ? category.shops : collaborationShopsPlaceholder,
    );
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

const collaborationShopsPlaceholder = [
  {
    id: "1",
    thumbnailUrl: "/shop.jpeg",
    name: "Shop One",
    location: "New York, USA",
  },
  {
    id: "2",
    thumbnailUrl: "/shop.jpeg",
    name: "Shop Two",
    location: "Los Angeles, USA",
  },
  {
    id: "3",
    thumbnailUrl: "/shop.jpeg",
    name: "Shop Three",
    location: "London, UK",
  },
  {
    id: "4",
    thumbnailUrl: "/shop.jpeg",
    name: "Shop Four",
    location: "Tokyo, Japan",
  },
  {
    id: "5",
    thumbnailUrl: "/shop.jpeg",
    name: "Shop Five",
    location: "Berlin, Germany",
  },
];
