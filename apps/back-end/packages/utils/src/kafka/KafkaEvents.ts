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
  AUTH_EVENTS: {
    accountRegistered: "account.registered",
    accountVerified: "account.verified",
    passwordChangeRequest: "password.change.request",
    passwordChanged: "password.changed",
  },
  BILLING_EVNETS: {
    balanceCreated: "balance.created",
    transactionCreated: "transaction.created",
    stripeAccountCreated: "stripe.account.created",
  },
  VOUCHER_EVENTS: {
    voucherCreated: "voucher.created",
    voucherApplied: "voucher.applied",
  },
  PARTNERS_EVENTS: {
    partnerCreated: "partner.created",
    partnerRemoved: "partner.removed",
    partnerDeActivated: "partner.deactivated",
    partnerActivated: "partner.activated",
  },
  PROFILE_EVENTS: {
    profileCreated: "profile.created",
    profileFollowed: "profile.followed",
    profileUnFollowed: "profile.unFollowed",
    profileBlocked: "profile.blocked",
    profileUnBlocked: "profile.unBlocked",
  },
  NEWSFEED_POST_EVENTS: {
    postCreated: "newsfeed.post.created",
  },
  COMMENTS_EVENTS: {
    commentCreated: "comment.created",
    commentMentions: "comment.mentions",
    commentUpdated: "comment.update",
    commentDeleted: "comment.deleted",
  },
  REACTION_EVENTS: {
    contentReacted: "content.reacted",
  },
  SHARES_EVENTS: {
    contentShared: "content.shared",
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
    getAccountById: "get.account.by.id",
    hasStripeId: "user.has.stripe.id",
  },
  PRODUCTS_MESSAGES: {
    productReviewable: "is.product.reviewable",
    isProductAddable: "is.product.addable",
    getProductMetaData: "get.product.metadata",
    getProductsMetaData: "get.products.metadata",
    getProductsCheckoutData: "get.products.checkout.data",
  },
  SHOP_MESSAGES: {
    isOwnerOfShop: "is.owner.of.shop",
    getShopMetaData: "get.shop.metadata",
  },
  SERVICES_MESSAGES: {
    isServiceAddable: "is.service.addable",
    getServiceMetaData: "get.service.metadata",
    getServicesCheckoutData: "get.services.checkout.data",
    getServiceOpenTimeData: (serviceType: string) =>
      `get.service.open.tiem.data-${serviceType}`,
  },
  CURRENCY_MESSAGES: {
    getCurrencyExchangeRate: "get.currency.exchange.rate",
  },
  SHOPPING_CART_MESSAGES: {
    getShoppingCartItems: "get.shopping.cart.items",
  },
  BILLING_MESSAGES: {
    getUserCashbackBalance: "get.user.cashback.balance",
  },
  VOUCHERS_MESSAGES: {
    getShopActiveVouchers: "get.shop.active.vouchers",
    isApplyableVoucher: "is.applyable.voucher",
    getVoucherData: "get.voucher.data",
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
