import { AccountType } from "../types";

function makeKafkaDynamicEvent(event: string, regex: boolean = false) {
  return `${regex ? "/" : ""}${event}${regex ? "/" : ""}`;
}
export const KAFKA_EVENTS = {
  ACCOUNTS_EVENTS: {
    createAccount: "create.account",
    accountCreated: (type: string, regex?: boolean) =>
      makeKafkaDynamicEvent(`account.created.${type}`, regex),
    accountDeleted: "account.deleted",
    sellerAccountCreated: "seller.account.created",
    buyerAccountCreated: "buyer.account.created",
    accountTermsAndConditionViolation: (key?: string, regex?: boolean) =>
      makeKafkaDynamicEvent(
        `account.terms.and.condition.violation.${key}`,
        regex
      ),
    accountRestricted: (key?: string, regex?: boolean) =>
      makeKafkaDynamicEvent(`account.restricted.${key}`, regex),
    deleteAccount: "delete.account",
  },
  USER_EVENTS: {
    userConnected: "user.connected",
    userDisconnected: "user.disconnected",
    updateUserActiveTime: "user.active.time.update",
    userCurrLocationChanged: (key?: string, regex?: boolean) =>
      makeKafkaDynamicEvent(`user.current.location.changed.${key}`, regex),
  },
  MODERATION: {
    contentSuspenseRequest: (type: string, regex?: boolean) =>
      makeKafkaDynamicEvent(`content.suspense.request.${type}`, regex),
    contentSuspensed: (type: string, regex?: boolean) =>
      makeKafkaDynamicEvent(`content.suspensed.${type}`, regex),
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
  SOCIAL_EVENTS: {
    userMention: (type: string, regex?: boolean) =>
      makeKafkaDynamicEvent(`user.mention.${type}`, regex),
    postSaved: (type: string, regex?: boolean) =>
      makeKafkaDynamicEvent(`post.saved.${type}`, regex),
    userTag: (type: string, regex?: boolean) =>
      makeKafkaDynamicEvent(`user.tag.${type}`, regex),
    contentCreated: (type: string, regex?: boolean) =>
      makeKafkaDynamicEvent(type, regex),
  },
  AUTH_EVENTS: {
    accountRegistered: "account.registered",
    sellerAccountRegistered: "account.seller.registered",
    buyerAccountRegistered: "account.buyer.registered",
    accountVerified: "account.verified",
    passwordChangeRequest: "password.change.request",
    passwordChanged: "password.changed",
    newRegisterationTokenRequest: "registeration.token.request",
    sendLoginOTP: (type: string, regex?: boolean) =>
      makeKafkaDynamicEvent(`send.login.otp.${type}`, regex),
  },
  BILLING_EVNETS: {
    balanceCreated: "balance.created",
    transactionCreated: "transaction.created",
    billingPriceCreated: (key?: string, regex?: boolean) =>
      makeKafkaDynamicEvent(`billing.price.created.${key}`, regex),
    billingSubscriptionPaid: (type: string, regex?: boolean) =>
      makeKafkaDynamicEvent(`billing.subscription.paid.${type}`, regex),
    createMonthlyBillingPrice: "billing.price.monthly.create",
    stripeAccountCreated: "stripe.account.created",
    stripeMembershipPricingCreated: "stripe.membership.pricing.created",
    sellerProductsPurchased: (productType: string, regex?: boolean) =>
      makeKafkaDynamicEvent(`seller.products.purchased.${productType}`, regex),
    sellerServicePurchased: (regex?: boolean) =>
      makeKafkaDynamicEvent(`seller.service.purchased`, regex),
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
    profileVisited: (type: string, regex?: boolean) =>
      makeKafkaDynamicEvent(`profile.visited.${type}`, regex),
  },
  NEWSFEED_POST_EVENTS: {
    postCreated: "newsfeed.post.created",
  },
  COMMENTS_EVENTS: {
    commentCreated: (contentType: string, regex?: boolean) =>
      makeKafkaDynamicEvent(`comment.created.${contentType}`, regex),
    commentMentions: "comment.mentions",
    commentUpdated: "comment.update",
    commentDeleted: (contentType: string, regex?: boolean) =>
      makeKafkaDynamicEvent(`comment.deleted.${contentType}`, regex),
  },
  REACTION_EVENTS: {
    contentReacted: (contentType: string, regex?: boolean) =>
      makeKafkaDynamicEvent(`content.reacted.${contentType}`, regex),
    contentUnReacted: (contentType: string, regex?: boolean) =>
      makeKafkaDynamicEvent(`content.unreacted.${contentType}`, regex),
  },
  SHARES_EVENTS: {
    contentShared: (contentType: string, regex?: boolean) =>
      makeKafkaDynamicEvent(`content.shared.${contentType}`, regex),
  },
  SHIPPING_EVENTS: {
    orderShippingStarted: (key?: string, regex?: boolean) =>
      makeKafkaDynamicEvent(`order.shipping.started.${key}`, regex),
  },
  STORIES: {
    storyCreated: "story.created",
  },
  CHAT: {
    messageSent: "chat.message.sent",
    privateMessageSent: "chat.private.message.sent",
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
    chatMessageSent: (roomId: string, regex?: boolean) =>
      makeKafkaDynamicEvent(`chat.message.sent.${roomId}`, regex),
    roomDataUpdated: (userId: string, regex?: boolean) =>
      makeKafkaDynamicEvent(`room.data.updated.${userId}`, regex),
  },
  MEMBERSHIP: {
    memberShipCreated: "membership.created",
    memberShipModified: "membership.modified",
    memberShipDeleted: "membership.deleted",
    memberShipRenewalFailWarning: (key?: string, regex?: boolean) =>
      makeKafkaDynamicEvent(`membership.renewal.fail.${key}`, regex),
  },
  SELLER: {
    revenueIncreased: "revenue.increased",
  },
  PROMOTION_EVENTS: {
    promotionCreated: (key?: string, regex?: boolean) =>
      makeKafkaDynamicEvent(`promotion.created.${key}`, regex),
    lookForNearShopsPromotions: (key?: string, regex?: boolean) =>
      makeKafkaDynamicEvent(`promotions.shops.near.user.${key}`, regex),
    nearUserShopsPromotionsResloved: (key?: string, regex?: boolean) =>
      makeKafkaDynamicEvent(
        `near.user.shops.promotions.resloved.${key}`,
        regex
      ),
  },
  AFFILIATION: {
    affiliatedProductPurchased: "affiliated.product.purchased",
    affiliationEntryCreated: "affiliation.entry.created",
  },
  SERVICES: {
    serviceBooked: (serviceType: string, regex?: boolean) =>
      makeKafkaDynamicEvent(`service.booked.${serviceType}`, regex),
    servicePurchased: (serviceType: string, regex?: boolean) =>
      makeKafkaDynamicEvent(`service.purchased.${serviceType}`, regex),
  },
  REVIEWS_EVENTS: {
    reviewCreated: (type: string, regex?: boolean) =>
      makeKafkaDynamicEvent(`review.created.${type}`, regex),
  },
  ORDERS_EVENTS: {
    orderCreated: (key: string = "", regex?: boolean) =>
      makeKafkaDynamicEvent(`order.created.${key}`, regex),
  },
  CASHBACK_EVENTS: {
    cashbackAdded: (key?: string, regex?: boolean) =>
      makeKafkaDynamicEvent(`cashback.added.${key || ""}`, regex),
  },
  EVENT_SCHEDULING: {
    createEvent: `create.scheduled.event`,
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
    getAccountByName: (key?: string, regex?: boolean) =>
      makeKafkaDynamicEvent(`get.account.by.email.${key}`, regex),
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
  SHIPPING_MESSAGES: {
    getShippingAddress: (key: string = "", regex?: boolean) =>
      makeKafkaDynamicEvent(`get.shipping.address.${key}`, regex),
    getShippingMethod: (key: string = "", regex?: boolean) =>
      makeKafkaDynamicEvent(`get.shipping.method.${key}`, regex),
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
  ANALYTICS_MESSAGES: {
    getUsersInteractionsByUserId: () => `get.users.interactions.by.user.id`,
    getUsersActivityScoresByIds: () => `get.users.activity.scores.by.ids`,
  },
  SOCIAL_MESSAGES: {
    getUserFollowsData: () => `get.user.followers.data`,
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
