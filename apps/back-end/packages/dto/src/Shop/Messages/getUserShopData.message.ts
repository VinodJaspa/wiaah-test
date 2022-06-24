export class GetUserShopIdMessage {
  constructor(public readonly ownerId: string) {}

  toString() {
    return JSON.stringify({
      ownerId: this.ownerId,
    });
  }
}
export class GetUserShopIdMessageReply {
  constructor(public readonly shopId: string) {}

  toString() {
    return JSON.stringify({
      shopId: this.shopId,
    });
  }
}
