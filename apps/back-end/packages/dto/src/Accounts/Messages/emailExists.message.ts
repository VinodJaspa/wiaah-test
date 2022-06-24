export class EmailExistsMessage {
  constructor(
    public emailExistsMsgInput: {
      email: string;
    }
  ) {}

  toString() {
    return JSON.stringify(this.emailExistsMsgInput);
  }
}

export class EmailExistsMessageReply {
  constructor(
    public emailExistsMsgReply: {
      emailExists: boolean;
    }
  ) {}

  toString() {
    return JSON.stringify(this.emailExistsMsgReply);
  }
}
