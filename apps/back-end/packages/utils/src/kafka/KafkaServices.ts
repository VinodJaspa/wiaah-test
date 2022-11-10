interface ServiceInfo {
  token: string;
  groupId: string;
  clientId: string;
  pubsubTopic?: string;
}

export type Services =
  | "ACCOUNTS_SERVICE"
  | "AUTH_SERVICE"
  | "MAILING_SERVICE"
  | "SHOP_SERVICE"
  | "WISHLIST_SERVICE"
  | "PRODUCTS_SERVICE"
  | "SHOPPING_CART_SERVICE"
  | "SERVICES_SERIVCE"
  | "CURRENCY_SERVICE"
  | "SHIPPING_SERVICE"
  | "ORDERS_SERVICE"
  | "VOUCHERS_SERVICE"
  | "BILLING_SERVICE"
  | "PARTNERS_SERVICE"
  | "REVIEWS_SERVICE"
  | "SOCIAL_SERVICE"
  | "SEARCH_SERVICE"
  | "CHAT"
  | "SUBSCRIPTIONS"
  | "NOTIFICATIONS";

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
  SHIPPING_SERVICE: {
    token: "SHIPPING_SERVICE",
    clientId: "shipping",
    groupId: "shipping-consumer",
  },
  ORDERS_SERVICE: {
    token: "ORDERS_SERVICE",
    clientId: "orders",
    groupId: "orders",
  },
  VOUCHERS_SERVICE: {
    clientId: "vouchers",
    token: "VOUCHERS_SERVICE",
    groupId: "vouchers",
  },
  BILLING_SERVICE: {
    clientId: "billing",
    token: "BILLING_SERVICE",
    groupId: "billing",
  },
  PARTNERS_SERVICE: {
    clientId: "partners",
    groupId: "partners",
    token: "PARTNERS_SERVICE",
  },
  REVIEWS_SERVICE: {
    token: "REVIEWS_SERVICE",
    clientId: "reviews",
    groupId: "reviews",
  },
  SOCIAL_SERVICE: {
    token: "SOCIAL_SERVICE",
    clientId: "social",
    groupId: "social",
  },
  SEARCH_SERVICE: {
    clientId: "search",
    groupId: "search",
    token: "SEARCH_SERVICE",
  },
  CHAT: {
    clientId: "chat-client",
    groupId: "chat-consumer",
    token: "CHAT_SERVICE",
    pubsubTopic: "CHAT_SUBSCRIPTIONS_TOPIC",
  },
  SUBSCRIPTIONS: {
    clientId: "subscriptions-client",
    groupId: "consumer-group",
    token: "SUBSCRIPTIONS_SERVICE",
  },
  NOTIFICATIONS: {
    clientId: "notofications-client",
    groupId: "notifications-group",
    token: "notifications-service",
  },
};
