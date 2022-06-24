export class IsOwnerOfShopMessage {
  constructor(public ownerId: string, public shopId: string) {}

  toString() {
    return JSON.stringify({
      ownerId: this.ownerId,
      shopId: this.shopId,
    });
  }
}

export class IsOwnerOfShopMessageReply {
  constructor(public isOwner: boolean) {}

  toString() {
    return JSON.stringify({
      isOwner: this.isOwner,
    });
  }
}
