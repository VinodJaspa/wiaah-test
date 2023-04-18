export enum PublicErrorCodes {
  unAuthorized = 0,
  test = 5,
}

export enum PrivateErrorCodes {}

export const UnkownErrorCode = -1;

export class KnownError extends Error {
  public code: PublicErrorCodes | PrivateErrorCodes;
  constructor(
    message: string,
    errorCode: PublicErrorCodes | PrivateErrorCodes
  ) {
    super(message);
    this.code = errorCode;
  }
}

export class UnknownError extends Error {
  public code: number;
  constructor() {
    super("Unknown Server Error");
    this.code = UnkownErrorCode;
  }
}
