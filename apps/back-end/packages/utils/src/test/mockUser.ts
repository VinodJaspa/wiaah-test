import { AuthorizationDecodedUser } from "../../index";

export const mockedUser: AuthorizationDecodedUser = {
  stripeId: "stripe id testing",
  id: "62b8bae86f604a137f311608",
  email: "barco01014@gmail.com",
  accountType: "seller",
  shopId: "62b8c8cb69e68f34eb948b3f",
  firstName: "name",
  lastName: "last ",
  city: "geneve",
  country: "switzerland",
  lat: 15,
  lon: 65,
  exp: 1560,
  iat: 1256,
};

export const secendMockedUser: AuthorizationDecodedUser = {
  stripeId: "stripe id testing",
  id: "62b8bae86f604a137f315879",
  email: "barco01014@gmail.com",
  accountType: "seller",
  shopId: "62b8c8cb69e68f34eb948b9f",
  firstName: "name",
  lastName: "last ",
  city: "cario",
  country: "egypt",
  lat: 15,
  lon: 65,
  exp: 1560,
  iat: 1256,
};

export const thirdMockedUser: AuthorizationDecodedUser = {
  stripeId: "stripe id testing",
  id: "62b8c8cb69e68f34eb948b9f",
  email: "barco01014@gmail.com",
  accountType: "seller",
  shopId: "62b8bae86f604a137f315879",
  firstName: "name",
  lastName: "last ",
  city: "geneve",
  country: "switzerland",
  lat: 15,
  lon: 65,
  exp: 1560,
  iat: 1256,
};

export const MockedAdminUser: AuthorizationDecodedUser = {
  stripeId: "stripe id testing",
  id: "62b8c8cb69e68f34eb948b9f",
  email: "barco01014@gmail.com",
  accountType: "admin",
  shopId: "62b8bae86f604a137f315879",
  firstName: "name",
  lastName: "last ",
  city: "geneve",
  country: "switzerland",
  lat: 15,
  lon: 65,
  exp: 1560,
  iat: 1256,
};
