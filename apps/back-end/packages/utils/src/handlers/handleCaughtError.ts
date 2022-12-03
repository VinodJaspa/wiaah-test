export const formatCaughtError = (
  error: any,
  fallbackErrMsg: string = "something went worng"
): string => {
  if (typeof error === "string") return error;
  if ("status" in error) {
    return typeof error.response === "string"
      ? error.response
      : error.response.message;
  }
  return fallbackErrMsg;
};
