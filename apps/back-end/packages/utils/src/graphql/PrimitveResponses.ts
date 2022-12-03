import { CreateGqlResponse } from "./ExtendableSchemas";

export class GqlBooleanResposnse extends CreateGqlResponse(Boolean) {}
export class GqlNumberResposnse extends CreateGqlResponse(Number) {}
export class GqlStringResposnse extends CreateGqlResponse(String) {}
