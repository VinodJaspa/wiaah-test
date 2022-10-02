"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserFromRequest = void 0;
const test_1 = require("./test");
const mockAuthorzation = true;
function getUserFromRequest(req) {
    var _a;
    const user = ((_a = req === null || req === void 0 ? void 0 : req.headers) === null || _a === void 0 ? void 0 : _a.user) ? JSON.parse(req.headers.user) : null;
    if (mockAuthorzation && !user)
        return test_1.mockedUser;
    return user;
}
exports.getUserFromRequest = getUserFromRequest;
//# sourceMappingURL=getUserFromRequest.js.map