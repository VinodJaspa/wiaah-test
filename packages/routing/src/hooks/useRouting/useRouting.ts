import { MainRoutes, RoutesType } from "../../routes";
import React from "react";
import { routingContext } from "../../Providers";

export const useRouting = () => {
  const { visit: VisitRoute } = React.useContext(routingContext);

  function visit(fn: (routes: RoutesType) => RoutesType) {
    const routes = fn({ ...MainRoutes });
    const route = routes.route;
    const query = routes.query;
    const queries = Object.entries(query);
    const combinedQueries = queries.reduce((acc, curr, idx) => {
      return `${acc}${idx >= queries.length - 1 ? "" : idx === 0 ? "" : "&"}${
        curr[0]
      }=${curr[1]}`;
    }, "");
    if (route.length < 1) return;
    VisitRoute(`${route}?${combinedQueries}`);
  }

  return {
    visit,
  };
};
