export function getUserFromRequest<T = Record<string, string>>(req: any): T {
  const user = req?.headers?.user ? JSON.parse(req.headers.user) : null;
  return user;
}
