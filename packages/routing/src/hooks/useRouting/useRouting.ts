import { MainRoutes, RoutesType } from "../../routes";
import React from "react";
import { routingContext } from "../../Providers";

export const useRouting = () => {
  const {
    visit: VisitRoute,
    getCurrentPath: getPath,
    getParam: GetParam,
  } = React.useContext(routingContext);

  function visit(fn: (routes: RoutesType) => RoutesType) {
    const routes = fn({ ...MainRoutes });
    const route =
      routes.route.length > 1 ? routes.route : getCurrentPath().split("?")[0];
    const query = routes.query;
    const queries = Object.entries(query);
    const combinedQueries = queries.reduce((acc, curr, idx) => {
      return `${acc}${idx >= queries.length - 1 ? "" : idx === 0 ? "" : "&"}${
        curr[0]
      }=${curr[1]}`;
    }, "");

    VisitRoute(
      `${route}${combinedQueries.length > 0 ? "?" : ""}${combinedQueries}`
    );
  }

  function getParam(queryName: string): string | null {
    return GetParam(queryName);
  }

  function getCurrentPath(): string {
    return getPath();
  }

  return {
    visit,
    getCurrentPath,
    getParam,
  };
};
