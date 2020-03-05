"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var utilities_1 = require("./utilities");
function loginAgainIfDifferentShop(routes) {
    return function loginAgainIfDifferentShopMiddleware(ctx, next) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var query, session;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = ctx.query, session = ctx.session;
                        if (session && query.shop && session.shop !== query.shop) {
                            utilities_1.clearSession(ctx);
                            utilities_1.redirectToAuth(routes, ctx);
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, next()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
}
exports.loginAgainIfDifferentShop = loginAgainIfDifferentShop;
