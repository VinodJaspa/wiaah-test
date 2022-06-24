export class GetUserShopDataEvent {
  constructor(public readonly ownerId: string) {}

  toString() {
    return JSON.stringify({
      id: this.ownerId,
    });
  }
}
