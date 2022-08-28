import { RoutesType } from "..";

export type UserRelatedRoutesType = {
  cartSummary: () => RoutesType;
  visitCarySummary: () => RoutesType;
  visitCartSummary: () => RoutesType;
};

export const UserRelatedRoutes: RoutesType = {
  cartSummary() {
    this.addPath("cart-summary");
    return this;
  },
  visitCarySummary() {
    return this.cartSummary();
  },
  visitCartSummary() {
    return this.cartSummary();
  },
} as RoutesType;
