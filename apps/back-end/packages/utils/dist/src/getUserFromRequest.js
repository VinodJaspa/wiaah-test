"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifyAndGetUserFromContext = exports.getUserFromRequest = void 0;
const test_1 = require("./test");
const mongodb_1 = require("mongodb");
const CookiesParser_1 = require("./CookiesParser");
const jwt = require("jsonwebtoken");
function getUserFromRequest(req, mock = false, _mockedUser) {
    var _a;
    const user = ((_a = req === null || req === void 0 ? void 0 : req.headers) === null || _a === void 0 ? void 0 : _a.user) ? JSON.parse(req.headers.user) : null;
    if (mock && !user)
        return _mockedUser
            ? _mockedUser
            : Object.assign(Object.assign({}, test_1.mockedUser), { id: new mongodb_1.ObjectId().toHexString() });
    return user;
}
exports.getUserFromRequest = getUserFromRequest;
function VerifyAndGetUserFromContext(ctx) {
    var _a, _b, _c;
    if (typeof ctx["req"] !== "undefined") {
        if (((_a = ctx === null || ctx === void 0 ? void 0 : ctx.req) === null || _a === void 0 ? void 0 : _a.headers) && ((_b = ctx === null || ctx === void 0 ? void 0 : ctx.req) === null || _b === void 0 ? void 0 : _b.headers["cookie"])) {
            const rawCookies = ctx.req.headers["cookie"];
            const parsedCookies = (0, CookiesParser_1.parseCookies)(rawCookies);
            const cookiesKey = process.env.COOKIES_KEY || "Auth_cookie";
            const jwtSecret = process.env.JWT_SERCERT || "secret";
            if (typeof cookiesKey === "string") {
                const authToken = (_c = parsedCookies.find((cookie) => (cookie === null || cookie === void 0 ? void 0 : cookie.cookieName) === cookiesKey)) === null || _c === void 0 ? void 0 : _c.cookieValue;
                if (authToken) {
                    try {
                        const user = jwt.verify(authToken, jwtSecret);
                        if (typeof user === "object") {
                            return Object.assign(Object.assign({}, user), { token: authToken });
                        }
                    }
                    catch (error) {
                        console.log(error);
                        return null;
                    }
                }
            }
        }
    }
    return null;
}
exports.VerifyAndGetUserFromContext = VerifyAndGetUserFromContext;
//# sourceMappingURL=getUserFromRequest.js.map