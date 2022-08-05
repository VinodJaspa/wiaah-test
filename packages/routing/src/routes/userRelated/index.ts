import { RoutesType } from "..";

export type UserRelatedRoutesType = {
  cartSummary: () => RoutesType;
  visitCarySummary: () => RoutesType;
};

export const UserRelatedRoutes: RoutesType = {
  cartSummary() {
    this.addPath("cart-summary");
    return this;
  },
  visitCarySummary() {
    return this.cartSummary();
  },
} as RoutesType;
