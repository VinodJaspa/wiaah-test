import React from "react";
import { mapArray, PassPropsToChild } from "utils";
import { useRouting } from "../../../../routing/src/hooks/useRouting/useRouting";

export type LinkProps<TRoutes> = {
  href: string | ((routes: TRoutes) => string);
  children: React.ReactNode;
};

export function Link<TRoutes>({ children, href }: LinkProps<TRoutes>) {
  const { visit, routes } = useRouting();

  const url =
    typeof href === "string" ? href : href(routes as unknown as TRoutes);
  return (
    <>
      {mapArray(React.Children.toArray(children), (child, i) =>
        PassPropsToChild(child, {
          key: i,
          onClick: () => visit((r) => r.addPath(url)),
        }),
      )}
    </>
  );
}
