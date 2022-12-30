import React from "react";
import { useRouting } from "routing";
import { mapArray, PassPropsToChild } from "utils";

export type LinkProps<TRoutes> = {
  href: string | ((routes: TRoutes) => string);
  children: React.ReactNode;
};

export function Link<TRoutes>({ children, href }: LinkProps<TRoutes>) {
  const { visit, routes } = useRouting();

  const url = typeof href === "string" ? href : href(routes as TRoutes);
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
