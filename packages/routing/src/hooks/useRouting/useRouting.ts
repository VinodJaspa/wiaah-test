import { MainRoutes, RoutesType } from "../../routes";
import React from "react";
import { routingContext } from "../../Providers";

export const useRouting = () => {
  const {
    visit: VisitRoute,
    getCurrentPath: getPath,
    getParam: GetParam,
    getQuery: GetQuery,
    // removeParam: RemoveParam,
  } = React.useContext(routingContext);

  function visit(fn: (routes: RoutesType) => RoutesType) {
    const routes = fn({ ...MainRoutes });
    const route =
      routes.route.length > 1 ? routes.route : getCurrentPath().split("?")[0];
    const query = { ...getQuery(), ...routes.query };
    const queries = Object.entries(query);
    const combinedQueries = queries.reduce((acc, curr, idx) => {
      return `${acc}${idx >= queries.length ? "" : idx === 0 ? "" : "&"}${
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

  function removeParam(param: string) {
    const currParams = getQuery();
    delete currParams[param];
    return visit((routes) => routes.addQuery({ ...currParams }));
  }

  function getQuery(): Record<string, any> {
    // console.log(GetQuery());
    return GetQuery();
  }

  return {
    visit,
    getCurrentPath,
    getParam,
    removeParam,
  };
};
