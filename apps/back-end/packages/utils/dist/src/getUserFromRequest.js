"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserFromRequest = void 0;
const mockAuthorzation = true;
function getUserFromRequest(req) {
  var _a;
  const user = (
    (_a = req === null || req === void 0 ? void 0 : req.headers) === null ||
    _a === void 0
      ? void 0
      : _a.user
  )
    ? JSON.parse(req.headers.user)
    : null;
  const mockedUser = {
    id: "62b8bae86f604a137f311608",
    email: "barco01014@gmail.com",
    accountType: "seller",
  };
  if (mockAuthorzation && !user) return mockedUser;
  return user;
}
exports.getUserFromRequest = getUserFromRequest;
