export const KAFKA_EVENTS = {
  ACCOUNTS_EVENTS: {
    createAccount: "create.account",
    accountCreated: "account.created",
    accountDeleted: "account.deleted",
    sellerAccountCreated: "seller.account.created",
    buyerAccountCreated: "buyer.account.created",
  },
  USER_EVENTS: {
    userConnected: "user.connected",
    userDisconnected: "user.disconnected",
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
    productPurchased: "product.purchased",
  },
  AUTH_EVENTS: {
    accountRegistered: "account.registered",
    sellerAccountRegistered: "account.seller.registered",
    buyerAccountRegistered: "account.buyer.registered",
    accountVerified: "account.verified",
    passwordChangeRequest: "password.change.request",
    passwordChanged: "password.changed",
    newRegisterationTokenRequest: "registeration.token.request",
  },
  BILLING_EVNETS: {
    balanceCreated: "balance.created",
    transactionCreated: "transaction.created",
    billingPriceCreated: (key?: string) =>
      `billing.price.created${key ? `.${key}` : ""}`,
    billingSubscriptionPaid: (type: string) =>
      `billing.subscription.paid.${type}`,
    createMonthlyBillingPrice: "billing.price.monthly.create",
    stripeAccountCreated: "stripe.account.created",
    stripeMembershipPricingCreated: "stripe.membership.pricing.created",
    sellerProductsPurchased: (productType: string) =>
      `seller.products.purchased.${productType}`,
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
  CHAT: {
    messageSent: "chat.message.sent",
    userJoinedRoom: "user.joined.room",
    userLeftRoom: "user.left.room",
  },
  HASHTAG: {
    hashtagUsed: "hashtag.used",
    hashtagUnUsed: "hashtag.unused",
    hashtagCreated: "hashtag.created",
    hashtagDeleted: "hashtag.deleted",
  },
  SEARCH: {},
  SUBSCRIPTIONS: {
    chatMessageSent: (roomId: string) => `chat.message.sent.${roomId}`,
    roomDataUpdated: (userId: string) => `room.data.updated.${userId}`,
  },
  MEMBERSHIP: {
    memberShipCreated: "membership.created",
    memberShipModified: "membership.modified",
    memberShipDeleted: "membership.deleted",
  },
  SELLER: {
    revenueIncreased: "revenue.increased",
  },
  AFFILIATION: {
    affiliatedProductPurchased: "affiliated.product.purchased",
    affiliationEntryCreated: "affiliation.entry.created",
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
    getUserMembershipPriceId: "get.user.membership.price.id",
  },
  VOUCHERS_MESSAGES: {
    getShopActiveVouchers: "get.shop.active.vouchers",
    isApplyableVoucher: "is.applyable.voucher",
    getVoucherData: "get.voucher.data",
  },
  SELLER_MESSAGES: {
    getSellerMembership: "seller.get.membership",
    getItemSellerId: (itemType: string) => `get.item.sellerid.${itemType}`,
  },
  MEMBERSHIP_MESSAGES: {},
  CAN_PREFORM_ACTION_MESSAGES: {
    canPreformProductAction: (actionType: string) =>
      `can.preform.product.action.${actionType}`,
  },
  REVIEW_SERVICE: {
    getProductSellerId: "get.product.seller.id",
    getIsUserPurchasedProduct: (type: string) =>
      `get.is.user.purchased.product.${type}`,
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
