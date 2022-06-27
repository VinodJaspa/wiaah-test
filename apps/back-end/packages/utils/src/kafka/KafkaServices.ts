interface ServiceInfo {
  token: string;
  groupId: string;
  clientId: string;
}

type Services =
  | "ACCOUNTS_SERVICE"
  | "AUTH_SERVICE"
  | "MAILING_SERVICE"
  | "SHOP_SERVICE"
  | "WISHLIST_SERVICE"
  | "PRODUCTS_SERVICE"
  | "SHOPPING_CART_SERVICE"
  | "SERVICES_SERIVCE"
  | "CURRENCY_SERVICE";

export const SERVICES: Record<Services, ServiceInfo> = {
  ACCOUNTS_SERVICE: {
    token: "ACCOUNTS_SERVICE",
    clientId: "Accounts",
    groupId: "Accounts-consumer",
  },
  AUTH_SERVICE: {
    token: "AUTH_SERVICE",
    clientId: "Auth",
    groupId: "Auth-consumer",
  },
  MAILING_SERVICE: {
    token: "MAILING_SERVICE",
    clientId: "mailing",
    groupId: "mailing-consumer",
  },
  SHOP_SERVICE: {
    token: "SHOP_SERVICE",
    clientId: "shop",
    groupId: "shop-consumer",
  },
  WISHLIST_SERVICE: {
    token: "WISHLIST_SERVICE",
    clientId: "wishlist",
    groupId: "wishlist-consumer",
  },
  PRODUCTS_SERVICE: {
    token: "PRODUCTS_SERVICE",
    clientId: "products",
    groupId: "products-consumer",
  },
  SHOPPING_CART_SERVICE: {
    token: "SHOPPING-CART_SERVICE",
    groupId: "shopping-cart-consumer",
    clientId: "shopping-cart",
  },
  SERVICES_SERIVCE: {
    token: "SERVICES_SERVICE",
    clientId: "services",
    groupId: "services-consumer",
  },
  CURRENCY_SERVICE: {
    token: "CURRENCY_SERVICE",
    clientId: "currency",
    groupId: "currency-consumer",
  },
};
