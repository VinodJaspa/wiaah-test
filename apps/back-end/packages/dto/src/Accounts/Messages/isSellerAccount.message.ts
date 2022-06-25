export class IsSellerAccountMessage {
  constructor(
    public IsSellerAccountMsgInput: {
      accountId: string;
    }
  ) {}

  toString() {
    return JSON.stringify(this.IsSellerAccountMsgInput);
  }
}
export class IsSellerAccountMessageReply {
  constructor(
    public IsSellerAccountReplyMsg: {
      isSellerAccount: boolean;
    }
  ) {}

  toString() {
    return JSON.stringify(this.IsSellerAccountReplyMsg);
  }
}
