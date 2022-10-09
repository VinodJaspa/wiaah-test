export class IsSellerAccountEvent {
  constructor(public readonly id) {}

  toString() {
    return JSON.stringify({
      id: this.id,
    });
  }
}
