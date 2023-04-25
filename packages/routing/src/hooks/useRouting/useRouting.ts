import { MainRoutes, RoutesType } from "../../routes";
import React from "react";
import { routingContext } from "../../Providers";

export const getRouting = (fn: (r: RoutesType) => RoutesType): string => {
  const routes = fn({ ...MainRoutes });

  return routes.route;
};

export const useRouting = () => {
  const {
    visit: VisitRoute,
    getCurrentPath: getPath,
    getParam: GetParam,
    getQuery: GetQuery,
    getBaseUrl,
    back,
    // removeParam: RemoveParam,
  } = React.useContext(routingContext);

  function visit(
    fn: (routes: RoutesType) => RoutesType,
    presistQuery: boolean = true
  ) {
    const routes = fn({ ...MainRoutes });
    const route =
      routes.route.length > 1 ? routes.route : getCurrentPath().split("?")[0];

    const presistedQuery = presistQuery ? GetQuery() : {};
    const query = { ...presistedQuery, ...routes.query };
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

  function getUrl(fn: (routes: RoutesType) => RoutesType): string {
    const routes = fn({ ...MainRoutes });
    return `${getBaseUrl()}${routes.route}`;
  }

  function getParam(queryName: string): string | null {
    return GetParam(queryName);
  }

  function getCurrentPath(props?: { noParams?: boolean }): string {
    return props?.noParams ? getPath().split("?")[0] : getPath();
  }

  function removeParam(param: string) {
    const currParams = getQuery();
    delete currParams[param];
    return visit((routes) => routes.addQuery({ ...currParams }), false);
  }

  function getQuery(): Record<string, any> {
    return GetQuery();
  }

  return {
    visit,
    getCurrentPath,
    getParam,
    removeParam,
    getUrl,
    routes: MainRoutes,
    back,
    getQuery,
  };
};
