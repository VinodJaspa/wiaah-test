export class IsProductReviewableMessage {
  constructor(public productId: string, public reviewerId: string) {}

  toString() {
    return JSON.stringify({
      productId: this.productId,
      reviewerId: this.reviewerId,
    });
  }
}

export class IsProductReviewableMessageReply {
  constructor(public isReviewable: boolean) {}

  toString() {
    return JSON.stringify({
      isReviewable: this.isReviewable,
    });
  }
}
