export const getParamFromAsPath = (path: string, param: string) => {
  const rightParams = path.split(`${param}=`)[1];

  const paramValue = rightParams ? rightParams.split("&")[0] : undefined;
  return paramValue;
};
