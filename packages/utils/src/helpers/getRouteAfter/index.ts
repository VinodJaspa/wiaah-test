export const getRouteAfter = (
  path: string,
  targetRoute: string,
  depth?: number
) => {
  const routesSplit = path.split(`${targetRoute}/`);

  return { after: routesSplit[(depth || 0) + 1], before: routesSplit[0] };
};
