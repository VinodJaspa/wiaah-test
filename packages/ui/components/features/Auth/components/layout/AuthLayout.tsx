import { useRouting } from "@UI/../routing";
import { useGetMyAccountQuery } from "@features/Accounts";
import React from "react";

const loginPath = "/auth/login";

export const AuthLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { push, getCurrentPath, getQuery, getParam } = useRouting();
  const path = getCurrentPath();
  // const { data, isLoading, isError } = useGetMyAccountQuery();

  // // TODO
  //   React.useEffect(() => {
  //     console.log({ data });
  //     if (!isError && typeof data?.id === "string") {
  //       const redirect = getQuery();
  //       const redirectParam = getParam("redirect");
  //       console.log({ redirect, redirectParam });
  //     } else {
  //       console.log("pushing", { data, isError, path, loginPath });
  //       if (path !== loginPath) {
  //         push(`/auth/login?redirect=${path}`);
  //       }
  //     }
  //   }, [data]);

  return <>{children}</>;
};
