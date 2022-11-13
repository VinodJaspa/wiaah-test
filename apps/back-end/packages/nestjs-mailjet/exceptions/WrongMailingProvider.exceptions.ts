export class WrongMailingProviderError extends Error {
  constructor() {
    super("the provided mailing provider is wrong or not supported");
  }
}
