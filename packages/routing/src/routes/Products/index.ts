import { RoutesType } from "..";

export type ProductsRoutesType = {
  product: () => RoutesType;
  visitProduct: (id: string) => RoutesType;
};

export const ProductsRoutes: RoutesType = {
  product() {
    this.addPath("product");
    return this;
  },
  visitProduct(id) {
    this.product().id(id);
    return this;
  },
} as RoutesType;
