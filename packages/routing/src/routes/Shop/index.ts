import { RoutesType } from "..";

export type ShopRoutesType = {
  shop: () => RoutesType;
  visitShop: (props: Record<string, any>) => RoutesType;
  visitShopOnMap: (userId: string) => RoutesType;
};

export const ShopRoutes: RoutesType = {
  shop() {
    this.addPath("shop");
    return this;
  },
  visitShop(props) {
    const shopId = props["id"];
    if (typeof shopId !== "string") return this;
    this.shop().id(shopId);
    return this;
  },
  visitShopOnMap(userId) {
    const shopId = userId;
    if (typeof shopId !== "string") return this;
    this.shop().id(shopId);
    return this;
  },
} as RoutesType;
