const mockAuthorzation = true;

export function getUserFromRequest<T = Record<string, string>>(req: any): T {
  const user = req?.headers?.user ? JSON.parse(req.headers.user) : null;
  const mockedUser: any = {
    id: "62b8bae86f604a137f311608",
    email: "barco01014@gmail.com",
    accountType: "seller",
  };

  if (mockAuthorzation && !user) return mockedUser;
  return user;
}
