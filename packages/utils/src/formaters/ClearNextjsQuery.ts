export function ClearNextJSQuery(
  query: NodeJS.Dict<string | string[]>,
  path: string
) {
  const queryClone: Record<string, any> = {};
  const queries = Object.entries(query);

  queries.forEach((q) => {
    const testText = `[${q[0]}]`;
    if (path.includes(testText)) {
    } else {
      queryClone[q[0]] = q[1];
    }
  });

  return queryClone;
}
