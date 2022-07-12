import { ServicesType } from "types";

export const ExtractServiceTypeFromQuery = (
  query: NodeJS.Dict<string | string[]>
): ServicesType =>
  Array.isArray(query.serviceType)
    ? (query.serviceType[0] as ServicesType)
    : typeof query.serviceType === "string"
    ? (query.serviceType as ServicesType)
    : ("" as ServicesType);
