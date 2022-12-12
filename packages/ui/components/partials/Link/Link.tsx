import React from "react";
import { useRouting } from "routing";
import { mapArray, PassPropsToChild } from "utils";

export type LinkProps<TRoutes> = {
  href: string | ((routes: TRoutes) => string);
  children: React.ReactNode;
};

export function Link<TRoutes>({ children, href }: LinkProps<TRoutes>) {
  const { visit, routes } = useRouting();
  // @ts-ignore
  const url = typeof href === "string" ? href : href(routes);
  return (
    <>
      {mapArray(React.Children.toArray(children), (child, i) =>
        PassPropsToChild(child, {
          key: i,
          onClick: () => visit((r) => r.addPath(url)),
        })
      )}
    </>
  );
}
