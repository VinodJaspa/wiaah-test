export enum PublicErrorCodes {
  unAuthorized = 0,
  premissionDenied = 1,
  editPremissionDenied = 2,
  createPremissionDenied = 3,
  readPremissionDenied = 4,
  deletePremissionDenied = 5,
  internalServiceError = 6,
  badMediaFormat = 7,
  resourceAlreadyExsits = 8,
  badRequestData = 9,
  resourceNotFound = 10,
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

export class NoEditPremissionPublicError extends KnownError {
  constructor(
    msg: string = "you don't have the premissions to edit this resource"
  ) {
    super(msg, PublicErrorCodes.editPremissionDenied);
  }
}

export class NoCreatePremissionPublicError extends KnownError {
  constructor(
    msg: string = "you don't have the premissions to create this resource"
  ) {
    super(msg, PublicErrorCodes.createPremissionDenied);
  }
}

export class NoReadPremissionPublicError extends KnownError {
  constructor(
    msg: string = "you don't have the premissions to see this resource"
  ) {
    super(msg, PublicErrorCodes.readPremissionDenied);
  }
}

export class NoDeletePremissionPublicError extends KnownError {
  constructor(
    msg: string = "you don't have the premissions to delete this resource"
  ) {
    super(msg, PublicErrorCodes.deletePremissionDenied);
  }
}

export class NotFoundPublicError extends KnownError {
  constructor(msg: string = "the requested resource was not found") {
    super(msg, PublicErrorCodes.deletePremissionDenied);
  }
}

export class InternalServerPublicError extends KnownError {
  constructor(
    msg: string = "encountered an error during processing your request, please try again later"
  ) {
    super(msg, PublicErrorCodes.internalServiceError);
  }
}

export class BadMediaFormatPublicError extends KnownError {
  constructor(msg: string = "Wrong media format") {
    super(msg, PublicErrorCodes.badMediaFormat);
  }
}

export class NotOwnerOfResourcePublicError extends KnownError {
  constructor(msg: string = "not owner of resource") {
    super(msg, PublicErrorCodes.unAuthorized);
  }
}

export class ResourceNotFoundPublicError extends KnownError {
  constructor(msg: string = "requested resource was not found") {
    super(msg, PublicErrorCodes.unAuthorized);
  }
}
