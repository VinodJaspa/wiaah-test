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
  | "WISHLIST_SERVICE";

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
};
