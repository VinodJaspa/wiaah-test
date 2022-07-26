export const ExtractParamFromQuery = (
  query: NodeJS.Dict<string | string[]>,
  param: string
): string | null => {
  const extractedParam = query[param];

  return typeof extractedParam !== "undefined"
    ? Array.isArray(extractedParam)
      ? extractedParam[0]
      : typeof extractedParam === "string"
      ? extractedParam
      : null
    : null;
};
