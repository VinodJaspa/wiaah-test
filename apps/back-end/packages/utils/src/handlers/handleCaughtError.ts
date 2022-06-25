export const formatCaughtError = (error: any): string =>
  typeof error === "string" ? error : error.message;
