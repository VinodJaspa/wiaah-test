export class InValidDataSchemaError extends Error {
  constructor() {
    super("Recieved Invalid data schema, please try again later");
  }
}
