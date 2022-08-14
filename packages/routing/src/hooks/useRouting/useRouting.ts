import { MainRoutes, RoutesType } from "../../routes";
import React from "react";
import { routingContext } from "../../Providers";

export const useRouting = () => {
  const { visit: VisitRoute, getCurrentPath: getPath } =
    React.useContext(routingContext);

  function visit(fn: (routes: RoutesType) => RoutesType) {
    const routes = fn({ ...MainRoutes });
    const route =
      routes.route.length < 1 ? getCurrentPath().split("?")[0] : routes.route;
    const query = routes.query;
    const queries = Object.entries(query);
    const combinedQueries = queries.reduce((acc, curr, idx) => {
      return `${acc}${idx >= queries.length - 1 ? "" : idx === 0 ? "" : "&"}${
        curr[0]
      }=${curr[1]}`;
    }, "");

    VisitRoute(`${route}?${combinedQueries}`);
  }

  function getCurrentPath(): string {
    return getPath();
  }

  return {
    visit,
    getCurrentPath,
  };
};
