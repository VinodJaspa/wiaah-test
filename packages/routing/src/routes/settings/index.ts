import { RoutesType } from "..";

export type SettingsRoutesType = {
  management: () => RoutesType;
  visitAccountSettings: () => RoutesType;
  visitShopManagement: () => RoutesType;
  visitShoppingManagement: () => RoutesType;
  visitServiceManagement: () => RoutesType;
  vistMyProfile: () => RoutesType;
};

export const SettingsRoutes: RoutesType = {
  management() {
    return this.addPath("management");
  },
  visitAccountSettings() {
    return this.management().addPath("account-settings");
  },
  visitShopManagement() {
    return this.management().addPath("shop-management");
  },
  visitShoppingManagement() {
    return this.management().addPath("shopping-management");
  },
  visitServiceManagement() {
    return this.management().addPath("service-management");
  },
  visitMyProfile() {
    return this.addPath("myProfile");
  },
} as RoutesType;
