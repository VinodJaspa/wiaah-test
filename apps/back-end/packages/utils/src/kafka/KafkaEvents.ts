export const KAFKA_EVENTS = {
  ACCOUNTS_EVENT: {
    createAccount: "create.account",
    accountCreated: "account.created",
  },
  WISHLIST_EVENTS: {
    createWishersList: "create.wisherlist",
    createWishlist: "create.wishlist",
  },
  SHOPPING_CART_EVENTS: {
    createShoppingCart: "create.shopping.cart",
  },
  MAILING_EVENTS: {
    sendVerificationEmail: "send.verification.email",
  },
  PRODUCTS_EVENTS: {
    productCreated: "product.created",
  },
  createAccount: "create.account",
  createWishlist: "create.wishlist",
  createWishersList: "create.wisherlist",
  createShoppingCart: "create.shopping.cart",
};

export const KAFKA_MESSAGES = {
  ACCOUNTS_MESSAGES: {
    emailExists: "email.exists",
    getAccountByEmail: "get.account.by.email",
    isSellerAccount: "is.seller.account",
    getUserShopId: "get.user.store.id",
  },
  PRODUCTS_MESSAGES: {
    productReviewable: "is.product.reviewable",
    isProductAddable: "is.product.addable",
    getProductMetaData: "get.product.metadata",
  },
  SHOP_MESSAGES: {
    isOwnerOfShop: "is.owner.of.shop",
  },
  SERVICES_MESSAGES: {
    isServiceAddable: "is.service.addable",
    getServiceMetaData: "get.service.metadata",
  },
  CURRENCY_MESSAGES: {
    getCurrencyExchangeRate: "get.currency.exchange.rate",
  },
  emailExists: "email.exists",
  getAccountByEmail: "get.account.by.email",
  isSellerAccount: "is.seller.account",
  getUserShopId: "get.user.store.id",
  productReviewable: "is.product.reviewable",
  isOwnerOfShop: "is.owner.of.shop",
  isProductAddable: "is.product.addable",
  isServiceAddable: "is.service.addable",
};
